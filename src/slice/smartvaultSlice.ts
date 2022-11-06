import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    myProtectionType: "",
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
    },
})

export const {
    changeMyProtectionType,
    reset,
} = smartvaultSlice.actions

export default smartvaultSlice.reducer