import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);


  return (
    
        <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className={` p-0.5 rounded-md   ${theme === "dark" ? "hover:lg:bg-primary": "hover:lg:bg-primaryLight"}
        
        `}
        >
            {theme === "light" ? <Moon size={25} /> : <Sun size={25}/>}
        </button>
  );
};

export default ThemeToggle;
