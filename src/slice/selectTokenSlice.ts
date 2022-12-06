import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    dialogState:false,
    selectedToken:'',
    tokenAction:'',
    tokenList:[],
    title:"",
}

export const selectTokenSlice = createSlice({
    name: 'selectToken',
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
        
        changeDialogState: (state, action: PayloadAction<any>) => {
            state.dialogState = action.payload
        },
        changeSelectTokenTitleState: (state, action: PayloadAction<any>) => {
            state.title = action.payload
        },
        changeSelectedTokenState: (state, action: PayloadAction<any>) => {
            console.log(action)
            console.log(action.payload)
            state.selectedToken = action.payload.token
            state.tokenAction = action.payload.action
        },
        changeTokenListState: (state, action: PayloadAction<any>) => {
            state.tokenList = action.payload
        },
    },
})

export const {
    changeDialogState,
    changeSelectTokenTitleState,
    changeSelectedTokenState,
    changeTokenListState,
} = selectTokenSlice.actions

export default selectTokenSlice.reducer