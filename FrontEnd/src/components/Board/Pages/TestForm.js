import { useState } from 'react';
import './TestForm.css';

const TestForm = () => {
  // 🔹 더미 데이터 생성 (100개)
  const allPosts = Array.from({ length: 100 }, (_, i) => ({
    id: 100 - i,
    title: `더미 게시글 ${100 - i}`,
    author: '홍길동',
    comment: Math.floor(Math.random() * 5),
    views: Math.floor(Math.random() * 100),
    likes: Math.floor(Math.random() * 50),
    createdAt: '2022-04-12 17:42',
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // 🔹 현재 페이지의 게시글만 추출
  const currentPosts = allPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // 🔹 페이지 버튼 생성 로직
  const getPageNumbers = () => {
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="board-container">
        <h1 className="board-title">Board</h1>

        <div className="board-controls">
            <select>
            <option>최신순</option>
            <option>조회순</option>
            </select>
            <button className="write-btn">글쓰기</button>
        </div>

        <table className="board-table">
            <thead>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>댓글</th>
                <th>조회</th>
                <th>추천</th>
                <th>작성일</th>
            </tr>
            </thead>
            <tbody>
            {currentPosts.map(post => (
                <tr key={post.id}>
                <td>{post.id}</td>
                <td className="title-cell">{post.title}</td>
                <td>{post.author}</td>
                <td>{post.comment}</td>
                <td>{post.views}</td>
                <td>{post.likes}</td>
                <td>{post.createdAt}</td>
                </tr>
            ))}
            </tbody>
        </table>

        <div className="pagination">
            <button onClick={() => goToPage(1)} disabled={currentPage === 1}>«</button>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>‹</button>

            {getPageNumbers().map((page) => (
            <button
                key={page}
                onClick={() => goToPage(page)}
                className={currentPage === page ? 'active' : ''}
            >
                {page}
            </button>
            ))}

            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
            <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>»</button>
        </div>
        <div className="board-search">
            <div className="search-group">
                <input type="text" placeholder="검색어를 입력해주세요" />
                <button className="search-btn">검색</button>
            </div>
            <button className="write-btn-down">글쓰기</button>
        </div>
    </div>
  );
};

export default TestForm;