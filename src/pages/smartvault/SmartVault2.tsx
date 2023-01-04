import React, { useEffect } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../hooks'

import { changeMyProtectingPair } from '../../slice/smartvaultSlice';

import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'

import './SmartVault.scss'
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
			<div style={{ paddingTop: "50px", width: "1260px", marginLeft: "auto", marginRight: "auto" }}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
                        <span className={'card-title'}>Select a loan to protect</span><span className={'card-subtitle'}> (2/4 steps)</span>
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
										value: "$" + Number((stateBackd.myEthLpAmount * stateBackd.ethLpExchangeRate * (state.priceOfEth/100)  + stateBackd.myBtcLpAmount * stateBackd.btcLpExchangeRate * (state.priceOfBtc/100)).toFixed(2)).toLocaleString()
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
