import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import './BorrowingPowerButton.scss'

interface BorrwoingPowerButtonProps {
    label: string;
    onClick: () => void;
}

function BorrwoingPowerButton(props: BorrwoingPowerButtonProps) {
    return (
        <button onClick={props.onClick} className={`borrowing-power-button`}>{props.label}</button>
    );
}

export default BorrwoingPowerButton;
