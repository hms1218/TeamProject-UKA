import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/Common/AppLayout';

// 메인 관련
import MainBody from './components/Main/MainBody';

import LoginPage from './components/Pages/LoginPage';
import SignupPage from './components/Pages/SignupPage';
import FindIdPage from './components/Pages/FindIdPage';
import FindPasswordPage from './components/Pages/FindPasswordPage';

import ResetPasswordPage from './components/Pages/ResetPasswordPage';

//게시판 관련
import BoardLayout from './components/Board/Pages/BoardLayout';
import AllBoard from './components/Board/Pages/AllBoard';
import AllBoardForm from './components/Board/Pages/AllBoardForm';
import AllBoardDetail from './components/Board/Pages/AllBoardDetail';
import AllBoardEdit from './components/Board/Pages/AllBoardEdit';
import Notice from './components/Board/Pages/Notice';
import NoticeForm from './components/Board/Pages/NoticeForm';
import NoticeDetail from './components/Board/Pages/NoticeDetail';
import NoticeEdit from './components/Board/Pages/NoticeEdit';
import ChatList from './components/Board/Pages/ChatList';
import ChatForm from './components/Board/Pages/ChatForm';
import ChatDetail from './components/Board/Pages/ChatDetail';
import ChatEdit from './components/Board/Pages/ChatEdit';
import AdoptionReview from './components/Board/Pages/AdoptionReview';
import ReviewForm from './components/Board/Pages/ReviewForm';
import AdoptionReviewDetail from './components/Board/Pages/AdoptionReviewDetail';
import ReviewEdit from './components/Board/Pages/ReviewEdit';
import { ChatProvider } from './components/Board/Context/ChatContext';
import { useEffect } from 'react';

// 고객센터 관련
import CustomerLayout from './components/Customers/Pages/CustomerLayout';
import FAQList from "./components/Customers/Pages/FAQList";
import FAQEdit from "./components/Customers/Pages/FAQEdit";
import QnAList from "./components/Customers/Pages/QnAList";
import QnAForm from "./components/Customers/Pages/QnAForm";
import QnADetail from "./components/Customers/Pages/QnADetail";
import QnAEdit from "./components/Customers/Pages/QnAEdit";
import AdoptionInquiry from "./components/Customers/Pages/AdoptionInquiry";
import { QnAProvider } from './components/Customers/Context/QnAContext';
//상세보기 관련
import { DetailBody } from './components/DetailPage/DetailBody';
import { DetailSelect } from './components/DetailPage/DetailSelect';

// 관리자 화면
import AdminPage from './components/Customers/Pages/Admin/AdminPage';
import AdminQnADetail from './components/Customers/Pages/Admin/AdminQnADetail';

import { RequestMain } from './components/Request/RequestMain';
import { RequestWrite } from './components/Request/RequestWrite';

import NaverMap from './components/DetailMap/NaverMap';

import './App.css';

function App() {
    // 게시판 유저 확인용
    useEffect(() => {
        if (!localStorage.getItem("username")) {
            localStorage.setItem("username", "me");
        }
    }, []);

    return (
        <div className="app-bg">
            <Router>
                <Routes>
                    {/* 1. 인증 관련은 단독 페이지 */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/find-id" element={<FindIdPage />} />
                    <Route path="/find-password" element={<FindPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />

                    {/* 2. 나머지는 AppLayout으로 감싸기 */}
                    <Route
                        path="/*"
                        element={
                            <AppLayout>
                                <Routes>
                                    {/* 홈 */}
                                    <Route path="/" element={<MainBody />} />
                                    {/* svg 지도 */}
                                    <Route path="/svg_map_detail" element={<NaverMap />} />
                                    {/* 상세페이지 */}
                                    <Route path="/about" element={<DetailBody />} />
                                    <Route path="/about/select" element={<DetailSelect />} />
                                    {/* 요청 */}
                                    <Route path="/request" element={<RequestMain />} />
                                    <Route path="/request/write" element={<RequestWrite />} />

                                    {/* 게시판 전체 */}
                                    <Route path="/board/*"
                                        element={
                                            <ChatProvider>
                                                <BoardLayout />
                                            </ChatProvider>
                                        }
                                    >
                                        <Route index element={<AllBoard />} />
                                        <Route path="all" element={<AllBoard />} />
                                        <Route path="all/form" element={<AllBoardForm />} />
                                        <Route path="all/detail/:id" element={<AllBoardDetail />} />
                                        <Route path="all/edit/:type/:id" element={<AllBoardEdit />} />
                                        <Route path="notice" element={<Notice />} />
                                        <Route path="notice/new" element={<NoticeForm />} />
                                        <Route path="notice/:id" element={<NoticeDetail />} />
                                        <Route path="notice/:id/new" element={<NoticeEdit />} />
                                        <Route path="chat" element={<ChatList />} />
                                        <Route path="chat/new" element={<ChatForm />} />
                                        <Route path="chat/:id" element={<ChatDetail />} />
                                        <Route path="chat/:id/new" element={<ChatEdit />} />
                                        <Route path="adoptionReview" element={<AdoptionReview />} />
                                        <Route path="adoptionReview/new" element={<ReviewForm />} />
                                        <Route path="adoptionReview/:id" element={<AdoptionReviewDetail />} />
                                        <Route path="adoptionReview/:id/new" element={<ReviewEdit />} />
                                    </Route>

                                    {/* 고객센터 */}
                                    <Route path="/customer/*" element={
                                        <QnAProvider>
                                            <CustomerLayout />
                                        </QnAProvider>
                                    }>
                                        <Route index element={<FAQList />} />
                                        <Route path="faq" element={<FAQList />} />
                                        <Route path="faq/edit/:id" element={<FAQEdit />} />
                                        <Route path="qna" element={<QnAList />} />
                                        <Route path="qna/new" element={<QnAForm />} />
                                        <Route path="qna/:id" element={<QnADetail />} />
                                        <Route path="qna/:id/edit" element={<QnAEdit />} />
                                        <Route path="adoption" element={<AdoptionInquiry />} />
                                    </Route>
                                    {/* 관리자 */}
                                    <Route path="/admin/*"
                                        element={
                                            <QnAProvider>
                                                <AdminPage />
                                            </QnAProvider>
                                        }
                                    />
                                    <Route path="/customer/qna/:id/admin"
                                        element={
                                            <QnAProvider>
                                                <AdminQnADetail />
                                            </QnAProvider>
                                        }
                                    />
                                </Routes>
                            </AppLayout>
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
