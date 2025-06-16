// src/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { getMe } from './api/auth';

export const AuthContext = createContext({
    user: null,
    setUser: () => {},
    logout: () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [initializing, setInitializing] = useState(true);  // 초기 로딩 플래그

    // 페이지 새로고침해도 로그인 유지
    useEffect(() => {
        // 1) 앱 시작 시 토큰이 남아 있으면 /me 호출
        const initAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const me = await getMe();   // /api/auth/me
                    setUser(me);
                } catch (err) {
                    // 토큰이 만료되었거나 유효하지 않으면 제거
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setInitializing(false);
            };
            
        initAuth();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    if (initializing) {
        return <div>로딩 중...</div>;
    }
    
    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
