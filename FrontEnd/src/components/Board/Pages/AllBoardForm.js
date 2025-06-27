import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormButton.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css'
import color from '@toast-ui/editor-plugin-color-syntax'
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import Swal from 'sweetalert2';
import { useAdmin } from '../../../api/AdminContext';


const AllBoardForm = () => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const navigate = useNavigate();
    const titleInputRef = useRef(null);
    const editorRef = useRef(null);

    const { isAdmin } = useAdmin();

    //글쓰기 시 제목 포커스
    //로컬 스토리지에서 데이터 불러오기
    useEffect(() => {
        const savedTitle = localStorage.getItem('post-title');
        const savedCategory = localStorage.getItem('post-category');
        const savedContent = localStorage.getItem('post-content');
        
        if (savedTitle) setTitle(savedTitle);
        if (savedCategory) setCategory(savedCategory);
        if (savedContent && editorRef.current) {
            setTimeout(() => {
                editorRef.current.getInstance().setMarkdown(savedContent);
            }, 0); // ref가 초기화된 후에 실행되도록
        }

        titleInputRef.current?.focus();
    },[])

    // 저장된 데이터 삭제 함수
    const clearTempData = () => {
        localStorage.removeItem('post-title');
        localStorage.removeItem('post-type');
        localStorage.removeItem('post-content');
    };

    //등록 버튼
    const handleSubmit = (e) => {
        e.preventDefault();

        const content = editorRef.current?.getInstance().getMarkdown();

        if(!category){
            Swal.fire({
                icon: 'warning',
                title: '카테고리를 선택해주세요',
                confirmButtonColor: '#6c5ce7',
            });
            return;
        }

        if(!title){
            Swal.fire({
                icon: 'warning',
                title: '제목을 입력해주세요',
                confirmButtonColor: '#6c5ce7',
            });
            return;
        }

        if(!content || content.trim() === ''){
            Swal.fire({
                icon: 'warning',
                title: '내용을 입력해주세요',
                confirmButtonColor: '#6c5ce7',
            });
            return;
        }

        const newPost = {
            title,
            category,
            content,
            author: '나야나', // 추후 사용자 정보로 교체 가능
            comment: 0,
            views: 0,
            likes: 0,
            createdAt: new Date(),
            isSecret: false,
        }

        Swal.fire({
            title: '게시글 등록',
            text: '게시글을 등록하시겠습니까?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6c5ce7',  // 보라색 확인 버튼
            cancelButtonColor: '#636e72',   // 회색 취소 버튼
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if(result.isConfirmed){
                // addChat(newPost, postType);
                clearTempData(); //저장된 임시데이터 삭제
                Swal.fire({
                    title: '등록 완료',
                    text: '게시글이 등록되었습니다.',
                    icon: 'success',
                    confirmButtonColor: '#6c5ce7',
                    confirmButtonText: '확인'
                }).then(() => {
                    navigate('/board/all')
                })
            }
        })
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
                clearTempData(); //저장된 임시데이터 삭제
                navigate('/board/all')
            }
        })
    }

    return (
        <div>
            <h2>게시글 글쓰기</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{marginRight:10, fontWeight: 'bold'}}>카테고리</label>
                    <select 
                        style={{marginBottom: 16, padding: 5}} 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        >
                        <option value=''>선택</option>
                        {isAdmin && <option value='notice'>공지사항</option>} {/* 관리자만 공지사항 글쓰기 가능 */}
                        <option value='chat'>속닥속닥</option>
                        <option value='review'>입양후기</option>
                        
                    </select>
                </div>
                <div>
                    <label style={{marginRight:10, fontWeight: 'bold'}}>제목</label>
                    <input
                        ref={titleInputRef}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '50%', padding: '10px', marginBottom: '16px' }}
                        onKeyDown={(e) => {
                            if(e.key === 'Enter'){
                                e.preventDefault();
                            }
                        }}
                    />
                </div>
                <div>
                    <label style={{fontWeight: 'bold'}}>내용</label><br />
                    <Editor 
                        ref={editorRef}
                        previewStyle="vertical"
                        height="500px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        hideModeSwitch={true}
                        placeholder="내용을 입력하세요."
                        plugins={[color]}
                    />
                </div>
                <div className='board-write-button-container'>
                    <button type="submit" className="board-write-button">등록</button>
                    {/* <button type="button" className="board-write-button" onClick={handleTempSave}>임시 저장</button> */}
                    <button type="button" className="board-write-button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    );
};

export default AllBoardForm;
