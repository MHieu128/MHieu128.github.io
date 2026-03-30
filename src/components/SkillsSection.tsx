import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import {
  Code2,
  Layers,
  Wrench,
  Database,
  Cloud,
  GitBranch,
  Sparkles,
  Users,
} from "lucide-react";

const skillCategories = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "C#", level: 95, core: true },
      { name: "JavaScript", level: 85, core: true },
      { name: "TypeScript", level: 80 },
      { name: "Python", level: 70 },
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Runtime",
    icon: Layers,
    skills: [
      { name: ".NET Core", level: 95, core: true },
      { name: ".NET Framework", level: 90, core: true },
      { name: "Entity Framework", level: 90, core: true },
      { name: "Vue.js", level: 75 },
      { name: "Angular", level: 70 },
      { name: "Flask", level: 65 },
      { name: "Xamarin", level: 70 },
    ],
  },
  {
    id: "tools",
    title: "Libraries & Tools",
    icon: Wrench,
    skills: [
      { name: "jQuery", level: 85 },
      { name: "Bootstrap", level: 85 },
      { name: "DevExtreme", level: 80 },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    icon: Database,
    skills: [
      { name: "SQL Server", level: 90, core: true },
      { name: "MySQL", level: 80 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "Azure", level: 85 },
      { name: "Azure Data Factory", level: 80 },
      { name: "Docker", level: 75 },
      { name: "CI/CD Pipelines", level: 85 },
    ],
  },
  {
    id: "vcs",
    title: "Version Control",
    icon: GitBranch,
    skills: [
      { name: "GitHub", level: 90 },
      { name: "GitLab", level: 85 },
      { name: "Bitbucket", level: 85 },
      { name: "Azure Repos", level: 85 },
    ],
  },
  {
    id: "ai",
    title: "AI & Productivity",
    icon: Sparkles,
    skills: [
      { name: "GitHub Copilot", level: 90 },
      { name: "AI-Assisted Dev", level: 85 },
    ],
  },
  {
    id: "methods",
    title: "Methodologies",
    icon: Users,
    skills: [
      { name: "Scrum", level: 90 },
      { name: "Kanban", level: 85 },
      { name: "Agile", level: 90 },
    ],
  },
];

const coreSkills = ["C#", ".NET Core/Framework", "Entity Framework", "SQL Server", "JavaScript"];

function AnimatedProgressBar({ level, isVisible }: { level: number; isVisible: boolean }) {
  return (
    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-teal-glow rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? `${level}%` : "0%",
          transitionDelay: "0.2s",
        }}
      />
    </div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-secondary/30" />
      <div className="absolute inset-0 bg-dot-pattern bg-dot-md opacity-20" />

      <div className="container px-4 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <div className={cn("text-center mb-16", isVisible ? "animate-fade-in" : "opacity-0")}>
          <Badge variant="outline" className="mb-4 px-4 py-1 text-xs tracking-wider">
            EXPERTISE
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over 5+ years of professional development,
            with deep expertise in the .NET ecosystem and modern web technologies.
          </p>
        </div>

        {/* Core Skills Highlight */}
        <div className={cn("mb-16", isVisible ? "animate-fade-in" : "opacity-0")} style={{ animationDelay: "0.2s" }}>
          <h3 className="text-sm font-medium text-muted-foreground text-center mb-6 uppercase tracking-wider">
            Core Expertise
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {coreSkills.map((skill, index) => (
              <Badge
                key={skill}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium glass border-primary/30 text-primary hover:bg-primary/20 transition-all cursor-default",
                  isVisible ? "animate-scale-in" : "opacity-0"
                )}
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((category, idx) => (
            <GlassCard
              key={category.id}
              variant="subtle"
              className={cn(
                "p-6 cursor-pointer group",
                activeCategory === category.id && "border-primary/50 bg-primary/5",
                isVisible ? "animate-fade-in-up" : "opacity-0"
              )}
              style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
              onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-3">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span
                        className={cn(
                          "text-sm transition-colors",
                          skill.core
                            ? "text-foreground font-medium"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {skill.name}
                        {skill.core && (
                          <span className="ml-1.5 text-[10px] text-primary font-normal">★</span>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                    <AnimatedProgressBar level={skill.level} isVisible={isVisible} />
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
