import React, { useEffect } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks'

import { changeMyProtectingPair } from '../../slice/smartvaultSlice';

import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'

function SmartVault1() {
	let navigate = useNavigate();
	useEffect(() => {
		console.log(`SmartVault1`)
	}, [])

	const dispatch = useAppDispatch();
	const state = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)

	function calculateHealthFactor(depositAmouont, priceOfDeposite, LTV, debtAmount, priceOfDebt) {
		if (debtAmount === undefined || debtAmount === null || debtAmount === 0) {
			return "-";
		}
		return ((depositAmouont * priceOfDeposite / 100) * LTV / (debtAmount * priceOfDebt / 100)).toFixed(2)
	}

	return (
		<>
			<div style={{ paddingRight: "20%", paddingLeft: "20%" }}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<p>Protection Setup (2/4 steps)</p>

					</Grid>
					<Grid item xs={12}>
						<p>Select a loan to protect</p>

					</Grid>
					<Grid item xs={5}>
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
								{
									label: "SELECT",
									callbackFunction: (() => {
										console.log(`on click select`)
										dispatch(changeMyProtectingPair("ETHBTC"));
										navigate("/app/main/smartVault3");
									}),
									color: "white"
								},
							]}
						>
						</DashboardCard>
					</Grid>

				</Grid>
			</div>
		</>
	)
}


export default SmartVault1;
