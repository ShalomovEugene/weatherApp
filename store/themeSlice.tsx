import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark";
}

const initialState: ThemeState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<"light" | "dark">) {
      state.theme = action.payload;

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(action.payload);
      }
    },
    initializeTheme(state) {
      if (typeof window !== "undefined") {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
          state.theme = savedTheme as "light" | "dark";
          document.documentElement.classList.add(savedTheme);
        } else {
          state.theme = "light";
          document.documentElement.classList.add("light");
        }
      } else {
        state.theme = "light";
      }
    },
  },
});

export const { setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;
