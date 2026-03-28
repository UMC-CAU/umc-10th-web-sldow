import { useTheme } from '../../context/ThemeContext';
import SunIcon from '../../assets/Sun.svg';
import MoonIcon from '../../assets/Moon.svg';

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-colors duration-300 outline-none flex items-center justify-center ${
        isDarkMode
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      aria-label="Toggle Dark Mode"
    >
      <img 
        src={isDarkMode ? SunIcon : MoonIcon} 
        alt={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'} 
        className={`w-5 h-5 transition-transform duration-300 hover:scale-110 ${!isDarkMode ? 'invert' : ''}`}
      />
    </button>
  );
};
