import React, { ReactNode, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import s from './Widget.module.scss';
import classNames from 'classnames';
// import Loader from '../Loader'; // eslint-disable-line css-modules/no-unused-class
// import AnimateHeight from 'react-animate-height';
import { Grid } from '@mui/material';
import uuidv4 from 'uuid/v4'
import RoundShapeButton from '../../../components/Button/RoundShapeButton/RoundShapeButton'
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from 'reactstrap';


interface DashboardCardProps {
    title: string;
    children: React.ReactNode;
    // label: string;
    // onClick: any;
}

function getIcon(numberOfAssest, assest1Code, assest2Code, label) {
    return (
        <>
            <Grid container>
                <Grid item>
                    {numberOfAssest === 1 &&
                        <div style={{ position: "relative", minWidth: "60px" }}>
                            <img style={{ width: "30px", height: "30px" }} src={`/assets/icon/${assest1Code}-logo.svg`} alt=""></img>
                        </div>
                    }
                    {numberOfAssest === 2 &&
                        <div style={{ position: "relative", minWidth: "60px" }}>
                            <img
                                style={{
                                    width: "30px", height: "30px",
                                    position: "absolute",
                                    zIndex: "1",
                                    left: "20px",
                                    top: "10px",
                                }} src={`/assets/icon/${assest2Code}-logo.svg`} alt=""></img>
                            <img style={{ width: "30px", height: "30px" }} src={`/assets/icon/${assest1Code}-logo.svg`} alt=""></img>
                        </div>
                    }
                </Grid>
                <Grid item>
                    {numberOfAssest === 1 &&
                        <span style={{ fontSize: "24px" }}>{assest1Code.toUpperCase()}</span>
                    }
                    {numberOfAssest === 2 &&
                        <span style={{ fontSize: "24px" }}>{assest1Code.toUpperCase()}/{assest2Code.toUpperCase()}</span>
                    }
                </Grid>
            </Grid>
        </>
    )

}


function DashboardCard(props: any) {
    const { title, amount, detail, button, labelInUSD, pair, numberOfAssest, assest1Code, assest2Code, label } = props

    useEffect(() => {
        console.log(`widget`)
    }, [])

    const openButtonSection = useMemo(() => {
        if ((button?.length ?? 0) > 0) return true
        return false
    }, [button])

    return (
        <>
            <div style={{
                padding: "25px",
                border: "1px solid black",
                borderRadius: "10px",
            }}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container justifyContent={'space-between'}>
                            <Grid item>
                                {getIcon(numberOfAssest, assest1Code, assest2Code, label)}
                            </Grid>
                            <Grid item>
                                <span style={{ fontWeight: "800", fontSize: "24px" }}
                                >{`${labelInUSD}`}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ height: "5px" }}></div>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container>
                            {pair.map((item) => {
                                return (
                                    <>
                                        <Grid item xs={12}>
                                            <span style={{ fontWeight: "800", fontSize: "24px" }}>${item.amountInUsdt} / </span><span>{item.amountInCurrency} {item.currency}</span>
                                        </Grid>
                                    </>
                                )
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ height: "5px" }}></div>
                    </Grid>
                    <Grid item xs={12}>
                        <hr></hr>
                    </Grid>
                    <Grid item xs={12}>
                        {detail.map((item, index) => {
                            return (
                                <>
                                    <Grid container justifyContent={'space-between'} style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                        <Grid item>
                                            <span>{item.title}</span>
                                        </Grid>
                                        <Grid item>
                                            <span style={{ fontWeight: "700" }}
                                            >{item.value}</span>
                                        </Grid>
                                    </Grid>
                                </>
                            )
                        })}
                    </Grid>
                    {openButtonSection === true &&
                        <Grid item xs={12}>
                            <Grid container>
                                {button.map((item) => {
                                    return (
                                        <>
                                            <Grid item xs={12} style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                                <div style={{ width: "100%" }}>
                                                    <RoundShapeButton
                                                        label={item.label}
                                                        onClick={item.callbackFunction}
                                                        color={item.color}
                                                    ></RoundShapeButton>
                                                </div>
                                            </Grid>
                                        </>
                                    )
                                })}
                            </Grid>
                        </Grid>
                    }
                </Grid>
            </div>
        </>
    )
}

export default DashboardCard;