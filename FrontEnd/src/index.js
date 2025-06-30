import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './AuthContext';

// 게시판, 고객센터 얼럿 테스트중입니다.
import { AlertProvider } from './components/Customers/Context/AlertContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>

  
// );

ReactDOM.createRoot(document.getElementById('root')).render(
        <AlertProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </AlertProvider>
);

reportWebVitals();
