import React, { useState } from 'react';

const MyInfo = ({ user, daysActive }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [nickname, setNickname] = useState(user.nickname);
    const [inputValue, setInputValue] = useState(user.nickname);

    // 닉네임 저장 (여기선 localStorage만 반영, 실제는 API 요청으로 대체)
    const handleSave = () => {
        // 실제 서버라면 fetch/axios 등으로 API 요청 보내기!
        const newUser = { ...user, nickname: inputValue };
        localStorage.setItem('user', JSON.stringify(newUser));
        setNickname(inputValue);
        setEditOpen(false);
        window.location.reload(); // MyPage 상단 닉네임 등 갱신 (실제로는 state lifting 추천)
    };

    return (
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
                        <p className="card-status">함께한 지 {daysActive}일</p>
                    </div>
                </div>
            </div>
            <div className="action-buttons">
                <button className="action-btn primary" onClick={() => setEditOpen(true)}>
                    <span>✏️</span>정보 수정
                </button>
                <button className="action-btn secondary">
                    <span>🔐</span>비밀번호 변경
                </button>
                <button className="action-btn danger">
                    <span>🗑️</span>계정 삭제
                </button>
            </div>

            {editOpen && (
                <Modal onClose={() => setEditOpen(false)}>
                    <h2>닉네임 수정</h2>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        maxLength={20}
                        style={{ width: '100%', padding: '8px', margin: '10px 0' }}
                    />
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                        <button onClick={() => setEditOpen(false)}>취소</button>
                        <button
                            onClick={handleSave}
                            disabled={!inputValue.trim() || inputValue === nickname}
                        >
                            저장
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

// 기본 Modal 컴포넌트 예시 (위 코드에서 그대로 사용)
const Modal = ({ children, onClose }) => (
    <div className="modal-backdrop">
        <div className="modal">
            {children}
        </div>
        <div className="modal-bg" onClick={onClose}></div>
    </div>
);

export default MyInfo;
