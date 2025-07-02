import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { signup } from '../../api/auth';

import MainLogo from '../../assets/MainLogo.png';

import './Auth.css';

function validate(form) {
    // 아이디: 6~16글자, 영문/숫자만(특수문자 불가)
    if (!form.userId.trim()) return "아이디를 입력하세요.";
    if (form.userId.length <= 6 || form.userId.length >= 16) return "아이디는 6~16자여야 합니다.";
    if (!/^[a-zA-Z0-9]+$/.test(form.userId)) return "아이디는 영문과 숫자만 가능합니다.";

    // 닉네임: 6~16글자, 한글/영문/숫자만(특수문자 불가)
    if (!form.nickname.trim()) return "닉네임을 입력하세요.";
    if (form.nickname.length <= 6 || form.nickname.length >= 16) return "닉네임은 6~16자여야 합니다.";
    if (!/^[가-힣a-zA-Z0-9]+$/.test(form.nickname)) return "닉네임은 한글, 영문, 숫자만 가능합니다.";

    // 비밀번호: 8자리 이상, 영문/숫자/특수문자 모두 포함, 공백 금지
    if (!form.password) return "비밀번호를 입력하세요.";
    if (form.password.length <= 8) return "비밀번호는 8자리 이상이어야 합니다.";
    if (!/[A-Za-z]/.test(form.password) || !/\d/.test(form.password) || !/[~!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]/.test(form.password)) {
        return "비밀번호는 영문, 숫자, 특수문자를 모두 포함해야 합니다.";
    }
    if (/\s/.test(form.password)) return "비밀번호에 공백은 사용할 수 없습니다.";

    // 아이디-비밀번호 동일 금지
    if (form.userId === form.password) return "아이디와 비밀번호가 같을 수 없습니다.";

    // 비밀번호 확인
    if (form.password !== form.passwordCheck) return "비밀번호가 일치하지 않습니다.";

    // 이메일: 입력 및 길이(최대 50자 제한 예시)
    if (!form.emailId.trim()) return "이메일을 입력하세요.";
    if (form.emailId.length >= 30) return "이메일 아이디는 30자 이하로 입력하세요.";
    if (form.emailDomain === "custom" && !form.customDomain.trim()) return "이메일 도메인을 입력하세요.";
    const email = form.emailDomain === 'custom'
        ? `${form.emailId}@${form.customDomain}`
        : `${form.emailId}@${form.emailDomain}`;
    if (email.length >= 50) return "이메일은 50자 이하로 입력하세요.";
    if (!/^[\w.\-]+@[\w.\-]+\.\w+$/.test(email)) return "유효한 이메일 주소를 입력하세요.";

    // 통과!
    return null;
}

export default function SignupPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        userId: '', 
        nickname: '',
        password: '', 
        passwordCheck: '', 
        emailId: '', 
        emailDomain: 'naver.com', 
        customDomain: '' 
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDomainChange = (e) => {
        setForm({ ...form, emailDomain: e.target.value, customDomain: '' });
    };

    // 1. 유효성 검사 실행!
    // const errorMsg = validate(form);
    // if (errorMsg) {
    //     setError(errorMsg);
    //     return;
    // }

    const handleSubmit = async e => {
        e.preventDefault();
        const email = form.emailDomain === 'custom'
                ? `${form.emailId}@${form.customDomain}`
                : `${form.emailId}@${form.emailDomain}`;
        try {
            await signup({ ...form, email });
            navigate('/login');
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || '회원가입 실패');
        }
    };

    return (
        <>
            <div className="auth-container">
                <img
                    src={MainLogo}
                    alt="회원가입"
                    className="main-logo"
                    style={{ 
                        display: "block", 
                        margin: "0 auto 1.5rem auto", 
                        maxWidth: "300px", 
                        cursor: "pointer",
                    }}
                    onClick={() => navigate('/')}
                />
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <label>
                        아이디
                        <input
                            type="text"
                            name="userId"
                            value={form.userId}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        닉네임
                        <input
                            type="text"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        비밀번호
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        비밀번호 확인
                        <input
                            type="password"
                            name="passwordCheck"
                            value={form.passwordCheck}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        이메일
                        <div className="email-group">
                            <input
                                type="text"
                                name="emailId"
                                placeholder="이메일"
                                value={form.emailId}
                                onChange={handleChange}
                                required
                                className="email-id"
                            />
                            <span className="email-at">@</span>
                            {form.emailDomain === 'custom' ? (
                                <input
                                    type="text"
                                    name="customDomain"
                                    placeholder="직접입력"
                                    value={form.customDomain}
                                    onChange={handleChange}
                                    required
                                    className="email-domain"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={form.emailDomain}
                                    disabled
                                    className="email-domain"
                                />
                            )}
                            <select name="emailDomain" value={form.emailDomain} onChange={handleDomainChange} className="email-select">
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="custom">직접입력</option>
                            </select>
                        </div>
                    </label>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        <p style={{textAlign : 'center'}}>ⓒ 2025 멍냥입양소. All rights reserved.</p>
        </>

    );
}
