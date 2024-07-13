import { createSlice } from "@reduxjs/toolkit";


export const topStracksSlice = createSlice({
    name:"topStrack",
    initialState: {
        topStrack: {}
    },
    reducers: {
        SET_TOP_TRACKS: (state, action) => {
            state.topStrack = action.payload
        } 
    }
})

export const { SET_TOP_TRACKS } = topStracksSlice.actions;

export const selectTopTracks = state => state.topStrack.topStrack;

export default topStracksSlice.reducer;