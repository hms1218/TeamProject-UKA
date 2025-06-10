import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainHeaders from './components/HeaderFooter/MainHeader'; 
import MainBodys from './components/Main/MainBodys';
import MainFooter from './components/HeaderFooter/MainFooter';
import { Home } from './components/DetailPage/navigation';

// 고객센터 관련
import CustomerLayout from './components/Borders/Pages/CustomerLayout';
import FAQList from "./components/Borders/Pages/FAQList";
import FAQForm from "./components/Borders/Pages/FAQForm";
import QnAList from "./components/Borders/Pages/QnAList";
import QnAForm from "./components/Borders/Pages/QnAForm";
import QnADetail from "./components/Borders/Pages/QnADetail";
import AdoptionInquiry from "./components/Borders/Pages/AdoptionInquiry";

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

          {/* 고객센터 전체 (MainBodys 제외) */}
          <Route path="/customer/*" element={<CustomerLayout />}>
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
