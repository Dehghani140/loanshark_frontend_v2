import { ActionType } from '../action-types/backd'

const initialState = {
  lpPoolBtc: null,
  lpPoolEth: null,
  lpTokenBtc: null,
  lpTokenEth: null,
  vaultBtc: null,
  vaultEth: null,
  topupAction: null,
  gasBank: null,
  myBtcLpAmount: null,
  myEthLpAmount: null,
  totalBtcLpAmount: null,
  totalEthLpAmount: null,
  btcLpExchangeRate: 0,
  ethLpExchangeRate: 0,
  myProtection: [],
  myProtectionEth: [],
  myGasBankBalance: null,
}

export default function backdReducer(action: any, state: any = initialState) {
  switch (action.type) {
    case ActionType.CHANGE_LP_POOL_BTC:
      return { ...state, lpPoolBtc: action.payload };
    case ActionType.CHANGE_LP_TOKEN_BTC:
      return { ...state, lpTokenBtc: action.payload };
    case ActionType.CHANGE_VAULT_BTC:
      return { ...state, vaultBtc: action.payload };
    case ActionType.CHANGE_TOPUP_ACTION:
      return { ...state, topupAction: action.payload };
    case ActionType.CHANGE_GAS_BANK:
      return { ...state, gasBank: action.payload };
    case ActionType.CHANGE_MY_BTC_LP_AMOUNT:
      return { ...state, myBtcLpAmount: action.payload };
    case ActionType.CHANGE_TOTAL_BTC_LP_AMOUNT:
      return { ...state, totalBtcLpAmount: action.payload };
    case ActionType.CHANGE_BTC_LP_EXCHANGE_RATE:
      return { ...state, btcLpExchangeRate: action.payload };
    case ActionType.CHANGE_MY_PROTECTION:
      return { ...state, myProtection: action.payload };
    case ActionType.CHANGE_MY_PROTECTION_ETH:
      return { ...state, myProtectionEth: action.payload };
    case ActionType.CHANGE_MY_GAS_BANK_BALANCE:
      return { ...state, myGasBankBalance: action.payload };


    case ActionType.CHANGE_LP_POOL_ETH:
      return { ...state, lpPoolEth: action.payload };
    case ActionType.CHANGE_LP_TOKEN_ETH:
      return { ...state, lpTokenEth: action.payload };
    case ActionType.CHANGE_VAULT_ETH:
      return { ...state, vaultEth: action.payload };
    case ActionType.CHANGE_MY_ETH_LP_AMOUNT:
      return { ...state, myEthLpAmount: action.payload };
    case ActionType.CHANGE_TOTAL_ETH_LP_AMOUNT:
      return { ...state, totalEthLpAmount: action.payload };
    case ActionType.CHANGE_ETH_LP_EXCHANGE_RATE:
      return { ...state, ethLpExchangeRate: action.payload };


    default:
      return state;
  }
}
