import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userPic: '',
    userTopics: '',
    topics: ''
  },
  reducers: {
    registerUser: (state, action) => ({
      userName: action.payload.userName,
      userPic: action.payload.userPic
    }),
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { registerUser } = userSlice.actions

export default userSlice.reducer