import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeaders from './components/HeaderFooter/MainHeader'; 
import MainBodys from './components/Main/MainBodys';
import MainFooter from './components/HeaderFooter/MainFooter';
import { Home } from './components/DetailPage/navigation';

// 고객센터 관련
import CustomerLayout from './components/Customers/Pages/CustomerLayout';
import FAQList from "./components/Customers/Pages/FAQList";
import QnAList from "./components/Customers/Pages/QnAList";
import QnAForm from "./components/Customers/Pages/QnAForm";
import QnADetail from "./components/Customers/Pages/QnADetail";
import QnAEdit from "./components/Customers/Pages/QnAEdit";
import AdoptionInquiry from "./components/Customers/Pages/AdoptionInquiry";
import { QnAProvider } from './components/Customers/Context/QnAContext';

// 관리자 화면
import AdminPage from './components/Customers/Pages/Admin/AdminPage';
import AdminQnADetail from './components/Customers/Pages/Admin/AdminQnADetail';

function App() {

  return (
    <div className="App" style={{ marginLeft : 300, marginRight: 300, marginTop:20 }}>
      <Router>
        <MainHeaders />
        <Routes>
          {/* 메인 홈 전용 레이아웃 */}
          <Route path="/" element={
            <>
              <Home />
              <MainBodys />
            </>
          } />

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
          <Route path="/admin/*" element={
            <QnAProvider>
              <AdminPage />
            </QnAProvider>
          } />
          <Route
            path="/customer/qna/:id/admin"
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
