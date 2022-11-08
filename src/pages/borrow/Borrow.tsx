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
	const [firstBoxValue, setFirstBoxValue] = useState('0')
	const [secondBoxValue, setSecondBoxValue] = useState('0')

	useEffect(() => {
		console.log(`Borrow`)
	}, [])
	return (
		<>
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
											<span className={`borrow-card-trade-titile`}>0 ETH as collateral to borrow 1 BTC</span>
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
																	value={firstBoxValue}
																	onChange={(e) => {
																		setFirstBoxValue(e.target.value)
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
																			<span style={{ fontWeight: "800" }}>30.4ETH</span>
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
																	value={secondBoxValue}
																	onChange={(e) => {
																		setSecondBoxValue(e.target.value)
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
																			<span style={{ fontWeight: "800" }}>30.4ETH</span>
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
																	>{item}</button>
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
												onClick={() => { }}
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
											}}>Deposited Borrowed Health Factor</span>
										</Grid>
										<Grid item xs={12}>
											<div style={{ width: "100%", textAlign: 'center' }}>
												<span className={`health-factor-label`}>Health Factor </span>
												<span className={`health-factor-value`}>20.97</span>
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
											value: "$1031",
											textColor: "black",
										},
										{
											title: "Current Price of BTC:",
											value: "$19224",
											textColor: "black",
										},
										{
											title: "LTV:",
											value: "14%",
											textColor: "black",
										},
										{
											title: "Max Borrow Power:",
											value: "13.45",
											textColor: "black",
										},
										{
											title: "Liquidity Threshold:",
											value: "20.534%",
											textColor: "black",
										},
										{
											title: "Liquidation Price of ETH:",
											value: "$350",
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


