import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

import Dashboard from './pages/dashboard/Dashboard';
import Manage from './pages/manage/Manage';
import Borrow from './pages/borrow/Borrow';
import SmartVault1 from './pages/smartvault/SmartVault1';
import SmartVault2 from './pages/smartvault/SmartVault2';
import SmartVault3 from './pages/smartvault/SmartVault3';
import SmartVault4 from './pages/smartvault/SmartVault4';
import History from './pages/history/History';
import SidebarLayout from './layouts/SidebarLayout';
import './App.scss'
import CustDialog from './components/Dialog/CustDialog';

const DESKTOP_SCREEN_SIZE = {
  width: 1024,
}

const RestUrl = () => {
  // const { url } = props
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/app/main/dashboard");
  }, []);
  return <></>;
};

function App() {
  const [modal, setModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");

  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }
  useEffect(() => {
    if (windowDimension.winWidth <= DESKTOP_SCREEN_SIZE.width) {
      setModal(true)
      setModalTitle('Please switch over desktop to view this website');
      setIsMobile(true)
    }
    else {
      resetModal()
      setIsMobile(false)
    }
    window.addEventListener('resize', detectSize)
    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimension])

  function resetModal() {
    setModal(false)
    setModalTitle("");
    setModalMessage("");
  }


  return (
    <>
      <div 
      // className={'background'}
      style={{
        position: 'absolute',
        top: '0px',
        left: '0px',
        minHeight: '100%',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url(/assets/background/app_background_blur.svg)",
      }}
      >
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {isMobile === true &&
              <CustDialog
                modal={modal}
                showConfirm={false}
                showCancel={false}
                modalTitle={modalTitle}
                modalMessage={modalMessage}
                modalCancel={() => { }}
                modalConfirm={() => { }}
              >
              </CustDialog>
            }
            <BrowserRouter>
              <Routes>
                {/* <Route path="/" element={<LayoutComponent />} /> */}
                {/* <Route path="/app" element={<LayoutComponent />} /> */}
                {/* <Route path="/twitter" element={<LoanSharkTwitter></LoanSharkTwitter>} />
                <Route path="/mint" element={<LoanSharkMint />} />
                <Route path="/documentation" element={<LoanSharkDocument />} />
                <Route path="/introduction" element={<LoanSharkIntro />} />
                <Route path="/github" element={<LoanSharkGithub />} />
                <Route path="/discord" element={<LoanSharkDiscord />} /> */}
                <Route path="app" element={<SidebarLayout></SidebarLayout>} >
                  <Route path="main/dashboard" element={<Dashboard></Dashboard>}></Route>
                  <Route path="main/borrow" element={<Borrow></Borrow>}></Route>
                  <Route path="main/manage" element={<Manage></Manage>}></Route>
                  <Route path="main/more" element={<Dashboard></Dashboard>}></Route>
                  <Route path="main/history" element={<History></History>}></Route>
                  <Route path="main/smartVault1" element={<SmartVault1></SmartVault1>}></Route>
                  <Route path="main/smartVault2" element={<SmartVault2></SmartVault2>}></Route>
                  <Route path="main/smartVault3" element={<SmartVault3></SmartVault3>}></Route>
                  <Route path="main/smartVault4" element={<SmartVault4></SmartVault4>}></Route>
                  <Route path="main/smartVault4ETH" element={<Dashboard></Dashboard>}></Route>
                </Route>
                <Route path="*" element={<RestUrl></RestUrl>}></Route>
              </Routes>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;























































// import { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import { CssBaseline } from '@mui/material';
// import ThemeProvider from './theme/ThemeProvider';

// import Dashboard from './pages/dashboard/Dashboard';
// import Manage from './pages/manage/Manage';
// import Borrow from './pages/borrow/Borrow';
// import SmartVault1 from './pages/smartvault/SmartVault1';
// import SmartVault2 from './pages/smartvault/SmartVault2';
// import SmartVault3 from './pages/smartvault/SmartVault3';
// import SmartVault4 from './pages/smartvault/SmartVault4';
// import History from './pages/history/History';
// import SidebarLayout from './layouts/SidebarLayout';
// import './App.scss'
// import CustDialog from './components/Dialog/CustDialog';

// const DESKTOP_SCREEN_SIZE = {
//   width: 1024,
// }

// const RestUrl = () => {
//   // const { url } = props
//   let navigate = useNavigate();
//   useEffect(() => {
//     navigate("/app/main/dashboard");
//   }, []);
//   return <></>;
// };

// function App() {
//   const [modal, setModal] = useState<boolean>(false);
//   const [modalTitle, setModalTitle] = useState<string>("");
//   const [modalMessage, setModalMessage] = useState<string>("");

//   const [windowDimension, detectHW] = useState({
//     winWidth: window.innerWidth,
//     winHeight: window.innerHeight,
//   })

//   const [isMobile, setIsMobile] = useState<boolean | null>(null);
//   const detectSize = () => {
//     detectHW({
//       winWidth: window.innerWidth,
//       winHeight: window.innerHeight,
//     })
//   }
//   useEffect(() => {
//     if (windowDimension.winWidth <= DESKTOP_SCREEN_SIZE.width) {
//       setModal(true)
//       setModalTitle('Please switch over desktop to view this website');
//       setIsMobile(true)
//     }
//     else {
//       resetModal()
//       setIsMobile(false)
//     }
//     window.addEventListener('resize', detectSize)
//     return () => {
//       window.removeEventListener('resize', detectSize)
//     }
//   }, [windowDimension])

//   function resetModal() {
//     setModal(false)
//     setModalTitle("");
//     setModalMessage("");
//   }


//   return (
//     <>
//       <div style={{
//         // position: 'absolute',
//         // top: '0px',
//         // left: '0px',
//         // minHeight: '100%',
//         // backgroundAttachment: 'fixed',
//         // backgroundPosition: 'center',
//         // backgroundRepeat: 'no-repeat',
//         backgroundImage: "url(/assets/background/app_background_blur.svg) no-repeat center center fixed",
//       }}>
//         <ThemeProvider>
//           <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <CssBaseline />
//             {isMobile === true &&
//               <CustDialog
//                 modal={modal}
//                 showConfirm={false}
//                 showCancel={false}
//                 modalTitle={modalTitle}
//                 modalMessage={modalMessage}
//                 modalCancel={() => { }}
//                 modalConfirm={() => { }}
//               >
//               </CustDialog>
//             }
//             <BrowserRouter>
//               <Routes>
//                 {/* <Route path="/" element={<LayoutComponent />} /> */}
//                 {/* <Route path="/app" element={<LayoutComponent />} /> */}
//                 {/* <Route path="/twitter" element={<LoanSharkTwitter></LoanSharkTwitter>} />
//                 <Route path="/mint" element={<LoanSharkMint />} />
//                 <Route path="/documentation" element={<LoanSharkDocument />} />
//                 <Route path="/introduction" element={<LoanSharkIntro />} />
//                 <Route path="/github" element={<LoanSharkGithub />} />
//                 <Route path="/discord" element={<LoanSharkDiscord />} /> */}
//                 <Route path="app" element={<SidebarLayout></SidebarLayout>} >
//                   <Route path="main/dashboard" element={<Dashboard></Dashboard>}></Route>
//                   <Route path="main/borrow" element={<Borrow></Borrow>}></Route>
//                   <Route path="main/manage" element={<Manage></Manage>}></Route>
//                   <Route path="main/more" element={<Dashboard></Dashboard>}></Route>
//                   <Route path="main/history" element={<History></History>}></Route>
//                   <Route path="main/smartVault1" element={<SmartVault1></SmartVault1>}></Route>
//                   <Route path="main/smartVault2" element={<SmartVault2></SmartVault2>}></Route>
//                   <Route path="main/smartVault3" element={<SmartVault3></SmartVault3>}></Route>
//                   <Route path="main/smartVault4" element={<SmartVault4></SmartVault4>}></Route>
//                   <Route path="main/smartVault4ETH" element={<Dashboard></Dashboard>}></Route>
//                 </Route>
//                 <Route path="*" element={<RestUrl></RestUrl>}></Route>
//               </Routes>
//             </BrowserRouter>
//           </LocalizationProvider>
//         </ThemeProvider>
//       </div>
//     </>
//   );
// }

// export default App;

