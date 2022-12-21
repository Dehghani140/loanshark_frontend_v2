import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
	Button,
	Grid,
	ImageList,
	ImageListItem,
} from '@mui/material';
// import Chart from 'react-apexcharts'
// import Widget from '../../components/Widget/Widget'
// import NoBorderCard from '../manage/Card/NoBorderCard'
// import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'
// import '../../App.scss'

// import BorrwoingPowerButton from "src/components/Button/BorrowingPowerButton/BorrowingPowerButton";

// import { useAppSelector, useAppDispatch } from '../../hooks'
// import { toggleLoading } from '../../slice/layoutSlice';
// import CustDialog from "../../components/Dialog/CustDialog";
// import TokenButton from '../../components/Button/TokenButton/TokenButton'
// import { changeInputEthDeposit, changeInputBtcDebt } from '../../slice/loansharkSlice';
// import {
// 	changeDialogState,
// 	changeTokenListState,
// 	changeSelectTokenTitleState,
// } from '../../slice/selectTokenSlice';

// import { refreshPrice } from '../../utils/API'
// import {
// 	depositTokenList,
// 	borrowTokenList,
// 	TOKEN_DISPLAY_DECIMAL,
// } from '../../utils/utilList'

import './BlankPage.scss'

function BlankPage() {
	return (
		<>
			<div className="blank-page"
			>
				<Grid container direction={'column'} justifyContent={'center'} alignItems={'center'}>
					<Grid item>
					<span className="blank-page-text">this is blank page</span>
					</Grid>
				</Grid>
			</div>

		</>
	)
}


export default BlankPage;


