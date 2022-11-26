import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';

import '../../App.scss'
import './History.scss'
import { useAppSelector, useAppDispatch } from '../../hooks'
import Widget from '../../components/Widget/Widget'

function History() {
	const state = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)
	const dispatch = useAppDispatch();

	const columns = [
		{ field: 'date', headerName: 'Date', width: 180},
		{ field: 'borrowingPosition', headerName: 'Borrowing Position' , width: 180},
		{ field: 'initialHealthFactor', headerName: 'Initial Health Factor', type: 'number',width: 180},
		{ field: 'actionType', headerName: 'Action Type', width: 250},
		{ field: 'amount', headerName: 'Amount',},
		{ field: 'value', headerName: 'Value', description: 'This column has a value getter and is not sortable.'},
		{ field: 'newHealthFactor', headerName: 'New Health Factor',  type: 'number', width: 180 },
	];
	const rows = [
		{ 
			id: "1",
			date: "2022/11/01 13:57:21", 
			borrowingPosition: 'ETH/BTC', 
			initialHealthFactor: '1.15', 
			actionType: "Automated Collateral Top-up", 
			amount: "1,000 ETH",
			value: "$2,000,000",
			newHealthFactor: "1.2" 
		},
		{ 
			id: "2",
			date: "2022/11/01 13:57:21", 
			borrowingPosition: 'ETH/BTC', 
			initialHealthFactor: '1.15', 
			actionType: "Automated Collateral Top-up", 
			amount: "1,000 ETH",
			value: "$2,000,000",
			newHealthFactor: "1.2" 
		},
		{ 
			id: "3",
			date: "2022/11/01 13:57:21", 
			borrowingPosition: 'ETH/BTC', 
			initialHealthFactor: '1.15', 
			actionType: "Automated Collateral Top-up", 
			amount: "1,000 ETH",
			value: "$2,000,000",
			newHealthFactor: "1.2" 
		},
		{ 
			id: "4",
			date: "2022/11/01 13:57:21", 
			borrowingPosition: 'ETH/BTC', 
			initialHealthFactor: '1.15', 
			actionType: "Automated Collateral Top-up", 
			amount: "1,000 ETH",
			value: "$2,000,000",
			newHealthFactor: "1.2" 
		},
		{ 
			id: "5",
			date: "2022/11/01 13:57:21", 
			borrowingPosition: 'ETH/BTC', 
			initialHealthFactor: '1.15', 
			actionType: "Automated Collateral Top-up", 
			amount: "1,000 ETH",
			value: "$2,000,000",
			newHealthFactor: "1.2" 
		},
	];
	useEffect(() => {
		console.log(`Borrow`)
	}, [])
	return (
		<>
		
			<div className={'main-content-layout'}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
            			<span className={'card-title'}>Action History</span>
					</Grid>

					<Grid item xs={12}>
						<DataGrid
							style={{
								borderRadius: '6px',
								boxShadow: '0px 0px 10px rgba(138,171,170, 0.3)',
								opacity: '0.902725',
								background: "linear-gradient(180deg, rgba(253, 251, 251, 0.9) 100%, rgba(235, 237, 238, 0.9) 100%)",
								padding: "10px",
								height: "600px"
								}}
							rows={rows}
							columns={columns}
							pageSize={5}
							rowsPerPageOptions={[5]}
						/>
					</Grid>
				</Grid></div>
		</>
	)
}


export default History;


