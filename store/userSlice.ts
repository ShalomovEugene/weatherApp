import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeatherByGeolocation } from "./weatherThunk";

interface UserState {
  latitude: number | null;
  longitude: number | null;
  weather: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  latitude: null,
  longitude: null,
  weather: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLocation(
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>
    ) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    setWeather(state, action: PayloadAction<any>) {
      state.weather = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetState(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByGeolocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByGeolocation.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchWeatherByGeolocation.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch weather";
        state.loading = false;
      });
  },
});

export const { setLocation, setWeather, setLoading, setError, resetState } =
  userSlice.actions;
export default userSlice.reducer;
