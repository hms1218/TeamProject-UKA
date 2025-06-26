import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';
import './AllBoard.css';
import Swal from 'sweetalert2';

const Notice = () => {
    const { notice } = useChat();
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [sortOption, setSortOption] = useState('latest');
    const [sortAsc, setSortAsc] = useState(false); // 오름차순/내림차순

    const [searchKeyword, setSearchKeyword] = useState(''); //키워드
    const [filteredPosts, setFilteredPosts] = useState([]); //검색된 게시글 배열
    const [isSearching, setIsSearching] = useState(false);
    const [confirmKeyword, setConfirmKeyword] = useState('');
    const [searchOption, setSearchOption] = useState('title');

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

    //정렬된 공지사항
    const noticedChats = useMemo(() => 
        sortPosts(notice.map(post => ({ ...post, type: 'notice' })))
    ,[notice, sortOption, sortAsc]);

    // 정렬된 검색 결과
    const sortedFilteredPosts = useMemo(() =>
        sortPosts(filteredPosts), [filteredPosts, sortOption, sortAsc]
    );

    // const totalPages = Math.ceil(noticedChats.length / itemsPerPage);

	// 현재 페이지의 게시글만 추출
    // const currentPosts = noticedChats.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    // 현재 페이지에 보여줄 게시글
    const paginatedPosts = isSearching ? sortedFilteredPosts : noticedChats;
    const displayedPosts = paginatedPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    //searching 여부에 따라 페이징
    const totalPages = Math.max(1, Math.ceil(
        (isSearching ? filteredPosts.length : noticedChats.length) / itemsPerPage));

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
        navigate(`/board/all/detail/${post.type}/${post.id}`, { 
            state: { 
                postType: post.type,
                filteredList: isSearching ? sortedFilteredPosts : null,
            } 
        });
    };

    //검색 함수
    const handleSearch = () => {
        const keyword = searchKeyword.trim();

        if(keyword.length === 0){
            setIsSearching(false);
            setFilteredPosts([]);
            setCurrentPage(1);
            return;
        }

        if(keyword.length < 2){
            Swal.fire({
                icon: 'warning',
                title: '검색어 오류',
                text: '검색어는 최소 2글자 이상 입력해주세요.'
            });
            return;
        }

        const filtered = noticedChats.filter(post => {
            if(searchOption === 'title'){
                return post.title.toLowerCase().includes(keyword.toLowerCase())
            }
            else if(searchOption === 'author'){
                return post.author.toLowerCase().includes(keyword.toLowerCase())
            }
            return false;
        });

        setFilteredPosts(filtered);
        setCurrentPage(1); // 검색시 첫 페이지로 이동
        setIsSearching(true);
        setConfirmKeyword(keyword);
        // setSearchKeyword('')
    }

    //검색한 키워드 강조
    const highlightKeyword = (text, keyword) => {
        if(!keyword) return text;

        const regex = new RegExp(`(${keyword})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) =>
            regex.test(part) ? <b key={index}>{part}</b> : <span key={index}>{part}</span>
        );
    }

	//글쓰기 버튼
    const handleWrite = () => {
        navigate('/board/notice/new');
    };

    // 날짜 포맷 함수
    const formatDate = (date) => {
        const d = new Date(date);
        const year = String(d.getFullYear()).slice(2);
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');

        return `${year}.${month}.${day}`;
    };

    return (
        <div className="board-container">
        {/* <h1 className="board-title">전체 게시판</h1> */}

        <div className="board-controls">
            <select className='board-options'
                value={sortOption} 
                onChange={(e) => {
                    setSortOption(e.target.value); 
                    setSortAsc(false);
                }}>
            <option value='latest' selected>최신순</option>
            <option value='comment'>댓글순</option>
            <option value='views'>조회순</option>
            <option value='likes'>추천순</option>
            </select>
            <button className="board-write-btn" onClick={handleWrite}>글쓰기</button>
        </div>

        <table className="board-table">
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
				<th className='comment-header'>
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
				<th className='comment-header'>
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
				<th className='comment-header'>
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
            {displayedPosts.length > 0 ? (
                displayedPosts.map((post) => (
                <tr key={`notice-${post.id}`} className="notice-row">
                    <td className='notice-tab'>공지사항</td>
                    <td className="notice-title" onClick={() => handleTitleClick(post)}>
                        <div className='cell-text'>
                            📢
                            {searchOption === 'title' 
                                ? highlightKeyword(post.title, isSearching ? confirmKeyword : '')
                                : post.title
                            }
                        </div>
                    </td>
                    <td className='notice-cell'>
                        <div className='cell-text'>
                            {searchOption === 'author' 
                                ? highlightKeyword(post.author, isSearching ? confirmKeyword : '')
                                : post.author
                            }
                        </div>
                    </td>
                    <td className='notice-cell'>
                        <div className='cell-text'>{post.views}</div>
                    </td>
                    <td className='notice-cell'>
                        <div className='cell-text'>{post.likes}</div>
                    </td>
                    <td className='notice-cell'>
                        <div className='cell-text'>{post.comment}</div>
                    </td>
                    <td className='notice-cell'>
                        <div className='cell-text'>{formatDate(post.createdAt)}</div>
                    </td>
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

        <div className="board-pagination">
			<button
				onClick={() => {
					const prevGroupStart = Math.ceil((currentPage) / 5 - 1) * 5;
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
            <select className='board-search-option'
                value={searchOption}
                onChange={e => setSearchOption(e.target.value)}
                >
                <option value='title' selected>제목</option>
                <option value='author'>작성자</option>
            </select>
            <input 
                type="text" 
                placeholder="검색어를 입력해주세요"
                value={searchKeyword}
                onChange={(e) => {
                    setSearchKeyword(e.target.value);
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

export default Notice;