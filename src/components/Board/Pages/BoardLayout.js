import { Outlet, NavLink} from 'react-router-dom';
import './BoardLayout.css';

const BoardLayout = ({children}) => {

    return (
        <div className="board-layout">
            {/* 헤더 */}
            <div className="board-header-container">
                <div className="board-header-left">
                    <h1 className="board-title">게시판</h1>
                </div>
            <div className="board-header-center">
                <input
                    className="board-search-input"
                    type="text"
                    placeholder="검색"
                />
                <button className="board-search-button">
                🔍
                </button>
            </div>
            <div className="board-header-right">
            
            </div>
            {children}
        
        </div>

        {/* 탭 메뉴 */}
        <nav className="mini-tab-bar">
            <NavLink
                to="/board/chat"
                className={({ isActive }) => isActive ? 'active' : ''}
            >
            잡담
            </NavLink>
            <NavLink
                to="/board/adoptionReview"
                className={({ isActive }) => isActive ? 'active' : ''}
            >
            입양후기
            </NavLink>
            <NavLink
                to="/board/infoShare"
                className={({ isActive }) => isActive ? 'active' : ''}
            >
            정보공유
            </NavLink>
            <NavLink
                to="/board/etc"
                className={({ isActive }) => isActive ? 'active' : ''}
            >
            잡다한것
            </NavLink>
        </nav>

        {/* 라우트 출력 영역 */}
        <main className="board-content">
            <Outlet />
        </main>
        </div>
    );
}

export default BoardLayout;