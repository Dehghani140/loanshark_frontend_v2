import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    myProtectionType: "",
    myProtectingPair: "",
    myProtectingSmartVault: ""
}

export const smartvaultSlice = createSlice({
    name: 'smartvault',
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
        changeMyProtectionType: (state, action: PayloadAction<any>) => {
            state.myProtectionType = action.payload
        },
        changeMyProtectingPair: (state, action: PayloadAction<any>) => {
            state.myProtectingPair = action.payload
        },
        changeMyProtectingSmartVault: (state, action: PayloadAction<any>) => {
            state.myProtectingSmartVault = action.payload
        },
    },
})

export const {
    changeMyProtectionType,
    changeMyProtectingPair,
    changeMyProtectingSmartVault,
    reset,
} = smartvaultSlice.actions

export default smartvaultSlice.reducer