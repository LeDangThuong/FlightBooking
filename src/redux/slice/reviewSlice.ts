
import { Review } from "@/models/Review";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ReivewState{
    reviews: Review[]
}

const initState : ReivewState ={
    reviews: []
}

export const reviewSlice = createSlice({
    name: 'review',
    initialState: initState,
    reducers: {
        setReviews: (state, action:  PayloadAction<Review[]>) => {
            state.reviews = action.payload
        }
    }
})

export const {setReviews} = reviewSlice.actions


export default reviewSlice.reducer;