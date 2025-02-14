import { createSlice } from "@reduxjs/toolkit";

// localStorage에서 다크모드 상태 불러오기 (기본값: false)
const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")) || false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode)); // 상태 저장
    },
  },
});

// 액션 및 리듀서 내보내기
export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
