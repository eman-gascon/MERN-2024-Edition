import React from 'react'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

const ThemeToogle = () => {
  const { isDarkTheme, toogleDarkTheme } = useDashboardContext()
  return <Wrapper onClick = {toogleDarkTheme}>
    { isDarkTheme ? (<BsFillSunFill className = 'toggle-icon' />) : (<BsFillMoonFill className = 'toogle-icon' />)}
  </Wrapper>
};

export default ThemeToogle