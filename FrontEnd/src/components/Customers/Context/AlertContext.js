import { createContext, useContext } from 'react';
import Swal from 'sweetalert2';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const showAlert = (options) => {
    return Swal.fire({
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      ...options,   // ⭐️ 추가 옵션 다 받기! input도 들어옴
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
