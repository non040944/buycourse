import {createSlice} from "@reduxjs/toolkit"
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        product:[],
        quantity:0,
        total:0
    },
    reducers:{
        addProduct:(state,action)=>{
            //console.log(action)
            state.product.push(action.payload.course);
            state.quantity+=1;
            state.total += action.payload.course.Course_price;
        },
    },
});

export const {addProduct}=cartSlice.actions
export default cartSlice.reducer;