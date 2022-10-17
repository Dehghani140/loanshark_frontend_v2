import React, { useEffect } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom"
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
	useEffect(() => {
		console.log(`Dashboard`)
	}, [])
	return (
		<>

			<Grid container>
				<Grid item xs={12}>
					this is Dashboard
				</Grid>
				<Grid item xs={12} >
					<Grid container spacing={1} justifyContent={"flex-end"}>
						<Grid item>
							<RoundShapeButton
								label={"add borrow"}
								onClick={() => {
									console.log(`click add borrow`)
								}}
							></RoundShapeButton>
						</Grid>
						<Grid item>
							<RoundShapeButton
								label={"add smart vault"}
								onClick={() => {
									console.log(`click add smart vault`)
								}}
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
								<div>$0.00</div>
							</Widget>
						</Grid>
						<Grid item xl={4} lg={4} xs={12}>
							<Widget
								title={"Your Debt"}
							>
								<div>$0.00</div>
							</Widget>
						</Grid>
						<Grid item xl={4} lg={4} xs={12}>
							<Widget
								title={"Your Smart Vault Balance"}
							>
								<div>$0.00</div>
							</Widget>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<span style={{
						fontWeight: "800",
						fontSize: "20px",
					}}
					>My Borrowing Position</span>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={4}>
							Card 1 ETH/BTC
						</Grid>
						<Grid item xs={4}>
							Card 2 ONE/USDT
						</Grid>
						<Grid item xs={4}>
							Card 3 ONE/USDT
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<span style={{
						fontWeight: "800",
						fontSize: "20px",
					}}
					>My Smart Value Position</span>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						<Grid item xs={4}>
							Card 1 BTC
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
		</>
	)
}


export default Dashboard;


