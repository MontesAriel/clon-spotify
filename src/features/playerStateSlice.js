import { createSlice } from "@reduxjs/toolkit";


export const playerStateSlice = createSlice({
    name:"playerState",
    initialState: {
        playerState: []
    },
    reducers: {
        SET_PLAYER_STATE: (state, action) => {
            state.playerState = action.payload
        } 
    }
})

export const { SET_PLAYER_STATE } = playerStateSlice.actions;

export const selectPlayerState = state => state.playerState.playerState;

export default playerStateSlice.reducer;