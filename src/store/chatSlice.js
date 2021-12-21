/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../routes.js';

export const fetchChatData = createAsyncThunk(
  'chat/fetchData',
  async (token) => {
    const response = await axios.get(api.dataPath(), { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    currentChannelId: null,
    messages: [],
  },
  reducers: {
    changeCurrentChannel: (state, action) => {
      const id = action.payload;
      state.currentChannelId = id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.fulfilled, (state, action) => {
      const { channels, currentChannelId, messages } = action.payload;
      state.channels.push(...channels);
      state.currentChannelId = currentChannelId;
      state.messages.push(...messages);
    });
  },
});

export const { changeCurrentChannel } = chatSlice.actions;

export default chatSlice.reducer;
