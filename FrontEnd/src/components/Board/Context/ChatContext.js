import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();
const now = new Date();
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let postIdCounter = 1;

const generatePost = (baseTitle, author, baseContent, isSecret = false) => {
    const minutesAgo = getRandomInt(1, 10000);
    const date = new Date(now.getTime() - 1000 * 60 * minutesAgo);
    const id = postIdCounter++;

    const randomNumTitle = getRandomInt(1, 100);
    const randomNumContent = getRandomInt(1, 1000);

    const title = `${baseTitle}${randomNumTitle}`;
    const content = `${baseContent}${randomNumContent}`;

    return{
        id,
        title,
        author,
        comment: getRandomInt(0, 1000),
        views: getRandomInt(1, 20000),
        likes: getRandomInt(0, 5000),
        content,
        isSecret,
        ...(isSecret && { password: "1234" }),
        createdAt: date,
    }
};

const initialNotice = Array.from({ length: 4 }, () =>
    generatePost('최신 공지사항', '관리자', '공지사항')
);

const publicChats = Array.from({ length: 15 }, () =>
    generatePost('속닥', '속닥맨', '자유게시판')
);

const secretChats = Array.from({ length: 15 }, () =>
    generatePost('속닥', '속닥맨', '자유게시판', true)
);

const initialChatList = [...publicChats, ...secretChats];

const publicReviews = Array.from({ length: 12 }, () =>
  generatePost('입양', '후기맨', '입양후기')
);

const secretReviews = Array.from({ length: 13 }, () =>
  generatePost('입양', '후기맨', '입양후기', true)
);

const initialReviewList = [...publicReviews, ...secretReviews];

export const ChatProvider = ({ children }) => {
    const [notice, setNotice] = useState(initialNotice);
    const [chats, setChats] = useState(initialChatList);
    const [review, setReview] = useState(initialReviewList);
    return <ChatContext.Provider value={{ notice, setNotice, chats, setChats, review, setReview }}>{children}</ChatContext.Provider>;
};

export const useChat = () => useContext(ChatContext);
