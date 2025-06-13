import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

const initialNotice = [
    { id: 1, title: '최신 공지사항1', author: '관리자', content: '공지사항', isSecret: false },
    { id: 2, title: '최신 공지사항2', author: '관리자', content: '공지사항', isSecret: false },
    { id: 3, title: '최신 공지사항3', author: '관리자', content: '공지사항', isSecret: false },
    { id: 4, title: '최신 공지사항4', author: '관리자', content: '공지사항', isSecret: false },
];

const initialChatList = [
    { id: 1, title: '자유1', author: '사람1', content: '자유게시판', isSecret: false },
    { id: 2, title: '게시판2', author: '사람2', content: '자유게시판', isSecret: false },
    { id: 3, title: '수3', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 4, title: '근4', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 5, title: '수5', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 6, title: '근6', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 7, title: '수7', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 8, title: '속8', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 9, title: '닥9', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 10, title: '속10', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 11, title: '닥11', author: '사람3', content: '자유게시판', isSecret: false },
]

const initialReviewList = [
    { id: 1, title: '입양1', author: '사람1', content: '자유게시판', isSecret: false },
    { id: 2, title: '후기2', author: '사람2', content: '자유게시판', isSecret: false },
    { id: 3, title: '입양3', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 4, title: '입양4', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 5, title: '입양5', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 6, title: '입양6', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 7, title: '입양7', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 8, title: '후기8', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 9, title: '후기9', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 10, title: '후기10', author: '사람3', content: '자유게시판', isSecret: false },
    { id: 11, title: '후기11', author: '사람3', content: '자유게시판', isSecret: false },
]

export const ChatProvider = ({ children }) => {
    const [notice, setNotice] = useState(initialNotice);
    const [chats, setChats] = useState(initialChatList);
    const [review, setReview] = useState(initialReviewList);
    return <ChatContext.Provider value={{ notice, setNotice, chats, setChats, review, setReview }}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
