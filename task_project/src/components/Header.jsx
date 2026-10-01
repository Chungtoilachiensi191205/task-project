import { useTheme } from "../context/ThemeContext";

function Header() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1>Mini Task Manager</h1>

      <button
        className="theme-btn"
        onClick={toggleTheme}
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </header>
  );
}

export default Header;
