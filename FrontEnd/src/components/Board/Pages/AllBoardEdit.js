import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './FormButton.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css'
import color from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useChat } from '../Context/ChatContext';

const AllBoardEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { chats, notice, review, editPost } = useChat();

    const titleInputRef = useRef(null);
    const editorRef = useRef(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [foundType, setFoundType] = useState('');

    //글쓰기 시 제목 포커스
    useEffect(() => {
        titleInputRef.current?.focus();
    },[])

    // 페이지 진입 시 id 기반으로 post 찾기
    useEffect(() => {
        const postId = parseInt(id);
        const allPosts = [
            ...notice.map(post => ({...post, type: 'notice'})),
            ...chats.map(post => ({...post, type: 'chat'})),
            ...review.map(post => ({...post, type: 'review'}))
        ];

        const found = allPosts.find(post => post.id === postId);

        if (found) {
            setTitle(found.title);
            setContent(found.content);
            setFoundType(found.type);

            // 에디터 초기 내용 강제로 세팅 (초기값과 따로 직접 세팅 필요)
            setTimeout(() => {
                const text = new DOMParser().parseFromString(found.content || '', 'text/html').body.textContent || '';

                // 줄바꿈 있는 경우에도 각각 <p>로 감싸기
                const htmlParagraphs = text.split('\n').map(line => `<p>${line.trim()}<p>`).join('');

                editorRef.current?.getInstance().setHTML(htmlParagraphs);
            }, 0);

        } else {
            Swal.fire('오류', '게시글을 찾을 수 없습니다.', 'error');
            navigate(`/board/all/${id}`);
        }
    }, [id, notice, chats, review, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const html = editorRef.current?.getInstance().getHTML();
        // const text = new DOMParser().parseFromString(html, 'text/html').body.textContent || ''; //html -> text로 변환
        const replaceHtml = html
            .replace(/<\/p>/gi, '\n')        // p 태그 끝나면 줄바꿈
            .replace(/<br\s*\/?>/gi, '\n')   // br 태그 줄바꿈
            .replace(/<[^>]*>/g, '');        // 나머지 태그 제거

        const text = replaceHtml.trim();

        editPost(parseInt(id), {
            id: parseInt(id),
            title,
            content: text,
            type: foundType,
        })

        alert(`수정 완료: title : ${title}, content: ${text}`);
        navigate(`/board/all/${id}`);
    };

    //취소 버튼
    const handleCancel = () => {
        Swal.fire({
            title: '작성 취소',
            text: '작성을 취소하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6c5ce7',  // 보라색 확인 버튼
            cancelButtonColor: '#636e72',   // 회색 취소 버튼
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if(result.isConfirmed){
                navigate('/board/all/${id}')
            }
        })
    }

    return (
        <div>
            <h2>게시글 수정하기</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>제목</label><br />
                    <input
                        ref={titleInputRef}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginBottom: '16px' }}
                    />
                </div>
                <div>
                    <label>내용</label><br />
                    <Editor 
                        ref={editorRef}
                        previewStyle="vertical"
                        height="500px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        hideModeSwitch={true}
                        placeholder="내용을 입력하세요."
                        plugins={[color]}
                        onChange={() => {
                            const html = editorRef.current?.getInstance().getHTML();
                            setContent(html); // HTML 상태로 저장
                        }}
                    />
                </div>
                <div className='board-write-button-container'>
                    <button type="submit" className="board-write-button">완료</button>
                    <button type="button" className="board-write-button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default AllBoardEdit;
