import { createSlice } from "@reduxjs/toolkit";


export const getTrackSlice = createSlice({
    name:"track",
    initialState: {
        track: {}
    },
    reducers: {
        SET_TRACK: (state, action) => {
            state.track = action.payload
        } 
    }
})

export const { SET_TRACK } = getTrackSlice.actions;

export const selectTrack = state => state.track.track;

export default getTrackSlice.reducer;