import {
  GraduationCap,
  MessageSquare,
  Users,
  Lightbulb,
  Clock,
  FileText,
  Heart,
  Globe,
  Quote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedCounter } from "@/components/AnimatedText";
import { cn } from "@/lib/utils";

const softSkills = [
  { icon: MessageSquare, title: "Technical Communication", description: "Clear with all stakeholders" },
  { icon: Users, title: "Customer Support", description: "Direct client interaction" },
  { icon: Heart, title: "Flexibility", description: "Quick adaptation" },
  { icon: Users, title: "Teamwork", description: "Agile collaboration" },
  { icon: Lightbulb, title: "Problem Solving", description: "Critical thinking" },
  { icon: Clock, title: "Work Under Pressure", description: "Quality under deadlines" },
  { icon: FileText, title: "Documentation", description: "Clear technical docs" },
];

const languages = [
  { name: "Vietnamese", level: 100, proficiency: "Native" },
  { name: "English", level: 80, proficiency: "Professional" },
];

function CircularProgress({ value, label, sublabel }: { value: number; label: string; sublabel: string }) {
  const { ref, isVisible } = useScrollAnimation();
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 progress-ring">
          {/* Background circle */}
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="56"
            cy="56"
            r="45"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{isVisible ? value : 0}%</span>
        </div>
      </div>
      <div className="mt-3 text-center">
        <p className="font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{sublabel}</p>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/30" />
      <div className="absolute inset-0 bg-dot-pattern bg-dot-md opacity-20" />

      <div className="container px-4 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <div className={cn("text-center mb-16", isVisible ? "animate-fade-in" : "opacity-0")}>
          <Badge variant="outline" className="mb-4 px-4 py-1 text-xs tracking-wider">
            ABOUT ME
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            More Than <span className="text-gradient">Code</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beyond technical skills, I bring strong interpersonal abilities
            and a commitment to continuous learning.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {/* Education - Large Tile */}
          <GlassCard
            className={cn(
              "md:col-span-2 p-6",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Education</h3>
                <h4 className="text-lg font-medium text-foreground mb-1">
                  Bachelor's in Software Engineering
                </h4>
                <p className="text-primary font-medium mb-2">Duy Tan University</p>
                <p className="text-sm text-muted-foreground">
                  Comprehensive education in software development principles,
                  algorithms, data structures, and modern development practices.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Years Experience */}
          <GlassCard
            className={cn(
              "p-6 flex flex-col items-center justify-center text-center",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            <div className="text-5xl font-bold text-gradient mb-2">
              {isVisible ? <AnimatedCounter end={5} suffix="+" /> : "0+"}
            </div>
            <p className="text-muted-foreground text-sm">Years Experience</p>
          </GlassCard>

          {/* Projects */}
          <GlassCard
            className={cn(
              "p-6 flex flex-col items-center justify-center text-center",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
            style={{ animationDelay: "0.35s" }}
          >
            <div className="text-5xl font-bold text-gradient mb-2">
              {isVisible ? <AnimatedCounter end={5} suffix="+" /> : "0+"}
            </div>
            <p className="text-muted-foreground text-sm">Major Projects</p>
          </GlassCard>

          {/* Quote */}
          <GlassCard
            className={cn(
              "lg:col-span-2 p-6",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <Quote className="h-8 w-8 text-primary/30 mb-3" />
            <p className="text-lg italic text-muted-foreground">
              "Clean code is not written by following a set of rules. You don't become a software
              craftsman by learning a list of heuristics. Professionalism and craftsmanship come
              from values that drive disciplines."
            </p>
            <p className="text-sm text-primary mt-3">— Robert C. Martin</p>
          </GlassCard>

          {/* Languages */}
          <GlassCard
            className={cn(
              "lg:col-span-2 p-6",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
            style={{ animationDelay: "0.45s" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Languages</h3>
            </div>
            <div className="flex justify-around">
              {languages.map((lang) => (
                <CircularProgress
                  key={lang.name}
                  value={lang.level}
                  label={lang.name}
                  sublabel={lang.proficiency}
                />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Soft Skills */}
        <div className="mt-12 max-w-6xl mx-auto">
          <h3
            className={cn(
              "text-xl font-semibold text-center mb-8",
              isVisible ? "animate-fade-in" : "opacity-0"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            Soft Skills
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {softSkills.map((skill, index) => (
              <GlassCard
                key={skill.title}
                variant="subtle"
                className={cn(
                  "p-4 text-center group",
                  isVisible ? "animate-fade-in" : "opacity-0"
                )}
                style={{ animationDelay: `${0.55 + index * 0.05}s` }}
              >
                <div className="p-2 rounded-lg bg-primary/10 w-fit mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-medium text-xs mb-1">{skill.title}</h4>
                <p className="text-[10px] text-muted-foreground">{skill.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
