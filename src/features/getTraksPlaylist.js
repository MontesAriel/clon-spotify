import { createSlice } from "@reduxjs/toolkit";


export const getTraksPlaylistSlice = createSlice({
    name:"traksPlaylist",
    initialState: {
        traksPlaylist: [],
        isPlaylistSelected: false,
        playlist: []
    },
    reducers: {
        SET_TRAKS_PLAYLIST: (state, action) => {
            state.traksPlaylist = action.payload
        },
        SET_PLAYLIST_SELECTED: (state, action) => {
            state.isPlaylistSelected = action.payload;
        },
        SET_PLAYLIST_ARRAY: (state, action) => {
            state.playlist = action.payload
        } 
    }
})

export const { SET_TRAKS_PLAYLIST, SET_PLAYLIST_SELECTED, SET_PLAYLIST_ARRAY } = getTraksPlaylistSlice.actions;

export const selectTraksPlaylist = state => state.traksPlaylist.traksPlaylist;
export const selectIsPlaylistSelected = state => state.traksPlaylist.isPlaylistSelected;
export const selectIsPlaylistArray = state => state.traksPlaylist.playlist;



export default getTraksPlaylistSlice.reducer;