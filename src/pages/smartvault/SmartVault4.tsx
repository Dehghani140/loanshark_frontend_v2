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
                        <p>Protection Setup (4/4 steps)</p>

                    </Grid>
                    <Grid item xs={7}>
                        <div style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                            <p>How much would you like to stake to smart vault?</p>
                            <input
                                style={{
                                    color: "rgba(51,51,51,1)",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: "48px",
                                    fontWeight: "700",
                                    fontStyle: "normal",
                                    overflow: "hidden",
                                    width: "100%",
                                }}
                            ></input>
                            <p>At which health factor would you like to use smart vault?</p>
                            <input
                                style={{
                                    color: "rgba(51,51,51,1)",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: "48px",
                                    fontWeight: "700",
                                    fontStyle: "normal",
                                    overflow: "hidden",
                                    width: "100%",
                                }}
                            ></input>
                            <p>How much would you like to top-up / repay each time?</p>
                            <input
                                style={{
                                    color: "rgba(51,51,51,1)",
                                    fontFamily: "Poppins-Bold",
                                    fontSize: "48px",
                                    fontWeight: "700",
                                    fontStyle: "normal",
                                    overflow: "hidden",
                                    width: "100%",
                                }}
                            ></input>
                            <br></br>
                            <br></br>
                            <RoundShapeButton
                                label={"CONFIRM"}
                                onClick={() => {
                                    console.log(`click add borrow`)
                                    navigate("/app/main/dashboard")
                                }}
                                color={"white"}
                            ></RoundShapeButton>
                        </div>
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
                        >
                        </DashboardCard>
                        <br></br>
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
                        >
                        </DashboardCard>
                    </Grid></Grid>
            </div>
        </>
    )
}


export default SmartVault1;
