import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
	Button,
	Grid,
	ImageList,
	ImageListItem,
} from '@mui/material';
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
import TokenButton from '../../components/Button/TokenButton/TokenButton'
import { changeInputEthDeposit, changeInputBtcDebt } from '../../slice/loansharkSlice';
import {
	changeDialogState,
	changeTokenListState,
	changeSelectTokenTitleState,
} from '../../slice/selectTokenSlice';

import { refreshPrice } from '../../utils/API'
import {
	depositTokenList,
	borrowTokenList,
	TOKEN_DISPLAY_DECIMAL,
} from '../../utils/utilList'

import { borrowBTC, depositETH } from '../../utils/LoansharkBackend'

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

function Token(props) {
	const { collateralCurrency, onClick } = props
	return (
		<>
			<Button style={{
				backgroundColor: "white",
				color: "black",
				padding: "0px",
			}}
				onClick={onClick}
			>
				<div className={'borrow-card-collateral-crypto-icon'}>
					<div style={{
						paddingLeft: "10px",
						paddingRight: "10px",
					}}>
						<Grid container alignContent={'center'} alignItems={'center'}>
							<Grid item>
								<ImageList sx={{ maxWidth: 20, maxHeight: 20 }} cols={0}>
									<ImageListItem>
										<img
											src={`/assets/icon/crypto/color/${collateralCurrency}.svg`}
											alt={""}
											loading="lazy"
										/>
									</ImageListItem>
								</ImageList>
							</Grid>
							<Grid item>
								<span>{collateralCurrency.toUpperCase()}</span>
							</Grid>
						</Grid>
					</div>
				</div>
			</Button>
		</>
	)
}

function Borrow() {
	// const state = useAppSelector((state) => state.loanshark)
	const stateLoanshark = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)
	const stateSelectToken = useAppSelector((state) => state.selectToken)
	const dispatch = useAppDispatch();

	const [modal, setModal] = useState<boolean>(false);
	const [modalAction, setModalAction] = useState<any>("");
	const [modalTitle, setModalTitle] = useState<string>("");
	const [modalMessage, setModalMessage] = useState<string>("");
	const [modalToken, setModalToken] = useState<string>("");
	const [modalInputValue, setModalInputValue] = useState<any>("");
	const [collateralCurrency, setCollateralCurrency] = useState<string>("eth");
	const [borrowCurrency, setBorrowCurrency] = useState<string>("btc");
	const [barData, setBarData] = useState(null)
	const [divStyle, setDivStyle] = useState(null)

	const calculateHealthFactor = (depositAmouont, priceOfDeposite, LTV, debtAmount, priceOfDebt) => {
		if (debtAmount === undefined || debtAmount === null || debtAmount === 0) {
			return 0;
		}
		return ((depositAmouont * priceOfDeposite / 100) * LTV / (debtAmount * priceOfDebt / 100)).toFixed(2)
	}

	// const toggleNoAction = (inputModalToken, inputModalTitle, inputModalMessage, pair) => {
	// 	setModal(!modal);
	// 	setModalToken(inputModalToken);
	// 	setModalAction("NOACTION");
	// 	setModalTitle(inputModalTitle);
	// 	setModalMessage(inputModalMessage);
	// 	setModalInputValue(0);
	// }

	// const toggleAction = (inputModalToken, inputModalAction, inputModalTitle, inputModalMessage, pair, inputValue) => {
	// 	setModal(!modal);
	// 	setModalToken(inputModalToken);
	// 	setModalAction(inputModalAction);
	// 	setModalTitle(inputModalTitle);
	// 	setModalMessage(inputModalMessage);
	// 	setModalInputValue(inputValue);
	// }

	const modalConfirm = (modalAction: string) => {
		let args = [];
		let argsUnregister = [];
		var finalModalInputValue;
		switch (modalAction) {
			case "DEPOSITANDBORROW":
				let approveArgs = [
					stateLoanshark.myFujiVaultETHBTC.options.address,
					window.web3.utils.toBN(window.web3.utils.toWei(stateLoanshark.inputEthDeposit, 'ether')).toString()
				]

				let args = [
					window.web3.utils.toBN(window.web3.utils.toWei(stateLoanshark.inputEthDeposit, 'ether')).toString(),
					window.web3.utils.toBN(parseFloat((stateLoanshark.inputBtcDept * 100000000).toFixed(0))).toString()
				]

				let oldHealthFactor =
				calculateHealthFactor(
					Number(stateLoanshark.userDepositBalanceEth),
					stateLoanshark.priceOfEth,
					stateLoanshark.LTV["ETHBTC"],
					Number(stateLoanshark.userDebtBalanceBtc),
					stateLoanshark.priceOfBtc);

				setModal(!modal);
				dispatch(toggleLoading());

				stateLoanshark.myETHContract.methods
					.approve(...approveArgs)
					.send({ from: stateLoanshark.myAccount })
					.on("error", (error, receipt) => {
						dispatch(toggleLoading());
					})
					.then((receipt) => {
						stateLoanshark.myFujiVaultETHBTC.methods
							.depositAndBorrow(...args)
							.send({ from: stateLoanshark.myAccount })
							.on("error", (error, receipt) => {
								dispatch(toggleLoading());
							})
							.then((receipt) => {
								dispatch(toggleLoading());
								dispatch(changeInputEthDeposit(0));
								dispatch(changeInputBtcDebt(0));

								let newHealthFactor =
								calculateHealthFactor(
									Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit),
									stateLoanshark.priceOfEth,
									stateLoanshark.LTV["ETHBTC"],
									Number(stateLoanshark.userDebtBalanceBtc) + Number(stateLoanshark.inputBtcDept),
									stateLoanshark.priceOfBtc);

								depositETH(stateLoanshark.myAccount, receipt.transactionHash, oldHealthFactor, newHealthFactor, (stateLoanshark.inputEthDeposit), stateLoanshark.priceOfEth);
								borrowBTC(stateLoanshark.myAccount, receipt.transactionHash, oldHealthFactor, newHealthFactor, (stateLoanshark.inputBtcDept), stateLoanshark.priceOfBtc);

								refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
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
		if (stateLoanshark.myETHContract) {
			let newHealthFactor =
				calculateHealthFactor(
					Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit),
					stateLoanshark.priceOfEth,
					stateLoanshark.LTV["ETHBTC"],
					Number(stateLoanshark.userDebtBalanceBtc) + Number(stateLoanshark.inputBtcDept),
					stateLoanshark.priceOfBtc);

			var modalTitle = '';
			var modalMessage = '';
			var error = false;
			if (stateLoanshark.inputEthDeposit <= 0 || isNaN(stateLoanshark.inputEthDeposit)) {
				error = true;
				modalTitle = 'Unable to borrow BTC using ETH as collateral';
				modalMessage = 'Please enter the amount that you want to deposit.';
			} else if (stateLoanshark.inputBtcDept <= 0 || isNaN(stateLoanshark.inputBtcDept)) {
				error = true;
				modalTitle = 'Unable to borrow BTC using ETH as collateral';
				modalMessage = 'Please enter the amount that you want to borrow.';
			} else if (Number(stateLoanshark.inputEthDeposit) > stateLoanshark.myETHAmount) {
				error = true;
				modalTitle = 'Unable to borrow BTC using ETH as collateral';
				modalMessage = 'You do not have enough ETH to deposit.';
			} else if (newHealthFactor < 1.06) {
				error = true;
				modalTitle = 'Unable to borrow BTC using ETH as collateral';
				modalMessage = 'You are unable to deposit <span class="fw-bold">' +
					stateLoanshark.inputEthDeposit + ' ETH ' +
					' (~$' +
					Number(stateLoanshark.inputEthDeposit * stateLoanshark.priceOfEth / 100).toFixed(2) +
					')</span>. ' +
					' and borrow <span class="fw-bold">' +
					stateLoanshark.inputBtcDept + ' BTC ' +
					' (~$' +
					Number(stateLoanshark.inputBtcDept * stateLoanshark.priceOfBtc / 100).toFixed(2) +
					')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05';
			} else {
				modalTitle = 'Confirm to borrow BTC using ETH as collateral?';
				modalMessage = 'You are depositing <span class="fw-bold">' +
					stateLoanshark.inputEthDeposit + ' ETH ' +
					' (~$' +
					Number(stateLoanshark.inputEthDeposit * stateLoanshark.priceOfEth / 100).toFixed(2) +
					')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.';
				modalMessage = 'You are depositing <span class="fw-bold">' +
					stateLoanshark.inputEthDeposit + ' ETH ' +
					' (~$' +
					Number(stateLoanshark.inputEthDeposit * stateLoanshark.priceOfEth / 100).toFixed(2) +
					')</span> ' +
					' and borrowing <span class="fw-bold">' +
					stateLoanshark.inputBtcDept + ' BTC ' +
					' (~$' +
					Number(stateLoanshark.inputBtcDept * stateLoanshark.priceOfBtc / 100).toFixed(2) +
					')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.';
			}

			setModal(!modal);
			setModalToken("ETHBTC");
			setModalAction(error ? "NOACTION" : "DEPOSITANDBORROW");
			setModalTitle(modalTitle);
			setModalMessage(modalMessage);
			setModalInputValue(0);
		}
	}

	function pickHex(color1, color2, weight) {
		var w1 = weight;
		var w2 = 1 - w1;
		var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
		Math.round(color1[1] * w1 + color2[1] * w2),
		Math.round(color1[2] * w1 + color2[2] * w2)];
		return rgb;
	}

	useEffect(() => {
		console.log(`Borrow`)
		let newHealthFactor =
			calculateHealthFactor(
				Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit),
				stateLoanshark.priceOfEth,
				stateLoanshark.LTV["ETHBTC"],
				Number(stateLoanshark.userDebtBalanceBtc) + Number(stateLoanshark.inputBtcDept),
				stateLoanshark.priceOfBtc);

		setDivStyle({
			color: "rgb(" + pickHex([67, 99, 167], [156, 63, 114], (Number(newHealthFactor) - 1.05)) + ")",
		});

		setBarData(
			[{
				data: [
					{
						x: 'ETH',
						y: (((Number(stateLoanshark.userDepositBalanceEth) + (Number(stateLoanshark.inputEthDeposit))) * stateLoanshark.priceOfEth / 100).toFixed(2)),
						fillColor: '#72BFFC',
					},
					{
						x: 'BTC',
						y: (((Number(stateLoanshark.userDebtBalanceBtc) + (Number(stateLoanshark.inputBtcDept))) * stateLoanshark.priceOfBtc / 100).toFixed(2)),
						fillColor: '#5EC7B6',
					}
				]
			}]
		)

	}, [stateLoanshark.inputEthDeposit, stateLoanshark.inputBtcDept])

	const openBarchart = useMemo(() => {

		if (barData === undefined || barData === null) return false
		if (barData.length > 0) return true
		return false
	}, [barData])

	// useEffect(() => {
	// 	console.log(stateSelectToken)
	// 	if (stateSelectToken.tokenAction === "COLLATERAL_TOKEN") {
	// 		setCollateralCurrency(stateSelectToken.selectedToken)
	// 	}
	// 	if (stateSelectToken.tokenAction === "BORROW_TOKEN") {
	// 		setBorrowCurrency(stateSelectToken.selectedToken)
	// 	}
	// }, [stateSelectToken])


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
			<div className={'main-content-layout'}>
				<Grid container spacing={3}>
					<Grid item xs={7}>
						<Grid container>
							<Grid item xs={12}>
								<NoBorderCard>
									<Grid container spacing={1}>
										<Grid item xs={12}>
											<span className={`borrow-card-trade-titile`}>Borrow</span>
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
															<Grid item xs={12}>
																<span>Collateral</span>
															</Grid>
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
																	value={stateLoanshark.inputEthDeposit}
																	onChange={(e) => {
																		dispatch(changeInputEthDeposit(e.target.value))
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
																			<span style={{ fontWeight: "800" }}>{Number(Number(stateLoanshark.myETHAmount).toFixed(2)).toLocaleString()} ETH</span>
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
																						dispatch(changeInputEthDeposit(stateLoanshark.myETHAmount))
																					}}
																				>MAX</Button>
																			</Grid>
																			<Grid item>
																				<TokenButton
																					collateralCurrency={collateralCurrency}
																					onClick={() => {
																						// console.log(depositTokenList)
																						// dispatch(changeTokenListState(depositTokenList))
																						// dispatch(changeDialogState(!stateSelectToken.dialogState))

																						let tempList = [...depositTokenList]
																						tempList.forEach((eachToken, index) => {
																							tempList[index] = {
																								...eachToken,
																								apy: stateLoanshark.aaveEthDepositRate,
																								balance: Number(Number(stateLoanshark.myETHAmount).toFixed(TOKEN_DISPLAY_DECIMAL)),
																							}
																						})
																						dispatch(changeSelectTokenTitleState(`Select a token as collateral`))
																						dispatch(changeTokenListState(tempList))
																						dispatch(changeDialogState(!stateSelectToken.dialogState))
																					}}
																				></TokenButton>
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
															<Grid item xs={12}>
																<span>Borrow</span>
															</Grid>
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
																	value={stateLoanshark.inputBtcDept}
																	onChange={(e) => {
																		dispatch(changeInputBtcDebt(e.target.value))
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
																			<span>Max Borrow: </span>
																			<span style={{ fontWeight: "800" }}>{
																				Number(Number(((Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit))
																					* stateLoanshark.priceOfEth
																					* stateLoanshark.LTV["ETHBTC"]
																					* stateLoanshark.liquidationPrice["ETHBTC"]
																					/ stateLoanshark.priceOfBtc)
																					- stateLoanshark.userDebtBalanceBtc).toFixed(2)).toLocaleString()
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
																						let borrowPower = Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit);
																						borrowPower = borrowPower * stateLoanshark.priceOfEth;
																						borrowPower = borrowPower * stateLoanshark.LTV["ETHBTC"];
																						borrowPower = borrowPower * stateLoanshark.liquidationPrice["ETHBTC"];
																						borrowPower = borrowPower / stateLoanshark.priceOfBtc;
																						borrowPower = borrowPower - stateLoanshark.userDebtBalanceBtc;
																						dispatch(changeInputBtcDebt(borrowPower));
																					}}
																				>MAX</Button>
																			</Grid>
																			<Grid item>
																				<TokenButton
																					collateralCurrency={borrowCurrency}
																					onClick={() => {
																						let borrowPower = stateLoanshark.userDepositBalanceEth;
																						borrowPower = borrowPower * stateLoanshark.priceOfEth;
																						borrowPower = borrowPower * stateLoanshark.LTV["ETHBTC"];
																						borrowPower = borrowPower * stateLoanshark.liquidationPrice["ETHBTC"];
																						borrowPower = borrowPower / stateLoanshark.priceOfBtc;
																						borrowPower = borrowPower - stateLoanshark.userDebtBalanceBtc;

																						let tempList = [...borrowTokenList]
																						tempList.forEach((eachToken, index) => {
																							tempList[index] = {
																								...eachToken,
																								apy: Number(Number(stateLoanshark.aaveBtcBorrowRate).toFixed(TOKEN_DISPLAY_DECIMAL)),
																								balance: Number(borrowPower.toFixed(TOKEN_DISPLAY_DECIMAL)),
																							}
																						})
																						dispatch(changeSelectTokenTitleState(`Select a token as borrow`))
																						dispatch(changeTokenListState(tempList))
																						dispatch(changeDialogState(!stateSelectToken.dialogState))
																					}}
																				></TokenButton>
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
																			let borrowPower = Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit);
																			borrowPower = borrowPower * stateLoanshark.priceOfEth;
																			borrowPower = borrowPower * stateLoanshark.LTV["ETHBTC"];
																			borrowPower = borrowPower * stateLoanshark.liquidationPrice["ETHBTC"];
																			borrowPower = borrowPower / stateLoanshark.priceOfBtc;
																			borrowPower = borrowPower - stateLoanshark.userDebtBalanceBtc;

																			dispatch(changeInputBtcDebt(borrowPower * parseFloat(item) / 100));
																		}}></BorrwoingPowerButton>
																</Grid>
															)
														})}
													</Grid>
												</Grid>
											</Grid>
										</Grid>
										<br></br>
										<Grid item xs={12}>
											<Grid container justifyContent={'space-between'}>
												<Grid item>
													<span className={`borrow-card-trade-borrow-power-text`}>Route:</span>
												</Grid>
												<Grid item>
													<Grid container spacing={1}>
														<span className={`borrow-card-trade-borrow-power-text`}>AAVE</span>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
										<Grid item xs={12}>
											<RoundShapeButton
												label={"borrow BTC using ETH as collateral"}
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
											<div style={{ width: "100%", textAlign: 'center' }}>
												<span style={{
													color: "rgba(38,38,38,1)",
													fontFamily: "ClashDisplay-Semibold",
													fontSize: "18px",
													fontWeight: "600",
													textAlign: 'center',
													fontStyle: "normal",
												}}>Health Factor</span>
											</div>
										</Grid>
										<Grid item xs={12}>
											<div style={{ width: "100%", textAlign: 'center' }}>
												<span style={divStyle} className={`health-factor-value`}>{calculateHealthFactor(
													Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit),
													stateLoanshark.priceOfEth,
													stateLoanshark.LTV["ETHBTC"],
													Number(stateLoanshark.userDebtBalanceBtc) + Number(stateLoanshark.inputBtcDept),
													stateLoanshark.priceOfBtc)}</span>
											</div>

										</Grid>
									</Grid>
								</NoBorderCard>
							</Grid>
							<Grid item xs={12}>
								<NoBorderCard>
									<Grid container>
										<Grid item xs={12}>
											<span className={`borrow-card-market-apy-title`}>Borrowing rate of BTC</span>
										</Grid>
										{[{
											title: "AAVE",
											value: `${stateLoanshark.aaveBtcBorrowRate}%`,
											textColor: "green",
										},
										{
											title: "Trader Joe",
											value: `${stateLoanshark.traderJoeBtcBorrowRate}%`,
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
							<Grid item xs={12}>
								<NoBorderCard>
									<Grid container>
										{[{
											title: "Current Price of ETH",
											value: "$" + Number(stateLoanshark.priceOfEth / 100).toLocaleString(),
											textColor: "black",
										},
										{
											title: "Current Price of BTC",
											value: "$" + Number(stateLoanshark.priceOfBtc / 100).toLocaleString(),
											textColor: "black",
										},
										{
											title: "LTV:",
											value: `${Number((stateLoanshark.LTV[stateLoanshark.selectedPair] * stateLoanshark.liquidationPrice[stateLoanshark.selectedPair] * 100).toFixed(2))} %`,
											textColor: "black",
										},
										{
											title: "Max Borrow Power",
											value: "$" + `${Number(((Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit))
												* stateLoanshark.priceOfEth
												* stateLoanshark.LTV["ETHBTC"]
												* stateLoanshark.liquidationPrice["ETHBTC"]
												/ stateLoanshark.priceOfBtc)
												- stateLoanshark.userDebtBalanceBtc).toFixed(2).toLocaleString()} BTC`,
											textColor: "black",
										},
										{
											title: "Liquidity Threshold",
											value: `${(stateLoanshark.LTV[stateLoanshark.selectedPair] * 100).toFixed(2)} %`,
											textColor: "black",
										},
										{
											title: "Liquidation Price of ETH",
											value: "$" + `${Number(((Number(stateLoanshark.userDebtBalanceBtc) + Number(stateLoanshark.inputBtcDept))
												* (stateLoanshark.priceOfBtc) / 100
												/ (Number(stateLoanshark.userDepositBalanceEth) + Number(stateLoanshark.inputEthDeposit))
												/ stateLoanshark.LTV["ETHBTC"]).toFixed(2)).toLocaleString()}`,
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
																<span className={`current-price-box-value`}>{item.value}</span>
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


