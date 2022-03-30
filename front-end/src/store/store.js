import { configureStore } from '@reduxjs/toolkit';
import  termsSlice  from './terms-slice';

export default configureStore({
    reducer:{
        reducer:termsSlice
    }
}) 