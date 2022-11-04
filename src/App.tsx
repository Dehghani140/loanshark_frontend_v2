import { useEffect } from 'react';
import { Dispatch, bindActionCreators } from "redux"
import { connect, useDispatch, useSelector } from 'react-redux';
import * as loansharkActionCreators from './action-createors/loanshark';
import { useRoutes, HashRouter, BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { redirect as Redirect, Router } from 'react-router';
// import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { CssBaseline } from '@mui/material';

import GlobalStyle from './components/global'
import ThemeProvider from './theme/ThemeProvider';

import Dashboard from './pages/dashboard/Dashboard'
import Manage from './pages/manage/Manage'
import Borrow from './pages/borrow/Borrow'
import LayoutComponent from './components/Layout/Layout';
import SidebarLayout from './layouts/SidebarLayout';
import Tables from './pages/tables/Tables';
import './App.scss'
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



function LoanSharkTwitter() {
  window.location.href = LOANSHARK_TWITTER;
  return null;
}

function LoanSharkMint() {
  window.location.href = LOANSHARK_MINT;
  return null;
}

function LoanSharkDocument() {
  window.location.href = LOANSHARK_DOCUMENT;
  return null;
}
function LoanSharkIntro() {
  window.location.href = LOANSHARK_INTRODUCTION;
  return null;
}
function LoanSharkGithub() {
  window.location.href = LOANSHARK_GITHUB;
  return null;
}
function LoanSharkDiscord() {
  window.location.href = LOANSHARK_DISCORD;
  return null;
}

function App(props: any) {
  // const content = useRoutes(router);

  const state = useSelector((state: any) => state.loanshark)
  const dispatch = useDispatch();
  const { changeMyAccount } = bindActionCreators(loansharkActionCreators, dispatch)


  useEffect(() => {
    console.log(`updatest store state`, state)
  }, [state])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: "url(/assets/background/app_background_blur.svg)"
      }}>
        <ThemeProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            <BrowserRouter>
              <Routes>
                {/* <Route path="/" element={<LayoutComponent />} /> */}
                {/* <Route path="/app" element={<LayoutComponent />} /> */}
                <Route path="/twitter" element={<LoanSharkTwitter></LoanSharkTwitter>} />
                <Route path="/mint" element={<LoanSharkMint />} />
                <Route path="/documentation" element={<LoanSharkDocument />} />
                <Route path="/introduction" element={<LoanSharkIntro />} />
                <Route path="/github" element={<LoanSharkGithub />} />
                <Route path="/discord" element={<LoanSharkDiscord />} />
                <Route path="app" element={<SidebarLayout></SidebarLayout>} >
                  <Route path="main/dashboard" element={<Dashboard></Dashboard>}></Route>
                  <Route path="main/borrow" element={<Borrow></Borrow>}></Route>
                  <Route path="main/manage" element={<Manage></Manage>}></Route>
                  <Route path="main/more" element={<Dashboard></Dashboard>}></Route>
                  <Route path="main/smartVault1" element={<Dashboard></Dashboard>}></Route>
                  <Route path="main/smartVault2" element={<Dashboard></Dashboard>}></Route>
                  <Route path="main/smartVault3" element={<Dashboard></Dashboard>}></Route>
                  <Route path="main/smartVault4" element={<Dashboard></Dashboard>}></Route>
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

