import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Slider } from '@mui/material';
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
    valueLabelDisplay:any;
    // railColor: any;
    // trackColor: any;
    disabled:boolean;
}

const CustomSlider = withStyles({
    rail: {
        height: 12,
        borderRadius: 4,
        backgroundImage: "linear-gradient(to right, #00dc5f, #8eb000, #b67f00, #c14812, #af003d)",
    },
    track: {
        height: 12,
        borderRadius: 4,
        backgroundImage: "linear-gradient(to right, #009d44, #637b00, #7e5600, #b53606d9, #df0c0c)",
    }
})(Slider);

function CustSlider(props: CustSliderProps) {
    const { defaultValue, value, onChange, step, marks, min, max, valueLabelDisplay, disabled
        // railColor, trackColor 
    } = props

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
                marks={marks}
                min={min}
                max={max}
                disabled={disabled}
            ></CustomSlider>
        </>
    )
}

export default CustSlider;

// import React, { useEffect, useState, useMemo } from "react";
// import PropTypes from "prop-types";
// import { Slider } from '@mui/material';
// import { withStyles } from '@mui/styles';

// import './CustSlider.scss'


// interface CustSliderProps {
//     defaultValue: number | null;
//     value: number | null;
//     onChange: (e: any) => any;
//     step: number | null;
//     marks: boolean | null;
//     min: number | null;
//     max: number | null;
//     railColor:any;
//     trackColor:any;
// }

// function CustSlider(props: CustSliderProps) {
//     const { defaultValue, value, onChange, step, marks, min, max, railColor, trackColor } = props
//     const CustomSlider = withStyles({
//         rail: {
//             backgroundImage:
//                 "linear-gradient(to left, #00dc5f, #8eb000, #b67f00, #c14812, #af003d)"
//         },
//         track: {
//             backgroundImage:
//                 "linear-gradient(to left, #009d44, #637b00, #7e5600, #832d0d, #720028)"
//         }
//     })(Slider);

//     return (
//         <>
//             <CustomSlider
//                 aria-label="healthFactor"
//                 defaultValue={defaultValue}
//                 value={value}
//                 onChange={onChange}
//                 // onChange={(e: any) => {
//                 //     // console.log(e?.target?.value??0)
//                 //     setHealthFactorPercentage(e?.target?.value ?? 0)
//                 // }}
//                 valueLabelDisplay="auto"
//                 step={step}
//                 marks={marks}
//                 min={min}
//                 max={max}
//             ></CustomSlider>
//         </>
//     )
// }

// export default CustSlider;
