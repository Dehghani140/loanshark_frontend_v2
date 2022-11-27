import { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRotateRight, faArrowLeftLong, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import Web3 from 'web3';

import RoundShapeButton from '../../../../components/Button/RoundShapeButton/RoundShapeButton'
import Popup from '../../../../components/Popup/Popup'
import { useAppSelector, useAppDispatch } from '../../../../hooks'
import FujiVaultAVAX from '../../../../abi/fujidao/FujiVaultAVAX.json';
import {
    changeMyAccount,
    changeMyFujiVaultETHBTC,
    changeUserDepositBalanceEth,
    reset
} from '../../../../slice/loansharkSlice';
import {
    resetBackd
} from '../../../../slice/backdSlice';
import { connectContract, refreshPrice } from '../../../../utils/API'
import './button.scss'

const MY_FujiVaultETHBTC = process.env.REACT_APP_MY_FujiVaultETHBTC;
const METAMASK_INSTALL_URL = process.env.REACT_APP_METAMASK_INSTALL_URL;

function HeaderButtons() {

    const [modal, setModal] = useState<Boolean>(false)
    const [modalTitle, setModalTitle] = useState<String | null>("")
    const [modalAction, setModalAction] = useState<String | null>("")

    const state = useAppSelector((state) => state.loanshark)
    const stateBackd = useAppSelector((state) => state.backd)
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("isWalletConnected") === "true") {
                //check metamask are connected before
                window.web3 = new Web3(window.web3.currentProvider);
                window.ethereum.enable();
                let validAccount = await window.ethereum.request({ method: "eth_accounts" });
                if (validAccount) {
                    ethEnabled()
                }
            }
        })
            ()
    }, [])


    useEffect(() => {
        if (state.selectedPair) {
            refreshPrice(state, stateBackd, dispatch, "GET_NEW");
        }
    }, [state.selectedPair])

    function clearAccount() {
        dispatch(reset())
        dispatch(resetBackd())
    }

    function afterWalletConnected(accountAddress) {
        localStorage.setItem("isWalletConnected", "true")
        connectContract(dispatch);
    }

    function ethEnabled() {
        if (window.web3 === undefined) {
            window.open(METAMASK_INSTALL_URL);
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
            window.ethereum.enable();
            const web3js = window.web3;
            web3js.eth.getAccounts((err, result) => {
                let address: string = result[0];
                if (address !== undefined) {
                    dispatch(changeMyAccount(address))
                    const chainId = 43113 // Avax Testnet
                    if (window.ethereum.networkVersion !== chainId) {
                        try {
                            window.ethereum.request({
                                method: 'wallet_switchEthereumChain',
                                params: [{ chainId: window.web3.utils.toHex(chainId) }]
                            })
                                .catch((error) => {
                                    if (error.code === 4902) {
                                        window.ethereum.request({
                                            method: 'wallet_addEthereumChain',
                                            params: [
                                                {
                                                    chainName: 'Avalanche Fuji Testnet',
                                                    chainId: window.web3.utils.toHex(chainId),
                                                    nativeCurrency: { name: 'AVAX', decimals: 18, symbol: 'AVAX' },
                                                    rpcUrls: ['https://speedy-nodes-nyc.moralis.io/2b572311b72eca56f1517c91/avalanche/testnet']
                                                }
                                            ]
                                        }).then(() => {
                                            afterWalletConnected(address)
                                        });
                                    }
                                })
                                .then(() => {
                                    afterWalletConnected(address)
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            })
        }
    }

    return (
        <>
            <Popup onClose={() => {
                setModal(false)
                setModalTitle("")
                setModalAction("")
            }}
                selectedValue={""}
                open={modal}
                title={modalTitle}
            >

                <a>
                    <div
                        className={'wallet-box'}



                        onClick={() => {
                            console.log("meta mask")
                            ethEnabled();
                            setModal(!modal);
                        }}>
                        <div className={'wallet-box-label'}>
                            <Grid container spacing={1} alignContent={"center"} textAlign={"center"} justifyContent={"space-between"}>
                                <Grid item>
                                    {"MetaMask"}
                                </Grid>
                                <Grid item>
                                    <img className={'wallet-box-image'} src="/assets/icon/metamask.png" alt=""></img>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </a>
                <br></br>
                <a>
                    <div
                        className={'wallet-box'}
                        onClick={() => {

                        }}>
                        <div className={'wallet-box-label'}>
                            <Grid container spacing={1} alignContent={"center"} textAlign={"center"} justifyContent={"space-between"}>
                                <Grid item>
                                    WalletConnect
                                </Grid>
                                <Grid item>
                                    <img className={'wallet-box-image'} src="/assets/icon/walletConnectIcon.svg" alt=""></img>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </a>
                <br></br>
                <a>
                    <div
                        className={'wallet-box'}
                        onClick={() => {

                        }}>
                        <div className={'wallet-box-label'}>
                            <Grid container spacing={1} alignContent={"center"} textAlign={"center"} justifyContent={"space-between"}>
                                <Grid item>
                                    Trust Wallet
                                </Grid>
                                <Grid item>
                                    <img className={'wallet-box-image'} src="/assets/icon/trustWalletIcon.svg" alt=""></img>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </a>
            </Popup>


            <Grid container alignItems={"center"} spacing={1}>
                <Grid item>
                    <Box sx={{ mr: 1 }}>
                        {state.myAccount ?
                            <Grid container alignItems={'center'} spacing={1}>
                                <Grid xs={6}  item>
                                    <p style={{fontSize: "12px", whiteSpace: "nowrap", overflow: "hidden"}}>{state.myAccount}</p>
                                </Grid>
                                <Grid xs={6}  item>
                                    <RoundShapeButton
                                        label={"disconnect wallet"}
                                        onClick={() => {
                                            localStorage.setItem("isWalletConnected", "false")
                                            clearAccount()
                                        }}
                                        color={"white"}
                                    ></RoundShapeButton>
                                </Grid>
                            </Grid>
                            :
                            <RoundShapeButton
                                label={"connect wallet"}
                                onClick={() => {
                                    setModal(!modal)
                                    setModalTitle("Please choose wallet type to connect")
                                    setModalAction("connect_wallet")
                                }}
                                color={"white"}
                            ></RoundShapeButton>
                        }
                    </Box>
                </Grid>
                <Grid item>
                    <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
                        console.log(`on click refresh`)
                        refreshPrice(state, stateBackd, dispatch, "GET_NEW");
                    }}
                        icon={faRotateRight} />
                </Grid>

                <Grid hidden item>
                    <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
                        console.log(`on click resize`)
                    }}
                        icon={faBars} />
                </Grid>

                <Grid hidden item>
                    <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
                        console.log(`on click dark light mod`)
                    }}
                        icon={faLightbulb} />
                </Grid>
            </Grid>
        </>
    );
}

export default HeaderButtons;
