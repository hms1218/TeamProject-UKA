import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

const now = new Date();

const initialNotice = [
    { id: 1, title: '최신 공지사항1', author: '관리자', content: '공지사항1', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 5) }, //5분전
    { id: 2, title: '최신 공지사항2', author: '관리자', content: '공지사항2', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 4) }, //4분전
    { id: 3, title: '최신 공지사항3', author: '관리자', content: '공지사항3', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 15) }, //15분전
    { id: 4, title: '최신 공지사항4', author: '관리자', content: '공지사항4', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 60) }, //60분전
];

const initialChatList = [
    { id: 1, title: '자유1', author: '사람1', content: '자유게시판1', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 5) },
    { id: 2, title: '게시판2', author: '사람2', content: '자유게시판2', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 7) },
    { id: 3, title: '수3', author: '사람3', content: '자유게시판3', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 15) },
    { id: 4, title: '근4', author: '사람3', content: '자유게시판4', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 88) },
    { id: 5, title: '수5', author: '사람3', content: '자유게시판5', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 10) },
    { id: 6, title: '근6', author: '사람3', content: '자유게시판6', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 80) },
    { id: 7, title: '수7', author: '사람3', content: '자유게시판7', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 39) },
    { id: 8, title: '속8', author: '사람3', content: '자유게시판8', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 200) },
    { id: 9, title: '닥9', author: '사람3', content: '자유게시판9', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 104) },
    { id: 10, title: '속10', author: '사람3', content: '자유게시판10', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 51) },
    { id: 11, title: '닥11', author: '사람3', content: '자유게시판11', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 95) },
]

const initialReviewList = [
    { id: 1, title: '입양1', author: '사람1', content: '입양후기1', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 9) },
    { id: 2, title: '후기2', author: '사람2', content: '입양후기2', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 4) },
    { id: 3, title: '입양3', author: '사람3', content: '입양후기3', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 5) },
    { id: 4, title: '입양4', author: '사람3', content: '입양후기4', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 36) },
    { id: 5, title: '입양5', author: '사람3', content: '입양후기5', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 39) },
    { id: 6, title: '입양6', author: '사람3', content: '입양후기6', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 3) },
    { id: 7, title: '입양7', author: '사람3', content: '입양후기7', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 19) },
    { id: 8, title: '후기8', author: '사람3', content: '입양후기8', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 306) },
    { id: 9, title: '후기9', author: '사람3', content: '입양후기9', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 22) },
    { id: 10, title: '후기10', author: '사람3', content: '입양후기10', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 99) },
    { id: 11, title: '후기11', author: '사람3', content: '입양후기11', isSecret: false, createdAt: new Date(now.getTime() - 1000 * 60 * 103) },
]

export const ChatProvider = ({ children }) => {
    const [notice, setNotice] = useState(initialNotice);
    const [chats, setChats] = useState(initialChatList);
    const [review, setReview] = useState(initialReviewList);
    return <ChatContext.Provider value={{ notice, setNotice, chats, setChats, review, setReview }}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
