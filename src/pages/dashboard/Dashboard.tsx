import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';
// import { Row, Col, Table, Button, Modal, ModalBody } from 'reactstrap';
// import { ThemeProvider, createGlobalStyle } from 'styled-components'
// import {
// 	Title
// } from './TestExpport'
// import { toggleLoading } from "../../actions/navigation";
// import API from '../../utils/API'
// import Widget from "../../components/Widget";
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'
import Widget from '../../components/Widget/Widget'
import './Dashboard.scss'
import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'
import NoBorderCard from '../../pages/manage/Card/NoBorderCard'
import { Value } from "sass";


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



function Dashboard() {
	let navigate = useNavigate();
	useEffect(() => {
		console.log(`Dashboard`)
	}, [])
	return (
		<>
			<div style={{
				width: '1260px',
				marginLeft: 'auto',
				marginRight: 'auto',
			}}>
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
									<div className={'display-title'}>$100,423.39</div>
								</Widget>
							</Grid>
							<Grid item xl={4} lg={4} xs={12}>
								<Widget
									title={"Your Debt"}
								>
									<div className={'display-title'}>$0.00</div>
								</Widget>
							</Grid>
							<Grid item xl={4} lg={4} xs={12}>
								<Widget
									title={"Your Smart Vault Balance"}
								>
									<div className={'display-title'}>$0.00</div>
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
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<DashboardCard
									label={`ETH/BTC`}
									labelInUSD={`$19,294`}
									numberOfAssest={2}
									assest1Code={`eth`}
									assest2Code={`btc`}
									pair={
										[
											{
												amountInUsdt: 34192.9,
												amountInCurrency: 30.4,
												currency: "ETH",
											},
											{
												amountInUsdt: 413401.1,
												amountInCurrency: 1.87,
												currency: "BTC",
											},
										]
									}
									detail={
										[
											{
												title: "Collateral",
												value: "$34192.9 / 30.4ETH"
											},
											{
												title: "Debt",
												value: "$41340.3 / 1.87BTC"
											},
											{
												title: "APY",
												value: "20.4%"
											},
											{
												title: "Health Factor",
												value: "$20"
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
							<Grid item xs={4}>
								<DashboardCard
									label={`ETH/BTC`}
									labelInUSD={`$19,294`}
									numberOfAssest={2}
									assest1Code={`one`}
									assest2Code={`usdt`}
									pair={
										[
											{
												amountInUsdt: 34192.9,
												amountInCurrency: 30.4,
												currency: "ETH",
											},
											{
												amountInUsdt: 413401.1,
												amountInCurrency: 1.87,
												currency: "BTC",
											},
										]
									}
									detail={
										[
											{
												title: "Collateral",
												value: "$34192.9 / 30.4ETH"
											},
											{
												title: "Debt",
												value: "$41340.3 / 1.87BTC"
											},
											{
												title: "APY",
												value: "20.4%"
											},
											{
												title: "Health Factor",
												value: "$20"
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
											label: "manage",
											callbackFunction: (() => {
												console.log(`on click manage`)
											}),
											color: "white"
										},
									]}
								>
								</DashboardCard>
							</Grid>
							<Grid item xs={4}>
								<DashboardCard
									label={`ETH/BTC`}
									labelInUSD={`$19,294`}
									numberOfAssest={2}
									assest1Code={`one`}
									assest2Code={`usdt`}
									pair={
										[
											{
												amountInUsdt: 34192.9,
												amountInCurrency: 30.4,
												currency: "ETH",
											},
											{
												amountInUsdt: 413401.1,
												amountInCurrency: 1.87,
												currency: "BTC",
											},
										]
									}
									detail={
										[
											{
												title: "Collateral",
												value: "$34192.9 / 30.4ETH"
											},
											{
												title: "Debt",
												value: "$41340.3 / 1.87BTC"
											},
											{
												title: "APY",
												value: "20.4%"
											},
											{
												title: "Health Factor",
												value: "$20"
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
											label: "manage",
											callbackFunction: (() => {
												console.log(`on click manage`)
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
						<Grid container>
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



