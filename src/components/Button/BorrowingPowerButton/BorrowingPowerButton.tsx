import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import './BorrowingPowerButton.scss'

interface BorrwoingPowerButtonProps {
    label: string;
}

function BorrwoingPowerButton(props: BorrwoingPowerButtonProps) {
    return (
        <button className={`borrowing-power-button`}>{props.label}</button>
    );
}

export default BorrwoingPowerButton;
