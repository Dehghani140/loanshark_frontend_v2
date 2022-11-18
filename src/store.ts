import { configureStore } from '@reduxjs/toolkit';
import loansharkReducer from './slice/loansharkSlice'
import backdReducer from './slice/backdSlice'
import smartvaultReducer from './slice/smartvaultSlice'
import layoutReducer from './slice/layoutSlice'

const store = configureStore({
    reducer: {
        loanshark: loansharkReducer,
        backd: backdReducer,
        smartvault: smartvaultReducer,
        layout: layoutReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store