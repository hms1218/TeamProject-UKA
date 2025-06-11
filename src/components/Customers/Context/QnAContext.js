import { createContext, useContext, useState } from 'react';

const QnAContext = createContext();

const initialQnAs = [
  { id: 1, title: '입양 문의드립니다', author: 'user1', content: '입양에 대해 궁금해요', isSecret: false },
  { id: 2, title: '후원 관련 문의', author: 'user2', content: '입양에 대해 궁금해요', isSecret: true, password: '1234' },
  { id: 3, title: '위치가 어디인가요?', author: 'user3', content: '입양에 대해 궁금해요', isSecret: false },
  { id: 4, title: '입양문의는 어디인가요?', author: 'user3', content: '입양에 대해 궁금해요', isSecret: false },
  { id: 5, title: '봉사활동 어디서 신청하죠?', author: 'user3', content: '입양에 대해 궁금해요', isSecret: false },
  { id: 6, title: '위치가 어디인가요?', author: 'user3', content: '입양에 대해 궁금해요', isSecret: false },
  { id: 7, title: '위치가 어디인가요?', author: 'user3', content: '입양에 대해 궁금해요', isSecret: false },
  { id: 8, title: '위치가 어디인가요?', author: 'user3', content: '입양에 대해 궁금해요', isSecret: false },
  { id: 9, title: '후원 관련 문의', author: 'user2', content: '입양에 대해 궁금해요', isSecret: true, password: '1234' },
  { id: 10, title: '후원 관련 문의', author: 'user2', content: '입양에 대해 궁금해요', isSecret: true, password: '1234' },
  { id: 11, title: '후원 관련 문의', author: 'user2', content: '입양에 대해 궁금해요', isSecret: true, password: '1234' },
  { id: 12, title: '후원 관련 문의', author: 'user2', content: '입양에 대해 궁금해요', isSecret: true, password: '1234' },
  { id: 13, title: '마지막 질문인가요?', author: 'user3', content: '입양에 대해 궁금해요', isSecret: false },
];

export const QnAProvider = ({ children }) => {
  const [qnas, setQnas] = useState(initialQnAs);
  return <QnAContext.Provider value={{ qnas, setQnas }}>{children}</QnAContext.Provider>;
};

export const useQnA = () => useContext(QnAContext);
