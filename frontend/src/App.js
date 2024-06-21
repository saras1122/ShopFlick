import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './context';
import SummaryApi from './common';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()
    console.log(dataApi)
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }
  }

  useEffect(() => {
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */


  }, [])
  return (
    <>
      <Context.Provider value={{
        fetchUserDetails
      }}>
        <ToastContainer
          position='top-center'
        />
        <Header />
        <main className='min-h-[calc(100vh-0px)] pt-16'>
          <Outlet />
        </main>
        <br/>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
