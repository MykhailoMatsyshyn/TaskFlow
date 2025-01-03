import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChangeTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  return (
    <div>
      <label htmlFor="theme-selector" className="text-white">
        Theme
      </label>
      <select
        id="theme-selector"
        value={theme}
        onChange={handleChangeTheme}
        className="bg-black text-white p-2 rounded"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeSwitcher;
