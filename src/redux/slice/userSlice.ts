import { User } from "@/models/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface userState{
    currentUser: User | null;
}

const initState : userState ={
    currentUser: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        setCurrentUser: (state, action:  PayloadAction<User>) => {
            state.currentUser = action.payload
        }
    }
})

export const {setCurrentUser} = userSlice.actions


export default userSlice.reducer;