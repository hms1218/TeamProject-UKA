import api from './index.js';

export async function signup({ username, email, password }) {
    const res = await fetch("http://localhost:8888/api/auth/signup", {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username,
            email,
            password 
        })
    });

    const body = await res.json();
    if (!res.ok) {
        // 백엔드가 내려준 에러 메시지를 포함한 ErrorResponse 객체에서 message 꺼내 던지기
        throw new Error(body.message || `Signup failed: ${res.status}`);
    }

    const user = await res.json();
    return user;
}

export async function login({ email, password }) {
    const res = await fetch("http://localhost:8888/api/auth/login", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ 
            email, 
            password 
        })
    });

    const body = await res.json();
    if (!res.ok) {
        throw new Error(body.message || '로그인 실패');
    }

    localStorage.setItem('token', body.token);
    return body;  // 토큰과 유저를 함께 반환
}

export async function getMe() {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('로그인 토큰이 없습니다.');
    }

    const res = await fetch('http://localhost:8888/api/auth/me', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    });

    const body = await res.json();
    if (!res.ok) {
        throw new Error(body.message || `회원 정보 조회 실패: ${res.status}`);
    }

    return body;  // { id, username, email, createdAt }
}
