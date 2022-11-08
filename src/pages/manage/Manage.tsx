import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom"
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

const FIRST_ROW_CARD_HEIGHT = 350
const SECOND_ROW_CARD_HEIGHT = 353

interface SelectionButtonProps {
	label: string;
	isLeft: boolean;
	onClick: any;
}
function SelectionButton(props: SelectionButtonProps) {
	if (props.isLeft === true) {
		return (
			<Button
				className={`collateral-debt-title-button-white`}
				// style={{
				// 	borderRadius: "6px 0px 0px 6px",
				// 	border: "1px solid rgba(51,51,51, 1)",
				// 	backgroundColor: "rgba(255,255,255, 1)",
				// 	width: "100%",
				// }}
				onClick={props.onClick}
			>
				<span
					// style={{
					// 	color: "rgba(51, 51, 51, 1)",
					// 	fontSize: "16px",
					// 	fontWeight: "600",
					// }}
					className={`collateral-debt-title-button-white__label`}
				>
					{props.label}
				</span>
			</Button>
		)
	} else {
		return (
			<Button
				className={`collateral-debt-title-button-black`}
				// style={{
				// 	borderRadius: "0px 6px 6px 0px",
				// 	border: "1px solid rgba(51,51,51, 1)",
				// 	backgroundColor: "rgba(51,51,51, 1)",
				// 	width: "100%",
				// }}
				onClick={props.onClick}
			>
				<span
					// style={{
					// 	color: "rgba(255,255,255,1)",
					// 	fontSize: "16px",
					// 	fontWeight: "600",
					// }}
					className={`collateral-debt-title-button-black__label`}
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
		<div
		// style={{
		// 	paddingTop: "12px",
		// 	paddingBottom: "12px",
		// }}
		>
			<span className={`card-title`}
			// style={{
			// 	color: "rgba(38,38,38,1)",
			// 	fontSize: "21px",
			// 	fontWeight: "600",
			// }}
			>{props.title}</span>
		</div>
	)
}


function Manage() {
	const [value, setValue] = useState("0.00")
	const [valueTwo, setValueTwo] = useState("0.00")
	useEffect(() => {
		console.log(`Manage`)
	}, [])

	return (
		<>
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
															<span style={{ fontWeight: "800", fontSize: "16px" }}>$34192.9 / 30.4ETH</span>
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
															<span style={{ fontWeight: "800", fontSize: "16px" }}>20</span>
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
															<span style={{ fontWeight: "800", fontSize: "16px" }}>$41340.1/1.87BTC</span>
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
															<span style={{ fontWeight: "800", fontSize: "16px" }}>$19294</span>
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
															<span style={{ fontWeight: "800", fontSize: "16px" }}>20.4%</span>
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
																value={"1231312"}
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
											value: "1.2",
										},
										{
											title: "Repay amount each time:",
											value: "0.01",
										},
										{
											title: "Remaining prepaid gas free:",
											value: "0.1",
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
																onClick={() => { }}
															></SelectionButton>
														</div>

													</Grid>
													<Grid item xs={6}>
														<div className={`collateral-debt-box`}>
															<SelectionButton
																label={"Withdraw"}
																isLeft={false}
																onClick={() => { }}
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
																		value={value}
																		onChange={(e) => {
																			setValue(e.target.value)
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
																				<span style={{ fontWeight: "800" }}>30.4ETH</span>
																			</div>

																		</Grid>
																		<Grid item xs={12}>
																			<Grid container justifyContent={'end'} alignItems={'center'}
																			// spacing={2}
																			>

																				<Grid item>
																					<div style={{ paddingRight: "5px" }}>
																						<Button style={{
																							backgroundColor: "white",
																							color: "black",
																							borderRadius: "4px",
																							border: "1px solid black",
																							padding: "0px",
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
													label={"deposit"}
													onClick={() => { }}
													color={"white"}
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
																onClick={() => { }}
															></SelectionButton>
														</div>
													</Grid>
													<Grid item xs={6}>
														<div className={`collateral-debt-box`}>
															<SelectionButton
																label={"Payback"}
																isLeft={false}
																onClick={() => { }}
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


																		value={valueTwo}
																		onChange={(e) => {
																			setValueTwo(e.target.value)
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
																				<span style={{ fontWeight: "800" }}>1.87 BTC</span>
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
														<span>Borrowing Power:</span>
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
													label={"BORROW"}
													onClick={() => { }}
													color={"white"}
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
												<Chart options={options} series={options.series} type="bar" height={180} />
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
						</Grid>
					</Grid>
				</Grid>
			</div>
		</>
	)
}


export default Manage;


