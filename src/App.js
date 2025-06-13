import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeaders from './components/Header/MainHeader';
import MainBody from './components/Main/MainBody';
import MainFooter from './components/Footer/MainFooter';
import { Home } from './components/DetailPage/navigation';

//게시판 관련
import BoardLayout from './components/Board/Pages/BoardLayout';
import ChatList from './components/Board/Pages/ChatList';
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
        <div className="App" style={{ padding: "20px", marginLeft: "280px", marginRight: "300px"}}>
            
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
                    {/* 게시판 전체 (MainBodys 제외) */}
                    <Route path="/board/*" element={
                            <ChatProvider>
                                <BoardLayout />
                            </ChatProvider>
                        }
                    >
                        <Route index element={<ChatList />} />
                        <Route path="chat" element={<ChatList />} />
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
