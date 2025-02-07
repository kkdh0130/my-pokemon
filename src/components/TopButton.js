import React, { useEffect, useState } from "react";
import "../styles/pokedex.css";

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 900) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      className={`top-button ${isVisible ? "show" : "hide"}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      🔝
    </button>
  );
};

export default TopButton;
