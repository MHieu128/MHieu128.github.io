import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollProgress } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const progress = useScrollProgress();

  useEffect(() => {
    let rafId = 0;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);

        const sections = navItems.map((item) => item.href.slice(1));
        for (const section of [...sections].reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
        rafId = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    const scrollToElement = () => {
      const element = document.getElementById(href.slice(1));
      if (element) {
        const navHeight = 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - navHeight, behavior: "smooth" });
      }
    };

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setTimeout(scrollToElement, 300);
    } else {
      scrollToElement();
    }
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60]">
        <div
          className="h-full bg-gradient-to-r from-primary via-gold-glow to-accent transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav
        className={cn(
          "fixed top-[2px] left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "glass-strong shadow-lg shadow-black/5 dark:shadow-black/20"
            : "bg-transparent",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="text-xl font-display font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              HieuLM
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                    activeSection === item.href.slice(1)
                      ? "text-primary glass-subtle"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5",
                  )}
                >
                  {item.label}
                </a>
              ))}

              {/* Theme Switcher */}
              <ThemeSwitcher className="ml-2" />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <Menu
                  className={cn(
                    "absolute inset-0 h-5 w-5 transition-all duration-300",
                    isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0",
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 h-5 w-5 transition-all duration-300",
                    isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
                  )}
                />
              </div>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              isMobileMenuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="py-3 space-y-1 border-t border-border/50 bg-background/95 backdrop-blur-sm rounded-b-xl">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    activeSection === item.href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/5",
                  )}
                >
                  {item.label}
                </a>
              ))}

              {/* Theme Switcher — inline swatch grid */}
              <div className="border-t border-border/30 mt-2 pt-1">
                <ThemeSwitcher variant="inline" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
