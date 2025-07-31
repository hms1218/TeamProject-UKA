import React, { useState } from 'react';
import './MyInfo.css';

const MyInfo = ({ user, daysActive }) => {
    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [nickname, setNickname] = useState(user?.nickname || '사용자');
    const [inputValue, setInputValue] = useState(user?.nickname || '사용자');
    
    // 비밀번호 변경 상태
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordErrors, setPasswordErrors] = useState({});

    // 닉네임 저장
    const handleSave = () => {
        const newUser = { ...user, nickname: inputValue };
        // localStorage.setItem('user', JSON.stringify(newUser));
        setNickname(inputValue);
        setEditOpen(false);
        // window.location.reload();
    };

    // 비밀번호 폼 입력 처리
    const handlePasswordChange = (field, value) => {
        setPasswordForm(prev => ({
            ...prev,
            [field]: value
        }));
        
        // 실시간 유효성 검사
        if (field === 'confirmPassword' || field === 'newPassword') {
            setPasswordErrors(prev => ({
                ...prev,
                confirmPassword: ''
            }));
        }
    };

    // 비밀번호 변경 저장
    const handlePasswordSave = () => {
        const errors = {};
        
        if (!passwordForm.currentPassword) {
            errors.currentPassword = '현재 비밀번호를 입력해주세요.';
        }
        
        if (!passwordForm.newPassword) {
            errors.newPassword = '새 비밀번호를 입력해주세요.';
        } else if (passwordForm.newPassword.length < 8) {
            errors.newPassword = '비밀번호는 8자 이상이어야 합니다.';
        }
        
        if (!passwordForm.confirmPassword) {
            errors.confirmPassword = '새 비밀번호를 다시 입력해주세요.';
        } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            errors.confirmPassword = '새 비밀번호가 일치하지 않습니다.';
        }

        if (passwordForm.currentPassword === passwordForm.newPassword) {
            errors.newPassword = '현재 비밀번호와 동일합니다.';
        }

        setPasswordErrors(errors);

        if (Object.keys(errors).length === 0) {
            // API 호출 로직 추가
            console.log('비밀번호 변경 요청:', passwordForm);
            setPasswordOpen(false);
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            alert('비밀번호가 성공적으로 변경되었습니다.');
        }
    };

    // 모달 닫기 시 초기화
    const closePasswordModal = () => {
        setPasswordOpen(false);
        setPasswordForm({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
        setPasswordErrors({});
    };

    const closeEditModal = () => {
        setEditOpen(false);
        setInputValue(nickname);
    };

    return (
        <div className="myinfo-container">
            <div className="myinfo-section-header">
                <h2 className="myinfo-title">내 정보</h2>
                <p className="myinfo-subtitle">계정 정보를 확인하고 수정할 수 있습니다</p>
            </div>
            
            <div className="myinfo-info-cards">
                <div className="myinfo-info-card">
                    <div className="myinfo-card-header">
                        <div className="myinfo-card-icon">📧</div>
                        <h3 className="myinfo-card-title">이메일</h3>
                    </div>
                    <div className="myinfo-card-content">
                        <p className="myinfo-card-value">{user?.email || 'user@example.com'}</p>
                        <p className="myinfo-card-status verified">✓ 인증됨</p>
                    </div>
                </div>
                
                <div className="myinfo-info-card">
                    <div className="myinfo-card-header">
                        <div className="myinfo-card-icon">🆔</div>
                        <h3 className="myinfo-card-title">사용자 ID</h3>
                    </div>
                    <div className="myinfo-card-content">
                        <p className="myinfo-card-value">{user?.userId || 'user123'}</p>
                        <p className="myinfo-card-status">변경 불가</p>
                    </div>
                </div>
                
                <div className="myinfo-info-card">
                    <div className="myinfo-card-header">
                        <div className="myinfo-card-icon">📅</div>
                        <h3 className="myinfo-card-title">가입일</h3>
                    </div>
                    <div className="myinfo-card-content">
                        <p className="myinfo-card-status">함께한 지 {daysActive || 30}일</p>
                    </div>
                </div>
            </div>
            
            <div className="myinfo-action-buttons">
                <button 
                    className="myinfo-action-btn primary" 
                    onClick={() => setEditOpen(true)}
                >
                    <span className="myinfo-btn-icon">✏️</span>정보 수정
                </button>
                <button 
                    className="myinfo-action-btn secondary"
                    onClick={() => setPasswordOpen(true)}
                >
                    <span className="myinfo-btn-icon">🔐</span>비밀번호 변경
                </button>
                <button className="myinfo-action-btn danger">
                    <span className="myinfo-btn-icon">🗑️</span>계정 삭제
                </button>
            </div>

            {/* 닉네임 수정 모달 */}
            {editOpen && (
                <Modal onClose={closeEditModal} title="닉네임 수정">
                    <div className="modal-content">
                        <div className="input-group">
                            <label className="label">새 닉네임</label>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                maxLength={20}
                                className="input"
                                placeholder="닉네임을 입력하세요"
                            />
                            <div className="input-helper">
                                {inputValue.length}/20
                            </div>
                        </div>
                        <div className="modal-buttons">
                            <button 
                                onClick={closeEditModal}
                                className="modal-btn cancel"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!inputValue.trim() || inputValue === nickname}
                                className={`modal-btn save ${(!inputValue.trim() || inputValue === nickname) ? 'disabled' : ''}`}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            {/* 비밀번호 변경 모달 */}
            {passwordOpen && (
                <Modal onClose={closePasswordModal} title="비밀번호 변경">
                    <div className="modal-content">
                        <div className="input-group">
                            <label className="label">현재 비밀번호</label>
                            <input
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={e => handlePasswordChange('currentPassword', e.target.value)}
                                className={`input ${passwordErrors.currentPassword ? 'error' : ''}`}
                                placeholder="현재 비밀번호를 입력하세요"
                            />
                            {passwordErrors.currentPassword && (
                                <div className="error-text">{passwordErrors.currentPassword}</div>
                            )}
                        </div>
                        
                        <div className="input-group">
                            <label className="label">새 비밀번호</label>
                            <input
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={e => handlePasswordChange('newPassword', e.target.value)}
                                className={`input ${passwordErrors.newPassword ? 'error' : ''}`}
                                placeholder="새 비밀번호를 입력하세요 (8자 이상)"
                            />
                            {passwordErrors.newPassword && (
                                <div className="error-text">{passwordErrors.newPassword}</div>
                            )}
                        </div>
                        
                        <div className="input-group">
                            <label className="label">새 비밀번호 확인</label>
                            <input
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={e => handlePasswordChange('confirmPassword', e.target.value)}
                                className={`input ${passwordErrors.confirmPassword ? 'error' : ''}`}
                                placeholder="새 비밀번호를 다시 입력하세요"
                            />
                            {passwordErrors.confirmPassword && (
                                <div className="error-text">{passwordErrors.confirmPassword}</div>
                            )}
                        </div>
                        
                        <div className="password-helper">
                            <div className="helper-item">
                                <span className={passwordForm.newPassword.length >= 8 ? 'check-icon' : 'uncheck-icon'}>
                                    {passwordForm.newPassword.length >= 8 ? '✓' : '○'}
                                </span>
                                8자 이상
                            </div>
                            <div className="helper-item">
                                <span className={passwordForm.newPassword && passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword ? 'check-icon' : 'uncheck-icon'}>
                                    {passwordForm.newPassword && passwordForm.confirmPassword && passwordForm.newPassword === passwordForm.confirmPassword ? '✓' : '○'}
                                </span>
                                비밀번호 일치
                            </div>
                        </div>
                        
                        <div className="modal-buttons">
                            <button 
                                onClick={closePasswordModal}
                                className="modal-btn cancel"
                            >
                                취소
                            </button>
                            <button
                                onClick={handlePasswordSave}
                                className="modal-btn save"
                            >
                                변경
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

// Modal 컴포넌트
const Modal = ({ children, onClose, title }) => (
    <div className="modal-backdrop">
        <div className="modal">
            <div className="modal-header">
                <h3 className="modal-title">{title}</h3>
                <button 
                    onClick={onClose} 
                    className="close-btn"
                    aria-label="닫기"
                >
                    ✕
                </button>
            </div>
            {children}
        </div>
    </div>
);

export default MyInfo;