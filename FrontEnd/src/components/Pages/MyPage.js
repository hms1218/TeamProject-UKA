import { useState } from 'react';
import MyInfo from './MyInfo';
import MyActivity from './MyActivity';
import MySettings from './MySettings';

import './MyPage.css';

const calcDaysSince = (dateString) => {
    const created = new Date(dateString);
    const today = new Date();
    const diffTime = today - created;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

const MyPage = () => {
    const user = JSON.parse(localStorage.getItem('user'));
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

    const daysActive = calcDaysSince(user.createdAt);

    return (
        <div className="mypage-container">
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
                                    <span className="stat-number">-</span>
                                    <span className="stat-label">작성글 수</span>
                                </div>
                                <div className="stat-divider"></div>
                                <div className="stat-item">
                                    <span className="stat-number">-</span>
                                    <span className="stat-label">좋아요 한 게시물 수</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mypage-main">
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
                <div className="main-content">
                    {activeTab === 'info' && <MyInfo user={user} daysActive={daysActive} />}
                    {activeTab === 'activity' && <MyActivity />}
                    {activeTab === 'settings' && <MySettings />}
                </div>
            </div>
        </div>
    );
};

export default MyPage;