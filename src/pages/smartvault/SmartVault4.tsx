import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';

import Widget from '../../components/Widget/Widget'

import { useAppSelector, useAppDispatch } from '../../hooks'

import { toggleLoading } from '../../slice/layoutSlice';
import CustDialog from "../../components/Dialog/CustDialog";

import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'

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


	const [triggerHealthFactor, setTriggerHealthFactor] = useState<number>(0);
	const [singleTopupAmount, setSingleTopupAmount] = useState<number>(0);
	const [stakeAmount, setStakeAmount] = useState<number>(0);

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

	const modalConfirm = (modalAction : string) => {
		switch(modalAction) {
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
				modalCancel={()=> {setModal(!modal)}} 
				modalConfirm={() => {modalConfirm(modalAction)}}
				modalInputValue={modalInputValue}>
			</CustDialog>}
            <div style={{ paddingRight: "20%", paddingLeft: "20%" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <p>Protection Setup (4/4 steps)</p>

                    </Grid>
                    <Grid item xs={7}>
                        <div style={{ backgroundColor: '#ffffff', padding: '20px' }}>
                            <p>How much would you like to stake to smart vault?</p>
                            <input
                                value={stakeAmount}
                                onChange={(e) => {
                                    setStakeAmount(Number(e.target.value))
                                }}
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
                                value={triggerHealthFactor}
                                onChange={(e) => {
                                    setTriggerHealthFactor(Number(e.target.value))
                                }}
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
                                value={singleTopupAmount}
                                onChange={(e) => {
                                    setSingleTopupAmount(Number(e.target.value))
                                }}
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
                                            stakeAmount >state.myBTCAmount ?
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
                                        amountInUsdt: (state.userDepositBalanceEth * state.priceOfEth / 100).toFixed(2),
                                        amountInCurrency: state.userDepositBalanceEth,
                                        currency: "ETH",
                                    },
                                    {
                                        amountInUsdt: (state.userDebtBalanceBtc * state.priceOfBtc / 100).toFixed(2),
                                        amountInCurrency: state.userDebtBalanceBtc,
                                        currency: "BTC",
                                    },
                                ]
                            }
                            detail={
                                [
                                    {
                                        title: "Collateral",
                                        value: "$" + (state.userDepositBalanceEth * state.priceOfEth / 100).toFixed(2) + "/" + state.userDepositBalanceEth + " ETH"
                                    },
                                    {
                                        title: "Debt",
                                        value: "$" + (state.userDebtBalanceBtc * state.priceOfBtc / 100).toFixed(2) + "/" + state.userDebtBalanceBtc + " BTC"
                                    },
                                    {
                                        title: "APY",
                                        value: (
                                            (
                                                0.0103 * (state.userDepositBalanceEth * state.priceOfEth / 100)
                                                - state.aaveBtcBorrowRate / 100 * (state.userDebtBalanceBtc * state.priceOfBtc / 100)
                                                + 0.054 * (stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100)
                                            ) / (state.userDepositBalanceEth * state.priceOfEth / 100) * 100
                                        ).toString() + "%"
                                    },
                                    {
                                        title: "Health Factor",
                                        value: calculateHealthFactor(
                                            state.userDepositBalanceEth,
                                            state.priceOfEth,
                                            state.LTV["ETHBTC"],
                                            state.userDebtBalanceBtc,
                                            state.priceOfBtc
                                        )
                                    },
                                    {
                                        title: "Smart Vault",
                                        value: "$" + (stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * (state.priceOfEth / 100) + stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * (state.priceOfBtc / 100)).toFixed(2)
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
