import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FindIdPage() {
    const [email, setEmail] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        setError(''); setResult(null);
        try {
            const res = await fetch('/api/auth/find-username', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({ email })
            });
            const body = await res.json();
            if (!res.ok) throw new Error(body.message);
            setResult(body.username);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <h2>아이디(이메일) 찾기</h2>
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
                <button type="submit">찾기</button>
            </form>
            { result && <p>고객님의 아이디(이메일): <strong>{result}</strong></p> }
            { error && <p className="error">{error}</p> }
            <button onClick={()=>navigate('/login')}>로그인으로 돌아가기</button>
        </div>
    );
}
