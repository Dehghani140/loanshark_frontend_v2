import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import {
    Button, Grid
} from '@mui/material';

import Widget from '../../components/Widget/Widget'
import NoBorderCard from '../../pages/manage/Card/NoBorderCard'

import { useAppSelector, useAppDispatch } from '../../hooks'

import { toggleLoading } from '../../slice/layoutSlice';
import CustDialog from "../../components/Dialog/CustDialog";

import { changeInputEthDeposit, changeInputBtcDebt } from '../../slice/loansharkSlice';
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'

import './SmartVault.scss'
import Repay from './Repay.svg';
import Topup from './Topup.svg';

import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'

import { refreshPrice } from '../../utils/API'

function SmartVault1() {
    let navigate = useNavigate();
    useEffect(() => {
        console.log(`SmartVault1`)
    }, [])

    function calculateHealthFactor(depositAmouont, priceOfDeposite, LTV, debtAmount, priceOfDebt) {
        if (debtAmount === undefined || debtAmount === null || debtAmount === 0) {
            return "-";
        }
        return ((depositAmouont * priceOfDeposite / 100) * LTV / (debtAmount * priceOfDebt / 100)).toFixed(2)
    }
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state.loanshark)
    const stateBackd = useAppSelector((state) => state.backd)
    const stateSmartvault = useAppSelector((state) => state.smartvault)

    const [modal, setModal] = useState<boolean>(false);
    const [modalAction, setModalAction] = useState<any>("");
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalToken, setModalToken] = useState<string>("");
    const [modalInputValue, setModalInputValue] = useState<any>("");


    const [triggerHealthFactor, setTriggerHealthFactor] = useState<any>(0);
    const [singleTopupAmount, setSingleTopupAmount] = useState<any>(0);
    const [stakeAmount, setStakeAmount] = useState<any>(0);

    const toggleNoAction = (inputModalToken, inputModalTitle, inputModalMessage, pair) => {
        setModal(!modal);
        setModalToken(inputModalToken);
        setModalAction("NOACTION");
        setModalTitle(inputModalTitle);
        setModalMessage(inputModalMessage);
        setModalInputValue(0);
    }

    const toggleAction = (inputModalToken, inputModalAction, inputModalTitle, inputModalMessage, pair, inputValue) => {
        setModal(!modal);
        setModalToken(inputModalToken);
        setModalAction(inputModalAction);
        setModalTitle(inputModalTitle);
        setModalMessage(inputModalMessage);
        setModalInputValue(inputValue);
    }

    const modalConfirm = (modalAction: string) => {
        switch (modalAction) {
            case "STAKESMARTVAULT":
                let approveArgs = [
                    stateBackd.lpPoolBtc.options.address,
                    window.web3.utils.toBN((stakeAmount * 100000000).toFixed(0)).toString()
                ]

                let args = [
                    window.web3.utils.toBN((stakeAmount * 100000000).toFixed(0)).toString(),
                ];

                let approveArgsForTopupAction = [
                    stateBackd.topupAction.options.address,
                    window.web3.utils.toBN((stakeAmount / stateBackd.btcLpExchangeRate * 100000000).toFixed(0)).toString()
                ]

                let argsRegister = [
                    state.myAccount + "000000000000000000000000",
                    "0x66756a6964616f00000000000000000000000000000000000000000000000000",
                    window.web3.utils.toBN((stakeAmount / stateBackd.btcLpExchangeRate * 100000000).toFixed(0)).toString(),
                    [
                        window.web3.utils.toBN(window.web3.utils.toWei((triggerHealthFactor).toString(), 'ether')).toString(),
                        "0",
                        "1",
                        "0x9c1dcacb57ada1e9e2d3a8280b7cfc7eb936186f",
                        "0x9f2b4eeb926d8de19289e93cbf524b6522397b05",
                        window.web3.utils.toBN((singleTopupAmount * 0.9999 * 100000000).toFixed(0)).toString(),
                        window.web3.utils.toBN((stakeAmount * 0.9999 * 100000000).toFixed(0)).toString(),
                        window.web3.utils.toBN((stakeAmount * 0.9999 * 100000000).toFixed(0)).toString(),
                        "0x0000000000000000000000000000000000000000000000000000000000000001"
                    ]
                ];

                setModal(!modal);
                dispatch(toggleLoading());

                state.myBTCContract.methods
                    .approve(...approveArgs)
                    .send({ from: state.myAccount })
                    .on("error", (error, receipt) => {
                        dispatch(toggleLoading());
                    })
                    .then((receipt) => {
                        stateBackd.lpPoolBtc.methods
                            .deposit(...args)
                            .send({ from: state.myAccount })
                            .on("error", (error, receipt) => {
                                dispatch(toggleLoading());
                            })
                            .then((receipt) => {
                                stateBackd.lpTokenBtc.methods
                                    .approve(...approveArgsForTopupAction)
                                    .send({ from: state.myAccount })
                                    .on("error", (error, receipt) => {
                                        dispatch(toggleLoading());
                                    })
                                    .then((receipt) => {
                                        stateBackd.topupAction.methods
                                            .register(...argsRegister)
                                            .send({ from: state.myAccount, value: 1000000000000 })
                                            .on("error", (error, receipt) => {
                                                dispatch(toggleLoading());
                                            })
                                            .then((receipt) => {
                                                dispatch(toggleLoading());
                                                refreshPrice(state, stateBackd, dispatch, "GET_NEW");
                                            })
                                    })
                            })
                    })
                break;
            case "NOACTION":
                break;
            default:
                break;
        }
    }

    return (
        <>
            {<CustDialog
                modal={modal}
                showConfirm={(modalAction !== "NOACTION")}
                modalTitle={modalTitle}
                modalMessage={modalMessage}
                modalToken={modalToken}
                modalCancel={() => { setModal(!modal) }}
                modalConfirm={() => { modalConfirm(modalAction) }}
                modalInputValue={modalInputValue}>
            </CustDialog>}
            <div style={{ paddingTop: "50px", paddingRight: "20%", paddingLeft: "20%" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <span className={'card-title'}>Protection Setup</span><span className={'card-subtitle'}> (4/4 steps)</span>
                    </Grid>
                    <Grid item xs={7}>
                        <div style={{ padding: '20px' }} className={`dashboard-card-layout`}>
                            <p>How much would you like to stake to smart vault?</p>
                            <Grid item xs={12}>
                                <Grid container style={{
                                    borderRadius: "3px",
                                    border: "1px solid rgba(0,0,0, 0.15)",
                                }}
                                >
                                    <Grid item xs={12}>
                                        <div style={{ padding: "10px" }}>
                                            <Grid container>
                                                <Grid item xs={7}>
                                                    <input
                                                        style={{
                                                            color: "rgba(51,51,51,1)",
                                                            fontFamily: "poppins",
                                                            fontSize: "48px",
                                                            fontWeight: "700",
                                                            fontStyle: "normal",
                                                            overflow: "hidden",
                                                            width: "100%",
                                                            height: "100%",
                                                            border: "0px",
                                                            backgroundColor: "transparent",
                                                        }}
                                                        value={stakeAmount}
                                                        onChange={(e) => {
                                                            setStakeAmount(e.target.value)
                                                        }}
                                                    ></input>
                                                </Grid>
                                                <Grid item xs={5}>

                                                    <Grid container>
                                                        <Grid item xs={12}>
                                                            <div style={{
                                                                padding: "5px",
                                                                textAlign: "end",
                                                            }}>
                                                                <span>Balance: </span>
                                                                <span style={{ fontWeight: "800" }}>{Number(Number(state.myETHAmount).toFixed(2)).toLocaleString()} ETH</span>
                                                            </div>

                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Grid container justifyContent={'end'} alignItems={'center'} spacing={2}>
                                                                <Grid item>
                                                                    <Button style={{
                                                                        backgroundColor: "white",
                                                                        color: "black",
                                                                        borderRadius: "4px",
                                                                        border: "1px solid black",
                                                                        padding: "0px",
                                                                    }}

                                                                        onClick={() => {
                                                                            setStakeAmount(state.myETHAmount)
                                                                        }}
                                                                    >MAX</Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <p>At which health factor would you like to use smart vault?</p>
                            <Grid item xs={12}>
                                <Grid container style={{
                                    borderRadius: "3px",
                                    border: "1px solid rgba(0,0,0, 0.15)",
                                }}
                                >
                                    <Grid item xs={12}>
                                        <div style={{ padding: "10px" }}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <input
                                                        style={{
                                                            color: "rgba(51,51,51,1)",
                                                            fontFamily: "poppins",
                                                            fontSize: "48px",
                                                            fontWeight: "700",
                                                            fontStyle: "normal",
                                                            overflow: "hidden",
                                                            width: "100%",
                                                            height: "100%",
                                                            border: "0px",
                                                            backgroundColor: "transparent",
                                                        }}
                                                        value={triggerHealthFactor}
                                                        onChange={(e) => {
                                                            setTriggerHealthFactor(Number(e.target.value))
                                                        }}
                                                    ></input>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <p>How much would you like to top-up / repay each time?</p>
                            <Grid item xs={12}>
                                <Grid container style={{
                                    borderRadius: "3px",
                                    border: "1px solid rgba(0,0,0, 0.15)",
                                }}
                                >
                                    <Grid item xs={12}>
                                        <div style={{ padding: "10px" }}>
                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <input
                                                        style={{
                                                            color: "rgba(51,51,51,1)",
                                                            fontFamily: "poppins",
                                                            fontSize: "48px",
                                                            fontWeight: "700",
                                                            fontStyle: "normal",
                                                            overflow: "hidden",
                                                            width: "100%",
                                                            height: "100%",
                                                            border: "0px",
                                                            backgroundColor: "transparent",
                                                        }}
                                                        value={singleTopupAmount}
                                                        onChange={(e) => {
                                                            setSingleTopupAmount(e.target.value)
                                                        }}
                                                    ></input>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <RoundShapeButton
                                label={"CONFIRM"}
                                onClick={() => {
                                    console.log(`stake smart vault`)
                                    toggleAction(
                                        stateSmartvault.myProtectingSmartVault,
                                        (triggerHealthFactor < 1.05 || singleTopupAmount > stakeAmount || stakeAmount > state.myBTCAmount ?
                                            "NOACTION" : "STAKESMARTVAULT"),
                                        (triggerHealthFactor < 1.05 || singleTopupAmount > stakeAmount || stakeAmount > state.myBTCAmount ?
                                            "Cannot add Smart Vault" : "Confirm to add Smart Vault?"),
                                        (triggerHealthFactor < 1.05 ?
                                            "Please set the target health factor higher than 1.05"
                                            :
                                            singleTopupAmount > stakeAmount ?
                                                "Please deposit more than the amount to repay for you each time the target heath factor is hit."
                                                :
                                                stakeAmount > state.myBTCAmount ?
                                                    "You do not have " + stakeAmount + " BTC to stake. You have " + state.myBTCAmount + " BTC only."
                                                    :
                                                    "When the health factor drops below <span style='color: #00ff00'>" + triggerHealthFactor + "</span>, " +
                                                    "it will be topped up with <span class='fw-bold'>" + singleTopupAmount + " BTC (~" + Number((singleTopupAmount * state.priceOfBtc / 100).toFixed(8)) + ")</span>. " +
                                                    "This will be repeated each time the health factor drops below <span style='color: #00ff00'>" + triggerHealthFactor + "</span>, " +
                                                    "until a total of <span class='fw-bold'>" + stakeAmount + " BTC (~$" + Number((stakeAmount * state.priceOfBtc / 100).toFixed(8)) + ")</span> is topped up."
                                        ),
                                        stateSmartvault.myProtectingPair,
                                        0
                                    )
                                }}
                                color={"white"}
                            ></RoundShapeButton>
                        </div>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid hidden={!(stateSmartvault.myProtectingPair === "ETHBTC" && stateSmartvault.myProtectionType === "repay")} item xs={12}>
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
                                    ]
                                }
                            >
                            </DashboardCard>
                        </Grid>
                        <Grid hidden={!(stateSmartvault.myProtectingPair === "ETHBTC" && stateSmartvault.myProtectionType === "topup")} item xs={12}>
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
                                    ]
                                }
                            >
                            </DashboardCard>
                        </Grid>
                        <br></br>
                        <DashboardCard
                            label={`ETH/BTC`}
                            labelInUSD={"$" + (stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * (state.priceOfEth / 100) + stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * (state.priceOfBtc / 100)).toFixed(2)}
                            numberOfAssest={2}
                            assest1Code={`eth`}
                            assest2Code={`btc`}
                            pair={
                                [
                                    {
                                        amountInUsdt: Number((state.userDepositBalanceEth * state.priceOfEth / 100).toFixed(2)).toLocaleString(),
                                        amountInCurrency: Number(Number(state.userDepositBalanceEth).toFixed(2)).toLocaleString(),
                                        currency: "ETH",
                                    },
                                    {
                                        amountInUsdt: Number((state.userDebtBalanceBtc * state.priceOfBtc / 100).toFixed(2)).toLocaleString(),
                                        amountInCurrency: Number(Number(state.userDebtBalanceBtc).toFixed(2)).toLocaleString(),
                                        currency: "BTC",
                                    },
                                ]
                            }
                            detail={
                                [
                                    {
                                        title: "Collateral",
                                        value: "$" + Number((state.userDepositBalanceEth * state.priceOfEth / 100).toFixed(2)).toLocaleString() + " / " + Number(Number(state.userDepositBalanceEth).toFixed(2)).toLocaleString() + " ETH"
                                    },
                                    {
                                        title: "Debt",
                                        value: "$" + Number((state.userDebtBalanceBtc * state.priceOfBtc / 100).toFixed(2)).toLocaleString() + " / " + Number(Number(state.userDebtBalanceBtc).toFixed(2)).toLocaleString() + " BTC"
                                    },
                                    {
                                        title: "APY",
                                        value: Number((
                                            (
                                                0.0103 * (state.userDepositBalanceEth * state.priceOfEth / 100)
                                                - state.aaveBtcBorrowRate / 100 * (state.userDebtBalanceBtc * state.priceOfBtc / 100)
                                                + 0.054 * (stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100)
                                            ) / (state.userDepositBalanceEth * state.priceOfEth / 100) * 100
                                        ).toFixed(2)).toLocaleString() + "%"
                                    },
                                    {
                                        title: "Health Factor",
                                        value: Number(Number(calculateHealthFactor(
                                            state.userDepositBalanceEth,
                                            state.priceOfEth,
                                            state.LTV["ETHBTC"],
                                            state.userDebtBalanceBtc,
                                            state.priceOfBtc
                                        )).toFixed(2)).toLocaleString()
                                    },
                                    {
                                        title: "Smart Vault",
                                        value: "$" + Number((stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * (state.priceOfEth / 100) + stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * (state.priceOfBtc / 100)).toFixed(2)).toLocaleString()
                                    },
                                    {
                                        title: "Provider",
                                        value: "AAVE"
                                    },
                                ]
                            }
                            button={[
                            ]}
                        >
                        </DashboardCard>
                    </Grid></Grid>
            </div>
        </>
    )
}


export default SmartVault1;
