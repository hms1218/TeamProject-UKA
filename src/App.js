import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeaders from './components/HeaderFooter/MainHeader'; 
import MainBodys from './components/Main/MainBodys';
import MainFooter from './components/HeaderFooter/MainFooter';
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
import FAQForm from "./components/Customers/Pages/FAQForm";
import QnAList from "./components/Customers/Pages/QnAList";
import QnAForm from "./components/Customers/Pages/QnAForm";
import QnADetail from "./components/Customers/Pages/QnADetail";
import QnAEdit from "./components/Customers/Pages/QnAEdit";
import AdoptionInquiry from "./components/Customers/Pages/AdoptionInquiry";
import { QnAProvider } from './components/Customers/Context/QnAContext';


function App() {
  
  return (  
    <div className="App" style={{ padding: "20px", marginLeft : 300, marginRight: 300, marginTop:20 }}>
        <Router>
            <MainHeaders />
            <Routes>
                {/* 메인 홈 전용 레이아웃 */}
                <Route path="/" 
                       element={
                           <>
                               <Home />
                               <MainBodys />
                           </>
                       }
                />
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

            {/* 고객센터 전체 (MainBodys 제외) */}
                <Route path="/customer/*" element={
                    <QnAProvider>
                        <CustomerLayout />
                    </QnAProvider>
                    }
                >
                <Route index element={<FAQList />} />
                <Route path="faq" element={<FAQList />} />
                <Route path="faq/new" element={<FAQForm />} />
                <Route path="qna" element={<QnAList />} />
                <Route path="qna/new" element={<QnAForm />} />
                <Route path="qna/:id" element={<QnADetail />} />
                <Route path="adoption" element={<AdoptionInquiry />} />
            </Route>
            </Routes>
            <MainFooter />
        </Router>
    </div>
  );
}

export default App;
