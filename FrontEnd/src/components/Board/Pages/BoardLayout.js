import { Outlet, NavLink} from 'react-router-dom';
import './BoardLayout.css';

const BoardLayout = () => {

    return (
        <div className="board-layout">
            {/* 헤더 */}
            <div className="board-header-container">
                <div className="board-header-left">
                    <h1 className="board-title">게시판</h1>
                </div>
            <div className="board-header-right">
                
            </div>       
        </div>

        {/* 탭 메뉴 */}
        <nav className="mini-tab-bar">
            <NavLink
                to="/board" end
                className={({ isActive }) => isActive ? 'active' : ''}
            >
            전체게시판
            </NavLink>
            <NavLink
                to="/board/notice"
                className={({ isActive }) => isActive ? 'active' : ''}
            >
            공지사항
            </NavLink>
            <NavLink
                to="/board/chat"
                className={({ isActive }) => isActive ? 'active' : ''}
            >
            속닥속닥
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
            새끼분양
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