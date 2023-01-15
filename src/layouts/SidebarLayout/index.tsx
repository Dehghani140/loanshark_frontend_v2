import { FC, ReactNode, useEffect } from 'react';
import { useState, CSSProperties, } from 'react';
import { Box, alpha, lighten, useTheme, Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';
import ClipLoader from "react-spinners/ClipLoader";

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppSelector } from '../../hooks';
import SelectToken from 'src/components/SelectToken/SelectToken';
import Web3 from 'web3';

interface SidebarLayoutProps {
  // children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();
  console.log(theme)
  const stateSelectToken = useAppSelector((state) => state.selectToken)
  const state = useAppSelector((state) => state.loanshark)
  useEffect(() => {
    console.log(`SidebarLayout`)
  }, [])

  const stateLayout = useAppSelector((state) => state.layout)

  let [color, setColor] = useState("#000000");
  let [showBar, setShowBar] = useState(true);

  const override: CSSProperties = {
    position: 'fixed',
    alignSelf: 'center',
    top: '40%',
    left: '45%',
    zIndex: '1000'
  };

  return (
    <>

      <SelectToken></SelectToken>
      {/* <SelectToken
          openDialog={stateSelectToken.dialogState}
      ></SelectToken> */}

      <Box
        sx={{
          flex: 1,
          height: '100%',
          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`
          }
        }}
      >
        <Grid container justifyContent={'center'}>
          <Grid item>
            <Header />
          </Grid>
        </Grid>

        {/* <Sidebar /> */}

        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >

          <Box display="block">
            <div style={{
              display: (showBar ? 'relative' : 'none'),
              fontFamily: "poppins",
              width: '100%',
              height: '30px',
              lineHeight: '34px',
              verticalAlign: "middle",
              textAlign: "center",
              backgroundColor: (state.currentChainID == 43113 ? '#b4ebfa' : '#FFCC00')
            }}>
              {state.currentChainID == 43113 ?
                "Loanshark has saved borrowers $" +
                Number((state.traderJoeBtcBorrowRate - state.aaveBtcBorrowRate) / 100 * state.totalUserDebtBalanceBtc * state.priceOfBtc / 100).toLocaleString() +
                " in interest fee already!" : "Please connect your wallet to Avalanche Testnet"}
              {state.currentChainID == 43113 ?
                <Button aria-label="delete" color="primary" size="small"
                  onClick={() => {
                    setShowBar(!showBar)
                  }}> X </Button> : null
              }
            </div>
            <div
              style={{ width: '100vw' }}
            >
              <Outlet />
              {stateLayout.loadingActive ? <div style={{
                position: 'fixed',
                top: '0px',
                left: '0px',
                zIndex: '1000',
                width: '100%',
                minHeight: '100%',
                opacity: 0.5,
                backgroundColor: '#222222',
              }}></div> : null
              }
              <ClipLoader
                color={color}
                loading={stateLayout.loadingActive}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </Box>
        </Box>

      </Box>
    </>
  );
};

export default SidebarLayout;
