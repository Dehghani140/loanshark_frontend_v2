import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Grid } from '@mui/material';
import Chart from 'react-apexcharts'
import Widget from '../../components/Widget/Widget'
import NoBorderCard from '../../pages/manage/Card/NoBorderCard'
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'
import '../../App.scss'
import './Borrow.scss'
import BorrwoingPowerButton from "src/components/Button/BorrowingPowerButton/BorrowingPowerButton";

import { useAppSelector, useAppDispatch } from '../../hooks'
import { toggleLoading } from '../../slice/layoutSlice';
import CustDialog from "../../components/Dialog/CustDialog";
import { changeInputEthDeposit, changeInputBtcDebt } from '../../slice/loansharkSlice';
import { refreshPrice } from '../../utils/API'

const options = {
	chart: {
		id: 'apexchart-example',
		width: '70%'
	},
	grid: {
		show: false,
	},
	plotOptions: {
		bar: {
			horizontal: true,
			columnWidth: '30%',
			barHeight: '50%',
		}
	},
	xaxis: {
		categories: ["ETH", "BTC"],
		labels: {
			show: true,
			maxHeight: 100,
			style: {
				fontSize: '12px',
				fontFamily: 'Helvetica, Arial, sans-serif',
				fontWeight: 400,
			},
		},
	},
	series: [{
		data: [{
			x: 'ETH',
			y: 1500,
			fillColor: '#72BFFC',
			//   strokeColor: '#C23829'
		}, {
			x: 'BTC',
			y: 400,
			fillColor: '#5EC7B6',

		}]
	}],
	tooltip: {
		enabled: false,
	}
}


const lightTheme = {
	primary: '#fff',
	text: '#000',
	fontFamily: 'Segoe UI'
}
const darkTheme = {
	primary: '#000',
	text: '#fff',
	fontFamily: 'Segoe UI'
}



function Borrow() {
	const state = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)
	const dispatch = useAppDispatch();
	
	const [modal, setModal] = useState<boolean>(false);
	const [modalAction, setModalAction] = useState<any>("");
	const [modalTitle, setModalTitle] = useState<string>("");
	const [modalMessage, setModalMessage] = useState<string>("");
	const [modalToken, setModalToken] = useState<string>("");
	const [modalInputValue, setModalInputValue] = useState<any>("");

	const calculateHealthFactor = (depositAmouont, priceOfDeposite, LTV, debtAmount, priceOfDebt) => {
		if (debtAmount === undefined || debtAmount === null || debtAmount === 0) {
			return 0;
		}
		return ((depositAmouont * priceOfDeposite / 100) * LTV / (debtAmount * priceOfDebt / 100)).toFixed(2)
	}

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
		let args = [];
		let argsUnregister = [];
		var finalModalInputValue;
		switch(modalAction) {
			case "DEPOSITANDBORROW":
				let approveArgs = [
					state.myFujiVaultETHBTC.options.address,
					window.web3.utils.toBN(window.web3.utils.toWei(state.inputEthDeposit, 'ether')).toString()
				]

				let args = [
					window.web3.utils.toBN(window.web3.utils.toWei(state.inputEthDeposit, 'ether')).toString(),
					window.web3.utils.toBN(parseFloat((state.inputBtcDept * 100000000).toFixed(0))).toString()
				]

				setModal(!modal);
				dispatch(toggleLoading());

				state.myETHContract.methods
					.approve(...approveArgs)
					.send({ from: state.myAccount })
					.on("error", (error, receipt) => {
						dispatch(toggleLoading());
					})
					.then((receipt) => {
						state.myFujiVaultETHBTC.methods
							.depositAndBorrow(...args)
							.send({ from: state.myAccount })
							.on("error", (error, receipt) => {
								dispatch(toggleLoading());
							})
							.then((receipt) => {
								dispatch(toggleLoading());
								dispatch(changeInputEthDeposit(0));
								dispatch(changeInputBtcDebt(0));

								refreshPrice(state, stateBackd, dispatch, "GET_NEW");
							});
					});
				break;
			case "NOACTION": 
				break;
			default:
				break;
		}
	}

    const depositWETHAndBorrowWBTC = () => {
        if (state.myETHContract) {
            let newHealthFactor =
                calculateHealthFactor(
                    Number(state.userDepositBalanceEth) + Number(state.inputEthDeposit),
                    state.priceOfEth,
                    state.LTV["ETHBTC"],
                    Number(state.userDebtBalanceBtc) + Number(state.inputBtcDept),
                    state.priceOfBtc);

            var modalTitle = '';
            var modalMessage = '';
            var error = false;
            if (state.inputEthDeposit <= 0 || isNaN(state.inputEthDeposit)) {
                error = true;
                modalTitle = 'Unable to borrow BTC using ETH as collateral';
                modalMessage = 'Please enter the amount that you want to deposit.';
            } else if (state.inputBtcDept <= 0 || isNaN(state.inputBtcDept)) {
                error = true;
                modalTitle = 'Unable to borrow BTC using ETH as collateral';
                modalMessage = 'Please enter the amount that you want to borrow.';
            } else if (Number(state.inputEthDeposit) > state.myETHAmount) {
                error = true;
                modalTitle = 'Unable to borrow BTC using ETH as collateral';
                modalMessage = 'You do not have enough ETH to deposit.';
            } else if (newHealthFactor < 1.06) {
                error = true;
                modalTitle = 'Unable to borrow BTC using ETH as collateral';
                modalMessage = 'You are unable to deposit <span class="fw-bold">' +
					state.inputEthDeposit + ' ETH ' +
                    ' (~$' +
                    Number(state.inputEthDeposit * state.priceOfEth / 100).toFixed(2) +
                    ')</span>. ' +
                    ' and borrow <span class="fw-bold">' +
                    state.inputBtcDept + ' BTC ' +
                    ' (~$' +
                    Number(state.inputBtcDept * state.priceOfBtc / 100).toFixed(2) +
                    ')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05';
            } else {
                modalTitle = 'Confirm to borrow BTC using ETH as collateral?';
                modalMessage = 'You are depositing <span class="fw-bold">' +
					state.inputEthDeposit + ' ETH ' +
                    ' (~$' +
                    Number(state.inputEthDeposit * state.priceOfEth / 100).toFixed(2) +
                    ')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.';
                modalMessage = 'You are depositing <span class="fw-bold">' +
					state.inputEthDeposit + ' ETH ' +
                    ' (~$' +
                    Number(state.inputEthDeposit * state.priceOfEth / 100).toFixed(2) +
                    ')</span> ' +
                    ' and borrowing <span class="fw-bold">' +
                    state.inputBtcDept + ' BTC ' +
                    ' (~$' +
                    Number(state.inputBtcDept * state.priceOfBtc / 100).toFixed(2) +
                    ')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.';
            }

			setModal(!modal);
			setModalToken("ETHBTC");
			setModalAction(error? "NOACTION" : "DEPOSITANDBORROW");
			setModalTitle(modalTitle);
			setModalMessage(modalMessage);
			setModalInputValue(0);
        }
    }

	useEffect(() => {
		console.log(`Borrow`)
	}, [])
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
			<div className={'main-content-layout'}>
				<Grid container spacing={3}>
					<Grid item xs={7}>
						<Grid container>
							<Grid item xs={12}>
								<NoBorderCard>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<span className={`borrow-card-trade-titile`}>Deposit ETH and Borrow BTC</span>
										</Grid>
										<Grid item xs={12}>
											<span className={`borrow-card-trade-titile`}>{state.inputEthDeposit} ETH as collateral to borrow {state.inputBtcDept} BTC</span>
										</Grid>
										<Grid item xs={12}>
											<Grid container style={{
												borderRadius: "3px",
												border: "1px solid rgba(0,0,0, 0.15)",
											}}
											>
												<Grid item xs={12}>
													<div style={{ padding: "10px" }}>
														<Grid container>
															<Grid item xs={8}>
																<input
																	style={{
																		color: "rgba(51,51,51,1)",
																		fontFamily: "Poppins-Bold",
																		fontSize: "48px",
																		fontWeight: "700",
																		fontStyle: "normal",
																		overflow: "hidden",
																		width: "100%",
																		height: "100%",
																		border: "0px",
																		backgroundColor: "transparent",
																	}}
																	value={state.inputEthDeposit}
																	onChange={(e) => {
																		dispatch(changeInputEthDeposit( e.target.value))
																	}}
																></input>
															</Grid>
															<Grid item xs={4}>

																<Grid container>
																	<Grid item xs={12}>
																		<div style={{
																			padding: "5px",
																			textAlign: "end",
																		}}>
																			<span>Balance: </span>
																			<span style={{ fontWeight: "800" }}>{state.myETHAmount} ETH</span>
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
																					dispatch(changeInputEthDeposit(state.myETHAmount))
																				}}
																				>MAX</Button>
																			</Grid>
																			<Grid item>
																				<Button style={{
																					backgroundColor: "white",
																					color: "black",
																					padding: "0px",
																				}}
																				>
																					<div style={{
																						border: "1px solid black",
																						borderRadius: "20px",
																						textAlign: "center",
																					}}>
																						<div style={{
																							padding: "3px 10px",
																						}}>
																							<Grid container alignContent={'center'}>
																								<Grid item>
																									<img style={{
																										width: "20px",
																										height: "20px"
																									}}
																										src={`/assets/icon/eth-logo.svg`} alt="" />
																								</Grid>
																								<Grid item>
																									<span>ETH</span>
																								</Grid>
																							</Grid>
																						</div>
																					</div>
																				</Button>
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
										<Grid item xs={12}>
											<Grid container justifyContent={'center'}>
												<Grid item>
													<span style={{ fontSize: '24px' }}>↓</span>
												</Grid>
											</Grid>

										</Grid>
										<Grid item xs={12}>
											<Grid container style={{
												borderRadius: "3px",
												border: "1px solid rgba(0,0,0, 0.15)",
											}}
											>
												<Grid item xs={12}>
													<div style={{ padding: "10px" }}>
														<Grid container>
															<Grid item xs={8}>
																<input
																	style={{
																		color: "rgba(51,51,51,1)",
																		fontFamily: "Poppins-Bold",
																		fontSize: "48px",
																		fontWeight: "700",
																		fontStyle: "normal",
																		overflow: "hidden",
																		width: "100%",
																		height: "100%",
																		border: "0px",
																		backgroundColor: "transparent",
																	}}
																	value={state.inputBtcDept}
																	onChange={(e) => {
																		dispatch(changeInputBtcDebt(e.target.value))
																	}}
																></input>
															</Grid>
															<Grid item xs={4}>

																<Grid container>
																	<Grid item xs={12}>
																		<div style={{
																			padding: "5px",
																			textAlign: "end",
																		}}>
																			<span>Borrow Power: </span>
																			<span style={{ fontWeight: "800" }}>{
																				((Number(state.userDepositBalanceEth) + Number(state.inputEthDeposit))
																				* state.priceOfEth
																				* state.LTV["ETHBTC"]
																				* state.liquidationPrice["ETHBTC"]
																				/ state.priceOfBtc)
																				 - state.userDebtBalanceBtc
																			} BTC</span>
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
																					let borrowPower = Number(state.userDepositBalanceEth) + Number(state.inputEthDeposit);
																					borrowPower = borrowPower * state.priceOfEth;
																					borrowPower = borrowPower * state.LTV["ETHBTC"];
																					borrowPower = borrowPower * state.liquidationPrice["ETHBTC"];
																					borrowPower = borrowPower / state.priceOfBtc;
																					borrowPower = borrowPower - state.userDebtBalanceBtc;
																					dispatch(changeInputBtcDebt(borrowPower));
																				}}
																				>MAX</Button>
																			</Grid>
																			<Grid item>
																				<Button style={{
																					backgroundColor: "white",
																					color: "black",
																					padding: "0px",
																				}}
																				>
																					<div style={{
																						border: "1px solid black",
																						borderRadius: "20px",
																						textAlign: "center",
																					}}>
																						<div style={{
																							padding: "3px 10px",
																						}}>
																							<Grid container alignContent={'center'}>
																								<Grid item>
																									<img style={{
																										width: "20px",
																										height: "20px"
																									}}
																										src={`/assets/icon/eth-logo.svg`} alt="" />
																								</Grid>
																								<Grid item>
																									<span>ETH</span>
																								</Grid>
																							</Grid>
																						</div>
																					</div>
																				</Button>
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
										<Grid item xs={12}>
											<Grid container justifyContent={'space-between'}>
												<Grid item>
													<span className={`borrow-card-trade-borrow-power-text`}>Borrowing Power:</span>
												</Grid>
												<Grid item>
													<Grid container spacing={1}>
														{["25%", "50%", "75%", "90%"].map((item) => {
															return (
																<Grid item key={item}>
																	<BorrwoingPowerButton label={item}
																	onClick={() => {
																		let borrowPower =  Number(state.userDepositBalanceEth) + Number(state.inputEthDeposit);
																		borrowPower = borrowPower * state.priceOfEth;
																		borrowPower = borrowPower * state.LTV["ETHBTC"];
																		borrowPower = borrowPower * state.liquidationPrice["ETHBTC"];
																		borrowPower = borrowPower / state.priceOfBtc;
																		borrowPower = borrowPower - state.userDebtBalanceBtc;

																		dispatch(changeInputBtcDebt(borrowPower * parseFloat(item) / 100));
																	}}></BorrwoingPowerButton>
																</Grid>
															)
														})}
													</Grid>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<RoundShapeButton
												label={"deposit and borrow"}
												onClick={() => { 
													depositWETHAndBorrowWBTC();
												}}
												color={"white"}
											></RoundShapeButton>
										</Grid>
									</Grid>
								</NoBorderCard>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={5}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<NoBorderCard>
									<Grid container>
										<Grid item xs={12}>
											<span style={{
												color: "rgba(38,38,38,1)",
												fontFamily: "ClashDisplay-Semibold",
												fontSize: "18px",
												fontWeight: "600",
												fontStyle: "normal",
											}}>Deposited, Borrowed,Health Factor</span>
										</Grid>
										<Grid item xs={12}>
											<div style={{ width: "100%", textAlign: 'center' }}>
												<span className={`health-factor-label`}>Health Factor </span>
												<span className={`health-factor-value`}>{calculateHealthFactor(
															Number(state.userDepositBalanceEth) + Number(state.inputEthDeposit),
															state.priceOfEth,
															state.LTV["ETHBTC"],
															Number(state.userDebtBalanceBtc) + Number(state.inputBtcDept),
															state.priceOfBtc)}</span>
											</div>

										</Grid>
										<Grid item xs={12}>
											<Chart options={options} series={options.series} type="bar" height={180} />
										</Grid>
									</Grid>
								</NoBorderCard>
							</Grid>
							<Grid item xs={12}>
							<NoBorderCard>
									<Grid container>
									{[{
											title: "Current Price of ETH:",
											value: state.priceOfEth / 100,
											textColor: "black",
										},
										{
											title: "Current Price of BTC:",
											value: state.priceOfBtc / 100,
											textColor: "black",
										},
										{
											title: "LTV:",
											value: `${(state.LTV[state.selectedPair] * state.liquidationPrice[state.selectedPair] * 100).toFixed(2)} %`,
											textColor: "black",
										},
										{
											title: "Max Borrow Power:",
											value: `${((Number(state.userDepositBalanceEth) + Number(state.inputEthDeposit))
												* state.priceOfEth
												* state.LTV["ETHBTC"]
												* state.liquidationPrice["ETHBTC"]
												/ state.priceOfBtc)
												 - state.userDebtBalanceBtc} BTC`,
											textColor: "black",
										},
										{
											title: "Liquidity Threshold:",
											value: `${(state.LTV[state.selectedPair] * 100).toFixed(2)} %`,
											textColor: "black",
										},
										{
											title: "Liquidation Price of ETH:",
											value: `${((Number(state.userDebtBalanceBtc) + Number(state.inputBtcDept))
												* (state.priceOfBtc) / 100
												/ (Number(state.userDepositBalanceEth) + Number(state.inputEthDeposit))
												/ state.LTV["ETHBTC"]).toFixed(2)}`,
											textColor: "blue",
										},
										].map((item, index) => {
											return (
												<Grid item xs={12} key={item.title}>
													<div style={{ padding: "1px 0px" }}>
														<Grid container justifyContent={'space-between'}>
															<Grid item>
																<span className={`current-price-box-title`}>{item.title}</span>
															</Grid>
															<Grid item>
																<span className={`current-price-box-value${item.textColor === "blue" ? "__liquidation" : ""}`}>{item.value}</span>
															</Grid>
														</Grid>
													</div>
												</Grid>
											)
										})
										}
									</Grid>
								</NoBorderCard>
							</Grid>
							<Grid item xs={12}>
								<NoBorderCard>
									<Grid container>
										<Grid item xs={12}>
											<span className={`borrow-card-market-apy-title`}>Market APY</span>
										</Grid>

										{[{
											title: "AAVE",
											value: "10.6",
											textColor: "green",
										},
										{
											title: "Tranquil",
											value: "10.2",
											textColor: "green",
										}].map((item, index) => {
											return (
												<Grid item xs={12} key={item.title}>
													<div style={{ padding: "10px 0px" }}>
														<Grid container justifyContent={'space-between'}>
															<Grid item>
																<span className={`borrow-card-market-apy-field`}>{item.title}</span>
															</Grid>
															<Grid item>
																<span className={`borrow-card-market-apy-value`}>{item.value}</span>
															</Grid>
														</Grid>
													</div>
												</Grid>
											)
										})
										}
									</Grid>
								</NoBorderCard>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>

		</>
	)
}


export default Borrow;


