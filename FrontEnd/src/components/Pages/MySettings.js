import React from 'react';

const MySettings = () => (
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
);

export default MySettings;
