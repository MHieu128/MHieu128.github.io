import { Button } from "@/components/ui/button";
import { TypewriterText } from "@/components/AnimatedText";
import { Github, Linkedin, Mail, Download } from "lucide-react";

const roles = [
  "Full-stack Developer",
  ".NET Developer",
  "Data Engineer",
  "AI-Enhanced Developer",
];

export default function HeroInteractive() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 70;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - navHeight, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Animated Role */}
      <div
        className="h-10 flex items-center justify-center lg:justify-start animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      >
        <span className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground">
          <TypewriterText texts={roles} />
        </span>
      </div>

      {/* Summary */}
      <p
        className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 animate-fade-in"
        style={{ animationDelay: "0.4s" }}
      >
        5+ years building scalable enterprise solutions with{" "}
        <span className="text-primary font-medium">.NET</span> and modern web
        technologies. Passionate about clean code, Agile methodologies, and
        leveraging{" "}
        <span className="text-primary font-medium">AI tools</span> to boost
        productivity.
      </p>

      {/* CTA Buttons */}
      <div
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        <Button
          size="lg"
          className="relative overflow-hidden group"
          onClick={() => scrollToSection("experience")}
        >
          <span className="relative z-10">View My Work</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="glass-medium border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-foreground transition-all"
          asChild
        >
          <a href="/Minh-Hieu-Luong-CV.pdf" download>
            <Download className="h-4 w-4 mr-2" />
            Download CV
          </a>
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="glass-medium border-primary/30 hover:border-primary/60 hover:bg-primary/10 text-foreground transition-all"
          onClick={() => scrollToSection("contact")}
        >
          Contact Me
        </Button>
      </div>

      {/* Social Links */}
      <div
        className="flex m-4 gap-4 justify-center lg:justify-start animate-fade-in"
        style={{ animationDelay: "0.6s" }}
      >
        {[
          { href: "mailto:minhhieudn98@gmail.com", Icon: Mail, label: "Email" },
          { href: "https://www.linkedin.com/in/minhhieudn98", Icon: Linkedin, label: "LinkedIn" },
          { href: "https://github.com/MHieu128", Icon: Github, label: "GitHub" },
        ].map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            className="group p-3 rounded-full glass-medium hover:border-primary/50 transition-all hover-lift"
            aria-label={label}
          >
            <Icon className="h-5 w-5 group-hover:text-primary transition-colors" />
          </a>
        ))}
      </div>
    </>
  );
}
