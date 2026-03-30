import { useState, useEffect, useCallback } from "react";

const ALL_THEMES = [
  "light", "peach", "sage", "sky", "sand",
  "dark", "ocean", "forest", "rose", "sunset",
  "lavender", "midnight", "ember",
] as const;

export type Theme = typeof ALL_THEMES[number];

function applyTheme(theme: string) {
  const html = document.documentElement;
  // Remove all theme classes
  ALL_THEMES.forEach((t) => html.classList.remove(t));
  html.classList.remove("dark");

  if (theme === "dark") {
    html.classList.add("dark");
  } else if (theme !== "light") {
    // All other themes (ocean, forest, rose, etc.) use their own class
    html.classList.add(theme);
  } else {
    // "light" — just :root vars, no extra class needed
    html.classList.add("light");
  }
}

export function useTheme() {
  const [theme, setThemeState] = useState<string>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") || "light";
    setThemeState(stored);
    applyTheme(stored);
  }, []);

  const setTheme = useCallback((newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  }, []);

  return { theme, setTheme, mounted };
}
