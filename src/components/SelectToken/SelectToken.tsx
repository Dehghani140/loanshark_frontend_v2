import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
// import { NavLink } from "react-router-dom"
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Grid, TextField, Button,
    Box,
    Typography,
    Card,
    ListItem,
    List,
    ListItemText,
    Divider,
    ListItemAvatar,
    Avatar,
    Switch,
    CardHeader,
    Tooltip,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    useTheme,
    styled,
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

// export interface CustDialogProps {
//     modal: boolean;
//     showConfirm: boolean;
//     modalTitle: string;
//     modalMessage: string;
//     modalToken: string;
//     modalCancel: () => void;
//     modalConfirm: (string) => void;
//     modalInputValue: string;
//     children?: ReactNode;
// }

function DefaultSelectToken(props) {
    const { name } = props
    return (
        <>
            <Button style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "4px",
                border: "1px solid black",
                padding: "0px",
            }}
                onClick={() => { }}
            >
                <img style={{ maxWidth: "20px", maxHeight: "20px" }}
                    src={`/assets/icon/crypto/color/eth.svg`} alt=""></img>
                <span>{name}</span>
            </Button>
        </>
    )
}

const SelectToken = (selectTokenProps: any) => {
    // const { modal, showConfirm, modalTitle, modalMessage, modalToken, modalCancel, modalConfirm, modalInputValue } = selectTokenProps;

    // useEffect(() => {
    //     console.log("modal");
    // }, [modal]);
    const [openModal, setOpenModal] = useState(true)
    const [searchKey, setSearchKey] = useState("")
    return (
        <>
            <div>this is select token</div>
            <div></div>
            <Dialog
                open={openModal}
                onClose={() => {
                    setOpenModal(false)
                }}>
                <div style={{ padding: "30px" }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <span style={{
                                color: "rgba(38,38,38,1)",
                                fontSize: "21px",
                                fontWeight: "600",
                            }}
                            >Select a token to deposit</span>
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid rgba(0,0,0, 0.15)",
                                    backgroundColor: "rgba(255,255,255, 0.8)",
                                    width: "100%",
                                    height: "40px",
                                }}
                                value={searchKey}
                                onChange={(e) => {
                                    setSearchKey(e.target.value)
                                }}
                            ></input>
                        </Grid>
                        <Grid item xs={12}>
                            <DefaultSelectToken
                                name={"ETH"}
                            ></DefaultSelectToken>
                            <DefaultSelectToken
                                name={"BTC"}
                            ></DefaultSelectToken>
                        </Grid>
                        <Grid item xs={12}>
                            <br></br>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell>Deposit APY</TableCell>
                                            <TableCell>Your Balance</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow
                                        //  key={log.id} 
                                         hover>
                                            <TableCell>ETH</TableCell>
                                            <TableCell>6.7%</TableCell>
                                            <TableCell>30.1145</TableCell>
                                            {/* <TableCell>
                                                {format(log.date, 'dd MMMM, yyyy - h:mm:ss a')}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Tooltip placement="top" title="Delete" arrow>
                                                    <IconButton
                                                        sx={{
                                                            '&:hover': {
                                                                background: theme.colors.error.lighter
                                                            },
                                                            color: theme.palette.error.main
                                                        }}
                                                        color="inherit"
                                                        size="small"
                                                    >
                                                        <DeleteTwoToneIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell> */}
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Grid>
                    </Grid>

                </div>
            </Dialog>
        </>
    )
}


export default SelectToken;


