import React, { useEffect } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks'

import { changeMyProtectingSmartVault } from '../../slice/smartvaultSlice';

import Widget from '../../components/Widget/Widget'
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'

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
      <div style={{ paddingRight: "20%", paddingLeft: "20%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p>Protection Setup (3/4 steps)</p>

          </Grid>
          <Grid item xs={12}>
            <p>Select a smart vault to stake</p>

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
                    amountInUsdt: (stateBackd.totalBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100).toFixed(2),
                    amountInCurrency: (stateBackd.totalBtcLpAmount),
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
                    value: "$" + (stateBackd.totalBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100).toFixed(2)
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
                    amountInUsdt: (stateBackd.totalEthLpAmount * stateBackd.ethLpExchangeRate * state.priceOfEth / 100).toFixed(2),
                    amountInCurrency: (stateBackd.totalEthLpAmount),
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
                    value: "$" + (stateBackd.totalEthLpAmount * stateBackd.ethLpExchangeRate * state.priceOfEth / 100).toFixed(2)
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
