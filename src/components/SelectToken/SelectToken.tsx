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
    ImageList,
    ImageListItem,
} from '@mui/material';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { applyMiddleware } from "redux";
import {
    changeDialogState,
    changeSelectedTokenState,
    changeTokenListState,
    changeSelectTokenTitleState
} from '../../slice/selectTokenSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { selectTokenPopupList } from '../../utils/utilList'
import './SelectToken.scss'
// import SelectToken from 'src/components/SelectToken/SelectToken';

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



interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

// const tableColumn: readonly Column[] = [
const tableColumn: any = [
    { id: 'name', label: '', minWidth: 250, },
    { id: 'depositApy', label: 'Deposit APY', minWidth: 120 },
    { id: 'yourBalance', label: 'Your Balance', minWidth: 120 },
    // {
    //   id: 'population',
    //   label: 'Population',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value: number) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'size',
    //   label: 'Size\u00a0(km\u00b2)',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value: number) => value.toLocaleString('en-US'),
    // },
    // {
    //   id: 'density',
    //   label: 'Density',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value: number) => value.toFixed(2),
    // },
]


// const tableColumn: readonly Column[] = [
//     { id: "name", label: "Name", minWidth: 150 },
//     { id: "code", label: "ISO\u00a0Code", minWidth: 50 },
//     {
//       id: "population",
//       label: "Population",
//       minWidth: 170,
//       align: "right",
//       format: (value: number) => value.toLocaleString("en-US")
//     },
//     {
//       id: "size",
//       label: "Size\u00a0(km\u00b2)",
//       minWidth: 170,
//       align: "right",
//       format: (value: number) => value.toLocaleString("en-US")
//     },
//     {
//       id: "density",
//       label: "Density",
//       minWidth: 170,
//       align: "right",
//       format: (value: number) => value.toFixed(2)
//     }
//   ];

function DefaultSelectToken(props) {
    const { code, onClick } = props
    return (
        <>
            {/* 82 29 */}
            <Button style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "4px",
                padding: "0px",
                width: "80px",
                height: "30px",
            }}
                onClick={() => { onClick(code) }}
            >
                <Grid container alignItems={'center'} justifyContent={'center'} spacing={1}>
                    <Grid item>
                        <ImageList sx={{ maxWidth: 20, maxHeight: 20 }} cols={1}>
                            <ImageListItem>
                                <img
                                    src={`/assets/icon/crypto/color/${code}.svg`}
                                    alt={""}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </ImageList>
                    </Grid>
                    <Grid item>
                        <span>{code.toUpperCase()}</span>
                    </Grid>
                </Grid>
            </Button>
        </>
    )
}


const defaultTokenList = ['eth', 'btc', 'usdt', 'one']
const DEFAULT_SELECT_TOKEN_LIST = ['eth', 'btc', 'usdt', 'one']

const SelectToken = (selectTokenProps: any) => {
    // const { dialogState, showConfirm, modalTitle, modalMessage, modalToken, modalCancel, modalConfirm, modalInputValue } = selectTokenProps;
    // const { onClickToken } = selectTokenProps;
    const stateSelectToken = useAppSelector((state) => state.selectToken)
    const dispatch = useAppDispatch();
    const [openModal, setOpenModal] = useState(true)
    const [searchKey, setSearchKey] = useState("")
    const [tableTokenList, setTableTokenList] = useState([])
    const [defaultTokenList, setDefaultTokenList] = useState([])
    console.log(tableTokenList)
    useEffect(() => {
        console.log(searchKey)
        console.log(selectTokenPopupList)
        console.log(tableTokenList)
        if (searchKey === "") {
            setTableTokenList(stateSelectToken.tokenList)
            return
        }
        let result = tableTokenList.filter((token) => token.code.includes(searchKey))
        console.log(result)
        setTableTokenList(result)
    }, [searchKey, stateSelectToken.tokenList])

    useEffect(() => {
        let tempList = []
        stateSelectToken.tokenList.map((e) => {
            if(DEFAULT_SELECT_TOKEN_LIST.includes(e.code)) tempList.push(e.code)
        })
        setDefaultTokenList(tempList)
    }, [stateSelectToken.tokenList])

    function onClose() {
        setSearchKey("")
        dispatch(changeTokenListState([]))
        dispatch(changeSelectTokenTitleState(""))
        dispatch(changeDialogState(false))
    }

    function selectTokenAction(tokenCode) {
        console.log(`on click row`, tokenCode)
        dispatch(changeSelectedTokenState({
            token: tokenCode,
            action: "COLLATERAL_TOKEN",
        }))
        onClose()
    }
    return (
        <>
            <Dialog
                open={stateSelectToken.dialogState}
                onClose={onClose}>
                <div style={{
                    padding: "30px",
                    background: "linear-gradient(270deg, rgba(255, 255, 255, 0.990357) 0%, rgba(243, 255, 239, 0.975523) 19%, rgba(183, 234, 251, 0.904174) 100%)",
                    borderRadius: "6px",
                    border: "1px solid rgba(255,255,255, 1)",
                }}>
                    <Grid container>
                        <Grid item xs={12}>
                            <span style={{
                                color: "rgba(38,38,38,1)",
                                fontSize: "21px",
                                fontWeight: "600",
                            }}
                            >{stateSelectToken.title}</span>
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid rgba(0,0,0, 0.15)",
                                    backgroundColor: "rgba(255,255,255, 0.8)",
                                    width: "100%",
                                    height: "40px",
                                    color: "rgba(153,153,153,1)",
                                    fontFamily: "Poppins-Regular",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                }}
                                value={searchKey}
                                onChange={(e) => {
                                    setSearchKey(e.target.value)
                                }}
                                placeholder={"Search name"}
                            ></input>
                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ height: "10px" }}></div>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                {defaultTokenList.map((eachToken) => {
                                    return (
                                        <React.Fragment key={eachToken}>
                                            <Grid item >
                                                <DefaultSelectToken
                                                    code={eachToken}
                                                    onClick={(tokenCode) => {
                                                        console.log(tokenCode)
                                                        selectTokenAction(tokenCode)
                                                    }}
                                                ></DefaultSelectToken>
                                            </Grid>
                                        </React.Fragment>
                                    )
                                })}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <br></br>
                        </Grid>
                        <Grid item xs={12}>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow style={{ background: "transparent" }}>
                                            {tableColumn.map((eachColumn) => {
                                                return (
                                                    <React.Fragment key={eachColumn.id}>
                                                        <TableCell style={{
                                                            minWidth: eachColumn.minWidth,
                                                            color: "rgba(38,38,38,1)",
                                                            fontFamily: "Neometric-Regular",
                                                            fontSize: "14px",
                                                            fontWeight: "400",
                                                            background: "transparent"
                                                        }}> {eachColumn.label}</TableCell>
                                                    </React.Fragment>
                                                )
                                            })}
                                        </TableRow>
                                    </TableHead>
                                    {tableTokenList.map((eachToken) => {
                                        return (
                                            <>
                                                <React.Fragment key={eachToken.code}>
                                                    <TableBody className={'table-row'}
                                                        onClick={() => {
                                                            console.log(`on click row`, eachToken.code)
                                                            selectTokenAction(eachToken.code)
                                                        }}
                                                    >
                                                        <TableRow hover>
                                                            <TableCell style={{ borderBottom: "0px" }}>
                                                                <div>
                                                                    <Grid container alignItems={'center'}>
                                                                        <Grid item>
                                                                            <div style={{ padding: "0px 5px" }}>
                                                                                <ImageList sx={{ maxWidth: 30, maxHeight: 30 }} cols={1}>
                                                                                    <ImageListItem key={eachToken.code}>
                                                                                        <img
                                                                                            src={`/assets/icon/crypto/color/${eachToken.code}.svg`}
                                                                                            loading="lazy"
                                                                                        />
                                                                                    </ImageListItem>
                                                                                </ImageList>
                                                                            </div>
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Grid container>
                                                                                <Grid item xs={12}>
                                                                                    <span style={{
                                                                                        color: "rgba(38,38,38,1)",
                                                                                        fontSize: "14px",
                                                                                        fontWeight: "400",
                                                                                    }}>
                                                                                        {eachToken.code.toUpperCase()}
                                                                                    </span>
                                                                                </Grid>
                                                                                <Grid item xs={12}>
                                                                                    <span style={{
                                                                                        color: "rgba(0,0,0,1)",
                                                                                        fontSize: "12px",
                                                                                        fontWeight: "400",
                                                                                    }}>
                                                                                        {eachToken.name}
                                                                                    </span>

                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell style={{ borderBottom: "0px" }}>
                                                                <Grid container justifyContent={'center'}>
                                                                    <Grid item><span>{`${eachToken.apy}%`}</span></Grid>
                                                                </Grid>
                                                            </TableCell>
                                                            <TableCell style={{ borderBottom: "0px" }}>
                                                                <Grid container justifyContent={'center'}>
                                                                    <Grid item><span>{eachToken.balance}</span></Grid>
                                                                </Grid>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </React.Fragment>
                                            </>
                                        )
                                    })}
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
