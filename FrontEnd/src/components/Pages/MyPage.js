
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../AuthContext';
import './MyPage.css';

// Mock AuthContext for demo
const AuthContext = {
    user: {
        userId: 'user123',
        nickname: '멋진사용자',
        email: 'user@example.com',
        joinDate: '2024-01-15',
        profileImage: null
    }
};

const MyPage = () => {
    const user = {
        userId: 'user123',
        nickname: '멋진사용자',
        email: 'user@example.com',
        joinDate: '2024-01-15',
        profileImage: null
    };

    const [activeTab, setActiveTab] = useState('info');

    if (!user) {
        return (
            <div className="mypage-container">
                <div className="login-required">
                    <div className="login-icon">🔒</div>
                    <h2>로그인이 필요합니다</h2>
                    <p>마이페이지를 이용하려면 먼저 로그인해주세요.</p>
                    <button className="login-btn">로그인하기</button>
                </div>
            </div>
        );
    }

    const menuItems = [
        { id: 'info', label: '내 정보', icon: '👤' },
        { id: 'activity', label: '활동 내역', icon: '📊' },
        { id: 'settings', label: '설정', icon: '⚙️' }
    ];

    return (
        <div className="mypage-container">
            {/* 프로필 헤더 */}
            <div className="profile-header">
                <div className="profile-background">
                    <div className="profile-content">
                        <div className="profile-avatar">
                            {user.profileImage ? (
                                <img src={user.profileImage} alt="프로필" />
                            ) : (
                                <div className="avatar-placeholder">
                                    <span>{user.nickname.charAt(0)}</span>
                                </div>
                            )}
                            <div className="avatar-badge">✨</div>
                        </div>
                        <div className="profile-info">
                            <h1 className="profile-name">{user.nickname}</h1>
                            <div className="profile-stats">
                                <div className="stat-item">
                                    <span className="stat-number">128</span>
                                    <span className="stat-label">활동일</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-number">24</span>
                                    <span className="stat-label">작성글 수</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-number">152</span>
                                    <span className="stat-label">좋아요 한 게시물 수</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="mypage-main">
                {/* 사이드 메뉴 */}
                <div className="sidebar">
                    <nav className="sidebar-nav">
                        {menuItems.map(item => (
                            <button
                                key={item.id}
                                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(item.id)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="nav-label">{item.label}</span>
                                {activeTab === item.id && <div className="nav-indicator"></div>}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* 콘텐츠 영역 */}
                <div className="main-content">
                    {activeTab === 'info' && (
                        <div className="content-section">
                            <div className="section-header">
                                <h2>내 정보</h2>
                                <p>계정 정보를 확인하고 수정할 수 있습니다</p>
                            </div>

                            <div className="info-cards">
                                <div className="info-card">
                                    <div className="card-header">
                                        <div className="card-icon">📧</div>
                                        <h3>이메일</h3>
                                    </div>
                                    <div className="card-content">
                                        <p className="card-value">{user.email}</p>
                                        <p className="card-status verified">✓ 인증됨</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="card-header">
                                        <div className="card-icon">🆔</div>
                                        <h3>사용자 ID</h3>
                                    </div>
                                    <div className="card-content">
                                        <p className="card-value">{user.userId}</p>
                                        <p className="card-status">변경 불가</p>
                                    </div>
                                </div>

                                <div className="info-card">
                                    <div className="card-header">
                                        <div className="card-icon">📅</div>
                                        <h3>가입일</h3>
                                    </div>
                                    <div className="card-content">
                                        <p className="card-value">{user.joinDate}</p>
                                        <p className="card-status">함께한 지 128일</p>
                                    </div>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button className="action-btn primary">
                                    <span>✏️</span>
                                    정보 수정
                                </button>
                                <button className="action-btn secondary">
                                    <span>🔐</span>
                                    비밀번호 변경
                                </button>
                                <button className="action-btn danger">
                                    <span>🗑️</span>
                                    계정 삭제
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="content-section">
                            <div className="section-header">
                                <h2>활동 내역</h2>
                                <p>작성한 글, 댓글, 좋아요 내역을 확인하세요</p>
                            </div>

                            <div className="activity-lists">
                                <div className="activity-list-section">
                                    <h3>📝 내가 작성한 글 (24개)</h3>
                                    <div className="post-list">
                                        {[
                                            { title: 'React Hook 사용법에 대한 정리', date: '2024-07-30', views: 156, likes: 12 },
                                            { title: '자바스크립트 ES6 새로운 기능들', date: '2024-07-28', views: 203, likes: 18 },
                                            { title: 'CSS Grid vs Flexbox 비교 분석', date: '2024-07-25', views: 89, likes: 7 },
                                            { title: 'Node.js Express 서버 구축하기', date: '2024-07-22', views: 134, likes: 15 },
                                            { title: 'TypeScript 기초부터 활용까지', date: '2024-07-20', views: 67, likes: 9 }
                                        ].map((post, index) => (
                                            <div key={index} className="list-item post-item">
                                                <div className="item-content">
                                                    <h4 className="item-title">{post.title}</h4>
                                                    <div className="item-meta">
                                                        <span className="item-date">{post.date}</span>
                                                        <span className="item-stats">조회 {post.views} · 좋아요 {post.likes}</span>
                                                    </div>
                                                </div>
                                                <div className="item-action">
                                                    <button className="view-btn">보기</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="activity-list-section">
                                    <h3>💬 내가 작성한 댓글 (87개)</h3>
                                    <div className="comment-list">
                                        {[
                                            { content: '정말 유용한 정보네요! 감사합니다.', post: 'Python 기초 문법 정리', date: '2024-07-30' },
                                            { content: '저도 비슷한 경험이 있어서 공감됩니다. 좋은 글 잘 읽었습니다.', post: '프론트엔드 개발자 취업 후기', date: '2024-07-29' },
                                            { content: '코드 예시가 정말 이해하기 쉽게 되어있네요!', post: 'JavaScript 비동기 처리', date: '2024-07-28' },
                                            { content: '질문이 있는데, 이 방법 외에 다른 해결책도 있을까요?', post: 'React 상태 관리 패턴', date: '2024-07-27' },
                                            { content: '따라해보니 정말 잘 되네요. 감사합니다!', post: 'Git 브랜치 전략', date: '2024-07-26' }
                                        ].map((comment, index) => (
                                            <div key={index} className="list-item comment-item">
                                                <div className="item-content">
                                                    <p className="comment-text">"{comment.content}"</p>
                                                    <div className="item-meta">
                                                        <span className="comment-post">게시글: {comment.post}</span>
                                                        <span className="item-date">{comment.date}</span>
                                                    </div>
                                                </div>
                                                <div className="item-action">
                                                    <button className="view-btn">보기</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="activity-list-section">
                                    <h3>❤️ 좋아요 누른 게시물 (152개)</h3>
                                    <div className="liked-list">
                                        {[
                                            { title: 'Vue.js 3.0의 새로운 기능들', author: '개발자김씨', date: '2024-07-30', likes: 45 },
                                            { title: '효율적인 코드 리뷰 방법', author: '시니어개발자', date: '2024-07-29', likes: 62 },
                                            { title: 'Docker 컨테이너 최적화 팁', author: '데브옵스전문가', date: '2024-07-28', likes: 38 },
                                            { title: '알고리즘 문제 해결 전략', author: '코딩마스터', date: '2024-07-27', likes: 71 },
                                            { title: 'REST API 설계 가이드라인', author: '백엔드개발자', date: '2024-07-26', likes: 29 }
                                        ].map((liked, index) => (
                                            <div key={index} className="list-item liked-item">
                                                <div className="item-content">
                                                    <h4 className="item-title">{liked.title}</h4>
                                                    <div className="item-meta">
                                                        <span className="item-author">작성자: {liked.author}</span>
                                                        <span className="item-date">{liked.date}</span>
                                                        <span className="item-likes">좋아요 {liked.likes}</span>
                                                    </div>
                                                </div>
                                                <div className="item-action">
                                                    <button className="unlike-btn">❤️</button>
                                                    <button className="view-btn">보기</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="content-section">
                            <div className="section-header">
                                <h2>설정</h2>
                                <p>개인화 설정을 관리하세요</p>
                            </div>

                            <div className="settings-groups">
                                <div className="settings-group">
                                    <h3>알림 설정</h3>
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <span className="setting-name">이메일 알림</span>
                                            <span className="setting-desc">중요한 알림을 이메일로 받기</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <span className="setting-name">푸시 알림</span>
                                            <span className="setting-desc">실시간 알림 받기</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <div className="settings-group">
                                    <h3>개인화</h3>
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <span className="setting-name">다크 모드</span>
                                            <span className="setting-desc">어두운 테마 사용</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                    <div className="setting-item">
                                        <div className="setting-info">
                                            <span className="setting-name">프로필 공개</span>
                                            <span className="setting-desc">다른 사용자에게 프로필 공개</span>
                                        </div>
                                        <label className="toggle">
                                            <input type="checkbox" defaultChecked />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPage;