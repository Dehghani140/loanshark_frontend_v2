import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    theme:"dark",  
    sidebarOpened: true,
    sidebarStatic: false,
    activeItem: window.location.pathname,
    loadingActive: false
}

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        reset: (state) => {
            return initialState
        },
        changeTheme: (state, action: PayloadAction<any>) => {
            state.theme = action.payload
        },
        openSidebar: (state) => {
            state.sidebarOpened = true
        },
        closeSidebar: (state) => {
            state.sidebarOpened = false
        },
        changeActiveSidebarItem: (state, action: PayloadAction<any>) => {
            state.activeItem = action.payload
        },
        toggleLoading: (state) => {
            state.loadingActive = !state.loadingActive
        },
    },
})

export const {
    changeTheme,
    openSidebar,
    closeSidebar,
    changeActiveSidebarItem,
    toggleLoading,
    reset,
} = layoutSlice.actions

export default layoutSlice.reducer