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


interface CardProps {
    title: string;
    children: React.ReactNode;
    // label: string;
    // onClick: any;
}

function Card(props: any) {
    // const { title, amount, detail, button, labelInUSD, pair, numberOfAssest, assest1Code, assest2Code, label } = props

    useEffect(() => {
        console.log(`Card`)
    }, [])

    return (
        <>
        <div style={{
            padding:"10px 20px 10px 20px",
            border:"1px solid black",
            borderRadius:"10px",
            // height:"200px"
            }}>
            {props.children}
        </div>
        </>
    )
}

export default Card;