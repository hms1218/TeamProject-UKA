// src/pages/FindPasswordPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindPasswordPage() {
    const [email, setEmail] = useState('');
    const [info, setInfo] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
            e.preventDefault();
            setError(''); setInfo('');
            try {
                const res = await fetch('/api/auth/reset-password-request', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({ email })
                });
                const body = await res.json();
                if (!res.ok) throw new Error(body.message);
                setInfo('비밀번호 재설정 링크가 이메일로 발송되었습니다.');
            } catch (err) {
                setError(err.message);
            }
    };

    return (
        <div className="auth-container">
            <h2>비밀번호 찾기</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    등록된 이메일
                    <input
                        type="email"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        required 
                    />
                </label>
                <button type="submit">링크 발송</button>
            </form>
            { info && <p className="info">{info}</p> }
            { error && <p className="error">{error}</p> }
            <button onClick={()=>navigate('/login')}>로그인으로 돌아가기</button>
        </div>
    );
}
