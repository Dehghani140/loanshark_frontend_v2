import React, { ReactNode, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import s from './Widget.module.scss';
import classNames from 'classnames';
// import Loader from '../Loader'; // eslint-disable-line css-modules/no-unused-class
// import AnimateHeight from 'react-animate-height';
import { Grid } from '@mui/material';
import uuidv4 from 'uuid/v4'
// import RoundShapeButton from '../../../components/Button/RoundShapeButton/RoundShapeButton'
// import {
//   Button,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from 'reactstrap';


interface NoBorderCardProps {
    title: string;
    children: React.ReactNode;
    // label: string;
    // onClick: any;
}

function NoBorderCard(props: any) {
    // const { title, amount, detail, button, labelInUSD, pair, numberOfAssest, assest1Code, assest2Code, label } = props

    useEffect(() => {
        console.log(`Card`)
    }, [])

    return (
        <>
        <div style={{
            borderRadius: '6px',
            boxShadow: '0px 0px 10px rgba(138,171,170, 0.3)',
            opacity: '0.902725',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.797012) 100%)',
            padding:"10px 20px 10px 20px",
            // border:"1px solid black",
            
            // height:"200px"
            }}>
            {props.children}
        </div>
        </>
    )
}

export default NoBorderCard;