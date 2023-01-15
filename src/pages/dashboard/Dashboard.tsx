import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'
import Widget from '../../components/Widget/Widget'
import './Dashboard.scss'
import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'
import '../../App.scss'
import { useAppSelector, useAppDispatch } from '../../hooks'
import { toggleLoading } from '../../slice/layoutSlice';
import CustDialog from "../../components/Dialog/CustDialog";
import { refreshPrice } from '../../utils/API'
import SelectToken from "src/components/SelectToken/SelectToken";

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

function calculateHealthFactor(depositAmouont, priceOfDeposite, LTV, debtAmount, priceOfDebt) {
	if (debtAmount === undefined || debtAmount === null || debtAmount === 0) {
		return "-";
	}
	return ((depositAmouont * priceOfDeposite / 100) * LTV / (debtAmount * priceOfDebt / 100)).toFixed(2)
}

function Dashboard() {
	let navigate = useNavigate();
	useEffect(() => {
		console.log(`Dashboard`)
	}, [])

	const state = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)
	const dispatch = useAppDispatch();

	const [modal, setModal] = useState<boolean>(false);
	const [modalAction, setModalAction] = useState<any>("");
	const [modalTitle, setModalTitle] = useState<string>("");
	const [modalMessage, setModalMessage] = useState<string>("");
	const [modalToken, setModalToken] = useState<string>("");
	const [modalInputValue, setModalInputValue] = useState<any>("");

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
		let argsUnregister = [];
		var finalModalInputValue;
		switch (modalAction) {
			case "LEAVESMARTVAULTBTC":
				args = [
					window.web3.utils.toBN((modalInputValue * 100000000).toFixed(0)).toString(),
				];

				setModal(!modal);
				dispatch(toggleLoading());

				argsUnregister = [
					state.myAccount + "000000000000000000000000",
					"0x66756a6964616f00000000000000000000000000000000000000000000000000",
					1
				];

				if (stateBackd.myProtectionBtc && stateBackd.myProtectionBtc[0] > 0) {
					stateBackd.topupAction.methods
						.resetPosition(...argsUnregister)
						.send({ from: state.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							stateBackd.lpPoolBtc.methods
								.redeem(...args)
								.send({ from: state.myAccount })
								.on("error", (error, receipt) => {
									dispatch(toggleLoading());
								})
								.then((receipt) => {
									dispatch(toggleLoading());
									refreshPrice(state, stateBackd, dispatch, "GET_NEW");
								})
						})
				} else {
					stateBackd.lpPoolBtc.methods
						.redeem(...args)
						.send({ from: state.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							dispatch(toggleLoading());
							refreshPrice(state, stateBackd, dispatch, "GET_NEW");
						})
				}
				break;
			case "LEAVESMARTVAULTETH":
				args = [
					window.web3.utils.toBN((modalInputValue * 1000000000000000000).toFixed(0)).toString(),
				];

				setModal(!modal);
				dispatch(toggleLoading());

				argsUnregister = [
					state.myAccount + "000000000000000000000000",
					"0x66756a6964616f65746800000000000000000000000000000000000000000000",
					1
				];

				if (stateBackd.myProtectionEth && stateBackd.myProtectionEth[0] > 0) {

					stateBackd.topupAction.methods
						.resetPosition(...argsUnregister)
						.send({ from: state.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							stateBackd.lpPoolEth.methods
								.redeem(...args)
								.send({ from: state.myAccount })
								.on("error", (error, receipt) => {
									dispatch(toggleLoading());
								})
								.then((receipt) => {
									dispatch(toggleLoading());
									refreshPrice(state, stateBackd, dispatch, "GET_NEW");
								})
						})
				} else {
					stateBackd.lpPoolEth.methods
						.redeem(...args)
						.send({ from: state.myAccount })
						.on("error", (error, receipt) => {
							dispatch(toggleLoading());
						})
						.then((receipt) => {
							dispatch(toggleLoading());
							refreshPrice(state, stateBackd, dispatch, "GET_NEW");
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
			<CustDialog
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
			</CustDialog>
			{/* <SelectToken></SelectToken> */}
			<div className={'main-content-layout'}>
				<Grid container>
					<Grid item xs={12} >
						<Grid container spacing={1} justifyContent={"flex-end"} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
							<Grid item>
								<RoundShapeButton
									label={"borrow"}
									onClick={() => {
										navigate("/app/main/borrow")
									}}
									color={"white"}
								></RoundShapeButton>
							</Grid>
							<Grid item>
								<RoundShapeButton
									label={"smart vault"}
									onClick={() => {
										navigate("/app/main/smartVault1")
									}}
									color={"white"}
								></RoundShapeButton>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xl={4} lg={4} xs={12}>
								<Widget
									title={"Your Collateral"}
								>
									<div className={'display-title'}>${Number(((state.userDepositBalanceEth * state.priceOfEth / 100) + (state.userDepositBalanceAvax * state.priceOfAvax / 100)).toFixed(2)).toLocaleString()}</div>
								</Widget>
							</Grid>
							<Grid item xl={4} lg={4} xs={12}>
								<Widget
									title={"Your Debt"}
								>
									<div className={'display-title'}>${Number(((state.userDebtBalanceBtc * state.priceOfBtc / 100) + (state.userDebtBalanceUsdt * state.priceOfUsdt / 100)).toFixed(2)).toLocaleString()}</div>
								</Widget>
							</Grid>
							<Grid item xl={4} lg={4} xs={12}>
								<Widget
									title={"Your Smart Vault Balance"}
								>
									<div className={'display-title'}>${
										Number((stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100 +
											stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * state.priceOfEth / 100).toFixed(2)).toLocaleString()}</div>
								</Widget>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<div style={{ height: "53px" }}></div>
					</Grid>
					<Grid item xs={12}>
						<span className={'card-title'}>My Borrowing Position {state.userDepositBalanceEth <= 0 ? "(0)" : "(1)"} </span>
					</Grid>
					<Grid item xs={12}>
						<div style={{ height: "29px" }}></div>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid
								hidden={state.userDepositBalanceEth <= 0} 
								item xs={4}>
								<DashboardCard
									label={`ETH/BTC`}
									labelInUSD={"$" + Number((
										stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * (state.priceOfEth / 100) + stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * (state.priceOfBtc / 100)
									).toFixed(2)).toLocaleString()
									}
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
										{
											label: "Manage",
											callbackFunction: (() => {
												console.log(`on click manage`)
												//to manage page
												navigate("/app/main/manage", {
													state: {
														assest1Code: "ETH",
														assest2Code: "BTC",
													}
												});
											}),
											color: "white"
										},
									]}
								>
								</DashboardCard>
							</Grid>								
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<div style={{ height: "53px" }}></div>
					</Grid>




					<Grid item xs={12}>
						<span className={'card-title'}>My Smart Vault Position {stateBackd.myEthLpAmount <= 0 ? "(0)" : "(1)"}</span>
					</Grid>
					<Grid item xs={12}>
						<div style={{ height: "29px" }}></div>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid  hidden={stateBackd.myEthLpAmount <= 0}  item xs={4}>
								<DashboardCard
									label={`ETH`}
									labelInUSD={``}
									numberOfAssest={1}
									assest1Code={`eth`}
									assest2Code={``}
									pair={
										[
											{
												amountInUsdt: (stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * (state.priceOfEth/100)).toFixed(2),
												amountInCurrency: (stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate).toFixed(2),
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
												title: "Trigger Health Factor",
												value: parseFloat( stateBackd.myProtectionEth[0]? window.web3.utils.fromWei(stateBackd.myProtectionEth[0], 'ether') : 0)
											},
											{
												title: "Single Top-up",
												value: parseFloat( stateBackd.myProtectionEth[0]? window.web3.utils.fromWei(stateBackd.myProtectionEth[5], 'ether') : 0) + " ETH"
											},
											{
												title: "TVL",
												value: "$" + ( stateBackd.totalEthLpAmount * stateBackd.ethLpExchangeRate * state.priceOfEth / 100).toFixed(2)
											},
										]
									}
									button={
										[
											{
												label: "leave smart vault",
												callbackFunction: (() => {
													console.log(`on click leave smart vault`)
													toggleAction(
														"ETH",
														"LEAVESMARTVAULTETH",
														'Confirm to withdraw all from Smart Vault?',
														'You are withdrawing <span class="fw-bold">' +
														Number(stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate).toFixed(8) +
														' ETH (~$' +
														Number(stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * state.priceOfEth / 100).toFixed(2) +
														')</span> from Smart Vault. Remaining gas fee of ' + parseFloat(stateBackd.myGasBankBalance) + ' AVAX will be returned. <span class="fw-bold" style="color: #ff7d47"><br/>Caution: you will lose your automatic loan protection if you withdraw.</span>'
														, 
														"ETHBTC",
														stateBackd.myEthLpAmount 
													)
												}),
												color: "white"
											},
										]
									}
								>
								</DashboardCard>
							</Grid>
							<Grid  hidden={stateBackd.myBtcLpAmount <= 0} item xs={4}>
							<DashboardCard
									label={`BTC`}
									labelInUSD={``}
									numberOfAssest={1}
									assest1Code={`btc`}
									assest2Code={``}
									pair={
										[
											{
												amountInUsdt: Number((stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * (state.priceOfBtc/100)).toFixed(2)).toLocaleString(),
												amountInCurrency: Number(Number((stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate)).toFixed(2)).toLocaleString(),
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
												title: "Trigger Health Factor",
												value: ( stateBackd.myProtectionBtc[0] ? window.web3.utils.fromWei(stateBackd.myProtectionBtc[0], 'ether') : 0)
											},
											{
												title: "Single Top-up",
												value: ( stateBackd.myProtectionBtc[5] ? window.web3.utils.fromWei(stateBackd.myProtectionBtc[5], 'gwei') * 10 : 0 ) + " BTC"
											},
											{
												title: "TVL",
												value: "$" + Number(( stateBackd.totalBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100).toFixed(2)).toLocaleString()
											},
										]
									}
									button={
										[
											{
												label: "leave smart vault",
												callbackFunction: (() => {
													console.log(`on click leave smart vault`)
													toggleAction(
														"ETH",
														"LEAVESMARTVAULTBTC",
														'Confirm to withdraw all from Smart Vault?',
														'You are withdrawing <span class="fw-bold">' +
														Number(stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate).toFixed(8) +
														' BTC (~$' +
														Number(stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100).toFixed(2) +
														')</span> from Smart Vault. Remaining gas fee of ' + parseFloat(stateBackd.myGasBankBalance) + ' AVAX will be returned. <span class="fw-bold" style="color: #ff7d47"><br/>Caution: you will lose your automatic loan protection if you withdraw.</span>'
														, 
														"ETHBTC",
														stateBackd.myBtcLpAmount 
													)
												}),
												color: "white"
											},
										]
									}
								>
								</DashboardCard>
							</Grid>
							<Grid item xs={4}>
								
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		</>
	)
}


export default Dashboard;



