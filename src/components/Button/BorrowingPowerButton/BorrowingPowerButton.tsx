import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import './BorrowingPowerButton.scss'
import Grid from "@mui/material/Grid";

interface BorrwoingPowerButtonProps {
    // label: string;
    onClick: (e: any) => any;
    // value: number;
    buttonSetSelect: any;
    buttonStyle: any;
}

interface ButtonSet {
    value: number;
    label: string;
}

function BorrwoingPowerButton(props: BorrwoingPowerButtonProps) {
    const {
        // label, 
        onClick,
        // value,
        buttonSetSelect,
        buttonStyle,
    } = props
    const [buttonSet, setButtonSet] = useState<ButtonSet[]>([]);
    useEffect(() => {
        let result = []
        switch (buttonSetSelect) {
            case "max100":
                result = [{
                    value: 0.1,
                    label: "10%",
                },
                {
                    value: 0.2,
                    label: "20%",
                },
                {
                    value: 0.25,
                    label: "25%",
                },
                {
                    value: 0.5,
                    label: "50%",
                },
                {
                    value: 1,
                    label: "100%",
                }]
                break;
            case "max90":
                result = [{
                    value: 0.25,
                    label: "25%",
                },
                {
                    value: 0.5,
                    label: "50%",
                },
                {
                    value: 0.75,
                    label: "75%",
                },
                {
                    value: 0.9,
                    label: "90%",
                }]
                break;
            case "max50":
                result = [{
                    value: 0.1,
                    label: "10%",
                },
                {
                    value: 0.2,
                    label: "20%",
                },
                {
                    value: 0.25,
                    label: "25%",
                },
                {
                    value: 0.5,
                    label: "50%",
                }]
                break;
            default:
        }
        setButtonSet(result)
    }, [buttonSetSelect])


    return (
        <>
            {buttonStyle === "BLUE_SHAPE" &&
                <Grid container spacing={1}>
                    {buttonSet.map((item) => {
                        return (
                            <Grid item key={item.value}>
                                <button key={item.value} onClick={() => {
                                    props.onClick(item.value)
                                }} className={`borrowing-power-button`} value={item.value}>{item.label}</button>

                            </Grid>
                        )
                    })}
                </Grid>
            }

            {buttonStyle === "WHITE_SMALL" &&
                <Grid container>
                    {buttonSet.map((item) => {
                        return (
                            <Grid item key={item.value}>
                                <button style={{
                                    borderRadius: "6px",
                                    border: "1px solid white",
                                    backgroundColor: "rgba(255,255,255, 1)",
                                    padding: "2px 5px",
                                    color: "black",
                                    fontFamily: "poppins",
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    cursor: "pointer",
                                }}
                                    value={item.value}
                                    onClick={() => { props.onClick(item.value) }}
                                >{item.label}</button>
                            </Grid>
                        )
                    })}
                </Grid>
            }
        </>
    )
}

export default BorrwoingPowerButton;
