import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import './BorrowingPowerButton.scss'

interface BorrwoingPowerButtonProps {
    label: string;
    onClick: (e:any) => any;
    value: number;
}

function BorrwoingPowerButton(props: BorrwoingPowerButtonProps) {
    return (
        <button onClick={props.onClick} className={`borrowing-power-button`} value={props.value}>{props.label}</button>
    );
}

export default BorrwoingPowerButton;
