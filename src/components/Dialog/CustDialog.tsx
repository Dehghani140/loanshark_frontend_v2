import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom"
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, TextField, Button } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface CustDialogProps {
    modal: boolean;
    showConfirm: boolean;
    modalTitle: string;
    modalMessage: string;
    modalToken: string;
    modalCancel: () => void;
    modalConfirm: (string) => void;
    modalInputValue: string;
    children?: ReactNode;
}

const CustDialog = (custDialogProps: CustDialogProps) => {
    const { modal, showConfirm, modalTitle, modalMessage, modalToken, modalCancel, modalConfirm, modalInputValue } = custDialogProps;

    useEffect(() => {
        console.log("modal");
    }, [modal]);

    return (
        <>
            <Dialog
                open={modal}
                onClose={modalCancel}>
                <DialogTitle
                    style={{
                        fontSize: "20px",
                        marginTop: "20px",
                        fontWeight: "700",
                        fontFamily: "poppins"
                    }}>{modalTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                        style={{
                            fontSize: "20px",
                            fontFamily: "poppins"
                        }}
                    >
                        <div dangerouslySetInnerHTML={{ __html: modalMessage }}></div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {showConfirm ? <Button style={{
                        fontSize: "20px",
                        fontFamily: "poppins"
                    }} onClick={modalConfirm}>Confirm</Button> : null}
                    <Button style={{
                        fontSize: "20px",
                        fontFamily: "poppins"
                    }} onClick={modalCancel}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}


export default CustDialog;


