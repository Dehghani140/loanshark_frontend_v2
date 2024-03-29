import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Grid, Slider } from '@mui/material';
import { withStyles } from '@mui/styles';

import './CustSlider.scss'


interface CustSliderProps {
    defaultValue: number | null;
    value: number | null;
    onChange: (e: any, newValue: number | number[], activeThumb: number) => any;
    step: number | null;
    marks: boolean | null;
    min: number | null;
    max: number | null;
    valueLabelDisplay: any;
    // railColor: any;
    // trackColor: any;
    disabled: boolean;
}

const CustomSlider = withStyles({
    rail: {
        height: "14px !important",
        // width: "14px !important",
        borderRadius: 4,
        backgroundImage: "linear-gradient(to right, #af003d,#c14812,#b67f00,#8eb000,#00dc5f)",
    },
    track: {
        height: "14px !important",
        // width: "14px !important",
        borderRadius: 4,
        backgroundImage: "linear-gradient(to right, #ff0000, #d9501dd9,  #99711c,  #637b00,#009d44)",
    },
    mark: {
        height: "14px !important",
        width:"6px !important"
    },
})(Slider);

function CustSlider(props: CustSliderProps) {
    const { defaultValue, value, onChange, step, 
        marks, 
        min, max, valueLabelDisplay, disabled
        // railColor, trackColor 
    } = props

    console.log(`valueLabelDisplay`,props)
    return (
        <>
            <CustomSlider
                aria-label="healthFactor"
                // size={}
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                valueLabelDisplay={valueLabelDisplay}
                step={step}
                min={min}
                max={max}
                disabled={disabled}
                valueLabelFormat={()=>{
                    return (
                        <span>{value}</span>
                    )
                }}
                marks={[{
                    value: 1,
                    label:
                        <div style={{textAlign:'center'}}>
                            <div style={{color:'red'}}>
                                1.00
                            </div>
                            <div style={{color:'red'}}>
                            Liquidation Value
                            </div>
                        </div>
                },]}
            ></CustomSlider>
        </>
    )
}

export default CustSlider;
