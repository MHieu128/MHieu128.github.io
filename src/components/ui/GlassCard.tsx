import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "prominent";
  hover?: boolean;
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = true, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl overflow-hidden transition-all duration-300",
          // Base glass effect
          variant === "default" && "glass-card",
          variant === "subtle" && "bg-card/50 backdrop-blur-sm border border-border",
          variant === "prominent" && "glass-card border-primary/30",
          // Hover effects
          hover && "hover:border-primary/50 hover:-translate-y-1",
          hover && "hover:shadow-lg hover:shadow-primary/10",
          // Glow effect
          glow && "glow-sm",
          className
        )}
        {...props}
      >
        {/* Gradient overlay on hover */}
        {hover && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
        )}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
