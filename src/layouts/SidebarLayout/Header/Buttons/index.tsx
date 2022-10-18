import { useState, useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRotateRight, faArrowLeftLong, faLightbulb } from "@fortawesome/free-solid-svg-icons"
import Web3 from 'web3';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import RoundShapeButton from '../../../../components/Button/RoundShapeButton/RoundShapeButton'
import Popup from '../../../../components/Popup/Popup'
import HongContract from '../../../../abi/Hong.json'
//
const CHIAN_ID = 43113 //AVAX TESTNET
//Fujidao Contracts
const MY_FujiVaultETHBTC = process.env.REACT_APP_MY_FujiVaultETHBTC;
const MY_FujiVaultAVAXUSDT = process.env.REACT_APP_MY_FujiVaultAVAXUSDT;
const MY_FliquidatorAVAX = process.env.REACT_APP_MY_FliquidatorAVAX;
const MY_FujiController = process.env.REACT_APP_MY_FujiController;
const MY_FujiOracle = process.env.REACT_APP_MY_FujiOracle;
const AAVEAVAX = process.env.REACT_APP_ProviderAAVEAVAX;

//Backd Contracts
const LP_POOL_BTC = process.env.REACT_APP_LP_POOL_BTC;
const LP_TOKEN_BTC = process.env.REACT_APP_LP_TOKEN_BTC;
const VAULT_BTC = process.env.REACT_APP_VAULT_BTC;
const TOPUP_ACTION = process.env.REACT_APP_TOPUP_ACTION;
const SMART_VAULT_BTC = process.env.REACT_APP_SMART_VAULT_BTC;
const SMART_VAULT_USDT = process.env.REACT_APP_SMART_VAULT_USDT;
const GAS_BANK = process.env.REACT_APP_GAS_BANK;

const LP_POOL_ETH = process.env.REACT_APP_LP_POOL_ETH;
const LP_TOKEN_ETH = process.env.REACT_APP_LP_TOKEN_ETH;
const VAULT_ETH = process.env.REACT_APP_VAULT_ETH;

//Asset Contracts
const WBTC = process.env.REACT_APP_WBTC;
const WETH = process.env.REACT_APP_WETH;
const USDT = process.env.REACT_APP_USDT;

//metamask url
const METAMASK_INSTALL_URL = process.env.REACT_APP_METAMASK_INSTALL_URL;

function HeaderButtons() {

  const [modal, setModal] = useState<Boolean>(false)
  const [modalTitle, setModalTitle] = useState<String | null>("")
  const [modalAction, setModalAction] = useState<String | null>("")
  const [myAccount,setMyAccount]=useState<any>("")
  
  useEffect(() => {
    (async () => {
      console.log(`HeaderButtons`,window)
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

  function setAccount(val) {
		// this.setState({
		// 	myAccount: val,
		// });
		// this.props.dispatch(changeMyAccount(val));
    setMyAccount(val)
    // changeMyAccount(val)
	}

  function ethEnabled() {
    if (window.web3 === undefined) {
      window.open(METAMASK_INSTALL_URL);
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      const web3js = window.web3;
      web3js.eth.getAccounts((err, result) => {
        console.log("account error:", err);
        console.log("accounts:", result);
        setAccount(result[0])
        const chainId = 43113 // Avax Testnet
        if (window.ethereum.networkVersion !== chainId) {
          try {
            window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: window.web3.utils.toHex(chainId) }]
            })
              .catch((error) => {
                console.log(error);
                // This error code indicates that the chain has not been added to MetaMask
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
                    const dataHong = HongContract
                    // this.setMyFujiVaultETHBTC(new window.web3.eth.Contract(FujiVaultAVAX.abi, MY_FujiVaultETHBTC));
                    // this.setMyFujiVaultAVAXUSDT(new window.web3.eth.Contract(FujiVaultAVAX.abi, MY_FujiVaultAVAXUSDT));
                    // this.setMyFliquidatorAVAX(new window.web3.eth.Contract(FliquidatorAVAX.abi, MY_FliquidatorAVAX));
                    // this.setMyFujiController(new window.web3.eth.Contract(Controller.abi, MY_FujiController));
                    // this.setMyFujiOracle(new window.web3.eth.Contract(FujiOracle.abi, MY_FujiOracle));
                    // this.setMyETHContract(new window.web3.eth.Contract(dataHong, WETH));
                    // this.setMyBTCContract(new window.web3.eth.Contract(dataHong, WBTC));
                    // this.setMyUSDTContract(new window.web3.eth.Contract(dataHong, USDT));
                    // this.setMyAAVEAVAXContract(new window.web3.eth.Contract(ProviderAAVEAVAX.abi, ProviderAAVEAVAX));
                    // this.setMySmartVaultContractBtc(new window.web3.eth.Contract(SmartVault, SMART_VAULT_BTC));
                    // this.setMySmartVaultContractUsdt(new window.web3.eth.Contract(SmartVault, SMART_VAULT_USDT));

                    // this.props.dispatch(changeLpPoolBtc(new window.web3.eth.Contract(lpPoolAbi, LP_POOL_BTC)));
                    // this.props.dispatch(changeLpTokenBtc(new window.web3.eth.Contract(lpTokenAbi, LP_TOKEN_BTC)));
                    // this.props.dispatch(changeVaultBtc(new window.web3.eth.Contract(vaultBtcAbi, VAULT_BTC)));
                    // this.props.dispatch(changeTopupAction(new window.web3.eth.Contract(topupActionAbi, TOPUP_ACTION)));
                    // this.props.dispatch(changeGasBank(new window.web3.eth.Contract(gasBankAbi, GAS_BANK)));

                    // this.props.dispatch(changeLpPoolEth(new window.web3.eth.Contract(lpPoolAbi, LP_POOL_ETH)));
                    // this.props.dispatch(changeLpTokenEth(new window.web3.eth.Contract(lpTokenAbi, LP_TOKEN_ETH)));
                    // this.props.dispatch(changeVaultEth(new window.web3.eth.Contract(vaultBtcAbi, VAULT_ETH)));

                    // this.props.dispatch(changeSelectedPair('AVAXUSDT'));

                    // this.getNeededCollateralFor("GET_NEW")
                  });
                }
              })
              .then(() => {
                // const dataHong = require('../../abi/Hong.json');
                // localStorage.setItem("isWalletConnected", "true")
                // this.setMyFujiVaultETHBTC(new window.web3.eth.Contract(FujiVaultAVAX.abi, MY_FujiVaultETHBTC));
                // this.setMyFujiVaultAVAXUSDT(new window.web3.eth.Contract(FujiVaultAVAX.abi, MY_FujiVaultAVAXUSDT));
                // this.setMyFliquidatorAVAX(new window.web3.eth.Contract(FliquidatorAVAX.abi, MY_FliquidatorAVAX));
                // this.setMyFujiController(new window.web3.eth.Contract(Controller.abi, MY_FujiController));
                // this.setMyFujiOracle(new window.web3.eth.Contract(FujiOracle.abi, MY_FujiOracle));
                // this.setMyETHContract(new window.web3.eth.Contract(dataHong, WETH));
                // this.setMyBTCContract(new window.web3.eth.Contract(dataHong, WBTC));
                // this.setMyUSDTContract(new window.web3.eth.Contract(dataHong, USDT));
                // this.setMyAAVEAVAXContract(new window.web3.eth.Contract(ProviderAAVEAVAX.abi, AAVEAVAX));
                // this.setMySmartVaultContractBtc(new window.web3.eth.Contract(SmartVault, SMART_VAULT_BTC));
                // this.setMySmartVaultContractUsdt(new window.web3.eth.Contract(SmartVault, SMART_VAULT_USDT));

                // this.props.dispatch(changeLpPoolBtc(new window.web3.eth.Contract(lpPoolAbi, LP_POOL_BTC)));
                // this.props.dispatch(changeLpTokenBtc(new window.web3.eth.Contract(lpTokenAbi, LP_TOKEN_BTC)));
                // this.props.dispatch(changeVaultBtc(new window.web3.eth.Contract(vaultBtcAbi, VAULT_BTC)));
                // this.props.dispatch(changeTopupAction(new window.web3.eth.Contract(topupActionAbi, TOPUP_ACTION)));
                // this.props.dispatch(changeGasBank(new window.web3.eth.Contract(gasBankAbi, GAS_BANK)));

                // this.props.dispatch(changeLpPoolEth(new window.web3.eth.Contract(lpPoolAbi, LP_POOL_ETH)));
                // this.props.dispatch(changeLpTokenEth(new window.web3.eth.Contract(lpTokenAbi, LP_TOKEN_ETH)));
                // this.props.dispatch(changeVaultEth(new window.web3.eth.Contract(vaultBtcAbi, VAULT_ETH)));

                // this.props.dispatch(changeSelectedPair('ETHBTC'));

                // this.getNeededCollateralFor("GET_NEW")
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (err) {
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
            // className={`manage-button__${this.props.theme === "light" ? "light" : "dark"}`}
            style={{ padding: "10px", border: "1px solid #000000" }}
            onClick={() => {
              console.log("meta mask")
              // this.ethEnabled()
              // this.toggle()
            }}>
            <div style={{ padding: "10px" }}>
              <Grid container spacing={1} alignContent={"center"} textAlign={"center"} justifyContent={"space-between"}>
                <Grid item>
                  {"MetaMask"}
                  {/* {`${(window.web3 === undefined) ? "Install " : ""}MetaMask`} */}
                </Grid>
                <Grid item>
                  <img style={{ width: "15px", height: "15px" }} src="/assets/icon/metamask.png" alt=""></img>
                </Grid>
              </Grid>
            </div>
          </div>
        </a>
        <br></br>
        <a>
          <div
            // className={`manage-button__${this.props.theme === "light" ? "light" : "dark"}`}
            style={{ padding: "10px", border: "1px solid #000000" }}
            onClick={() => {
              // this.walletConnectEnabled()
              // this.toggle()
            }}>
            <div style={{ padding: "10px" }}>
              <Grid container spacing={1} alignContent={"center"} textAlign={"center"} justifyContent={"space-between"}>
                <Grid item>
                  WalletConnect
                </Grid>
                <Grid item>
                  <img style={{ width: "15px", height: "15px" }} src="/assets/icon/walletConnectIcon.svg" alt=""></img>
                </Grid>
              </Grid>
            </div>
          </div>
        </a>
        <br></br>
        <a>
          <div
            // className={`manage-button__${this.props.theme === "light" ? "light" : "dark"}`}
            style={{ padding: "10px", border: "1px solid #000000" }}
            onClick={() => {
              // this.walletConnectEnabled()
              // this.toggle()
            }}>
            <div style={{ padding: "10px" }}>
              <Grid container spacing={1} alignContent={"center"} textAlign={"center"} justifyContent={"space-between"}>
                <Grid item>
                  Trust Wallet
                </Grid>
                <Grid item>
                  <img style={{ width: "15px", height: "15px" }} src="/assets/icon/trustWalletIcon.svg" alt=""></img>
                </Grid>
              </Grid>
            </div>
          </div>
        </a>

      </Popup>
      <Grid container alignItems={"center"} spacing={1}>
        <Grid item>
          <Box sx={{ mr: 1 }}>
            <RoundShapeButton
              label={"connect wallet"}
              onClick={() => {
                console.log(`clicked connect wallet`)
                setModal(!modal)
                setModalTitle("Please choose wallet type to connect")
                setModalAction("connect_wallet")
              }}
            ></RoundShapeButton>
          </Box>
        </Grid>
        <Grid item>
          <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
            console.log(`on click refresh`)
            // this.getNeededCollateralFor("GET_NEW");
          }}
            icon={faRotateRight} />
        </Grid>

        <Grid item>
          <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
            console.log(`on click resize`)
            // this.handleResize();
          }}
            icon={faBars} />
        </Grid>

        <Grid item>
          <FontAwesomeIcon style={{ cursor: "pointer" }} onClick={() => {
            console.log(`on click dark light mod`)
            // if (this.props.theme === "light") {
            //   this.setAppThemeMode("dark")
            //   localStorage.setItem("theme", "dark");
            // }
            // else {
            //   this.setAppThemeMode("light")
            //   localStorage.setItem("theme", "light");
            // }
          }}
            icon={faLightbulb} />
        </Grid>
      </Grid>
    </>
  );
}

export default HeaderButtons;
