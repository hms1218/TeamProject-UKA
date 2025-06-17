import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../api/auth';

import './Auth.css';

export default function SignupPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await signup(form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || '회원가입 실패');
        }
    };

    return (
        <div className="auth-container">
            <h2>회원가입</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <label>
                    사용자 이름
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </label>
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
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}
