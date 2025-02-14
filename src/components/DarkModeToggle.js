import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/themeSlice";

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <button onClick={() => dispatch(toggleDarkMode())} className="dark-mode-icon">
      <img
        src={`${process.env.PUBLIC_URL}/icons/${darkMode ? "light-mode.png" : "dark-mode.png"}`}
        alt={darkMode ? "라이트 모드" : "다크 모드"}
        width="40"
        height="40"
        className="icon-img"
      />
    </button>
  );
};

export default DarkModeToggle;
