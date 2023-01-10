import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import { makeStyles, withStyles } from '@mui/styles';
import {
    Button, Grid, Slider
} from '@mui/material';

import Widget from '../../components/Widget/Widget'
import NoBorderCard from '../../pages/manage/Card/NoBorderCard'

import { useAppSelector, useAppDispatch } from '../../hooks'

import { toggleLoading } from '../../slice/layoutSlice';
import CustDialog from "../../components/Dialog/CustDialog";

import { changeInputEthDeposit, changeInputBtcDebt } from '../../slice/loansharkSlice';
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'
import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'
import BorrwoingPowerButton from "src/components/Button/BorrowingPowerButton/BorrowingPowerButton";

import './SmartVault.scss'
import Repay from './Repay.svg';
import Topup from './Topup.svg';

import { refreshPrice } from '../../utils/API'

const CustomSlider = withStyles({
    rail: {
        backgroundImage:
            "linear-gradient(to right, #00dc5f, #8eb000, #b67f00, #c14812, #af003d)"
    },
    track: {
        backgroundImage:
            "linear-gradient(to right, #009d44, #637b00, #7e5600, #832d0d, #720028)"
    }
})(Slider);

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
    const [healthFactorPercentage, setHealthFactorPercentage] = useState<number>(0);

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
                alert(stateSmartvault.myProtectingSmartVault)
                if (stateSmartvault.myProtectingSmartVault == "BTC") {
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
                }

                if (stateSmartvault.myProtectingSmartVault == "ETH") {
                    let approveArgs = [
                        stateBackd.lpPoolEth.options.address,
                        window.web3.utils.toBN((stakeAmount * 1000000000000000000).toFixed(0)).toString()
                    ]

                    let args = [
                        window.web3.utils.toBN((stakeAmount * 1000000000000000000).toFixed(0)).toString(),
                    ];

                    let approveArgsForTopupAction = [
                        stateBackd.topupAction.options.address,
                        window.web3.utils.toBN((stakeAmount / stateBackd.ethLpExchangeRate * 1000000000000000000).toFixed(0)).toString()
                    ]

                    let argsRegister = [
                        state.myAccount + "000000000000000000000000",
                        "0x66756a6964616f65746800000000000000000000000000000000000000000000",
                        window.web3.utils.toBN((stakeAmount / stateBackd.ethLpExchangeRate * 1000000000000000000).toFixed(0)).toString(),
                        [
                            window.web3.utils.toBN(window.web3.utils.toWei((triggerHealthFactor).toString(), 'ether')).toString(),
                            "0",
                            "1",
                            "0x9668f5f55f2712Dd2dfa316256609b516292D554",
                            "0x22e9DEAB7fC35a85f4E33F88ff9012d4aF2d35f7",
                            window.web3.utils.toBN((singleTopupAmount * 0.9999 * 1000000000000000000).toFixed(0)).toString(),
                            window.web3.utils.toBN((stakeAmount * 0.9999 * 1000000000000000000).toFixed(0)).toString(),
                            window.web3.utils.toBN((stakeAmount * 0.9999 * 1000000000000000000).toFixed(0)).toString(),
                            "0x0000000000000000000000000000000000000000000000000000000000000000"
                        ]
                    ];

                    setModal(!modal);
                    dispatch(toggleLoading());

                    state.myETHContract.methods
                        .approve(...approveArgs)
                        .send({ from: state.myAccount })
                        .on("error", (error, receipt) => {
                            dispatch(toggleLoading());
                        })
                        .then((receipt) => {
                            stateBackd.lpPoolEth.methods
                                .deposit(...args)
                                .send({ from: state.myAccount })
                                .on("error", (error, receipt) => {
                                    dispatch(toggleLoading());
                                })
                                .then((receipt) => {
                                    stateBackd.lpTokenEth.methods
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
                }
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
                showCancel={true}
                modalTitle={modalTitle}
                modalMessage={modalMessage}
                // modalToken={modalToken}
                modalCancel={() => { setModal(!modal) }}
                modalConfirm={() => { modalConfirm(modalAction) }}
            // modalInputValue={modalInputValue}
            >
            </CustDialog>}
            <div style={{ paddingTop: "50px", width: "1260px", marginLeft: "auto", marginRight: "auto" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <span className={'card-title'}>Finalize your protection</span><span className={'card-subtitle'}> (4/4 steps)</span>
                    </Grid>
                    <Grid item xs={7}>
                        <div style={{ padding: '20px' }} className={`dashboard-card-layout`}>
                            <p>How much do you want to deposit to the smart vault?</p>
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
                                                                <span style={{ fontWeight: "800" }}>
                                                                    {
                                                                        stateSmartvault.myProtectingSmartVault == "ETH" ?
                                                                            Number(Number(state.myETHAmount).toFixed(2)).toLocaleString() + "ETH" :
                                                                            Number(Number(state.myBTCAmount).toFixed(2)).toLocaleString() + "BTC"
                                                                    }
                                                                </span>
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
                                                                            if (stateSmartvault.myProtectingSmartVault == "ETH") {
                                                                                setStakeAmount(state.myETHAmount)
                                                                            }
                                                                            if (stateSmartvault.myProtectingSmartVault == "BTC") {
                                                                                setStakeAmount(state.myBTCAmount)
                                                                            }
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
                            <p>Choose a health factor as the trigger? (Your current health factor: {Number(Number(calculateHealthFactor(
                                            state.userDepositBalanceEth,
                                            state.priceOfEth,
                                            state.LTV["ETHBTC"],
                                            state.userDebtBalanceBtc,
                                            state.priceOfBtc
                                        )).toFixed(2)).toLocaleString()})</p>
                            {/* <Grid item xs={12}>
                                <Grid container style={{
                                    borderRadius: "3px",
                                    display: "none",
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
                                                            display: "none",
                                                            overflow: "hidden",
                                                            width: "100%",
                                                            height: "100%",
                                                            border: "0px",
                                                            backgroundColor: "transparent",
                                                        }}
                                                        value={triggerHealthFactor}
                                                        onChange={(e) => {
                                                            setTriggerHealthFactor(e.target.value)
                                                        }}
                                                    ></input>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                            <Grid item xs={12}>
                                <div style={{ width: '100%' }}>
                                    <CustomSlider
                                        aria-label="healthFactor"
                                        defaultValue={1.05}
                                        value={healthFactorPercentage}
                                        onChange={(e: any) => {
                                            // console.log(e?.target?.value??0)
                                            setHealthFactorPercentage(e?.target?.value ?? 0)
                                        }}
                                        valueLabelDisplay="auto"
                                        step={0.01}
                                        marks
                                        min={1.05}
                                        max={1.65}
                                    ></CustomSlider>
                                   
                                </div>
                            </Grid>
                            <p>Choose the percentage of your deposit for automated protection each time</p>
                            <Grid item xs={12}>
                                <Grid container style={{
                                    borderRadius: "3px",
                                    border: "1px solid rgba(0,0,0, 0.15)"
                                }}>
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
                                                            paddingTop: "10px",
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
                                <Grid container spacing={1} justifyContent={'start'}>
                                    {[{
                                        value: 0.1,
                                        label: "10%",
                                    },
                                    {
                                        value: 0.2,
                                        label: "20%",
                                    },
                                    {
                                        value: 0.25,
                                        label: "25%",
                                    },
                                    {
                                        value: 0.5,
                                        label: "50%",
                                    },
                                    {
                                        value: 1,
                                        label: "100%",
                                    }].map((item) => {
                                        return (
                                            <Grid item key={item.value}>
                                                <BorrwoingPowerButton label={item.label} value={item.value}
                                                    onClick={(e: any) => {
                                                        console.log(item)
                                                        console.log(item.value)

                                                        console.log(e.target.value)

                                                        if (stateSmartvault.myProtectingSmartVault == "ETH") {
                                                            // Number(state.myETHAmount)*item.value
                                                            setSingleTopupAmount(Number(stakeAmount) * item.value)
                                                        } else {
                                                            setSingleTopupAmount(Number(stakeAmount) * item.value)
                                                            // Number(state.myBTCAmount)*item.value
                                                            // Number(Number(state.myBTCAmount).toFixed(2)).toLocaleString() + "BTC"
                                                        }




                                                        // let borrowPower = Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit);
                                                        // borrowPower = borrowPower * stateLoanshark.priceOfEth;
                                                        // borrowPower = borrowPower * stateLoanshark.LTV["ETHBTC"];
                                                        // borrowPower = borrowPower * stateLoanshark.liquidationPrice["ETHBTC"];
                                                        // borrowPower = borrowPower / stateLoanshark.priceOfBtc;
                                                        // borrowPower = borrowPower - stateLoanshark.userDebtBalanceBtc;

                                                        // dispatch(changeInputBtcDebt(borrowPower * parseFloat(item) / 100));
                                                    }}></BorrwoingPowerButton>
                                            </Grid>
                                        )
                                    })}
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
                                        (isNaN(triggerHealthFactor) ?
                                            "Please enter a valid health factor"
                                            : triggerHealthFactor < 1.05 ?
                                                "Please set the target health factor higher than 1.05"
                                                :
                                                singleTopupAmount > stakeAmount ?
                                                    "Please deposit more than the amount to repay for you each time the target heath factor is hit."
                                                    :
                                                    stakeAmount > state.myBTCAmount ?
                                                        "You do not have " + stakeAmount + " " + stateSmartvault.myProtectingSmartVault + " to stake. You have " + (stateSmartvault.myProtectingSmartVault == "BTC" ? state.myBTCAmount : state.myETHAmount) + " " + stateSmartvault.myProtectingSmartVault + " only."
                                                        :
                                                        "When the health factor drops below <span style='color: #00ff00'>" + triggerHealthFactor + "</span>, " +
                                                        "it will be topped up with <span class='fw-bold'>" + singleTopupAmount + " " + stateSmartvault.myProtectingSmartVault + " (~" + Number((singleTopupAmount * (stateSmartvault.myProtectingSmartVault == "BTC" ? state.priceOfBtc : state.priceOfEth) / 100).toFixed(8)) + ")</span>. " +
                                                        "This will be repeated each time the health factor drops below <span style='color: #00ff00'>" + triggerHealthFactor + "</span>, " +
                                                        "until a total of <span class='fw-bold'>" + stakeAmount + " " + stateSmartvault.myProtectingSmartVault + "  (~$" + Number((stakeAmount * (stateSmartvault.myProtectingSmartVault == "BTC" ? state.priceOfBtc : state.priceOfEth) / 100).toFixed(8)) + ")</span> is topped up."
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
                                        title: "Net APY",
                                        value: Number((
                                            (
                                                (state.aaveEthDepositRate) / 100 * (state.userDepositBalanceEth * state.priceOfEth / 100)
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
