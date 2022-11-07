import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'
import Widget from '../../components/Widget/Widget'
import './Dashboard.scss'
import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'
import NoBorderCard from '../../pages/manage/Card/NoBorderCard'
import { Value } from "sass";
import '../../App.scss'

import { useAppSelector } from '../../hooks'

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

function calculateHealthFactor(depositeAmouont, priceOfDeposite, LTV, debtAmount, priceOfDebt) {
	if (debtAmount === undefined || debtAmount === null || debtAmount === 0) return "-"
	return ((depositeAmouont * priceOfDeposite / 100) * LTV / (debtAmount * priceOfDebt / 100)).toFixed(2)
}

function Dashboard() {
	let navigate = useNavigate();
	useEffect(() => {
		console.log(`Dashboard`)
	}, [])

	const state = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)

	return (
		<>
			<div className={'main-content-layout'}>
				<Grid container>
					<Grid item xs={12} >
						<Grid container spacing={1} justifyContent={"flex-end"} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
							<Grid item>
								<RoundShapeButton
									label={"add borrow"}
									onClick={() => {
										console.log(`click add borrow`)
									}}
									color={"white"}
								></RoundShapeButton>
							</Grid>
							<Grid item>
								<RoundShapeButton
									label={"add smart vault"}
									onClick={() => {
										console.log(`click add smart vault`)
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
									<div className={'display-title'}>${((state.userDepositBalanceEth * state.priceOfEth / 100) + (state.userDepositBalanceAvax * state.priceOfAvax / 100)).toFixed(2)}</div>
								</Widget>
							</Grid>
							<Grid item xl={4} lg={4} xs={12}>
								<Widget
									title={"Your Debt"}
								>
									<div className={'display-title'}>${((state.userDebtBalanceBtc * state.priceOfBtc / 100) + (state.userDebtBalanceUsdt * state.priceOfUsdt / 100)).toFixed(2)}</div>
								</Widget>
							</Grid>
							<Grid item xl={4} lg={4} xs={12}>
								<Widget
									title={"Your Smart Vault Balance"}
								>
									<div className={'display-title'}>${(stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * state.priceOfBtc / 100).toFixed(2)}</div>
								</Widget>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<div style={{ height: "53px" }}></div>
					</Grid>
					<Grid item xs={12}>
						<span className={'card-title'}>My Borrowing Position</span>
					</Grid>
					<Grid item xs={12}>
						<div style={{ height: "29px" }}></div>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid hidden={state.userDepositBalanceEth <= 0} item xs={4}>
								<DashboardCard
									label={`ETH/BTC`}
									labelInUSD={`$19,294`}
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
												value: "$" + (state.userDepositBalanceEth * state.priceOfEth / 100).toFixed(2) + "/" + state.userDepositBalanceEth + "ETH"
											},
											{
												title: "Debt",
												value: "$" + (state.userDebtBalanceBtc * state.priceOfBtc / 100).toFixed(2) + "/" + state.userDebtBalanceBtc + "ETH"
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
											label: "can go manage page",
											callbackFunction: (() => {
												console.log(`on click manage`)
												//to manage page
												navigate("/app/main/manage");
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
						<span className={'card-title'}>My Smart Value Position</span>
					</Grid>
					<Grid item xs={12}>
						<div style={{ height: "29px" }}></div>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={2}>
							<Grid item xs={4}>
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
									button={
										[
											{
												label: "payback",
												callbackFunction: (() => {
													console.log(`on click payback`)
												}),
												color: "white"
											},
											{
												label: "leave smart vault",
												callbackFunction: (() => {
													console.log(`on click leave smart vault`)
												}),
												color: "black"
											},
										]
									}
								>
								</DashboardCard>
							</Grid>
							<Grid item xs={4}>
								Card 2 USDT
							</Grid>
							<Grid item xs={4}>
								Card 3 USDT
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>

		</>
	)
}


export default Dashboard;



