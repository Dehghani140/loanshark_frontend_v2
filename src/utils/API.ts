import {
    reset,
    changeMyFujiVaultETHBTC,
    changeMyFujiVaultAVAXUSDT,
    changeMyFujiController,
    changeMyFliquidatorAvax,
    changeMyFujiOracle,
    changeMyBtcContract,
    changeMyEthContract,
    changeMyUsdtContract,
    changeProviderAAVEAVAX,
    changeAAVEDataProvider,
    changeTraderJoeBtcMarket,
    changeMySmartVaultBtc,
    changeMySmartVaultUsdt,
    changeNumberOfEth,
    changeNumberOfAvax,
    changeAaveBtcBorrowRate,
    changeTraderJoeBtcBorrowRate,
    changeAaveEthDepositRate,
    changeUserDepositBalanceEth,
    changeUserDepositBalanceAvax,
    changeUserDebtBalanceBtc,
    changeUserDebtBalanceUsdt,
    changeTotalUserDebtBalanceBtc,
    changePriceOfEth,
    changePriceOfBtc,
    changePriceOfAvax,
    changePriceOfUsdt,
    changeSmartVaultBtc,
    changeSmartVaultUsdt,
    changeMyETHAmount,
    changeMyBTCAmount,
    changeMyAVAXAmount,
    changeMyUSDTAmount,
    changeLTV,
    changeLiqudationPrice,
    changeSelectedPair,
    changeCurrentChainId
} from '../slice/loansharkSlice';

import {
    resetBackd,
    changeLpPoolBtc,
    changeLpTokenBtc,
    changeVaultBtc,
    changeTopupAction,
    changeGasBank,
    changeLpTokenEth,
    changeVaultEth,
    changeMyBtcLpAmount,
    changeMyProtectionBtc,
    changeLpPoolEth,
    changeMyProtectionEth,
    changeTotalBtcLpAmount,
    changeBtcLpExchangeRateAmount,
    changeMyGasBankBalance,
    changeMyEthLpAmount,
    changeTotalEthLpAmount,
    changeEthLpExchangeRateAmount,
} from "../slice/backdSlice";

import Controller from '../abi/fujidao/Controller.json';
import FujiVaultAVAX from '../abi/fujidao/FujiVaultAVAX.json';
import FliquidatorAVAX from '../abi/fujidao/FliquidatorAVAX.json';
import FujiOracle from '../abi/fujidao/FujiOracle.json';
import ProviderAAVEAVAX from '../abi/fujidao/ProviderAAVEAVAX.json';
import AAVEDataProvider from '../abi/aave/AAVEDataProvider.json';
import TraderJoeBtcMarket from '../abi/traderjoe/traderJoeBtcMarket.json';
import SmartVault from '../abi/fujidao/SmartVault.json';

import lpPoolAbi from '../abi/backd/lpPool.json';
import lpTokenAbi from '../abi/backd/lpToken.json';
import topupActionAbi from '../abi/backd/topupAction.json';
import vaultBtcAbi from '../abi/backd/vaultBtc.json';
import gasBankAbi from '../abi/backd/gasBank.json';

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

//AAVE Contracts
const AAVE_PROTOCOL_DATA_PROVIDER = process.env.REACT_APP_AAVE_PROTOCOL_DATA_PROVIDER;

//AAVE Contracts
const TRADER_JOE_BTC_MARKET = process.env.REACT_APP_TRADER_JOE_BTC_MARKET;

//Asset Contracts
const WBTC = process.env.REACT_APP_WBTC;
const WETH = process.env.REACT_APP_WETH;
const USDT = process.env.REACT_APP_USDT;
const AVAX = process.env.REACT_APP_AVAX;

const dataHong = require('../abi/Hong.json');

export function connectContract(dispatch) {
    Promise.all([
        dispatch(changeMyFujiVaultETHBTC(new window.web3.eth.Contract(FujiVaultAVAX.abi, MY_FujiVaultETHBTC))),
        dispatch(changeMyFujiVaultETHBTC(new window.web3.eth.Contract(FujiVaultAVAX.abi, MY_FujiVaultETHBTC))),
        dispatch(changeMyFujiVaultAVAXUSDT(new window.web3.eth.Contract(FujiVaultAVAX.abi, MY_FujiVaultAVAXUSDT))),
        dispatch(changeMyFliquidatorAvax(new window.web3.eth.Contract(FliquidatorAVAX.abi, MY_FliquidatorAVAX))),
        dispatch(changeMyFujiController(new window.web3.eth.Contract(Controller.abi, MY_FujiController))),
        dispatch(changeMyFujiOracle(new window.web3.eth.Contract(FujiOracle.abi, MY_FujiOracle))),
        dispatch(changeMyEthContract(new window.web3.eth.Contract(dataHong, WETH))),
        dispatch(changeMyBtcContract(new window.web3.eth.Contract(dataHong, WBTC))),
        dispatch(changeMyUsdtContract(new window.web3.eth.Contract(dataHong, USDT))),
        dispatch(changeProviderAAVEAVAX(new window.web3.eth.Contract(ProviderAAVEAVAX.abi, AAVEAVAX))),
        dispatch(changeAAVEDataProvider(new window.web3.eth.Contract(AAVEDataProvider, AAVE_PROTOCOL_DATA_PROVIDER))),
        dispatch(changeTraderJoeBtcMarket(new window.web3.eth.Contract(TraderJoeBtcMarket, TRADER_JOE_BTC_MARKET))),
        dispatch(changeMySmartVaultBtc(new window.web3.eth.Contract(SmartVault, SMART_VAULT_BTC))),
        dispatch(changeMySmartVaultUsdt(new window.web3.eth.Contract(SmartVault, SMART_VAULT_USDT))),
        dispatch(changeLpPoolBtc(new window.web3.eth.Contract(lpPoolAbi, LP_POOL_BTC))),
        dispatch(changeLpTokenBtc(new window.web3.eth.Contract(lpTokenAbi, LP_TOKEN_BTC))),
        dispatch(changeVaultBtc(new window.web3.eth.Contract(vaultBtcAbi, VAULT_BTC))),
        dispatch(changeTopupAction(new window.web3.eth.Contract(topupActionAbi, TOPUP_ACTION))),
        dispatch(changeGasBank(new window.web3.eth.Contract(gasBankAbi, GAS_BANK))),
        dispatch(changeLpPoolEth(new window.web3.eth.Contract(lpPoolAbi, LP_POOL_ETH))),
        dispatch(changeLpTokenEth(new window.web3.eth.Contract(lpTokenAbi, LP_TOKEN_ETH))),
        dispatch(changeVaultEth(new window.web3.eth.Contract(vaultBtcAbi, VAULT_ETH))),
        dispatch(changeCurrentChainId(window.ethereum.networkVersion)),
    ]);
    dispatch(changeSelectedPair('AVAXUSDT'));
}

export const refreshPrice = (state, stateBackd, dispatch, action = "GET_NEW") => {
    
    dispatch(changeCurrentChainId(window.ethereum.networkVersion))

    try {
        if (window.ethereum.networkVersion != 43113) {
            dispatch(reset());
            dispatch(resetBackd());
            return
        }
        console.log(action)
        if (action === "GET_NEW") {
            console.log(state.myFujiVaultETHBTC)
            if (state.myFujiVaultETHBTC) {
                let args = [1, true]

                // ETH-BTC Vaults
                state.myFujiVaultETHBTC?.methods.getNeededCollateralFor(...args).call({}, (error, result) => {
                    dispatch(changeNumberOfEth((result / 10000000000)));
                });
                state.myFujiVaultETHBTC?.methods.userDepositBalance(state.myAccount).call({}, (error, result) => {
                    dispatch(changeUserDepositBalanceEth(window.web3.utils.fromWei(result, 'ether')));
                });
                state.myFujiVaultETHBTC?.methods.userDebtBalance(state.myAccount).call({}, (error, result) => {
                    dispatch(changeUserDebtBalanceBtc(parseFloat((window.web3.utils.fromWei(result, 'gwei') * 10).toFixed(8))));
                });
                state.myFujiVaultETHBTC?.methods.collatF().call({}, (error, result) => {
                    dispatch(changeLTV({ "ETHBTC": result.b / result.a }));             
                });
                state.myFujiVaultETHBTC?.methods.safetyF().call({}, (error, result) => {
                    dispatch(changeLiqudationPrice({ "ETHBTC": result.b / result.a }));
                });

                // AVAX-USDT Vaults
                state.myFujiVaultAVAXUSDT?.methods.getNeededCollateralFor(...args).call({}, (error, result) => {
                    dispatch(changeNumberOfAvax((result / 1000000000000)));
                });
                state.myFujiVaultAVAXUSDT?.methods.userDepositBalance(state.myAccount).call({}, (error, result) => {
                    dispatch(changeUserDepositBalanceAvax(window.web3.utils.fromWei(result, 'ether')));
                });
                state.myFujiVaultAVAXUSDT?.methods.userDebtBalance(state.myAccount).call({}, (error, result) => {
                    dispatch(changeUserDebtBalanceUsdt(window.web3.utils.fromWei(result, 'picoether')));
                });
                
                state.myFujiVaultETHBTC?.methods.borrowBalance(AAVEAVAX).call({}, (error, result) => {
                    dispatch(changeTotalUserDebtBalanceBtc(window.web3.utils.fromWei(result, 'gwei')  * 10 ));
                });

                state.myFujiVaultAVAXUSDT?.methods.collatF().call({}, (error, result) => {
                    dispatch(changeLTV({ "AVAXUSDT": result.b / result.a }));
                });
                state.myFujiVaultAVAXUSDT?.methods.safetyF().call({}, (error, result) => {
                    dispatch(changeLiqudationPrice({ "AVAXUSDT": result.b / result.a }));
                });
                let argsPriceOfEth = [USDT, WETH, 2]
                state.myFujiOracle?.methods.getPriceOf(...argsPriceOfEth).call({}, (error, result) => {
                    dispatch(changePriceOfEth(result));
                });
                let argsPriceOfBtc = [USDT, WBTC, 2]
                state.myFujiOracle?.methods.getPriceOf(...argsPriceOfBtc).call({}, (error, result) => {
                    dispatch(changePriceOfBtc(result));
                });
                let argsPriceOfAvax = [USDT, AVAX, 2]
                state.myFujiOracle?.methods.getPriceOf(...argsPriceOfAvax).call({}, (error, result) => {
                    dispatch(changePriceOfAvax(result));
                });
                let argsPriceOfUsdt = [USDT, USDT, 2]
                state.myFujiOracle?.methods.getPriceOf(...argsPriceOfUsdt).call({}, (error, result) => {
                    dispatch(changePriceOfUsdt(result));
                });

                state.providerAAVEAVAX?.methods.getBorrowRateFor(WBTC).call({}, (error, result) => {
                    var APR = result / 1000000000000000000000000000;
                    const floatString = (Math.pow(1 + APR / 31536000, 31536000) - 1) * 100;
                    dispatch(changeAaveBtcBorrowRate(parseFloat(floatString + "").toFixed(2)));
                });

                state.TraderJoeBtcMarket?.methods.borrowRatePerSecond().call({}, (error, result) => {
                    var APR = result / 100000000000;
                    const floatString = (Math.pow(1 + APR / 31536000, 31536000) - 1) * 100;
                    dispatch(changeTraderJoeBtcBorrowRate(parseFloat(floatString + "").toFixed(2)));
                });

                state.AAVEDataProvider?.methods.getReserveData(WETH).call({}, (error, result) => {
                    var APR = Number(result[3]) / 1000000000000000000000000000;
                    const floatString = (Math.pow(1 + APR / 31536000, 31536000) - 1) * 100;
                    dispatch(changeAaveEthDepositRate(parseFloat(floatString + "").toFixed(2)));
                });

                //Backd
                stateBackd.lpTokenBtc?.methods.balanceOf(state.myAccount).call({}, (error, result) => {
                    let argsGetPosition = [
                        state.myAccount,
                        state.myAccount + "000000000000000000000000",
                        "0x66756a6964616f00000000000000000000000000000000000000000000000000"
                    ];

                    if (stateBackd.topupAction) {
                        stateBackd.topupAction?.methods.getPosition(...argsGetPosition).call({}, (error, resultStakerVault) => {
                            var floatValue = window.web3.utils.fromWei(resultStakerVault[7], 'gwei') * 10;
                            let stakerVault = parseFloat(floatValue + "");
                            dispatch(changeMyBtcLpAmount(stakerVault + window.web3.utils.fromWei(result, 'gwei') * 10));
                        });
                    }

                    dispatch(changeMyBtcLpAmount(window.web3.utils.fromWei(result, 'gwei') * 10));
                });
                stateBackd.mySmartVaultBtc?.methods.balances(state.myAccount).call({}, (error, result) => {
                    dispatch(changeSmartVaultBtc(window.web3.utils.fromWei(result, 'gwei') * 10));
                });

                // state.mySmartVaultUsdt?.methods.balances(state.myAccount).call({}, (error, result) => {
                //     dispatch(changeSmartVaultUsdt(window.web3.utils.fromWei(result, 'picoether')));
                // });

                state.myBTCContract?.methods.balanceOf(state.myAccount).call({}, (error, result) => {
                    dispatch(changeMyBTCAmount(window.web3.utils.fromWei(result, 'gwei') * 10));
                });
                state.myETHContract?.methods.balanceOf(state.myAccount).call({}, (error, result) => {
                    dispatch(changeMyETHAmount(window.web3.utils.fromWei(result, 'ether')));
                });
                state.myUSDTContract?.methods.balanceOf(state.myAccount).call({}, (error, result) => {
                    dispatch(changeMyUSDTAmount(window.web3.utils.fromWei(result, 'picoether')));
                });

                window.web3.eth.getBalance(state.myAccount, function (err, result) {
                    if (err) {
                    } else {
                        dispatch(changeMyAVAXAmount(window.web3.utils.fromWei(result, 'ether')));
                    }
                })


                let argsGetPositionEth = [
                    state.myAccount,
                    state.myAccount + "000000000000000000000000",
                    "0x66756a6964616f65746800000000000000000000000000000000000000000000"
                ];

                stateBackd.topupAction?.methods.getPosition(...argsGetPositionEth).call({}, (error, result) => {
                    dispatch(changeMyProtectionEth(result));
                });

                stateBackd.lpTokenBtc?.methods.totalSupply().call({}, (error, result) => {
                    dispatch(changeTotalBtcLpAmount(window.web3.utils.fromWei(result, 'gwei') * 10));
                });

                let argsGetPosition = [
                    state.myAccount,
                    state.myAccount + "000000000000000000000000",
                    "0x66756a6964616f00000000000000000000000000000000000000000000000000"
                ];

                stateBackd.topupAction?.methods.getPosition(...argsGetPosition).call({}, (error, result) => {
                    dispatch(changeMyProtectionBtc(result));
                });

                stateBackd.gasBank?.methods.balanceOf(state.myAccount).call({}, (error, result) => {
                    dispatch(changeMyGasBankBalance(window.web3.utils.fromWei(result, 'ether')));
                });

                stateBackd.lpTokenEth?.methods.balanceOf(state.myAccount).call({}, (error, result) => {
                    let argsGetPosition = [
                        state.myAccount,
                        state.myAccount + "000000000000000000000000",
                        "0x66756a6964616f65746800000000000000000000000000000000000000000000"
                    ];

                    let previousResult = String(result);
                    if (stateBackd.topupAction) {
                        stateBackd.topupAction.methods.getPosition(...argsGetPosition).call({}, (error, resultStakerVault) => {
                            const amount = window.web3.utils.toBN(resultStakerVault[7]);
                            const amountToAdd = window.web3.utils.toBN(previousResult);
                            const newAmountInWei = amount.add(amountToAdd);
                            //test
                            alert(newAmountInWei)
                            dispatch(changeMyEthLpAmount(newAmountInWei / 10000000000000000));
                        });
                    } else {
                        dispatch(changeMyEthLpAmount(String(result  / 10000000000000000)));
                    }
                });

                stateBackd.lpPoolBtc?.methods.exchangeRate().call({}, (error, resultExchangeRate) => {
                    dispatch(changeBtcLpExchangeRateAmount(window.web3.utils.fromWei(resultExchangeRate, 'ether')));
                });

                stateBackd.lpPoolEth?.methods.exchangeRate().call({}, (error, resultExchangeRate) => {
                    dispatch(changeEthLpExchangeRateAmount(window.web3.utils.fromWei(resultExchangeRate, 'ether')));
                });

                stateBackd.lpTokenEth?.methods.totalSupply().call({}, (error, result) => {
                    dispatch(changeTotalEthLpAmount(window.web3.utils.fromWei(result, 'ether') * 1));
                });
            }
        } else if (action === "CLEAR") {
            dispatch(reset());
            dispatch(resetBackd());
        }
    } catch (e: unknown) {
        console.log(e)
    }
}