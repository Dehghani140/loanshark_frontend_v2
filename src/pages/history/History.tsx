import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Button, Grid } from '@mui/material';

import '../../App.scss'
import './History.scss'
import { useAppSelector, useAppDispatch } from '../../hooks'
import Widget from '../../components/Widget/Widget'
import { ApolloClient, InMemoryCache, useQuery, ApolloProvider, gql, HttpLink } from '@apollo/client';
import moment from 'moment';

function History() {
	const state = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)
	const dispatch = useAppDispatch();
	const [rows, setRows] = useState<any>([]);

	const columns = [
		{ field: 'date', headerName: 'Date', width: 180 },
		{ field: 'content', headerName: 'Transaction', width: 180, renderCell: (params) => {
				return <a target="_blank" rel="noreferrer" href={"https://testnet.snowtrace.io/tx/" + params.row.content}>{params.row.content}</a>
			}
		},
		{ field: 'borrowingPosition', headerName: 'Borrowing Position', width: 180 },
		{ field: 'initialHealthFactor', headerName: 'Initial Health Factor', type: 'number', width: 180 },
		{ field: 'actionType', headerName: 'Action Type', width: 250 },
		{ field: 'amount', headerName: 'Amount', },
		{ field: 'value', headerName: 'Value', description: 'This column has a value getter and is not sortable.' },
		{ field: 'newHealthFactor', headerName: 'New Health Factor', type: 'number', width: 180 },
	];

	const callBackendAPI = () => {
		const enchancedFetch = (url, init) => {
			return fetch(url, {
				...init,
			}).then(response => response)
		}

		const client = new ApolloClient({
			link: new HttpLink({
				uri: 'https://backend.loanshark.tech/api/graphql/',
				fetchOptions: {
				   mode: 'cors', // no-cors, *cors, same-origin
				},
				fetch: enchancedFetch,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': '*',
					'Access-Control-Allow-Credentials': 'true',
					'Access-Control-Allow-Headers': 'x-requested-with, Authorization',
					'Apollo-Require-Preflight': 'true',
				},
			}),
			cache: new InMemoryCache()
		  });

		  var queryString = 'query GetPosts{posts(where:{account:{contains:"'+state.myAccount+'"}}){title,account,content,borrowingPosition,healthFactor,actionType,amount,value,newHealthFactor,publishDate}}'.replace(/(\r\n|\n|\r)/gm, "");

		  const GET_ROCKET_INVENTORY = gql`${queryString}`;

		//call backend API
		client.query({
		  query: GET_ROCKET_INVENTORY
		})
		.then((result) => {
			var pendingRows = [];
			result.data.posts.forEach(function (post, index) {
				const content = post.content;
				const publishDate = post.publishDate;
				const borrowingPosition = post.borrowingPosition;
				const healthFactor = post.healthFactor;
				const actionType = post.actionType;
				const amount = post.amount;
				const value = post.value;
				const newHealthFactor = post.newHealthFactor;

				//set rows
				const newRow = {
					id: index,
					content: content,
					date: moment(publishDate).fromNow(),
					borrowingPosition: borrowingPosition,
					initialHealthFactor: healthFactor,
					actionType: actionType,
					amount: amount,
					value: value,
					newHealthFactor: newHealthFactor
				};
			
				pendingRows.push(newRow);
			});
			setRows(pendingRows);
		});
	};

	useEffect(() => {
		console.log(`Borrow`);
		callBackendAPI();
	}, [state.myAccount])
	
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
							pageSize={6}
							rowsPerPageOptions={[6]}
							density={"comfortable"}
							sortingOrder={['desc', 'desc', 'asc', null, null, 'asc', 'asc', 'asc']}
						/>
					</Grid>
				</Grid></div>
		</>
	)
}


export default History;


