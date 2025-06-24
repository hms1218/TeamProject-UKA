import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/auth';
import { AuthContext } from '../../AuthContext';

import './Auth.css';

export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { setUser } = useContext(AuthContext);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { token, user } = await login(form);
            setUser(user);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || '로그인 실패');
        }
    };
    return (
        <div className="auth-container">
            <h2>로그인</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <label>
                    이메일
                    <input
                        type="email"
                        name="email"
                        value={form.email}
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
                <button type="submit">로그인</button>
                <div className="find-links">
                    <Link to="/find-id">아이디(이메일) 찾기</Link>
                    <span> | </span>
                    <Link to="/find-password">비밀번호 찾기</Link>
                </div>
                <Link style={{textDecoration : 'none'}}>아이디가 없으신가요?</Link>
            </form>
        </div>
    );
}
