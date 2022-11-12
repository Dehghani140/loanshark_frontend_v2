import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom"
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, TextField, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

export interface CustDialogProps {
    open: boolean;
    // selectedValue: string;
    title: string;
    // onClose: (value: string) => void;
    children?: ReactNode;
}

function CustDialog(custDialogProps: CustDialogProps) {//   const { onClose, selectedValue, open,title } = custDialogProps;
    const { open, title } = custDialogProps;

    //   const handleClose = () => {
    //     onClose(selectedValue);
    //   };

    //   const handleListItemClick = (value: string) => {
    //     onClose(value);
    //   };


    return (
        <>
            <Dialog 
            // onClose={handleClose} 
            open={open}>
                <div style={{ paddingTop: '20px', paddingLeft: '40px', paddingRight: '40px' }}>
                <Grid container>
                    <Grid item xs={12}>
                        <h4 style={{ fontWeight: 700, fontSize: '1.5rem' }}>{title}</h4>
                    </Grid>
                    <Grid item xs={12}>
                    {custDialogProps.children}
                    </Grid>
                </Grid>
                </div>
                
                <DialogTitle>{title}</DialogTitle>
                
                {/* <List sx={{ pt: 0 }}>
                    {emails.map((email) => (
                        <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={email} />
                        </ListItem>
                    ))}
                    <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItem>
                </List> */}
            </Dialog>
        </>
    )
}


export default CustDialog;


