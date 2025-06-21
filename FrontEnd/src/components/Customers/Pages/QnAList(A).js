import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQnA } from '../Context/QnAContext';
import './QnAList.css';
import Swal from 'sweetalert2';

const QnAList = () => {
  const { qnas } = useQnA();

    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState('latest');
    const [sortAsc, setSortAsc] = useState(false); // 오름차순/내림차순

    const [searchKeyword, setSearchKeyword] = useState(''); //키워드
    const [filteredPosts, setFilteredPosts] = useState([]); //검색된 게시글 배열
    const [isSearching, setIsSearching] = useState(false);

    const itemsPerPage = 10;

    // 정렬 함수
    const sortPosts = (posts) => {
        const order = sortAsc ? -1 : 1;

        return [...posts].sort((a, b) => {
            if (sortOption === 'latest') return order * (new Date(b.createdAt) - new Date(a.createdAt));
            if (sortOption === 'views') return order * (b.views - a.views);
            if (sortOption === 'likes') return order * (b.likes - a.likes);
            if (sortOption === 'comment') return order * (b.comment - a.comment);
            return 0;
        });
    };


	//정렬된 일반게시글
    const combinedPosts = useMemo(() =>
        sortPosts([
            ...review.map(post => ({ ...post, type: 'review' })),
        ]), [chats, review, sortOption, sortAsc]);

    // 정렬된 검색 결과
    const sortedFilteredPosts = useMemo(() =>
        sortPosts(filteredPosts), [filteredPosts, sortOption, sortAsc]);

    // 현재 페이지에 보여줄 게시글
    const paginatedPosts = isSearching ? sortedFilteredPosts : combinedPosts;
    const displayedPosts = paginatedPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    //searching 여부에 따라 페이징
    const totalPages = Math.max(1, Math.ceil(
        (isSearching ? filteredPosts.length : combinedPosts.length) / itemsPerPage));

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
        navigate(`/qna/detail/${post.id}`, { state: { postType: post.type } });
    };

	//글쓰기 버튼
    const handleWrite = () => {
        navigate('/qna/form');
    };

    //검색 함수
    const handleSearch = () => {
        const keyword = searchKeyword.trim();

        if(keyword.length < 2){
            Swal.fire({
                icon: 'warning',
                title: '검색어 오류',
                text: '검색어는 최소 2글자 이상 입력해주세요.'
            });
            return;
        }

        const filtered = combinedPosts.filter(post => {
            return post.title.toLowerCase().includes(keyword.toLowerCase())
        });

        setFilteredPosts(filtered);
        setCurrentPage(1); // 검색시 첫 페이지로 이동
        setIsSearching(true);
        // setSearchKeyword('')
    }

    // 날짜 포맷 함수
    const formatDate = (date) => {
        const d = new Date(date);
        const year = String(d.getFullYear()).slice(2);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    };

    return (
        <div className="customer-qna-container">
        {/* <h1 className="customer-qna-title">전체 게시판</h1> */}

        <div className="customer-qna-controls">
            <select className='customer-qna-options'
                value={sortOption} 
                onChange={(e) => {
                    setSortOption(e.target.value); 
                    setSortAsc(false);
                }}>
            <option value='latest' selected>최신순</option>
            <option value='views'>조회순</option>
            <option value='likes'>추천순</option>
            <option value='comment'>댓글순</option>
            </select>
            <button className="customer-qna-write-btn" onClick={handleWrite}>글쓰기</button>
        </div>

        <table className="customer-qna-table">
            <thead>
            <tr>
                <th>카테고리</th>
                <th>제목</th>
                <th>작성자</th>
				<th className='comment-header'>
                    <button className="filter-btn" onClick={() => {
                        if(sortOption === 'views'){
                            setSortAsc(!sortAsc);
                        } else{
                            setSortOption('views');
                            setSortAsc(true);
                        }
                        }}>
                        조회 {sortOption === 'views' ? (!sortAsc ? '∨' : '∧') : '∨'}
                    </button>
				</th>
				<th>
					<button className="filter-btn" onClick={() => {
                        if(sortOption === 'likes'){
                            setSortAsc(!sortAsc);
                        } else{
                            setSortOption('likes');
                            setSortAsc(true);
                        }
                        }}>
                        추천 {sortOption === 'likes' ? (!sortAsc ? '∨' : '∧') : '∨'}
                    </button>
                </th>
				<th>
					<button className="filter-btn" onClick={() => {
                        if(sortOption === 'comment'){
                            setSortAsc(!sortAsc);
                        } else{
                            setSortOption('comment');
                            setSortAsc(true);
                        }
                        }}>
                        댓글 {sortOption === 'comment' ? (!sortAsc ? '∨' : '∧') : '∨'}
                    </button>
				</th>
				<th>
					<button className="filter-btn" onClick={() => {
                        if(sortOption === 'latest'){
                            setSortAsc(!sortAsc);
                        } else{
                            setSortOption('latest');
                            setSortAsc(true);
                        }
                        }}>
                        작성일 {sortOption === 'latest' ? (!sortAsc ? '∨' : '∧') : '∨'}
                    </button>
				</th>
            </tr>
            </thead>
            <tbody>
            {/* 공지사항 매핑 */}
            {noticedChats.map((post) => (
                <tr key={`notice-${post.id}`} className="notice-row" style={{backgroundColor: '#ddd'}}>
                    <td className='notice-tab'>공지사항</td>
                    <td className="notice-title" onClick={() => handleTitleClick(post)}>📢 {post.title}</td>
                    <td className='notice-cell'>{post.author}</td>
                    <td className='notice-cell'>{post.views}</td>
                    <td className='notice-cell'>{post.likes}</td>
                    <td className='notice-cell'>{post.comment}</td>
                    <td className='notice-cell'>{formatDate(post.createdAt)}</td>
                </tr>
            ))}
            {/* 일반게시글 매핑 */}
            {displayedPosts.length > 0 ? (
                displayedPosts.map((post) => (
                <tr key={`${post.type}-${post.id}`}>
                        <td>{post.type === 'chat' ? "속닥속닥" : "입양후기"}</td>
                        <td className="title-cell" onClick={() => handleTitleClick(post)}>
                        {/* {post.isSecret ? '🔒 ' : ''} */}
                        {post.title}
                        </td>
                        <td>{post.author}</td>
                        <td>{post.views}</td>
                        <td>{post.likes}</td>
                        <td>{post.comment}</td>
                        <td>{formatDate(post.createdAt)}</td>
                </tr>           
                ))
            ) : (
                <tr>
                    <td colSpan='7' style={{color: '#999'}}> 🔍 해당 게시글이 없습니다.</td>
                </tr>
            )
        }
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

        <div className="customer-qna-search">   
            <input 
                type="text" 
                placeholder="검색어를 입력해주세요"
                value={searchKeyword}
                onChange={(e) => {
                    setSearchKeyword(e.target.value);
                    if(e.target.value.trim().length === 0){
                        setIsSearching(false);
                    }
                }}
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        e.preventDefault();
                        handleSearch();
                    }
                }}
            />
            <button className="search-btn" onClick={handleSearch}>검색</button>                      
        </div>
    </div>
    );
};

export default QnAList;