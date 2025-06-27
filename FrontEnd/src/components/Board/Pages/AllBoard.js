import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../Context/ChatContext';
import './AllBoard.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888';

const AllBoard = () => {
    const [notice, setNotice] = useState([]);
    const [chat, setChat] = useState([]);
    const [review, setReview] = useState([]);

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

    const categoryLabels = {
        NOTICE: '공지사항',
        CHAT: '속닥속닥',
        REVIEW: '입양후기'
    };

    //전체 게시글 조회
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/board`);
                console.log('게시글 데이터:', res.data);
                setNotice(res.data.filter(post => post.category.toLowerCase() === 'notice'));
                setChat(res.data.filter(post => post.category.toLowerCase() === 'chat'));
                setReview(res.data.filter(post => post.category.toLowerCase() === 'review'));
            } catch (error) {
                console.error('게시글 불러오기 실패', error);
                Swal.fire({
                    icon: 'error',
                    title: '게시글 불러오기 실패',
                    text: '서버에서 게시글을 불러오지 못했습니다.'
                });
            }
        }
        fetchBoard();
    },[])

    // 정렬 함수
    const sortPosts = (posts) => {
        const order = sortAsc ? -1 : 1;

        return [...posts].sort((a, b) => {
            if (sortOption === 'latest') return order * (new Date(b.createdAt) - new Date(a.createdAt));
            if (sortOption === 'view') return order * (b.view - a.view);
            if (sortOption === 'likes') return order * (b.likes - a.likes);
            if (sortOption === 'comment') return order * (b.comment - a.comment);
            return 0;
        });
    };

	//정렬된 공지사항
    const noticedChats = useMemo(() => 
        sortPosts(notice.map(post => ({ ...post, type: 'notice' })))
    ,[notice, sortOption, sortAsc]);

	//정렬된 일반게시글
    const combinedPosts = useMemo(() =>
        sortPosts([
            ...chat.map(post => ({ ...post, type: 'chat' })),
            ...review.map(post => ({ ...post, type: 'review' })),
        ]), [chat, review, sortOption, sortAsc]);

    // 정렬된 검색 결과
    const sortedFilteredPosts = useMemo(() =>
        sortPosts(filteredPosts), [filteredPosts, sortOption, sortAsc]
    );

    // 현재 페이지에 보여줄 게시글
    const paginatedPosts = isSearching ? sortedFilteredPosts : combinedPosts;
    const displayedPosts = paginatedPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    //searching 여부에 따라 페이징
    const totalPages = Math.max(1, Math.ceil(
        (isSearching ? filteredPosts.length : combinedPosts.length) / itemsPerPage));

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
                // postType: post.type,
                filteredList: isSearching ? sortedFilteredPosts : combinedPosts,
            } 
        });
    };

	//글쓰기 버튼
    const handleWrite = () => {
        navigate('/board/all/form');
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

        const filtered = combinedPosts.filter(post => {
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
            <option value='view'>조회순</option>
            <option value='likes'>추천순</option>
            <option value='comment'>댓글순</option>
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
                        if(sortOption === 'view'){
                            setSortAsc(!sortAsc);
                        } else{
                            setSortOption('view');
                            setSortAsc(true);
                        }
                        }}>
                        조회 {sortOption === 'view' ? (!sortAsc ? '∨' : '∧') : '∨'}
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
            {noticedChats?.map((post) => (
                <tr key={`notice-${post.id}`} className="notice-row" style={{backgroundColor: '#ddd'}}>
                    <td className='notice-tab'>
                        <div className='cell-text'>{categoryLabels[post.category]}</div>
                    </td>
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
                        <div className='cell-text'>{post.view}</div>
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
            ))}
            {/* 일반게시글 매핑 */}
            {displayedPosts.length > 0 ? (
                displayedPosts.map((post) => (
                <tr key={`${post.type}-${post.id}`}>
                        <td>
                            <div className='cell-text'>{categoryLabels[post.category]}</div>
                        </td>
                        <td className="title-cell" onClick={() => handleTitleClick(post)}>
                        {/* {post.isSecret ? '🔒 ' : ''} */}
                            <div className='cell-text'>
                                {searchOption === 'title' 
                                    ? highlightKeyword(post.title, isSearching ? confirmKeyword : '')
                                    : post.title
                                }
                            </div>
                        </td>
                        <td>
                            <div className='cell-text'>
                                {searchOption === 'author' 
                                    ? highlightKeyword(post.author, isSearching ? confirmKeyword : '')
                                    : post.author
                                }
                            </div>
                        </td>
                        <td>
                            <div className='cell-text'>{post.view}</div>
                        </td>
                        <td>
                            <div className='cell-text'>{post.likes}</div>
                        </td>
                        <td>
                            <div className='cell-text'>{post.comment}</div>
                        </td>
                        <td>
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
					const prevGroupStart = Math.ceil((currentPage) / 5 - 1) * 5; //currentPage-1 -> currentPage로 수정
					//ex) currentPage = 14 -> ceil((14/5)-1) = 2 , 2*5 = 10page
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

export default AllBoard;