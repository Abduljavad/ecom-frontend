import {  Outlet } from "react-router-dom";

import Header from "../Components/RootLayout/Header";
import Footer from "../Components/RootLayout/Footer";
import { useEffect, useState } from "react";


function RootLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : '';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <div className="relative">
    <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
    <main>
    <Outlet/>
    </main>
      <Footer isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
    </div>
  )
}

export default RootLayout