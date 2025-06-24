import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQnA } from '../Context/QnAContext';
import './QnAList.css';
import { useAlert } from '../Context/AlertContext';
import { useAdmin } from '../../../api/AdminContext';

const ITEMS_PER_PAGE = 10;
const PAGE_BUTTON_LIMIT = 5;

const QnAList = ({ resetFlag = 0 }) => {
    const { qnas } = useQnA();
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const [openId, setOpenId] = useState(null);
    const { showAlert } = useAlert();
    const { isAdmin } = useAdmin();

    // id 내림차순 (최신글 우선)
    const sortedQnAs = [...qnas].sort((a, b) => Number(b.id) - Number(a.id));
    // const sortedQnAs = [...qnas].sort((a, b) => Number(b.id) < Number(a.id) ? 1 : -1);

    // 검색
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // resetFlag 변경시 검색/페이징 초기화
    React.useEffect(() => {
        setSearchKeyword('');
        setFilteredPosts([]);
        setIsSearching(false);
        setCurrentPage(1);
    }, [resetFlag, qnas]);

    // 현재 보여줄 QnA 목록
    const getDisplayedQnAs = () => {
        const source = isSearching ? filteredPosts : sortedQnAs;
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return source.slice(start, end);
    };
    const displayedQnAs = getDisplayedQnAs();

    // 총 게시글/총 페이지 수 (검색 기준)
    const totalItems = isSearching ? filteredPosts.length : sortedQnAs.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    // 페이지 버튼 (5개씩 그룹)
    const getPageNumbers = () => {
        const maxButtons = PAGE_BUTTON_LIMIT;
        const groupIndex = Math.floor((currentPage - 1) / maxButtons);
        const start = groupIndex * maxButtons + 1;
        const end = Math.min(totalPages, start + maxButtons - 1);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    // 검색
    const handleSearch = () => {
        const keyword = searchKeyword.trim();
        if (keyword.length < 2) {
            showAlert && showAlert({
                title: '검색어는 최소 2글자 이상 입력해주세요.',
                icon: 'warning',
            });
            return;
        }
        const filtered = sortedQnAs.filter(qna =>
            qna.title.toLowerCase().includes(keyword.toLowerCase()) ||
            qna.author.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredPosts(filtered);
        setCurrentPage(1);
        setIsSearching(true);
    };

    // 날짜 변환
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [yyyy, mm, dd] = dateString.split('-');
        return `${yyyy.slice(2)}.${mm}.${dd}`;
    };

    // 제목 클릭
    const handleTitleClick = (qna) => {
        if (isAdmin) {
            navigate(`/customer/qna/${qna.id}`);
            return;
        }
        if (!isAdmin && qna.isReported) {
            showAlert && showAlert({
                title: '🚫 관리자 검토중',
                text: '신고가 누적된 글입니다.',
                icon: 'warning',
            });
            return;
        }
        if (qna.isSecret) {
            handlePasswordConfirm(qna);
        } else {
            navigate(`/customer/qna/${qna.id}`);
        }
    };

    // 비밀번호 확인
    const handlePasswordConfirm = async (qna) => {
        if (isAdmin) {
            navigate(`/customer/qna/${qna.id}`);
            return;
        }
        const result = await showAlert({
            title: '🔒 비밀글입니다',
            text: '비밀번호를 입력해주세요',
            input: 'password',
            inputPlaceholder: '비밀번호',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        });
        if (!result || result.isDismissed || result.isDenied || !result.isConfirmed) return;

        const password = result.value;
        if (!password) {
            await showAlert({
                title: '⚠️ 비밀번호 입력 필요',
                text: '비밀번호를 입력해주세요.',
                imageUrl: process.env.PUBLIC_URL + '/img/pwWhat.jpg',
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: '비밀번호',
                icon: 'warning',
            });
            return;
        }
        if (password !== qna.password) {
            await showAlert({
                title: '❌ 비밀번호 오류',
                text: '비밀번호가 틀렸습니다.',
                imageUrl: process.env.PUBLIC_URL + '/img/pwWhat.jpg',
                imageWidth: 300,
                imageHeight: 300,
                imageAlt: '패스워드',
                icon: 'warning',
            });
            return;
        }
        window.sessionStorage.setItem(`qna_access_${qna.id}`, 'true');
        navigate(`/customer/qna/${qna.id}`);
    };

    // 글쓰기 이동
    const handleWrite = () => navigate('/customer/qna/new');

    return (
        <div className="customer-container">
            <div className="customer-controls">
                <button className="customer-write-btn" onClick={handleWrite}>✏️ 글쓰기</button>
            </div>
            <div className="customer-table-container">
                <table className="customer-table">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>답변</th>
                            <th>상태</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalItems === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: 50 }}>
                                    {isSearching ? "검색 결과가 없습니다." : "등록된 게시글이 없습니다."}
                                </td>
                            </tr>
                        ) : (
                            displayedQnAs.map(qna => (
                                <tr key={qna.id}>
                                    <td>{qna.id}</td>
                                    <td
                                        className={`title-cell${qna.isReported ? ' reported' : ''}`}
                                        onClick={() => handleTitleClick(qna)}
                                    >
                                        {qna.isSecret && <span style={{ marginRight: 5, color: '#b19cd9' }}>🔒</span>}
                                        {qna.title}
                                    </td>
                                    <td>{qna.author}</td>
                                    <td style={{ color: qna.isAnswered ? '#00aaff' : '#ff7676' }}>
                                        {qna.isAnswered ? '답변' : '미답변'}
                                    </td>
                                    <td
                                        style={{
                                            color: qna.isReported ? '#ff7676'
                                                : qna.isSecret ? '#b19cd9'
                                                : '#0090dd',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {qna.isSecret && qna.isReported
                                            ? '비밀/신고됨'
                                            : qna.isSecret
                                            ? '비밀'
                                            : qna.isReported
                                            ? '신고됨'
                                            : '공개'
                                        }
                                    </td>
                                    <td>
                                        {formatDate(qna.createdAt?.slice(0, 10))}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {/* 페이징 */}
            {(totalItems > 0 && totalPages > 1) && (
                <div className="pagination">
                    {/* « : 이전 그룹 이동 */}
                    <button
                        onClick={() => {
                            // 이전 그룹의 마지막 페이지(10, 5, 1 ...)
                            const prevGroupEnd = Math.max(1, (Math.ceil(currentPage / PAGE_BUTTON_LIMIT) - 1) * PAGE_BUTTON_LIMIT);
                            setCurrentPage(prevGroupEnd);
                        }}
                        disabled={currentPage === 1}
                        style={{ width: '25px', padding: '0px' }}
                    >«</button>
                    {/* ‹ : 이전 페이지 */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        style={{ width: '25px', padding: '0px' }}
                    >‹</button>
                    {/* 페이지 번호 */}
                    {getPageNumbers().map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage ? 'active' : ''}
                        >{page}</button>
                    ))}
                    {/* › : 다음 페이지 */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        style={{ width: '25px', padding: '0px' }}
                    >›</button>
                    {/* » : 다음 그룹 이동 */}
                    <button
                        onClick={() => {
                            const nextGroupStart = Math.min(
                                Math.floor((currentPage - 1) / PAGE_BUTTON_LIMIT + 1) * PAGE_BUTTON_LIMIT + 1,
                                totalPages
                            );
                            setCurrentPage(nextGroupStart);
                        }}
                        disabled={currentPage === totalPages}
                        style={{ width: '25px', padding: '0px' }}
                    >»</button>
                </div>
            )}
            <div className="customer-qna-search">
                <input
                    type="text" id="search"
                    placeholder="검색어를 입력해주세요"
                    value={searchKeyword}
                    onChange={(e) => {
                        setSearchKeyword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSearch();
                        }
                    }}
                />
                <button className="customer-qna-search-btn" onClick={handleSearch}>검색</button>
            </div>
        </div>
    );
};

export default QnAList;
