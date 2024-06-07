import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: 0,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData : (state , action) =>{
        state.user = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData} = userSlice.actions

export default userSlice.reducer