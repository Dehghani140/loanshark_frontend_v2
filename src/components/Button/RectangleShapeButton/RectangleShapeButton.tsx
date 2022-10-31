import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Button,
} from '@mui/material';

import './RectangleShapeButton.scss'


interface RectangleShapeButtonProps {
  label: string;
  onClick: any;
  color: string;
}

function RectangleShapeButton(props: RectangleShapeButtonProps) {
  console.log(props)
  const openButtonSection = useMemo(() => {
    if (props.color === "white") return "rectangle-shape-button-white"
    if (props.color === "black") return "rectangle-shape-button-black"
    return "rectangle-shape-button-white"
  }, [props.color])
  console.log(openButtonSection)

  return (
    <Button
      size={"small"}
      variant="outlined"
      // className={"round-shape-button"}
      className={openButtonSection}
      onClick={props.onClick}
    >
      {props.label.toUpperCase()}
    </Button>

  );
}

export default RectangleShapeButton;
