interface FloatingElementsProps {
  variant?: "hero" | "subtle" | "dense";
}

export default function FloatingElements({ variant = "hero" }: FloatingElementsProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary gradient orb — pure CSS animation, no JS */}
      <div
        className="absolute top-1/4 left-1/4 w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full blur-[80px] opacity-30 animate-drift"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.4), transparent 70%)",
        }}
      />
      {/* Secondary gradient orb */}
      <div
        className="absolute bottom-1/3 right-1/4 w-[180px] h-[180px] md:w-[300px] md:h-[300px] rounded-full blur-[80px] opacity-25 animate-drift-reverse"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.3), transparent 70%)",
        }}
      />

      {variant === "hero" && (
        <>
          <div
            className="absolute top-20 right-[18%] w-20 h-20 rounded-2xl glass-subtle rotate-12 float hidden md:block"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute bottom-[30%] left-[10%] w-14 h-14 rounded-full glass-subtle float-slow hidden md:block"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-[55%] right-[8%] w-10 h-10 rounded-lg glass-subtle rotate-45 float hidden md:block"
            style={{ animationDelay: "4s" }}
          />
        </>
      )}
    </div>
  );
}
