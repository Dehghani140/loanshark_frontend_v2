import React, { useEffect } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks'

import { changeMyProtectingSmartVault } from '../../slice/smartvaultSlice';

import Widget from '../../components/Widget/Widget'
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'

import './SmartVault.scss'
import Repay from './Repay.svg';
import Topup from './Topup.svg';

import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'

function SmartVault1() {
  let navigate = useNavigate();
  useEffect(() => {
    console.log(`SmartVault1`)
  }, [])

  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.loanshark)
  const stateBackd = useAppSelector((state) => state.backd)
  const stateSmarvault = useAppSelector((state) => state.smartvault)

  return (
    <>
      <div style={{ paddingTop: "50px", width: "1260px", marginLeft: "auto", marginRight: "auto" }}>
        <Grid container spacing={3}>
					<Grid item xs={12}>
              <span className={'card-title'}>Select a smart vault to stake</span><span className={'card-subtitle'}> (3/4 steps)</span>
					</Grid>
          <Grid hidden={!(stateSmarvault.myProtectingPair === "ETHBTC" && stateSmarvault.myProtectionType === "repay")} item xs={5}>
            <DashboardCard
              label={`BTC`}
              labelInUSD={``}
              numberOfAssest={1}
              assest1Code={`btc`}
              assest2Code={``}
              pair={
                [
                  {
                    amountInUsdt: Number((stateBackd.totalBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100).toFixed(2)).toLocaleString(),
                    amountInCurrency: Number(Number(stateBackd.totalBtcLpAmount).toFixed(2)).toLocaleString(),
                    currency: "BTC",
                  },
                ]
              }
              detail={
                [
                  {
                    title: "APY",
                    value: "5.4%"
                  },
                  {
                    title: "TVL",
                    value: "$" + Number((stateBackd.totalBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100).toFixed(2)).toLocaleString()
                  },
                ]
              }
              button={
                [
                  {
                    label: "SELECT",
                    callbackFunction: (() => {
                      console.log(`on click payback`)
                      dispatch(changeMyProtectingSmartVault("BTC"))
                      navigate("/app/main/smartVault4")
                    }),
                    color: "white"
                  },
                ]
              }
            >
            </DashboardCard>
          </Grid>
          <Grid hidden={!(stateSmarvault.myProtectingPair === "ETHBTC" && stateSmarvault.myProtectionType === "topup")} item xs={5}>
            <DashboardCard
              label={`ETH`}
              labelInUSD={``}
              numberOfAssest={1}
              assest1Code={`eth`}
              assest2Code={``}
              pair={
                [
                  {
                    amountInUsdt: Number((stateBackd.totalEthLpAmount * stateBackd.ethLpExchangeRate * state.priceOfEth / 100).toFixed(2)).toLocaleString(),
                    amountInCurrency: Number(Number((stateBackd.totalEthLpAmount)).toFixed(2)).toLocaleString(),
                    currency: "ETH",
                  },
                ]
              }
              detail={
                [
                  {
                    title: "APY",
                    value: "5.4%"
                  },
                  {
                    title: "TVL",
                    value: "$" + Number((stateBackd.totalEthLpAmount * stateBackd.ethLpExchangeRate * state.priceOfEth / 100).toFixed(2)).toLocaleString()
                  },
                ]
              }
              button={
                [
                  {
                    label: "SELECT",
                    callbackFunction: (() => {
                      console.log(`on click payback`)
                      dispatch(changeMyProtectingSmartVault("ETH"))
                      navigate("/app/main/smartVault4")
                    }),
                    color: "white"
                  },
                ]
              }
            >
            </DashboardCard>
          </Grid>
        </Grid>
      </div>
    </>
  )
}


export default SmartVault1;
