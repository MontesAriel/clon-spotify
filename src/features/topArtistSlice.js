import { createSlice } from "@reduxjs/toolkit";


export const topArtistSlice = createSlice({
    name:"topArtist",
    initialState: {
        topArtist: {}
    },
    reducers: {
        SET_TOP_ARTIST: (state, action) => {
            state.topArtist = action.payload
        } 
    }
})

export const { SET_TOP_ARTIST } = topArtistSlice.actions;

export const selectTopArtist = state => state.topArtist.topArtist;

export default topArtistSlice.reducer;