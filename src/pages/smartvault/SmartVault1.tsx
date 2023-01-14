import React, { useEffect } from "react";
import { connect } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom"
import { Grid } from '@mui/material';

import Widget from '../../components/Widget/Widget'
import RoundShapeButton from '../../components/Button/RoundShapeButton/RoundShapeButton'

import { useAppSelector, useAppDispatch } from '../../hooks'

import { changeMyProtectionType } from '../../slice/smartvaultSlice';

import './SmartVault.scss'
import Repay from './Repay.png';
import Topup from './Topup.png';

function SmartVault1() {
    let navigate = useNavigate();
    useEffect(() => {
        console.log(`SmartVault1`)
    }, [])

	const dispatch = useAppDispatch();
	const stateLoanshark = useAppSelector((state) => state.loanshark)
	const stateBackd = useAppSelector((state) => state.backd)
	const stateSmarvault = useAppSelector((state) => state.smartvault)

    return (
        <>
            <div style={{ paddingTop: "50px", width: "1260px", marginLeft: "auto", marginRight: "auto" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <span className={'card-title'}>Select your protection method </span><span className={'card-subtitle'}>(1/4 steps)</span>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <span className={'card-subtitle'}>Please select the way to setup protection:</span>
                    </Grid> */}
                    <Grid item xs={5}>
                        <Widget whiteBackgroundColor={true} title={""}>
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                <div style={{textAlign: 'center'}}>Top-up
                                    <br></br>
                                    <img style={{textAlign: 'center'}} src={Topup} height={"220"} width={"170"} alt="logo" />
                                </div>
                                <RoundShapeButton
                                    label={"select"}
                                    onClick={() => {
                                        console.log(`click add borrow`)
                                        dispatch(changeMyProtectionType("topup"))
                                        navigate("/app/main/smartVault2")
                                    }}
                                    color={"white"}
                                ></RoundShapeButton>
                            </div>
                        </Widget>
                    </Grid>

                    <Grid item xs={5}>
                        <Widget whiteBackgroundColor={true} title={""}>
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                                <div style={{textAlign: 'center'}}>Repay
                                    <br></br>
                                    <img style={{textAlign: 'center'}} src={Repay} height={"220"} width={'170'} alt="logo" />
                                </div>
                                <RoundShapeButton
                                    label={"select"}
                                    onClick={() => {
                                        console.log(`click add borrow`)
                                        dispatch(changeMyProtectionType("repay"))
                                        navigate("/app/main/smartVault2")
                                    }}
                                    color={"white"}
                                ></RoundShapeButton>
                            </div>
                        </Widget>
                    </Grid></Grid>
            </div>
        </>
    )
}


export default SmartVault1;
