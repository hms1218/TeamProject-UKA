import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';
import './AllBoard.css';

const AllBoard = () => {
    const { chats, notice, review } = useChat();
    const [currentPage, setCurrentPage] = useState(1);
    const [openId, setOpenId] = useState(null);
    const [inputPassword, setInputPassword] = useState('');
    const navigate = useNavigate();
	const [commentSort, setCommentSort] = useState(true);
	const [viewsSort, setViewsSort] = useState(true);
	const [likesSort, setLikesSort] = useState(true);
	const [timeSort, setTimeSort] = useState(true);

    const itemsPerPage = 10;

	//공지사항 글 매핑
    const noticedChats = [...notice.map(post => ({ ...post, type: 'notice' }))].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

	//일반게시글 매핑
    const combinedPosts = [
        ...chats.map(post => ({ ...post, type: 'chat' })),
        ...review.map(post => ({ ...post, type: 'review' })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const totalPages = Math.ceil(combinedPosts.length / itemsPerPage);

	// 현재 페이지의 게시글만 추출
    const currentPosts = combinedPosts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

	// 페이지 버튼 생성 로직
    const getPageNumbers = () => {
        const maxButtons = 5; //페이지 바에서 최대 보여주는 버튼 개수
		const groupIndex = Math.floor((currentPage - 1) / maxButtons)
		const start = groupIndex * maxButtons + 1;
        const end = Math.min( totalPages, start + maxButtons - 1);

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

	//타이틀 클릭시
    const handleTitleClick = (post) => {
        if (post.isSecret) {
        setOpenId(openId === post.id ? null : post.id);
        } else {
        navigate(`/board/all/${post.id}`, { state: { postType: post.type } });
        }
    };

	//비밀번호 확인
    const handlePasswordConfirm = (post) => {
        if (inputPassword === post.password) {
        window.sessionStorage.setItem(`chat_access_${post.id}`, 'true');
        navigate(`/board/all/${post.id}`, { state: { postType: post.type } });
        } else {
        alert('비밀번호가 틀렸습니다.');
        }
    };

	//글쓰기 버튼
    const handleWrite = () => {
        navigate('/board/all/new');
    };

    return (
        <div className="board-container">
        <h1 className="board-title">전체 게시판</h1>

        <div className="board-controls">
            <select>
            <option selected>최신순</option>
            <option>댓글순</option>
            <option>조회순</option>
            <option>추천순</option>
            </select>
            <button className="write-btn" onClick={handleWrite}>글쓰기</button>
        </div>

        <table className="board-table">
            <thead>
            <tr>
                <th>탭</th>
                <th>제목</th>
                <th>작성자</th>
				<th className='comment-header'>
					<button className="filter-btn" onClick={() => setCommentSort(!commentSort)}>댓글 {commentSort ? '∨' : '∧'}</button>
				</th>
				<th>
					<button className="filter-btn" onClick={() => setViewsSort(!viewsSort)}>조회 {viewsSort ? '∨' : '∧'}</button>
					</th>
				<th>
					<button className="filter-btn" onClick={() => setLikesSort(!likesSort)}>추천 {likesSort ? '∨' : '∧'}</button>
				</th>
				<th>
					<button className="filter-btn" onClick={() => setTimeSort(!timeSort)}>작성일 {timeSort ? '∨' : '∧'}</button>
				</th>
            </tr>
            </thead>
            <tbody>
            {noticedChats.map((post) => (
                <tr key={`notice-${post.id}`} className="notice-row">
                    <td className='notice-tab'>공지사항</td>
                    <td className="notice-title" onClick={() => handleTitleClick(post)}>📢 {post.title}</td>
                    <td className='notice-cell'>{post.author}</td>
                    <td className='notice-cell'>{post.comment}</td>
                    <td className='notice-cell'>{post.views}</td>
                    <td className='notice-cell'>{post.likes}</td>
                    <td className='notice-cell'>{post.createdAt}</td>
                </tr>
            ))}

            {currentPosts.map((post) => (
                <>
                <tr key={`${post.type}-${post.id}`}>
                        <td>{post.type === 'chat' ? "속닥속닥" : "입양후기"}</td>
                        <td className="title-cell" onClick={() => handleTitleClick(post)}>
                        {post.isSecret ? '🔒 ' : ''}{post.title}
                        </td>
                        <td>{post.author}</td>
                        <td>{post.comment}</td>
                        <td>{post.views}</td>
                        <td>{post.likes}</td>
                        <td>{post.createdAt}</td>
                </tr>
                {openId === post.id && post.isSecret && (
                    <tr className="password-row">
                    <td colSpan="4">
                        <input
                        type="password"
                        maxLength="4"
                        placeholder="비밀번호 4자리"
                        value={inputPassword}
                        onChange={(e) => setInputPassword(e.target.value)}
                        />
                        <button onClick={() => handlePasswordConfirm(post)}>확인</button>
                    </td>
                    </tr>
                )}
                </>
            ))}
            </tbody>
        </table>

        <div className="pagination">
			<button
				onClick={() => {
					const prevGroupStart = Math.ceil((currentPage - 1) / 5 - 1) * 5;
					//ex) currentPage = 14 -> ceil((14-1)/5-1) = 2 , 2*5 = 10page
					const prevGroupPage = Math.max(prevGroupStart, 1); //둘중에 최댓값의 페이지로 이동
					setCurrentPage(prevGroupPage);
				}}
				disabled={currentPage === 1}
			>
			«
			</button>
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>
            {getPageNumbers().map(page => (
            <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? 'active' : ''}
            >
                {page}
            </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
			<button
				onClick={() => {
					const nextGroupStart = Math.floor((currentPage - 1) / 5 + 1) * 5 + 1;
					//ex) currentPage = 14 -> floor((14-1)/5+1) = 3, 3*5+1 = 16page
					const nextGroupPage = Math.min(nextGroupStart, totalPages); //둘중에 최솟값의 페이지의로 이동
					setCurrentPage(nextGroupPage);
				}}
				disabled={currentPage === totalPages}
			>
			»
			</button>
        </div>

        <div className="board-search">   
            <input type="text" placeholder="검색어를 입력해주세요" />
            <button className="search-btn">검색</button>                      
        </div>
    </div>
    );
};

export default AllBoard;