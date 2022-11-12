import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom"
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, TextField, Button } from '@mui/material';
import Chart from 'react-apexcharts'
import { faker } from '@faker-js/faker';
import Card from './Card/Card'
import NoBorderCard from './Card/NoBorderCard'
import RectangleShapeButton from '../../components/Button/RectangleShapeButton/RectangleShapeButton'
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'
import { element } from "prop-types";
import { faL } from "@fortawesome/free-solid-svg-icons";
import '../../App.scss'
import './Manage.scss'

import { useAppSelector, useAppDispatch } from '../../hooks'
import {
	changeMyAccount,
	changeInputEthDeposit,
	changeInputBtcDebt,
} from '../../slice/loansharkSlice';
import {
	roundDown
} from '../../utils/utilFunction/utilFunction'
import CustDialog from "src/components/Dialog/CustDialog";



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
	tooltip: {
		enabled: false,
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

const FIRST_ROW_CARD_HEIGHT = 350
const SECOND_ROW_CARD_HEIGHT = 353

interface SelectionButtonProps {
	label: string;
	isLeft: boolean;
	onClick: any;
	select: boolean;
}
function SelectionButton(props: SelectionButtonProps) {
	if (props.isLeft === true) {
		return (
			<Button
				className={`collateral-debt-title-button-left ${props.select === true ? "select" : "not-select"}`}
				onClick={props.onClick}
			>
				<span className={`${props.select === true ? "select__label" : "not-select__label"}`}>
					{props.label}
				</span>
			</Button>
		)
	}
	else {
		return (
			<Button
				className={`collateral-debt-title-button-right ${props.select === true ? "select" : "not-select"}`}
				onClick={props.onClick}
			>
				<span
					className={`${props.select === true ? "select__label" : "not-select__label"}`}
				>
					{props.label}
				</span>
			</Button>
		)
	}
}

// function collateralDebit
interface CardTitleProps {
	title: string;
}
function CardTitle(props: CardTitleProps) {
	return (
		<div>
			<span className={`card-title`}
			>{props.title}</span>
		</div>
	)
}

export enum ICollateral {
	DEPOSIT = "deposit",
	WITHDRAW = "withdraw",
}

export enum IDebt {
	BORROW = "borrow",
	PAYBACK = "payback",
}

function Manage() {
	let navigate = useNavigate();
	let location: any = useLocation();
	const dispatch = useAppDispatch();

	// let tempPari = this.props.location.state.pair.split("_")
	let deposit = 'ETH'
	let debt = "BTC"

	const stateLoanshark = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)

	const [value, setValue] = useState("0.00")
	const [valueTwo, setValueTwo] = useState("0.00")

	const [assest1Code, setAssest1Code] = useState(null)
	const [assest2Code, setAssest2Code] = useState(null)
	const [barData, setBarData] = useState(null)

	const [collateralSelection, setCollateralSelection] = useState<ICollateral | null>(ICollateral.DEPOSIT)
	const [collateralAmount, setCollateralAmount] = useState<number>(0)
	const [maxdepositAmount, setMaxdepositAmount] = useState<number>(0)

	const [debtSelection, setDebtSelection] = useState<IDebt | null>(IDebt.BORROW)
	const [debtAmount, setDebtAmount] = useState<number>(0)
	const [maxdebtAmount, setMaxdebtAmount] = useState<number>(0)

	useEffect(() => {
		if (((location?.state?.assest1Code ?? "") === "") || ((location?.state?.assest2Code ?? "") === "")) {
			navigate("/");
		}
		setAssest1Code(location.state.assest1Code)
		setAssest2Code(location.state.assest2Code)
		setBarData(
			[{
				data: [
					{
						x: 'ETH',
						y: (((Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit)) * stateLoanshark.priceOfEth / 100).toFixed(2)),
						fillColor: '#72BFFC',
					},
					{
						x: 'BTC',
						y: (((Number(stateLoanshark.userDebtBalanceBtc) + Number(stateLoanshark.inputBtcDept)) * stateLoanshark.priceOfBtc / 100).toFixed(2)),
						fillColor: '#5EC7B6',
					}
				]
			}]
		)

		setMaxdepositAmount(Number(stateLoanshark.myETHAmount))
		// depositAmount: 0,

	}, [])


	const openBarchart = useMemo(() => {
		if (barData === undefined || barData === null) return false
		if (barData.length > 0) return true
		return false
	}, [barData])

	console.log(barData)
	console.log(options.series)

	// const collateralSelectionActionButton = useMemo(()=>{
	// 	if(collateralSelection===) return "Deposit"
	// },[collateralSelection])


	const maxBorrowPower = useMemo(() => {
		return (
			stateLoanshark.inputEthDeposit
			* stateLoanshark.priceOfEth
			* stateLoanshark.LTV[stateLoanshark.selectedPair]
			* stateLoanshark.liquidationPrice[stateLoanshark.selectedPair]
			/ stateLoanshark.priceOfBtc
		).toFixed(2);
	}, [stateLoanshark])

	const liquidationPrice = useMemo(() => {
		return (
			(Number(stateLoanshark.inputBtcDept) + Number(stateLoanshark.userDebtBalanceBtc))
			* (stateLoanshark.priceOfBtc) / 100
			/ (Number(stateLoanshark.inputEthDeposit) + Number(stateLoanshark.userDepositBalanceEth))
			/ stateLoanshark.LTV[stateLoanshark.selectedPair]
		).toFixed(2)
	}, [stateLoanshark])

	function calculateHealthFactor(depositAmouont, priceOfdeposit, LTV, debtAmount, priceOfDebt): number {
		// if (debtAmount === undefined || debtAmount === null || debtAmount === 0) return "-"
		if (debtAmount === undefined || debtAmount === null || debtAmount === 0) return 0
		return Number(((depositAmouont * priceOfdeposit / 100) * LTV / (debtAmount * priceOfDebt / 100)).toFixed(2))
	}

	// toggleNoAction(inputModalToken, inputModalAction, inputModalMessage, pair) {
	//     this.setState({
	//         modal: !this.state.modal,
	//         modalTitle: inputModalAction,
	//         modalMessage: inputModalMessage,
	//         modalToken: inputModalToken,
	//         modalAction: inputModalAction,
	//         modalInputValue: this.state.debtAmount,
	//         modalCall: null
	//     });
	// }

	return (
		<>
		{/* <CustDialog
		open={true}
		title={`hello world`}
		>	
		<div>this is sentence</div>
		</CustDialog> */}
			<div className={'main-content-layout'}>
				<Grid container spacing={3}>
					<Grid item xs={7}>
						<div style={{ height: `${FIRST_ROW_CARD_HEIGHT}px` }}>
							<NoBorderCard>
								<Grid container>
									<Grid item xs={12}>

									</Grid>
									<Grid item xs={12}>
										<div style={{ padding: "10px" }}>
											<Grid container justifyContent={"space-between"}>
												<Grid item>
													<Grid container>
														<Grid item>
															<div style={{ position: "relative", minWidth: "60px" }}>
																<img
																	style={{
																		width: "30px", height: "30px",
																		position: "absolute",
																		zIndex: "1",
																		left: "20px",
																		top: "10px",
																	}} src={`/assets/icon/btc-logo.svg`} alt=""></img>
																<img style={{ width: "30px", height: "30px" }} src={`/assets/icon/eth-logo.svg`} alt=""></img>
															</div>
														</Grid>
														<Grid item>
															<span style={{
																color: "rgba(38,38,38,1)",
																fontSize: "21px",
																fontWeight: "500",
															}}
															>ETH/BTC</span>
														</Grid>
													</Grid>
												</Grid>
												<Grid item>
													<Grid container>
														<Grid item xs={12}>
															<Grid container justifyContent={'end'} justifyItems={'end'}>
																<Grid item>
																	<span style={{
																		color: "rgba(38,38,38,1)",
																		fontSize: "21px",
																		fontWeight: "700",
																		textAlign: 'end',
																	}}
																	>
																		$34192.9 /
																		<span style={{
																			color: "#223354",
																			fontSize: "12px",
																			fontWeight: "100",
																			textAlign: 'end',
																		}}
																		>30.4 ETH</span>
																	</span>
																</Grid>
															</Grid>
														</Grid>
														<Grid item xs={12}>
															<Grid container justifyContent={'end'} justifyItems={'end'}>
																<Grid item>
																	<span style={{
																		color: "rgba(38,38,38,1)",
																		fontSize: "21px",
																		fontWeight: "700",
																		textAlign: 'end',
																	}}
																	>
																		$41340.1 /
																		<span style={{
																			color: "#223354",
																			fontSize: "12px",
																			fontWeight: "100",
																			textAlign: 'end',
																		}}
																		>1.87 BTC</span>
																	</span>
																</Grid>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</div>
									</Grid>
									<Grid item xs={12}>
										<div style={{ width: '100%', borderBottom: "1px solid rgba(189,189,189, 1)", marginTop: "22px", marginBottom: "22px" }}></div>
									</Grid>

									<Grid item xs={12}>
										<Grid container spacing={2}>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Collateral:</span>
														</Grid>
														<Grid item>
															<span style={{ fontWeight: "800", fontSize: "16px" }}>{`$${(stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100).toFixed(2)} / ${Number(stateLoanshark.userDepositBalanceEth).toFixed(2)}ETH`}</span>
															{/* <span>{`$${(stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100).toFixed(2)}`}</span> */}
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Health Factor:</span>
														</Grid>
														<Grid item>
															<span style={{ fontWeight: "800", fontSize: "16px" }}>20 (hard)</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Debt:</span>
														</Grid>
														<Grid item>
															{/* <span style={{ fontWeight: "800", fontSize: "16px" }}>$41340.1/1.87BTC</span> */}
															<span style={{ fontWeight: "800", fontSize: "16px" }}>{`${(stateLoanshark.userDebtBalanceBtc * stateLoanshark.priceOfBtc / 100).toFixed(2)} / ${stateLoanshark.userDebtBalanceBtc} ${assest2Code}`}</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Smart Value:</span>
														</Grid>
														<Grid item>
															{/* <span style={{ fontWeight: "800", fontSize: "16px" }}>$19294</span> */}
															<span style={{ fontWeight: "800", fontSize: "16px" }}>{`$${(stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * stateLoanshark.priceOfBtc / 100).toFixed(2)}`}</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>APY:</span>
														</Grid>
														<Grid item>
															<span style={{ fontWeight: "800", fontSize: "16px" }}>20.4% (hard)</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Provider:</span>
														</Grid>
														<Grid item>
															<span style={{ fontWeight: "800", fontSize: "16px" }}>AAVE (hard)</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
										</Grid>
									</Grid>

								</Grid>
							</NoBorderCard>
						</div>
					</Grid>
					<Grid item xs={5}>
						<div style={{ height: `${FIRST_ROW_CARD_HEIGHT}px` }}>
							<NoBorderCard>
								<Grid container>
									<Grid item xs={12}>
										<CardTitle title={"Current Smart Vault Balance"}></CardTitle>
									</Grid>
									<Grid item xs={12}>
										<Grid container style={{
											borderRadius: "3px",
											border: "1px solid rgba(0,0,0, 0.15)",
										}}
										>
											<Grid item xs={12}>
												<div style={{ padding: "10px" }}>
													<Grid container alignItems={'center'}>
														<Grid item xs={9}>
															<input
																style={{
																	width: "100%",
																	height: "100%",
																	border: "0px",
																	backgroundColor: "transparent",
																	fontFamily: "Poppins-Bold",
																	overflow: "hidden",
																	fontSize: "48px",
																	fontWeight: "700",
																	color: "#333333",
																}}
																value={Number(stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate).toFixed(8)}
																disabled={true}
																onChange={(e) => {
																	setValue(e.target.value)
																}}
															></input>
														</Grid>
														<Grid item xs={3}>
															<Grid container alignItems={'center'}>
																<Grid item>
																	<div
																		style={{
																			maxHeight: "30px",
																			maxWidth: "30px",
																		}}
																	>
																		<img style={{ width: "100%", height: "100%" }}
																			src={`/assets/icon/btc-logo.svg`} alt="" />
																	</div>
																</Grid>
																<Grid item>
																	<span style={{ fontSize: "24px" }}>BTC</span>
																</Grid>
															</Grid>

														</Grid>
													</Grid>
												</div>
											</Grid>
										</Grid>

									</Grid>

									{[
										{
											title: "Trigger Health Factor:",
											value: parseFloat(window.web3.utils.fromWei(stateBackd.myProtectionEth[0], 'ether')),
										},
										{
											title: "Repay amount each time:",
											value: Number(stateBackd.myProtection[5] / 0.9999 / 100000000),
										},
										{
											title: "Remaining prepaid gas free:",
											value: parseFloat(stateBackd.myGasBankBalance),
										},
									].map((item) => {
										return (
											<Grid item xs={12} key={item.title}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={'space-between'}>
														<Grid item>
															<span className={`current-smart-vault-field`}>{item.title}</span>
														</Grid>
														<Grid item>
															<span className={`current-smart-vault-value`}>{item.value}</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
										)
									})
									}

									<Grid item xs={12}>
										<div style={{ width: "100%" }}>
											<RoundShapeButton
												label={"Withdraw All"}
												onClick={() => {
													console.log(`on click Withdraw All From Smart Vault`)
												}}
												color={"white"}
											></RoundShapeButton>
										</div>
									</Grid>
								</Grid>
							</NoBorderCard>
						</div>
					</Grid>
					<Grid item xs={7}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<div style={{ height: `${SECOND_ROW_CARD_HEIGHT}px` }}>
									<NoBorderCard>
										<Grid container spacing={2} >
											<Grid item xs={12}>
												<CardTitle title={"Collateral"}></CardTitle>
											</Grid>
											<Grid item xs={12}>
												<Grid container>
													<Grid item xs={6}>
														<div className={`collateral-debt-box`}>
															<SelectionButton
																label={"Deposit"}
																isLeft={true}
																select={collateralSelection === ICollateral.DEPOSIT}
																onClick={() => {
																	if (collateralSelection === ICollateral.DEPOSIT) return
																	setCollateralSelection(ICollateral.DEPOSIT)
																	setCollateralAmount(0)
																	setMaxdepositAmount(Number(stateLoanshark.myETHAmount))
																}}
															></SelectionButton>
														</div>

													</Grid>
													<Grid item xs={6}>
														<div className={`collateral-debt-box`}>
															<SelectionButton
																label={"Withdraw"}
																isLeft={false}
																select={collateralSelection === ICollateral.WITHDRAW}
																onClick={() => {
																	if (collateralSelection === ICollateral.WITHDRAW) return
																	setCollateralSelection(ICollateral.WITHDRAW)
																	setCollateralAmount(0)
																	setMaxdepositAmount(Number(stateLoanshark.userDepositBalanceEth))
																}}
															></SelectionButton>
														</div>
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
																<Grid item xs={6}>
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
																		value={collateralAmount.toFixed(2)}
																		onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
																			setCollateralAmount(e.target.value === "" ? 0 : Number(e.target.value))
																			dispatch(changeInputEthDeposit(Number(e.target.value) * (collateralSelection === ICollateral.DEPOSIT ? 1 : -1)));
																		}}
																	></input>
																</Grid>
																<Grid item xs={6}>
																	<Grid container>
																		<Grid item xs={12}>
																			<div style={{
																				padding: "5px",
																				textAlign: "end",
																			}}>
																				<span>Balance: </span>
																				<span style={{ fontWeight: "800" }}>{`${maxdepositAmount.toFixed(2)} ETH`}</span>
																			</div>

																		</Grid>
																		<Grid item xs={12}>
																			<Grid container justifyContent={'end'} alignItems={'center'}>
																				<Grid item>
																					<div style={{ paddingRight: "5px" }}>
																						<Button style={{
																							backgroundColor: "white",
																							color: "black",
																							borderRadius: "4px",
																							border: "1px solid black",
																							padding: "0px",
																						}}
																							onClick={(e: any) => {
																								let finalAmount = roundDown(maxdepositAmount * 100 / 100, 18)
																								setCollateralAmount(finalAmount)
																								dispatch(changeInputEthDeposit(finalAmount * (collateralSelection === ICollateral.DEPOSIT ? 1 : -1)))
																							}}
																						>MAX</Button>
																					</div>
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
																							padding: "3px 10px",
																						}}>
																							<Grid container alignContent={'center'}>
																								<div style={{ height: "15px", width: "15px" }}>
																									<Grid item>
																										<img style={{
																											width: "100%",
																											height: "100%"
																										}}
																											src={`/assets/icon/eth-logo.svg`} alt="" />
																									</Grid>
																								</div>
																								<Grid item>
																									<span>ETH</span>
																								</Grid>
																							</Grid>
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
														<div style={{ height: "22px" }}>
														</div>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12}>
												<RoundShapeButton
													label={collateralSelection}
													color={"white"}
													onClick={() => {
														let newHealthFactor = calculateHealthFactor(
															Number(stateLoanshark.userDepositBalanceEth) - Number(collateralAmount),
															stateLoanshark.priceOfEth,
															stateLoanshark.LTV["ETHBTC"],
															stateLoanshark.userDebtBalanceBtc,
															stateLoanshark.priceOfBtc);
														// if (collateralSelection === ICollateral.DEPOSIT) {
														// 	if (collateralAmount <= 0 || isNaN(collateralAmount)) {
														// 		//popup
														// 		this.toggleNoAction(
														// 			deposit,
														// 			'Unable to deposit',
														// 			'Please enter the amount that you want to deposit.',
														// 			deposit + debt
														// 		)
														// 	} else if (Number(collateralAmount) > Number(stateLoanshark.myETHAmount)) {
														// 		this.toggleNoAction(
														// 			deposit,
														// 			'Unable to deposit',
														// 			'You do not have enough ETH to deposit.',
														// 			deposit + debt
														// 		)
														// 	} else if (newHealthFactor < 1.06) {
														// 		this.toggleNoAction(
														// 			deposit,
														// 			'Unable to deposit',
														// 			'You are unable to deposit <span class="fw-bold">' +
														// 			collateralAmount + ' ' + deposit +
														// 			' (~$' +
														// 			Number(collateralAmount * stateLoanshark.priceOfEth / 100).toFixed(2) +
														// 			')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05.',
														// 			deposit + debt
														// 		)
														// 	} else {
														// 		this.toggleDeposit(
														// 			deposit,
														// 			'Confirm to deposit?',
														// 			'You are depositing <span class="fw-bold">' +
														// 			collateralAmount + ' ' + deposit +
														// 			' (~$' +
														// 			Number(collateralAmount * stateLoanshark.priceOfEth / 100).toFixed(2) +
														// 			')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.',
														// 			deposit + debt)
														// 	}
														// } else if (collateralSelection === ICollateral.WITHDRAW) {
														// 	if (collateralAmount <= 0 || isNaN(collateralAmount)) {
														// 		this.toggleNoAction(
														// 			deposit,
														// 			'Unable to withdraw',
														// 			'Please enter the amount that you want to withdraw.',
														// 			deposit + debt
														// 		)
														// 	} else if (collateralAmount > maxdepositAmount) {
														// 		this.toggleNoAction(
														// 			deposit,
														// 			'Unable to withdraw',
														// 			'You do not have so much ETH to withdraw.',
														// 			deposit + debt
														// 		)
														// 	} else if (newHealthFactor < 1.06) {
														// 		this.toggleNoAction(
														// 			deposit,
														// 			'Unable to withdraw',
														// 			'You are unable to withdraw <span class="fw-bold">' +
														// 			collateralAmount + ' ' + deposit +
														// 			' (~$' +
														// 			Number(collateralAmount * stateLoanshark.priceOfEth / 100).toFixed(2) +
														// 			')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05.',
														// 			deposit + debt
														// 		)
														// 	} else {
														// 		this.toggleWithdrawn(
														// 			deposit,
														// 			'Confirm to withdraw?',
														// 			'You are withdrawing <span class="fw-bold">' +
														// 			collateralAmount + ' ' + deposit +
														// 			' (~$' +
														// 			Number(collateralAmount * stateLoanshark.priceOfEth / 100).toFixed(2) +
														// 			')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.',
														// 			deposit + debt)
														// 	}
														// }
													}}
												></RoundShapeButton>
											</Grid>
										</Grid>
									</NoBorderCard>
								</div>
							</Grid>
							<Grid item xs={6}>
								<div style={{ height: `${SECOND_ROW_CARD_HEIGHT}px` }}>
									<NoBorderCard>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<CardTitle title={"Debt"}></CardTitle>
											</Grid>
											<Grid item xs={12}>
												<Grid container>
													<Grid item xs={6}>
														<div className={`collateral-debt-box`}>
															<SelectionButton
																label={"Borrow"}
																isLeft={true}
																select={debtSelection === IDebt.BORROW}
																onClick={() => {
																	setDebtSelection(IDebt.BORROW)
																	console.log(stateLoanshark.userDepositBalanceEth)
																	let borrowPower = stateLoanshark.userDepositBalanceEth;
																	borrowPower = borrowPower * stateLoanshark.priceOfEth;
																	borrowPower = borrowPower * stateLoanshark.LTV[stateLoanshark.selectedPair];
																	borrowPower = borrowPower * stateLoanshark.liquidationPrice["ETHBTC"];
																	borrowPower = borrowPower / stateLoanshark.priceOfBtc;
																	borrowPower = borrowPower - stateLoanshark.userDebtBalanceBtc;
																	setMaxdebtAmount(Number(borrowPower.toFixed(8)));
																}}
															></SelectionButton>
														</div>
													</Grid>
													<Grid item xs={6}>
														<div className={`collateral-debt-box`}>
															<SelectionButton
																label={"Payback"}
																isLeft={false}
																select={debtSelection === IDebt.PAYBACK}
																onClick={() => {
																	setDebtSelection(IDebt.PAYBACK)
																	setMaxdebtAmount(Number(stateLoanshark.userDebtBalanceBtc.toFixed(8)));
																}}
															></SelectionButton>
														</div>
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
																<Grid item xs={6}>
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
																		value={debtAmount.toFixed(2)}
																		onChange={(e) => {
																			setDebtAmount(e.target.value === "" ? 0 : Number(e.target.value))
																			dispatch(changeInputBtcDebt(Number(e.target.value) * (debtSelection === IDebt.BORROW ? 1 : -1)));
																		}}
																	></input>
																</Grid>
																<Grid item xs={6}>
																	<Grid container>
																		<Grid item xs={12}>
																			<div style={{
																				padding: "5px",
																				textAlign: "end",
																			}}>
																				<span>Balance: </span>
																				<span style={{ fontWeight: "800" }}>{`${maxdebtAmount.toFixed(2)} BTC`}</span>
																			</div>
																		</Grid>
																		<Grid item xs={12}>
																			<Grid container justifyContent={'end'} alignItems={'center'}>
																				<Grid item>
																					<div style={{ paddingRight: "5px" }}>
																						<Button style={{
																							backgroundColor: "white",
																							color: "black",
																							borderRadius: "4px",
																							border: "1px solid black",
																							padding: "0px",
																						}}
																							onClick={() => { setDebtAmount(maxdebtAmount) }}
																						>MAX</Button>
																					</div>
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
																							padding: "3px 10px",
																						}}>
																							<Grid container alignContent={'center'}>
																								<div style={{ height: "15px", width: "15px" }}>
																									<Grid item>
																										<img style={{
																											width: "100%",
																											height: "100%"
																										}}
																											src={`/assets/icon/btc-logo.svg`} alt="" />
																									</Grid>
																								</div>
																								<Grid item>
																									<span>BTC</span>
																								</Grid>
																							</Grid>
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
														<span>{debtSelection === IDebt.BORROW ? "Borrowing Power:" : "Payback Percentage"}</span>
													</Grid>
													<Grid item>
														<Grid container >
															{[{
																value: 25,
																name: "25%",
															},
															{
																value: 50,
																name: "50%",
															},
															{
																value: 75,
																name: "75%",
															},
															{
																value: 90,
																name: "90%",
															},].map((item) => {
																return (
																	<Grid item key={item.value}>
																		<button style={{
																			borderRadius: "6px",
																			border: "1px solid white",
																			backgroundColor: "rgba(255,255,255, 1)",
																			padding: "2px 5px",
																			color: "black",
																			fontFamily: "Poppins-Regular",
																			fontSize: "14px",
																			fontWeight: "400",
																		}}
																			value={item.value}
																			onClick={(e: any) => {
																				let finalAmount = roundDown(maxdebtAmount * e.target.value / 100, 8)
																				setDebtAmount(finalAmount)
																				dispatch(changeInputBtcDebt(finalAmount * (debtSelection === IDebt.BORROW ? 1 : -1)));
																			}}
																		>{item.name}</button>
																	</Grid>
																)
															})}
														</Grid>
													</Grid>
												</Grid>
											</Grid>
											<Grid item xs={12}>
												<RoundShapeButton
													label={debtSelection}
													color={"white"}
													onClick={() => { }}
												// onClick={() => {

												// 	if (debtSelection === IDebt.BORROW) {
												// 		let newHealthFactor =
												// 		this.calculateHealthFactor(
												// 			parseFloat(this.props.userDepositBalanceEth),
												// 			this.props.priceOfEth,
												// 			this.props.LTV["ETHBTC"],
												// 			parseFloat(this.props.userDebtBalanceBtc) + parseFloat(this.state.debtAmount),
												// 			this.props.priceOfBtc);
												// 	if (Number(this.state.debtAmount) <= 0 || isNaN(this.state.debtAmount)) {
												// 		this.toggleNoAction(
												// 			deposit,
												// 			'Unable to borrow',
												// 			'Please enter the amount that you want to borrow.',
												// 			deposit + debt
												// 		)
												// 	} else if (Number(newHealthFactor) < 1.06) {
												// 		this.toggleNoAction(
												// 			deposit,
												// 			'Unable to borrow',
												// 			'You are unable to borrow <span class="fw-bold">' +
												// 			this.state.debtAmount + ' ' + debt +
												// 			' (~$' +
												// 			Number(this.state.debtAmount * this.props.priceOfBtc / 100).toFixed(2) +
												// 			')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05.',
												// 			deposit + debt
												// 		)
												// 	} else {
												// 		this.toggleBorrow(
												// 			deposit,
												// 			'Confirm to borrow?',
												// 			'You are borrowing <span class="fw-bold">' +
												// 			this.state.debtAmount + ' ' + debt +
												// 			' (~$' +
												// 			Number(this.state.debtAmount * this.props.priceOfBtc / 100).toFixed(2) +
												// 			')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.',
												// 			deposit + debt
												// 		)
												// 	}
												// 	}else if(debtSelection === IDebt.PAYBACK) {
												// 		let newHealthFactor =
												// 		this.calculateHealthFactor(
												// 			parseFloat(this.props.userDepositBalanceEth),
												// 			this.props.priceOfEth,
												// 			this.props.LTV["ETHBTC"],
												// 			parseFloat(this.props.userDebtBalanceBtc) - parseFloat(this.state.debtAmount),
												// 			this.props.priceOfBtc);
												// 	if (Number(this.state.debtAmount) <= 0 || isNaN(this.state.debtAmount)) {
												// 		this.toggleNoAction(
												// 			deposit,
												// 			'Unable to payback',
												// 			'Please enter the amount that you want to payback.',
												// 			deposit + debt
												// 		)
												// 	} else if (Number(this.state.debtAmount) > (this.props.myBTCAmount)) {
												// 		this.toggleNoAction(
												// 			deposit,
												// 			'Unable to payback',
												// 			'You do not have enough BTC to payback.',
												// 			deposit + debt
												// 		)
												// 	} else if (Number(newHealthFactor) < 1.06) {
												// 		this.toggleNoAction(
												// 			deposit,
												// 			'Unable to payback',
												// 			'You are unable to payback <span class="fw-bold">' +
												// 			this.state.debtAmount + ' ' + debt +
												// 			' (~$' +
												// 			Number(this.state.debtAmount * this.props.priceOfBtc / 100).toFixed(2) +
												// 			')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05.',
												// 			deposit + debt
												// 		)

												// 	} else {
												// 		this.togglePayback(
												// 			deposit,
												// 			'Confirm to payback?',
												// 			'You are paying back <span class="fw-bold">' +
												// 			this.state.debtAmount + ' ' + debt +
												// 			' (~$' +
												// 			Number(this.state.debtAmount * this.props.priceOfBtc / 100).toFixed(2) +
												// 			')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.',
												// 			deposit + debt)
												// 	}
												// 	}
												// }}
												></RoundShapeButton>
											</Grid>
										</Grid>
									</NoBorderCard>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={5}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<div style={{ height: `${SECOND_ROW_CARD_HEIGHT}px` }}>
									<NoBorderCard>
										<Grid container>
											<Grid item xs={12}>
												<span style={{
													color: "rgba(38,38,38,1)",
													fontFamily: "ClashDisplay-Semibold",
													fontSize: "18px",
													fontWeight: "600",
													fontStyle: "normal",
												}}>Deposited Borrowed Health Factor</span>
											</Grid>
											<Grid item xs={12}>
												<div style={{ width: "100%", textAlign: 'center' }}>
													<span className={`health-factor-label`}>Health Factor </span>
													<span className={`health-factor-value`}>20.97</span>
												</div>

											</Grid>
											<Grid item xs={12}>
												{openBarchart === true &&
													<Chart options={options} series={barData} type="bar" height={180} />
												}
											</Grid>
										</Grid>
									</NoBorderCard>
								</div>
							</Grid>
							<Grid item xs={12}>
								<NoBorderCard>
									<Grid container>
										{[{
											title: "Current Price of ETH:",
											value: stateLoanshark.priceOfEth / 100,
											textColor: "black",
										},
										{
											title: "Current Price of BTC:",
											value: stateLoanshark.priceOfBtc / 100,
											textColor: "black",
										},
										{
											title: "LTV:",
											value: `${(stateLoanshark.LTV[stateLoanshark.selectedPair] * stateLoanshark.liquidationPrice[stateLoanshark.selectedPair] * 100).toFixed(2)} %`,
											textColor: "black",
										},
										{
											title: "Max Borrow Power:",
											value: `${maxBorrowPower} BTC`,
											textColor: "black",
										},
										{
											title: "Liquidity Threshold:",
											value: `${(stateLoanshark.LTV[stateLoanshark.selectedPair] * 100).toFixed(2)} %`,
											textColor: "black",
										},
										{
											title: "Liquidation Price of ETH:",
											value: liquidationPrice,
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
						</Grid>
					</Grid>
				</Grid>
			</div>
		</>
	)
}


export default Manage;


