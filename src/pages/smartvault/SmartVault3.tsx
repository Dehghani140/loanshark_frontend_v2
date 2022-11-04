import React, { useEffect } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';

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
          <Grid item xs={5}>
            <DashboardCard
              label={`BTC`}
              labelInUSD={``}
              numberOfAssest={1}
              assest1Code={`btc`}
              assest2Code={``}
              pair={
                [
                  {
                    amountInUsdt: 34192.9,
                    amountInCurrency: 30.4,
                    currency: "BTC",
                  },
                ]
              }
              detail={
                [
                  {
                    title: "APY",
                    value: "20.4%"
                  },
                  {
                    title: "Health Factor",
                    value: "20"
                  },
                  {
                    title: "Liquidation",
                    value: "1.1"
                  },
                  {
                    title: "Single Top-up",
                    value: "0.4392BTC"
                  },
                ]
              }
              button={
                [
                  {
                    label: "SELECT",
                    callbackFunction: (() => {
                      console.log(`on click payback`)
                      navigate("/app/main/smartVault4")
                    }),
                    color: "white"
                  },
                ]
              }
            >
            </DashboardCard>
          </Grid></Grid>
      </div>
    </>
  )
}


export default SmartVault1;
