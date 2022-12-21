import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    myAccount: null,
    selectedPair: 'ETHBTC',
    numberOfEth: 0,
    numberOfAvax: 0,
    aaveBtcBorrowRate: 0,
    traderJoeBtcBorrowRate: 0,
    aaveEthDepositRate: 0,
    userDepositBalanceEth: 0,
    userDepositBalanceAvax: 0,
    userDebtBalanceBtc: 0,
    userDebtBalanceUsdt: 0,
    myFujiVaultETHBTC: null,
    myFujiVaultAVAXUSDT: null,
    myFliquidatorAVAX: null,
    myFujiController: null,
    myFujiOracle: null,
    mySmartVaultBtc: null,
    mySmartVaultUsdt: null,
    myETHContract: null,
    myBTCContract: null,
    myUSDTContract: null,
    priceOfEth: null,
    priceOfBtc: null,
    priceOfAvax: null,
    priceOfUsdt: null,
    providerAAVEAVAX: null,
    AAVEDataProvider: null,
    providerTraderJoe: null,
    TraderJoeBtcMarket: null,
    smartVaultBtc: 0,
    inputBtcDept: 0,
    inputEthDeposit: 0,
    myETHAmount: 0,
    myBTCAmount: 0,
    myAVAXAmount: 0,
    myUSDTAmount: 0,
    LTV: { "ETHBTC": 0, "AVAXUSDT": 0 },
    liquidationPrice: { "ETHBTC": 0, "AVAXUSDT": 0 },
}

export const loansharkSlice = createSlice({
    name: 'loanshark',
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
        changeMyAccount: (state, action: PayloadAction<any>) => {
            state.myAccount = action.payload
        },
        changeMyFujiVaultETHBTC: (state, action: PayloadAction<any>) => {
            state.myFujiVaultETHBTC = action.payload
        },
        changeUserDepositBalanceEth: (state, action: PayloadAction<any>) => {
            state.userDepositBalanceEth = action.payload
        },
        changeSelectedPair: (state, action: PayloadAction<any>) => {
            state.selectedPair = action.payload
        },
        changeNumberOfEth: (state, action: PayloadAction<any>) => {
            state.numberOfEth = action.payload 
        },
        changeNumberOfAvax: (state, action: PayloadAction<any>) => {
            state.numberOfAvax = action.payload
        },
        changeAaveBtcBorrowRate: (state, action: PayloadAction<any>) => {
            state.aaveBtcBorrowRate = action.payload
        },
        changeTraderJoeBtcBorrowRate: (state, action: PayloadAction<any>) => {
            state.traderJoeBtcBorrowRate = action.payload
        },
        changeAaveEthDepositRate: (state, action: PayloadAction<any>) => {
            state.aaveEthDepositRate = action.payload
        },
        changeUserDepositBalanceAvax: (state, action: PayloadAction<any>) => {
            state.userDepositBalanceAvax = action.payload
        },
        changeUserDebtBalanceBtc: (state, action: PayloadAction<any>) => {
            state.userDebtBalanceBtc = action.payload
        },
        changeUserDebtBalanceUsdt: (state, action: PayloadAction<any>) => {
            state.userDebtBalanceUsdt = action.payload
        },
        changeMyFujiVaultAVAXUSDT: (state, action: PayloadAction<any>) => {
            state.myFujiVaultAVAXUSDT = action.payload
        },
        changeMyFliquidatorAvax: (state, action: PayloadAction<any>) => {
            state.myFliquidatorAVAX = action.payload
        },
        changeMyFujiController: (state, action: PayloadAction<any>) => {
            state.myFujiController = action.payload
        },
        changeMyFujiOracle: (state, action: PayloadAction<any>) => {
            state.myFujiOracle = action.payload
        },
        changeMySmartVaultBtc: (state, action: PayloadAction<any>) => {
            state.mySmartVaultBtc = action.payload
        },
        changeMySmartVaultUsdt: (state, action: PayloadAction<any>) => {
            state.mySmartVaultUsdt = action.payload
        },
        changeMyEthContract: (state, action: PayloadAction<any>) => {
            state.myETHContract = action.payload
        },
        changeMyBtcContract: (state, action: PayloadAction<any>) => {
            state.myBTCContract = action.payload
        },
        changeMyUsdtContract: (state, action: PayloadAction<any>) => {
            state.myUSDTContract = action.payload
        },
        changePriceOfEth: (state, action: PayloadAction<any>) => {
            state.priceOfEth = action.payload
        },
        changePriceOfBtc: (state, action: PayloadAction<any>) => {
            state.priceOfBtc = action.payload
        },
        changePriceOfAvax: (state, action: PayloadAction<any>) => {
            state.priceOfAvax = action.payload
        },
        changePriceOfUsdt: (state, action: PayloadAction<any>) => {
            state.priceOfUsdt = action.payload
        },
        changeProviderAAVEAVAX: (state, action: PayloadAction<any>) => {
            state.providerAAVEAVAX = action.payload
        },
        changeAAVEDataProvider: (state, action: PayloadAction<any>) => {
            state.AAVEDataProvider = action.payload
        },
        changeTraderJoeBtcMarket: (state, action: PayloadAction<any>) => {
            state.TraderJoeBtcMarket = action.payload
        },
        changeProviderTraderJoe: (state, action: PayloadAction<any>) => {
            state.providerTraderJoe = action.payload
        },
        changeSmartVaultBtc: (state, action: PayloadAction<any>) => {
            state.smartVaultBtc = action.payload
        },
        changeSmartVaultUsdt: (state, action: PayloadAction<any>) => {
            state.mySmartVaultUsdt = action.payload
        },
        changeInputEthDeposit: (state, action: PayloadAction<any>) => {
            state.inputEthDeposit = action.payload 
        },
        changeInputBtcDebt: (state, action: PayloadAction<any>) => {
            state.inputBtcDept = action.payload
        },
        changeMyETHAmount: (state, action: PayloadAction<any>) => {
            state.myETHAmount = action.payload
        },
        changeMyBTCAmount: (state, action: PayloadAction<any>) => {
            state.myBTCAmount = action.payload
        },
        changeMyAVAXAmount: (state, action: PayloadAction<any>) => {
            state.myAVAXAmount = action.payload
        },
        changeMyUSDTAmount: (state, action: PayloadAction<any>) => {
            state.myUSDTAmount = action.payload
        },
        changeLTV: (state, action: PayloadAction<any>) => {
            if (action.payload.ETHBTC) {
                state.LTV.ETHBTC = action.payload.ETHBTC;
            }
            if (action.payload.AVAXUSDT) {
                state.LTV.AVAXUSDT = action.payload.AVAXUSDT;
            }
        },
        changeLiqudationPrice: (state, action: PayloadAction<any>) => {
            if (action.payload.ETHBTC) {
                state.liquidationPrice.ETHBTC = action.payload.ETHBTC;
              }
              if (action.payload.AVAXUSDT) {
                state.liquidationPrice.AVAXUSDT = action.payload.AVAXUSDT;
              }
        }
    },
})

export const {
    changeMyAccount,
    changeMyFujiVaultETHBTC,
    changeUserDepositBalanceEth,
    reset,
    changeSelectedPair,
    changeNumberOfEth,
    changeNumberOfAvax,
    changeAaveBtcBorrowRate,
    changeTraderJoeBtcBorrowRate,
    changeAaveEthDepositRate,
    changeUserDepositBalanceAvax,
    changeUserDebtBalanceBtc,
    changeUserDebtBalanceUsdt,
    changeMyFujiVaultAVAXUSDT,
    changeMyFliquidatorAvax,
    changeMyFujiController,
    changeMyFujiOracle,
    changeMySmartVaultBtc,
    changeMySmartVaultUsdt,
    changeMyEthContract,
    changeMyBtcContract,
    changeMyUsdtContract,
    changePriceOfEth,
    changePriceOfBtc,
    changePriceOfAvax,
    changePriceOfUsdt,
    changeProviderAAVEAVAX,
    changeAAVEDataProvider,
    changeTraderJoeBtcMarket,
    changeProviderTraderJoe,
    changeSmartVaultBtc,
    changeSmartVaultUsdt,
    changeInputEthDeposit,
    changeInputBtcDebt,
    changeMyETHAmount,
    changeMyBTCAmount,
    changeMyAVAXAmount,
    changeMyUSDTAmount,
    changeLTV,
    changeLiqudationPrice,
} = loansharkSlice.actions

export default loansharkSlice.reducer