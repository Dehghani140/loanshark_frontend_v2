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
            <p>Protection Setup (2/4 steps)</p>

          </Grid>
          <Grid item xs={12}>
            <p>Select a loan to protect</p>

          </Grid>
          <Grid item xs={5}>
            <DashboardCard
              label={`ETH/BTC`}
              labelInUSD={`$19,294`}
              numberOfAssest={2}
              assest1Code={`eth`}
              assest2Code={`btc`}
              pair={
                [
                  {
                    amountInUsdt: 34192.9,
                    amountInCurrency: 30.4,
                    currency: "ETH",
                  },
                  {
                    amountInUsdt: 413401.1,
                    amountInCurrency: 1.87,
                    currency: "BTC",
                  },
                ]
              }
              detail={
                [
                  {
                    title: "Collateral",
                    value: "$34192.9 / 30.4ETH"
                  },
                  {
                    title: "Debt",
                    value: "$41340.3 / 1.87BTC"
                  },
                  {
                    title: "APY",
                    value: "20.4%"
                  },
                  {
                    title: "Health Factor",
                    value: "$20"
                  },
                  {
                    title: "Smart Value",
                    value: "$192294"
                  },
                  {
                    title: "Provider",
                    value: "AAVE"
                  },
                ]
              }
              button={[
                {
                  label: "SELECT",
                  callbackFunction: (() => {
                    console.log(`on click select`)
                    navigate("/app/main/smartVault3");
                  }),
                  color: "white"
                },
              ]}
            >
            </DashboardCard>
          </Grid>

          <Grid item xs={5}>
            <DashboardCard
              label={`ETH/BTC`}
              labelInUSD={`$19,294`}
              numberOfAssest={2}
              assest1Code={`one`}
              assest2Code={`usdt`}
              pair={
                [
                  {
                    amountInUsdt: 34192.9,
                    amountInCurrency: 30.4,
                    currency: "ETH",
                  },
                  {
                    amountInUsdt: 413401.1,
                    amountInCurrency: 1.87,
                    currency: "BTC",
                  },
                ]
              }
              detail={
                [
                  {
                    title: "Collateral",
                    value: "$34192.9 / 30.4ETH"
                  },
                  {
                    title: "Debt",
                    value: "$41340.3 / 1.87BTC"
                  },
                  {
                    title: "APY",
                    value: "20.4%"
                  },
                  {
                    title: "Health Factor",
                    value: "$20"
                  },
                  {
                    title: "Smart Value",
                    value: "$192294"
                  },
                  {
                    title: "Provider",
                    value: "AAVE"
                  },
                ]
              }
              button={[
                {
                  label: "SELECT",
                  callbackFunction: (() => {
                    console.log(`on click select`)
                    navigate("/app/main/smartVault3");
                  }),
                  color: "white"
                },
              ]}
            >
            </DashboardCard>
          </Grid></Grid>
      </div>
    </>
  )
}


export default SmartVault1;
