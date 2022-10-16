import React from "react";
import PropTypes from "prop-types";
import {
  Button,
} from '@mui/material';

import './RoundShapeButton.scss'

interface RoundShapeButtonProps {
  label: string;
  onClick: any;
}

function RoundShapeButton(props: RoundShapeButtonProps) {
  return (
    <Button
      size={"small"}
      variant="outlined"
      className={"round-shape-button"}
      onClick={props.onClick}
    >
      {props.label.toUpperCase()}
    </Button>

  );
}

export default RoundShapeButton;
