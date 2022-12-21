import { useEffect, useState, CSSProperties, } from 'react';
import { Dispatch, bindActionCreators } from "redux"
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRoutes, HashRouter, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { redirect as Redirect, Router } from 'react-router';

import ClipLoader from "react-spinners/ClipLoader";
// import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';

import GlobalStyle from './components/global';
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
import LayoutComponent from './components/Layout/Layout';
import Tables from './pages/tables/Tables';
import './App.scss'
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import CustDialog from './components/Dialog/CustDialog';
import { ModalActionType } from './utils/enum'
import BlankPage from './pages/blankpage/BlankPage';
// background
// import background from './'
// "./img/placeholder.png";

const LOANSHARK_MINT = process.env.REACT_APP_LOANSHARK_MINT;
const LOANSHARK_TWITTER = process.env.REACT_APP_LOANSHARK_TWITTER;
const LOANSHARK_DOCUMENT = process.env.REACT_APP_LOANSHARK_DOCUMENT;
const LOANSHARK_INTRODUCTION = process.env.REACT_APP_LOANSHARK_INTRODUCTION;
const LOANSHARK_GITHUB = process.env.REACT_APP_LOANSHARK_GITHUB;
const LOANSHARK_DISCORD = process.env.REACT_APP_LOANSHARK_DISCORD;

const PrivateRoute = ({ dispatch, component, ...rest }: any) => {
  return (
    <Route element={<LayoutComponent />} />
  );
};

const CloseButton = ({ closeToast }: any) => <i onClick={closeToast} className="la la-close notifications-close" />

const RestUrl = () => {
  // const { url } = props
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/app/main/dashboard");
  }, []);
  return <></>;
};




// function LoanSharkTwitter() {
//   window.location.href = LOANSHARK_TWITTER;
//   return null;
// }

// function LoanSharkMint() {
//   window.location.href = LOANSHARK_MINT;
//   return null;
// }

// function LoanSharkDocument() {
//   window.location.href = LOANSHARK_DOCUMENT;
//   return null;
// }
// function LoanSharkIntro() {
//   window.location.href = LOANSHARK_INTRODUCTION;
//   return null;
// }
// function LoanSharkGithub() {
//   window.location.href = LOANSHARK_GITHUB;
//   return null;
// }
// function LoanSharkDiscord() {
//   window.location.href = LOANSHARK_DISCORD;
//   return null;
// }

function App(props: any) {
  const [modal, setModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<ModalActionType>(ModalActionType.EMPTY);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalToken, setModalToken] = useState<string>("");
  const [modalInputValue, setModalInputValue] = useState<any>("");
  const [collateralCurrency, setCollateralCurrency] = useState<string>("eth");
  const [borrowCurrency, setBorrowCurrency] = useState<string>("btc");
  const [barData, setBarData] = useState(null)
  const [divStyle, setDivStyle] = useState(null)
  const [windowWidthSize, setWindowWidthSize] = useState<any>(0);

  const [windowDimension, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  // useEffect(() => {
  //   // console.log(window)
  //   // console.log(window.innerWidth)
  //   // console.log(window.innerHeight)
  //   // if (window.innerWidth <= 1000) {
  //   //   setModal(true)
  //   //   setModalAction("NOACTION")
  //   //   setModalTitle("Hi");
  //   //   setModalMessage("Hi");
  //   // }
  //   console.log(windowWidthSize)
  //   console.log(window.innerWidth)
  //   setWindowWidthSize(window.innerWidth)
  //   // console.log(windowSize)
  // }, [window.innerWidth, windowWidthSize])

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }
  useEffect(() => {
    console.log(windowDimension)
    if (windowDimension.winWidth <= 1000) {
      setModal(true)
      setModalAction(ModalActionType.NO_ACTION)
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
  console.log(`windowDimension`, windowDimension)

  function resetModal() {
    setModal(false)
    setModalAction(ModalActionType.EMPTY)
    setModalTitle("");
    setModalMessage("");
  }


  return (
    <>
      {
        isMobile === true && <BlankPage></BlankPage>
      }
      {isMobile === false &&
        <div style={{
          position: 'absolute',
          top: '0px',
          left: '0px',
          minHeight: '100%',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: "url(/assets/background/app_background_blur.svg)",
        }}>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              <CustDialog
                modal={modal}
                showConfirm={false}
                showCancel={false}
                modalTitle={modalTitle}
                modalMessage={modalMessage}
                // modalToken={modalToken}
                modalCancel={() => { }}
                modalConfirm={() => { }}
              // modalInputValue={modalInputValue}
              >
              </CustDialog>
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
      }
    </>
  );
}

export default App;

