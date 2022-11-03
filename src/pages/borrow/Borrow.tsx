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
// import './Dashboard.scss'
// import DashboardCard from '../../components/Card/DashboardCard/DashboardCard'


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
	useEffect(() => {
		console.log(`Borrow`)
	}, [])
	return (
		<>
		</>
	)
}


export default Borrow;


