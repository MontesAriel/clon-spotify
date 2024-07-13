

import { createSlice } from "@reduxjs/toolkit";


export const recentlyPlayedSlice = createSlice({
    name:"recentlyPlayed",
    initialState: {
        recentlyPlayed: {}
    },
    reducers: {
        SET_RECENTLY_PLAYED: (state, action) => {
            state.recentlyPlayed = action.payload
        } 
    }
})

export const { SET_RECENTLY_PLAYED } = recentlyPlayedSlice.actions;

export const selectRecentlyPlayed = state => state.recentlyPlayed.recentlyPlayed;

export default recentlyPlayedSlice.reducer;