import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Palette, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeOption {
  id: string;
  label: string;
  colors: [string, string];
}

const lightThemes: ThemeOption[] = [
  { id: "light", label: "Light", colors: ["#f5f3ef", "#c9942e"] },
  { id: "peach", label: "Peach", colors: ["#f7ece5", "#e06838"] },
  { id: "sage", label: "Sage", colors: ["#eaf2eb", "#4a9a5e"] },
  { id: "sky", label: "Sky", colors: ["#ecf2f8", "#2e96d4"] },
  { id: "sand", label: "Sand", colors: ["#f3ede4", "#b5863a"] },
];

const darkThemes: ThemeOption[] = [
  { id: "dark", label: "Dark", colors: ["#0a0c14", "#c9942e"] },
  { id: "ocean", label: "Ocean", colors: ["#0a1420", "#0da5d4"] },
  { id: "forest", label: "Forest", colors: ["#0a1a0e", "#2eab5a"] },
  { id: "rose", label: "Rose", colors: ["#1a0a12", "#d45478"] },
  { id: "sunset", label: "Sunset", colors: ["#1a120a", "#e8863a"] },
  { id: "lavender", label: "Lavender", colors: ["#12101a", "#9b7ed8"] },
  { id: "midnight", label: "Midnight", colors: ["#080a18", "#5b7fdb"] },
  { id: "ember", label: "Ember", colors: ["#1a0c0a", "#d44a2e"] },
];

interface ThemeSwitcherProps {
  className?: string;
  variant?: "icon" | "inline";
}

function ThemeSwatch({
  t,
  active,
  onClick,
}: {
  t: ThemeOption;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1 group cursor-pointer"
      aria-label={`Switch to ${t.label} theme`}
    >
      <span
        className={cn(
          "block h-8 w-8 rounded-full border-2 transition-all duration-200",
          active
            ? "border-primary scale-110 shadow-md shadow-primary/30"
            : "border-transparent hover:border-primary/40 hover:scale-105",
        )}
        style={{
          background: `linear-gradient(135deg, ${t.colors[0]} 50%, ${t.colors[1]} 50%)`,
        }}
      />
      <span
        className={cn(
          "text-[9px] leading-tight font-medium transition-colors",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        {t.label}
      </span>
    </button>
  );
}

export function ThemeSwitcher({ className, variant = "icon" }: ThemeSwitcherProps) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, mounted } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === "inline") return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [variant]);

  if (!mounted) return null;

  /* ── Inline variant: swatch grid for mobile menu ── */
  if (variant === "inline") {
    return (
      <div className={cn("px-4 py-3", className)}>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
          Light
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          {lightThemes.map((t) => (
            <ThemeSwatch
              key={t.id}
              t={t}
              active={theme === t.id}
              onClick={() => setTheme(t.id)}
            />
          ))}
        </div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-2">
          Dark
        </p>
        <div className="flex flex-wrap gap-3">
          {darkThemes.map((t) => (
            <ThemeSwatch
              key={t.id}
              t={t}
              active={theme === t.id}
              onClick={() => setTheme(t.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ── Icon variant: desktop dropdown ── */
  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center justify-center rounded-full p-2 transition-colors",
          "hover:bg-primary/10 text-muted-foreground hover:text-foreground",
        )}
        aria-label="Change theme"
      >
        <Palette className="h-5 w-5" />
      </button>

      {/* Dropdown — CSS transition instead of framer-motion */}
      <div
        className={cn(
          "absolute right-0 top-full mt-2 w-48 rounded-xl glass-strong p-2 shadow-lg z-50",
          "max-h-[420px] overflow-y-auto custom-scrollbar",
          "transition-all duration-200 origin-top-right",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        <p className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          Light
        </p>
        {lightThemes.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTheme(t.id); setOpen(false); }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              theme === t.id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5",
            )}
          >
            <span className="flex gap-1">
              {t.colors.map((c, i) => (
                <span
                  key={i}
                  className="block h-4 w-4 rounded-full border border-white/20"
                  style={{ backgroundColor: c }}
                />
              ))}
            </span>
            <span className="flex-1 text-left">{t.label}</span>
            {theme === t.id && <Check className="h-4 w-4 text-primary" />}
          </button>
        ))}

        <div className="my-1.5 h-px bg-border/50" />

        <p className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          Dark
        </p>
        {darkThemes.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTheme(t.id); setOpen(false); }}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              theme === t.id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5",
            )}
          >
            <span className="flex gap-1">
              {t.colors.map((c, i) => (
                <span
                  key={i}
                  className="block h-4 w-4 rounded-full border border-white/20"
                  style={{ backgroundColor: c }}
                />
              ))}
            </span>
            <span className="flex-1 text-left">{t.label}</span>
            {theme === t.id && <Check className="h-4 w-4 text-primary" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSwitcher;
