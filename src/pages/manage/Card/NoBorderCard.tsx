import React, { ReactNode, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import './NoBorderCard.scss'

interface NoBorderCardProps {
    title: string;
    children: React.ReactNode;
}

function NoBorderCard(props: any) {
    return (
        <>
        <div className={'no-border-card-layout'}>
            {props.children}
        </div>
        </>
    )
}

export default NoBorderCard;