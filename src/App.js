import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 메인 관련
import MainHeaders from './components/Header/MainHeader';
import MainBody from './components/Main/MainBody';
import MainFooter from './components/Footer/MainFooter';
import { Home } from './components/DetailPage/navigation';

//게시판 관련
import BoardLayout from './components/Board/Pages/BoardLayout';
import ChatList from './components/Board/Pages/ChatList';
import ChatForm from './components/Board/Pages/ChatForm';
import ChatDetail from './components/Board/Pages/ChatDetail';
import ChatEdit from './components/Board/Pages/ChatEdit';
import AdoptionReview from './components/Board/Pages/AdoptionReview';
import ReviewForm from './components/Board/Pages/ReviewForm';
import AdoptionReviewDetail from './components/Board/Pages/AdoptionReviewDetail';
import ReviewEdit from './components/Board/Pages/ReviewEdit';
import { ChatProvider } from './components/Board/Context/ChatContext';

// 고객센터 관련
import CustomerLayout from './components/Customers/Pages/CustomerLayout';
import FAQList from "./components/Customers/Pages/FAQList";
import QnAList from "./components/Customers/Pages/QnAList";
import QnAForm from "./components/Customers/Pages/QnAForm";
import QnADetail from "./components/Customers/Pages/QnADetail";
import QnAEdit from "./components/Customers/Pages/QnAEdit";
import AdoptionInquiry from "./components/Customers/Pages/AdoptionInquiry";
import { QnAProvider } from './components/Customers/Context/QnAContext';

//상세보기 관련
import { DetailBody } from './components/DetailPage/DetailBody';
import { DetailSelect}  from './components/DetailPage/DetailSelect';

// 관리자 화면
import AdminPage from './components/Customers/Pages/Admin/AdminPage';
import AdminQnADetail from './components/Customers/Pages/Admin/AdminQnADetail';

function App() {

    return (
        <div className="App" style={{ padding: "20px"}}>
            
            <Router>
                <MainHeaders />
                <Routes>
                    {/* 메인 홈 전용 레이아웃 */}
                    <Route path="/" element={
                            <>
                                <Home />
                                <MainBody />
                            </>
                        }
                    />
                    {/* 상세페이지 전체 */}
                    <Route path='/about' element={<DetailBody/>} />
                    <Route path='/about/select' element={<DetailSelect/>}/>
                    
                    {/* 게시판 전체 (MainBodys 제외) */}
                    <Route path="/board/*" 
                           element={
                               <ChatProvider>
                                   <BoardLayout />
                               </ChatProvider>}
                    >
                        <Route index element={<ChatList />} />
                        <Route path="chat" element={<ChatList />} />
                        <Route path="chat/new" element={<ChatForm />} />
                        <Route path="chat/:id" element={<ChatDetail />} />
                        <Route path="chat/:id/new" element={<ChatEdit />} />
                        <Route path="adoptionReview" element={<AdoptionReview />} />
                        <Route path="adoptionReview/new" element={<ReviewForm />} />
                        <Route path="adoptionReview/:id" element={<AdoptionReviewDetail />} />
                        <Route path="adoptionReview/:id/new" element={<ReviewEdit />} />
                    </Route>
                    {/* 고객센터 라우팅 */}
                    <Route path="/customer/*" element={
                        <QnAProvider>
                        <CustomerLayout />
                        </QnAProvider>
                    }>
                        <Route index element={<FAQList />} />
                        <Route path="faq" element={<FAQList />} />
                        <Route path="qna" element={<QnAList />} />
                        <Route path="qna/new" element={<QnAForm />} />
                        <Route path="qna/:id" element={<QnADetail />} />
                        <Route path="qna/:id/edit" element={<QnAEdit />} />
                        <Route path="adoption" element={<AdoptionInquiry />} />
                    </Route>
                    {/* 관리자 라우팅 - 독립 경로 */}
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
                <MainFooter />
            </Router>
            
        </div>
    );
}

export default App;
