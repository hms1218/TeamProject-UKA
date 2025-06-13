import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

const initialQnAs = [
    { id: 1, title: '최신 공지사항', author: '관리자', content: '공지사항', isSecret: false },
    { id: 2, title: '최신 공지사항', author: '관리자', content: '공지사항', isSecret: false },
    { id: 3, title: '최신 공지사항', author: '관리자', content: '공지사항', isSecret: false },
];

export const ChatProvider = ({ children }) => {
    const [qnas, setQnas] = useState(initialQnAs);
    return <ChatContext.Provider value={{ qnas, setQnas }}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
