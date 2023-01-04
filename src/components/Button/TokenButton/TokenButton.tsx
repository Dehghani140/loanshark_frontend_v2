import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom"
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Grid, TextField, Button,
    Box,
    Typography,
    Card,
    ListItem,
    List,
    ListItemText,
    Divider,
    ListItemAvatar,
    Avatar,
    Switch,
    CardHeader,
    Tooltip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    useTheme,
    styled,
    ImageList,
    ImageListItem,
} from '@mui/material';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { applyMiddleware } from "redux";
// import { 
//     changeDialogState, 
//     changeSelectedTokenState,
//     changeTokenListState,
// } from '../../slice/selectTokenSlice';
// import { useAppSelector, useAppDispatch } from '../../hooks';
// import { selectTokenPopupList } from '../../utils/utilList'
import './TokenButton.scss'


const TokenButton = (props:any)=>{
    const { collateralCurrency, onClick } = props
	return (
		<>
			<Button style={{
				backgroundColor: "white",
				color: "black",
				padding: "0px",
			}}
				onClick={onClick}
			>
				<div className={'borrow-card-collateral-crypto-icon'}>
					<div style={{
						paddingLeft: "10px",
						paddingRight: "10px",
					}}>
						<Grid container alignContent={'center'} alignItems={'center'}>
							<Grid item>
								<ImageList sx={{ maxWidth: 20, maxHeight: 20 }} cols={0}>
									<ImageListItem>
										<img
											src={`/assets/icon/crypto/color/${collateralCurrency}.svg`}
											alt={""}
											loading="lazy"
										/>
									</ImageListItem>
								</ImageList>
							</Grid>
							&nbsp;
							<Grid item>
								<span>{collateralCurrency.toUpperCase()}</span>
							</Grid>
							&nbsp;
							<Grid item>
								<span>▼</span>
							</Grid>
						</Grid>
					</div>
				</div>
			</Button>
		</>
	)
}

export default TokenButton;
