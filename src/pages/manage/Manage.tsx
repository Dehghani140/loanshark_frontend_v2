import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Chart from 'react-apexcharts'
import NoBorderCard from './Card/NoBorderCard'
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'
import '../../App.scss'
import './Manage.scss'
import { useAppSelector, useAppDispatch } from '../../hooks'
import loansharkSlice, { changeInputEthDeposit, changeInputBtcDebt } from '../../slice/loansharkSlice';
import { changeDialogState, 
	changeTokenListState,
	changeSelectTokenTitleState,
} from '../../slice/selectTokenSlice';
import { toggleLoading } from '../../slice/layoutSlice';
import CustDialog from "../../components/Dialog/CustDialog";
import TokenButton from '../../components/Button/TokenButton/TokenButton'
import { roundDown } from '../../utils/utilFunction/utilFunction'
import { refreshPrice } from '../../utils/API'
import {
	depositTokenList,
	borrowTokenList,
	TOKEN_DISPLAY_DECIMAL,
} from '../../utils/utilList'


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

	let deposit = 'ETH'
	let debt = "BTC"

	const stateLoanshark = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)
	const stateSelectToken = useAppSelector((state) => state.selectToken)

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

	const [modal, setModal] = useState<boolean>(false);
	const [modalAction, setModalAction] = useState<any>("");
	const [modalTitle, setModalTitle] = useState<string>("");
	const [modalMessage, setModalMessage] = useState<string>("");
	const [modalToken, setModalToken] = useState<string>("");
	const [modalInputValue, setModalInputValue] = useState<any>("");

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
						y: (((Number(stateLoanshark.userDepositBalanceEth)) * stateLoanshark.priceOfEth / 100).toFixed(2)),
						fillColor: '#72BFFC',
					},
					{
						x: 'BTC',
						y: (((Number(stateLoanshark.userDebtBalanceBtc)) * stateLoanshark.priceOfBtc / 100).toFixed(2)),
						fillColor: '#5EC7B6',
					}
				]
			}]
		)

		setMaxdepositAmount(Number(stateLoanshark.myETHAmount))
		// depositAmount: 0,

	}, [stateLoanshark.userDepositBalanceEth, stateLoanshark.userDebtBalanceBtc])


	const openBarchart = useMemo(() => {
		if (barData === undefined || barData === null) return false
		if (barData.length > 0) return true
		return false
	}, [barData])

	function calculateNetInterestRate():number{
		return Number(((
			0.0103 * (stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100)
			- stateLoanshark.aaveBtcBorrowRate / 100 * (stateLoanshark.userDebtBalanceBtc * stateLoanshark.priceOfBtc / 100)
			+ 0.054 * (stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * stateLoanshark.priceOfBtc / 100)
		) / (stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100) * 100).toFixed(TOKEN_DISPLAY_DECIMAL))
	}

	const maxBorrowPower = useMemo(() => {
		let borrowPower = stateLoanshark.userDepositBalanceEth;
		borrowPower = borrowPower * stateLoanshark.priceOfEth;
		borrowPower = borrowPower * stateLoanshark.LTV["ETHBTC"];
		borrowPower = borrowPower * stateLoanshark.liquidationPrice["ETHBTC"];
		borrowPower = borrowPower / stateLoanshark.priceOfBtc;
		borrowPower = borrowPower - stateLoanshark.userDebtBalanceBtc;
		return (
			borrowPower
		).toFixed(8);
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
		let args = [];
		let approveArgs = [];
		var finalModalInputValue;
		switch (modalAction) {
			case "DEPOSIT":
				approveArgs = [
					(modalToken === "ETH" ? stateLoanshark.myFujiVaultETHBTC.options.address : modalToken === "AVAX" ? stateLoanshark.myFujiVaultAVAXUSDT.options.address : ""),
					window.web3.utils.toBN(window.web3.utils.toWei((modalInputValue + ""), 'ether')).toString()
				]

				args = [
					window.web3.utils.toBN(window.web3.utils.toWei((modalInputValue + ""), 'ether')).toString(),
				];

				setModal(!modal);
				dispatch(toggleLoading());

				if (modalToken === "ETH") {
					stateLoanshark.myETHContract.methods
						.approve(...approveArgs)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							stateLoanshark.myFujiVaultETHBTC.methods
								.deposit(...args)
								.send({ from: stateLoanshark.myAccount })
								.on("error", (error, receipt) => {
									dispatch(toggleLoading());
								})
								.then((receipt) => {
									dispatch(toggleLoading());
									refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
								})
						});
				}

				if (modalToken === "AVAX") {
					let a = window.web3.utils.toBN(window.web3.utils.toWei(Number.parseFloat(modalInputValue), 'ether')).toString();
					stateLoanshark.myFujiVaultAVAXUSDT.methods
						.deposit(...args)
						.send({ from: stateLoanshark.myAccount, value: a })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							dispatch(toggleLoading());
							refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
						})
				}
				break;
			case "WITHDRAW":
				args = [
					window.web3.utils.toBN(window.web3.utils.toWei((modalInputValue) + "", 'ether')).toString(),
				];

				setModal(!modal);
				dispatch(toggleLoading());

				if (modalToken === "ETH") {
					stateLoanshark.myFujiVaultETHBTC.methods
						.withdraw(...args)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							dispatch(toggleLoading());
							refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
						});
				}

				if (modalToken === "AVAX") {
					stateLoanshark.myFujiVaultAVAXUSDT.methods
						.withdraw(...args)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							dispatch(toggleLoading());
							refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
						});
				}
				break;
			case "BORROW":
				if (modalToken === "ETH") {
					finalModalInputValue = Number(modalInputValue * 100000000).toFixed(0);
				}
				if (modalToken === "AVAX") {
					finalModalInputValue = Number(modalInputValue * 1000000).toFixed(0);
				}

				args = [
					finalModalInputValue
				];

				setModal(!modal);
				dispatch(toggleLoading());

				if (modalToken === "ETH") {
					stateLoanshark.myFujiVaultETHBTC.methods
						.borrow(...args)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							dispatch(toggleLoading());
							refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
						});
				}

				if (modalToken === "AVAX") {
					stateLoanshark.myFujiVaultAVAXUSDT.methods
						.borrow(...args)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							dispatch(toggleLoading());
							refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
						});
				}
				break;
			case "PAYBACK":
				if (modalToken === "ETH") {
					finalModalInputValue = modalInputValue < 0 ? Number(1000000000000).toFixed(0) : (modalInputValue * 100000000).toFixed(0);
				}
				if (modalToken === "AVAX") {
					finalModalInputValue = modalInputValue < 0 ? Number(1000000000000).toFixed(0) : window.web3.utils.toBN(window.web3.utils.toWei(modalInputValue, 'picoether')).toString();
				}

				approveArgs = [
					(modalToken === "ETH" ? stateLoanshark.myFujiVaultETHBTC.options.address : modalToken === "AVAX" ? stateLoanshark.myFujiVaultAVAXUSDT.options.address : ""),
					window.web3.utils.toBN(finalModalInputValue).toString()
				]

				args = [
					modalInputValue < 0 ? "-1" : window.web3.utils.toBN(finalModalInputValue).toString(),
				];

				setModal(!modal);
				dispatch(toggleLoading());

				if (modalToken === "ETH") {
					stateLoanshark.myBTCContract.methods
						.approve(...approveArgs)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							stateLoanshark.myFujiVaultETHBTC.methods
								.payback(...args)
								.send({ from: stateLoanshark.myAccount })
								.on("error", (error, receipt) => {
									dispatch(toggleLoading());
								})
								.then((receipt) => {
									dispatch(toggleLoading());
									refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
								})
						});
				}

				if (modalToken === "AVAX") {
					setModal(!modal);
					dispatch(toggleLoading());

					stateLoanshark.myUSDTContract.methods
						.approve(...approveArgs)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							stateLoanshark.myFujiVaultAVAXUSDT.methods
								.payback(...args)
								.send({ from: stateLoanshark.myAccount })
								.on("error", (error, receipt) => {
									dispatch(toggleLoading());
								})
								.then((receipt) => {
									dispatch(toggleLoading());
									refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
								})
						});
				}
				break;
			case "LEAVESMARTVAULTBTC":
				args = [
					window.web3.utils.toBN((modalInputValue * 100000000).toFixed(0)).toString(),
				];

				setModal(!modal);
				dispatch(toggleLoading());

				let argsUnregister = [
					stateLoanshark.myAccount + "000000000000000000000000",
					"0x66756a6964616f00000000000000000000000000000000000000000000000000",
					1
				];

				if (stateBackd.myProtectionBtc && stateBackd.myProtectionBtc[0] > 0) {

					stateBackd.topupAction.methods
						.resetPosition(...argsUnregister)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							stateBackd.lpPoolBtc.methods
								.redeem(...args)
								.send({ from: stateLoanshark.myAccount })
								.on("error", (error, receipt) => {
									dispatch(toggleLoading());
								})
								.then((receipt) => {
									dispatch(toggleLoading());
									refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
								})
						})
				} else {
					stateBackd.lpPoolBtc.methods
						.redeem(...args)
						.send({ from: stateLoanshark.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							dispatch(toggleLoading());
							refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
						})
				}
				break;
			case "LEAVESMARTVAULTETH":
					let args2 = [
						window.web3.utils.toBN((modalInputValue * 1000000000000000000).toFixed(0)).toString(),
					];
	
					setModal(!modal);
					dispatch(toggleLoading());
	
					let argsUnregister2 = [
						stateLoanshark.myAccount + "000000000000000000000000",
						"0x66756a6964616f65746800000000000000000000000000000000000000000000",
						1
					];
	
					if (stateBackd.myProtectionEth && stateBackd.myProtectionEth[0] > 0) {
	
						stateBackd.topupAction.methods
							.resetPosition(...argsUnregister2)
							.send({ from: stateLoanshark.myAccount })
							.on("error", (error, receipt) => {
								dispatch(toggleLoading());
							})
							.then((receipt) => {
								stateBackd.lpPoolEth.methods
									.redeem(...args2)
									.send({ from: stateLoanshark.myAccount })
									.on("error", (error, receipt) => {
										dispatch(toggleLoading());
									})
									.then((receipt) => {
										dispatch(toggleLoading());
										refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
									})
							})
					} else {
						stateBackd.lpPoolEth.methods
							.redeem(...args2)
							.send({ from: stateLoanshark.myAccount })
							.on("error", (error, receipt) => {
								dispatch(toggleLoading());
							})
							.then((receipt) => {
								dispatch(toggleLoading());
								refreshPrice(stateLoanshark, stateBackd, dispatch, "GET_NEW");
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
			<div className={'main-content-layout'}>
				<Grid container spacing={3}>
					<Grid item xs={7}>
						<div style={{ height: `${FIRST_ROW_CARD_HEIGHT}px`, fontFamily: "poppins" }}>
							<NoBorderCard>
								<Grid container>
									<Grid item xs={12}>

									</Grid>
									<Grid item xs={12}>
										<div style={{ padding: "10px" }}>
											<Grid container justifyContent={"space-between"}>
												<div>
													<Grid item>

														<span style={{
															color: "rgba(38,38,38,1)",
															fontSize: "21px",
															fontFamily: "poppins",
															fontWeight: "400",
														}}
														>
															<span style={{ position: "relative", minWidth: "60px", paddingRight: "40px" }}>
																<img
																	style={{
																		width: "30px", height: "30px",
																		position: "absolute",
																		zIndex: "1",
																		left: "20px",
																		top: "10px",
																	}} src={`/assets/icon/btc-logo.svg`} alt=""></img>
																<img style={{ width: "30px", height: "30px" }} src={`/assets/icon/eth-logo.svg`} alt=""></img>
															</span>
															ETH/BTC
														</span>
													</Grid>
												</div>
												<div>
													<Grid item xs={12}>
														<Grid container justifyContent={'end'} justifyItems={'end'}>
															<Grid item>
																<span style={{
																	color: "rgba(38,38,38,1)",
																	fontSize: "21px",
																	fontFamily: "poppins",
																	fontWeight: "700",
																	textAlign: 'end',
																}}
																>
																	${Number((stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100).toFixed(2)).toLocaleString()}
																</span>
																<span style={{
																	color: "rgba(38,38,38,1)",
																	fontSize: "21px",
																	fontFamily: "poppins",
																	fontWeight: "400",
																	textAlign: 'end',
																}}> / </span>
																<span style={{
																	color: "#223354",
																	fontSize: "14px",
																	fontFamily: "poppins",
																	fontWeight: "100",
																	textAlign: 'end',
																}}
																>{Number(Number(stateLoanshark.userDepositBalanceEth).toFixed(2)).toLocaleString()} ETH</span>
															</Grid>
														</Grid>
													</Grid>
													<Grid item xs={12}>
														<Grid container justifyContent={'end'} justifyItems={'end'}>
															<Grid item>
																<span style={{
																	color: "rgba(38,38,38,1)",
																	fontSize: "21px",
																	fontFamily: "poppins",
																	fontWeight: "700",
																	textAlign: 'end',
																}}
																>
																	${(stateLoanshark.userDebtBalanceBtc * stateLoanshark.priceOfBtc / 100).toFixed(2)}
																</span>
																<span style={{
																	color: "rgba(38,38,38,1)",
																	fontSize: "21px",
																	fontFamily: "poppins",
																	fontWeight: "400",
																	textAlign: 'end',
																}}> / </span>
																<span style={{
																	color: "#223354",
																	fontSize: "14px",
																	fontFamily: "poppins",
																	fontWeight: "100",
																	textAlign: 'end',
																}}
																>{Number(Number(stateLoanshark.userDebtBalanceBtc).toFixed(2)).toLocaleString()} BTC
																</span>
															</Grid>
														</Grid>
													</Grid>
												</div>
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
															<span>Collateral</span>
														</Grid>
														<Grid item>
															<span style={{
																fontFamily: "poppins",
																fontWeight: "800",
																fontSize: "16px"
															}}>{`$${Number((stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100).toFixed(2)).toLocaleString()} / ${Number(Number(stateLoanshark.userDepositBalanceEth).toFixed(2)).toLocaleString()} ${assest1Code}`}</span>
															{/* <span>{`$${(stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100).toFixed(2)}`}</span> */}
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Health Factor</span>
														</Grid>
														<Grid item>
															<span style={{ fontWeight: "800", fontSize: "16px" }}>{
																Number(Number(calculateHealthFactor(
																	stateLoanshark.userDepositBalanceEth,
																	stateLoanshark.priceOfEth,
																	stateLoanshark.LTV["ETHBTC"],
																	stateLoanshark.userDebtBalanceBtc,
																	stateLoanshark.priceOfBtc)).toFixed(2)).toLocaleString()
															}
															</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Debt</span>
														</Grid>
														<Grid item>
															{/* <span style={{ fontWeight: "800", fontSize: "16px" }}>$41340.1/1.87BTC</span> */}
															<span style={{ fontWeight: "800", fontSize: "16px" }}>{`$${Number(Number(stateLoanshark.userDebtBalanceBtc * stateLoanshark.priceOfBtc / 100).toFixed(2)).toLocaleString()
																} / ${Number(Number(stateLoanshark.userDebtBalanceBtc).toFixed(2)).toLocaleString()
																} ${assest2Code}`}</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Smart Vault</span>
														</Grid>
														<Grid item>
															{/* <span style={{ fontWeight: "800", fontSize: "16px" }}>$19294</span> */}
															<span style={{ fontWeight: "800", fontSize: "16px" }}>{`$${Number(Number(stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * (stateLoanshark.priceOfEth / 100) + stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * (stateLoanshark.priceOfBtc / 100)).toFixed(2)).toLocaleString()
																}`}</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>APY</span>
														</Grid>
														<Grid item>
															<span style={{ fontWeight: "800", fontSize: "16px" }}>{
																Number(Number(
																	(
																		0.0103 * (stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100)
																		- stateLoanshark.aaveBtcBorrowRate / 100 * (stateLoanshark.userDebtBalanceBtc * stateLoanshark.priceOfBtc / 100)
																		+ 0.054 * (stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * stateLoanshark.priceOfBtc / 100)
																	) / (stateLoanshark.userDepositBalanceEth * stateLoanshark.priceOfEth / 100) * 100).toFixed(2)).toLocaleString()}%</span>
														</Grid>
													</Grid>
												</div>
											</Grid>
											<Grid item xs={6}>
												<div style={{ padding: "10px 0px" }}>
													<Grid container justifyContent={"space-between"}>
														<Grid item>
															<span>Provider</span>
														</Grid>
														<Grid item>
															<span style={{ fontWeight: "800", fontSize: "16px" }}>AAVE</span>
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
							<Grid  hidden={stateBackd.myBtcLpAmount <= 0}  item xs={12}>
							<NoBorderCard >
								<Grid hidden={stateBackd.myEthLpAmount > 0} container>
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
																	fontFamily: "poppins",
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
											title: "Trigger Health Factor",
											value: (stateBackd.myProtectionBtc[0] ? window.web3.utils.fromWei(stateBackd.myProtectionBtc[0], 'ether') : 0),
										},
										{
											title: "Repay amount each time",
											value: (stateBackd.myProtectionBtc[5] ? window.web3.utils.fromWei(stateBackd.myProtectionBtc[5], 'gwei') * 10 : 0) + " BTC",
										},
										{
											title: "Remaining prepaid gas free",
											value: Number(stateBackd.myGasBankBalance).toFixed(2),
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
													if (stateBackd.myBtcLpAmount <= 0) {
														toggleNoAction(
															deposit,
															'Unable to withdraw all from Smart Vault',
															'You do not have any BTC in Smart Vault.',
															deposit + debt
														)
													} else {
														toggleAction(
															deposit,
															"LEAVESMARTVAULTBTC",
															'Confirm to withdraw all from Smart Vault?',
															'You are withdrawing <span class="fw-bold">' +
															Number(stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate).toFixed(8) +
															' BTC (~$' +
															Number(stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * stateLoanshark.priceOfBtc / 100).toFixed(2) +
															')</span> from Smart Vault. Remaining gas fee of ' + parseFloat(stateBackd.myGasBankBalance) + ' AVAX will be returned. <span class="fw-bold" style="color: #ff7d47"><br/>Caution: you will lose your automatic loan protection if you withdraw.</span>'
															,
															deposit + debt,
															stateBackd.myBtcLpAmount
														)
													}
												}}
												color={"white"}
											></RoundShapeButton>
										</div>
									</Grid>
								</Grid>
							</NoBorderCard>
							</Grid>

							<Grid  hidden={stateBackd.myEthLpAmount < 0}  item xs={12}>
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
																	fontFamily: "poppins",
																	overflow: "hidden",
																	fontSize: "48px",
																	fontWeight: "700",
																	color: "#333333",
																}}
																value={Number(stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate).toFixed(8)}
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
																			maxHeight: "20px",
																			maxWidth: "20px",
																		}}
																	>
																		<img style={{ width: "100%", height: "100%" }}
																			src={`/assets/icon/eth-logo.svg`} alt="" />
																	</div>
																</Grid>
																<Grid item>
																	<span style={{ fontSize: "24px" }}>ETH</span>
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
											title: "Trigger Health Factor",
											value: (stateBackd.myProtectionEth[0] ? window.web3.utils.fromWei(stateBackd.myProtectionEth[0], 'ether') : 0),
										},
										{
											title: "Repay amount each time",
											value: (stateBackd.myProtectionEth[5] ? window.web3.utils.fromWei(stateBackd.myProtectionEth[5], 'gwei') * 10 : 0) + " ETH",
										},
										{
											title: "Remaining prepaid gas free",
											value: Number(stateBackd.myGasBankBalance).toFixed(2),
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
													if (stateBackd.myEthLpAmount <= 0) {
														toggleNoAction(
															deposit,
															'Unable to withdraw all from Smart Vault',
															'You do not have any BTC in Smart Vault.',
															deposit + debt
														)
													} else {
														toggleAction(
															deposit,
															"LEAVESMARTVAULTETH",
															'Confirm to withdraw all from Smart Vault?',
															'You are withdrawing <span class="fw-bold">' +
															Number(stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate).toFixed(8) +
															' ETH (~$' +
															Number(stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * stateLoanshark.priceOfEth / 100).toFixed(2) +
															')</span> from Smart Vault. Remaining gas fee of ' + parseFloat(stateBackd.myGasBankBalance) + ' AVAX will be returned. <span class="fw-bold" style="color: #ff7d47"><br/>Caution: you will lose your automatic loan protection if you withdraw.</span>'
															,
															deposit + debt,
															stateBackd.myEthLpAmount
														)
													}
												}}
												color={"white"}
											></RoundShapeButton>
										</div>
									</Grid>
								</Grid>
							</NoBorderCard>
							</Grid>
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
																			fontSize: "20px",
																			fontWeight: "700",
																			fontStyle: "normal",
																			overflow: "hidden",
																			width: "100%",
																			height: "100%",
																			border: "0px",
																			backgroundColor: "transparent",
																		}}
																		value={collateralAmount}
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
																				<span>Balance </span>
																				<span style={{ fontWeight: "800" }}>{`${Number(Number(maxdepositAmount.toFixed(2))).toLocaleString()}`}</span>
																			</div>

																		</Grid>
																		<Grid item xs={12}>
																			<Grid container justifyContent={'end'} alignItems={'center'}>
																				<Grid item>
																					<div
																						style={{ paddingRight: "1px" }}
																					>
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
																					<TokenButton
																						collateralCurrency={`eth`}
																						onClick={() => {
																							let tempList = [...depositTokenList]
																							tempList.forEach((eachToken,index)=>{
																								tempList[index] = {
																									...eachToken,
																									apy:calculateNetInterestRate(),
																									balance:Number(maxdepositAmount.toFixed(TOKEN_DISPLAY_DECIMAL)),
																								}
																							})
																							dispatch(changeSelectTokenTitleState(`Select a token to ${collateralSelection.toLowerCase()}`))
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
														if (collateralSelection === ICollateral.DEPOSIT) {
															let newHealthFactor = calculateHealthFactor(
																Number(stateLoanshark.userDepositBalanceEth) + Number(collateralAmount),
																stateLoanshark.priceOfEth,
																stateLoanshark.LTV["ETHBTC"],
																stateLoanshark.userDebtBalanceBtc,
																stateLoanshark.priceOfBtc);
															if (collateralAmount <= 0 || isNaN(collateralAmount)) {
																//popup
																toggleNoAction(
																	deposit,
																	'Unable to deposit',
																	'Please enter the amount that you want to deposit.',
																	deposit + debt
																)
															} else if (Number(collateralAmount) > Number(stateLoanshark.myETHAmount)) {
																toggleNoAction(
																	deposit,
																	'Unable to deposit',
																	'You do not have enough ETH to deposit.',
																	deposit + debt
																)
															} else if (newHealthFactor < 1.06) {
																toggleNoAction(
																	deposit,
																	'Unable to deposit',
																	'You are unable to deposit <span class="fw-bold">' +
																	collateralAmount + ' ' + deposit +
																	' (~$' +
																	Number(collateralAmount * stateLoanshark.priceOfEth / 100).toFixed(2) +
																	')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05.',
																	deposit + debt
																)
															} else {
																toggleAction(
																	deposit,
																	"DEPOSIT",
																	'Confirm to deposit?',
																	'You are depositing <span class="fw-bold">' +
																	collateralAmount + ' ' + deposit +
																	' (~$' +
																	Number(collateralAmount * stateLoanshark.priceOfEth / 100).toFixed(2) +
																	')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.',
																	deposit + debt,
																	collateralAmount
																)
															}
														} else if (collateralSelection === ICollateral.WITHDRAW) {
															let newHealthFactor = calculateHealthFactor(
																Number(stateLoanshark.userDepositBalanceEth) - Number(collateralAmount),
																stateLoanshark.priceOfEth,
																stateLoanshark.LTV["ETHBTC"],
																stateLoanshark.userDebtBalanceBtc,
																stateLoanshark.priceOfBtc);
															if (collateralAmount <= 0 || isNaN(collateralAmount)) {
																toggleNoAction(
																	deposit,
																	'Unable to withdraw',
																	'Please enter the amount that you want to withdraw.',
																	deposit + debt
																)
															} else if (collateralAmount > maxdepositAmount) {
																toggleNoAction(
																	deposit,
																	'Unable to withdraw',
																	'You do not have so much ETH to withdraw.',
																	deposit + debt
																)
															} else if (newHealthFactor < 1.06 && Number(newHealthFactor) != 0) {
																toggleNoAction(
																	deposit,
																	'Unable to withdraw',
																	'You are unable to withdraw <span class="fw-bold">' +
																	collateralAmount + ' ' + deposit +
																	' (~$' +
																	Number(collateralAmount * stateLoanshark.priceOfEth / 100).toFixed(2) +
																	')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05.',
																	deposit + debt
																)
															} else {
																toggleAction(
																	deposit,
																	"WITHDRAW",
																	'Confirm to withdraw?',
																	'You are withdrawing <span class="fw-bold">' +
																	collateralAmount + ' ' + deposit +
																	' (~$' +
																	Number(collateralAmount * stateLoanshark.priceOfEth / 100).toFixed(2) +
																	')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.',
																	deposit + debt,
																	collateralAmount
																)
															}
														}
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
																	borrowPower = borrowPower * stateLoanshark.LTV["ETHBTC"];
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
																			fontSize: "20px",
																			fontWeight: "700",
																			fontStyle: "normal",
																			overflow: "hidden",
																			width: "100%",
																			height: "100%",
																			border: "0px",
																			backgroundColor: "transparent",
																		}}
																		value={debtAmount}
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
																				<span style={{ fontWeight: "800" }}>{`${Number(Number(maxdebtAmount.toFixed(2))).toLocaleString()}`}</span>
																			</div>
																		</Grid>
																		<Grid item xs={12}>
																			<Grid container justifyContent={'end'} alignItems={'center'}>
																				<Grid item>
																					<div 
																					style={{ paddingRight: "1px" }}
																					>
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
																					<TokenButton
																						collateralCurrency={`btc`}
																						onClick={() => {

																							let tempList = [...borrowTokenList]
																							console.log(stateLoanshark.aaveBtcBorrowRate)
																							console.log(typeof(stateLoanshark.aaveBtcBorrowRate))
																							
																							tempList.forEach((eachToken,index)=>{
																								tempList[index] = {
																									...eachToken,
																									apy:Number(Number(stateLoanshark.aaveBtcBorrowRate).toFixed(TOKEN_DISPLAY_DECIMAL)),
																									balance:Number(maxdebtAmount.toFixed(TOKEN_DISPLAY_DECIMAL)),
																								}
																							})
																							dispatch(changeSelectTokenTitleState(`Select a token to ${debtSelection.toLowerCase()}`))
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
														<span style={{fontSize:"10px"}}>{debtSelection === IDebt.BORROW ? "Borrowing Power:" : "Payback Percentage"}</span>
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
																			fontFamily: "poppins",
																			fontSize: "14px",
																			fontWeight: "400",
																			cursor: "pointer",
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
													onClick={() => {
														if (debtSelection === IDebt.BORROW) {
															let newHealthFactor =
																calculateHealthFactor(
																	Number(stateLoanshark.userDepositBalanceEth),
																	stateLoanshark.priceOfEth,
																	stateLoanshark.LTV["ETHBTC"],
																	Number(stateLoanshark.userDebtBalanceBtc) + Number(debtAmount),
																	stateLoanshark.priceOfBtc);
															if (Number(debtAmount) <= 0 || isNaN(debtAmount)) {
																toggleNoAction(
																	deposit,
																	'Unable to borrow',
																	'Please enter the amount that you want to borrow.',
																	deposit + debt
																)
															} else if (Number(newHealthFactor) < 1.06) {
																toggleNoAction(
																	deposit,
																	'Unable to borrow',
																	'You are unable to borrow <span class="fw-bold">' +
																	debtAmount + ' ' + debt +
																	' (~$' +
																	Number(debtAmount * stateLoanshark.priceOfBtc / 100).toFixed(2) +
																	')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05.',
																	deposit + debt
																)
															} else {
																toggleAction(
																	deposit,
																	"BORROW",
																	'Confirm to borrow?',
																	'You are borrowing <span class="fw-bold">' +
																	debtAmount + ' ' + debt +
																	' (~$' +
																	Number(debtAmount * stateLoanshark.priceOfBtc / 100).toFixed(2) +
																	')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.',
																	deposit + debt,
																	debtAmount
																)
															}
														} else if (debtSelection === IDebt.PAYBACK) {
															let newHealthFactor =
																calculateHealthFactor(
																	Number(stateLoanshark.userDepositBalanceEth),
																	stateLoanshark.priceOfEth,
																	stateLoanshark.LTV["ETHBTC"],
																	Number(stateLoanshark.userDebtBalanceBtc) - Number(debtAmount),
																	stateLoanshark.priceOfBtc);
															if (Number(debtAmount) <= 0 || isNaN(debtAmount)) {
																toggleNoAction(
																	deposit,
																	'Unable to payback',
																	'Please enter the amount that you want to payback.',
																	deposit + debt
																)
															} else if (Number(debtAmount) > (stateLoanshark.myBTCAmount)) {
																toggleNoAction(
																	deposit,
																	'Unable to payback',
																	'You do not have enough BTC to payback.',
																	deposit + debt
																)
															} else if (Number(newHealthFactor) < 1.06 && Number(newHealthFactor) > 0) {
																toggleNoAction(
																	deposit,
																	'Unable to payback',
																	'You are unable to payback <span class="fw-bold">' +
																	debtAmount + ' ' + debt +
																	' (~$' +
																	Number(debtAmount * stateLoanshark.priceOfBtc / 100).toFixed(2) +
																	')</span>. <br/>The new health factor will be <span class="fw-bold" style="color: #ff7d47">' + newHealthFactor + '</span> which is below 1.05.',
																	deposit + debt
																)

															} else {
																toggleAction(
																	deposit,
																	"PAYBACK",
																	'Confirm to payback?',
																	'You are paying back <span class="fw-bold">' +
																	debtAmount + ' ' + debt +
																	' (~$' +
																	Number(debtAmount * stateLoanshark.priceOfBtc / 100).toFixed(2) +
																	')</span>. <br/>Your new health factor will be <span class="fw-bold" style="color: #68ca66">' + newHealthFactor + '</span>.',
																	deposit + debt,
																	debtAmount)
															}
														}
													}}
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
								<div>
									<NoBorderCard>
										<Grid container>
											<Grid item xs={12}>

												<div style={{ width: "100%", textAlign: 'center' }}>
													<span style={{
														color: "rgba(38,38,38,1)",
														fontFamily: "ClashDisplay-Semibold",
														fontSize: "18px",
														fontWeight: "600",
														fontStyle: "normal",
													}}>Health Factor</span>

												</div>
											</Grid>
											<Grid item xs={12}>
												<div style={{ width: "100%", textAlign: 'center' }}>
													<span className={`health-factor-value`}>{calculateHealthFactor(
														stateLoanshark.userDepositBalanceEth,
														stateLoanshark.priceOfEth,
														stateLoanshark.LTV["ETHBTC"],
														stateLoanshark.userDebtBalanceBtc,
														stateLoanshark.priceOfBtc
													)}</span>
												</div>
											</Grid>
										</Grid>
									</NoBorderCard>
								</div>
							</Grid>
							<Grid item xs={12}>
								<NoBorderCard>
									<Grid container>
										{[{
											title: "Current Price of ETH",
											value: stateLoanshark.priceOfEth / 100,
											textColor: "black",
										},
										{
											title: "Current Price of BTC",
											value: stateLoanshark.priceOfBtc / 100,
											textColor: "black",
										},
										{
											title: "LTV",
											value: `${(stateLoanshark.LTV[stateLoanshark.selectedPair] * stateLoanshark.liquidationPrice[stateLoanshark.selectedPair] * 100).toFixed(2)} %`,
											textColor: "black",
										},
										{
											title: "Max Borrow Power",
											value: `${maxBorrowPower} BTC`,
											textColor: "black",
										},
										{
											title: "Liquidity Threshold",
											value: `${(stateLoanshark.LTV[stateLoanshark.selectedPair] * 100).toFixed(2)} %`,
											textColor: "black",
										},
										{
											title: "Liquidation Price of ETH",
											value: `${((Number(stateLoanshark.userDebtBalanceBtc))
												* (stateLoanshark.priceOfBtc) / 100
												/ (Number(stateLoanshark.userDepositBalanceEth))
												/ stateLoanshark.LTV["ETHBTC"]).toFixed(2)}`,
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


export default Manage;


