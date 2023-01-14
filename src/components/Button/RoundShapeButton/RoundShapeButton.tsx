import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Button,
} from '@mui/material';

import './RoundShapeButton.scss'


interface RoundShapeButtonProps {
  label: string;
  onClick: any;
  color: string;
}

function RoundShapeButton(props: RoundShapeButtonProps) {
  const openButtonSection = useMemo(() => {
    if (props.color === "white") return "round-shape-button-white"
    if (props.color === "black") return "round-shape-button-black"
    return "round-shape-button-white"
  }, [props.color])


  return (
    <Button
      size={"small"}
      variant="outlined"
      // className={"round-shape-button"}
      className={openButtonSection}
      onClick={props.onClick}
      // style={{fontFamily: 'ClashDisplay-Semibold' }}
    >
      {props.label.toUpperCase()}
    </Button>

  );
}

export default RoundShapeButton;
