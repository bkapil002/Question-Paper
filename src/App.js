import Header from './component/Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import context from './context/index';
import { useDispatch } from 'react-redux';
import UserLink from './commen/index';
import { setUserData } from './store/userSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const dataResponse = await fetch(UserLink.userData.url, {
        method: UserLink.userData.method,
        credentials: 'include',
      });

      if (!dataResponse.ok) {
        throw new Error('Failed to fetch user data');
      }

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        dispatch(setUserData(dataApi.data));
      } else {
        throw new Error(dataApi.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <context.Provider value={{ fetchUserData }}>
        <ToastContainer position='top-center' />
        <Header />
        <main>
          <Outlet />
        </main>
      </context.Provider>
    </div>
  );
}

export default App;
