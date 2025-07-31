
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
                            <p className="profile-id">@{user.userId}</p>
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
                                <p>최근 활동과 통계를 확인하세요</p>
                            </div>

                            <div className="activity-grid">
                                <div className="activity-card">
                                    <div className="activity-icon">🎯</div>
                                    <h3>오늘의 목표</h3>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: '75%' }}></div>
                                    </div>
                                    <p>75% 달성</p>
                                </div>

                                <div className="activity-card">
                                    <div className="activity-icon">🔥</div>
                                    <h3>연속 접속</h3>
                                    <div className="streak-number">15</div>
                                    <p>일 연속</p>
                                </div>

                                <div className="activity-card">
                                    <div className="activity-icon">📈</div>
                                    <h3>이번 주</h3>
                                    <div className="week-chart">
                                        {[40, 80, 60, 90, 70, 85, 95].map((height, index) => (
                                            <div
                                                key={index}
                                                className="chart-bar"
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="recent-activities">
                                <h3>최근 활동</h3>
                                <div className="activity-list">
                                    {[
                                        { time: '2시간 전', action: '새 글 작성', icon: '📝' },
                                        { time: '5시간 전', action: '댓글 등록', icon: '💬' },
                                        { time: '1일 전', action: '프로필 수정', icon: '✏️' },
                                        { time: '3일 전', action: '설정 변경', icon: '⚙️' }
                                    ].map((activity, index) => (
                                        <div key={index} className="activity-item">
                                            <div className="activity-time">{activity.time}</div>
                                            <div className="activity-detail">
                                                <span className="activity-action-icon">{activity.icon}</span>
                                                <span className="activity-action">{activity.action}</span>
                                            </div>
                                        </div>
                                    ))}
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