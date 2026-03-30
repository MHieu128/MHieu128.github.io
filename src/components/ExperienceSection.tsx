import { useState } from "react";
import { ChevronDown, ChevronUp, Briefcase, Calendar, MapPin, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: "e",
    title: "Data Engineer & Developer",
    project: "Project E",
    company: "Healthcare Platform",
    type: "Healthcare",
    duration: "09/2025 – Current",
    description: "Building data pipelines and migrating legacy systems for a healthcare platform.",
    responsibilities: [
      "Develop and maintain Azure Data Factory pipelines for data transformation",
      "Migrate legacy Azure Functions to modern .NET implementations",
      "Implement and maintain SonarQube for code quality assurance",
      "Design data architecture for healthcare analytics",
    ],
    technologies: ["Azure Data Factory", "Azure Functions", ".NET Core", "SQL Server", "SonarQube"],
    highlights: ["Azure Data Factory", "Functions Migration"],
    metrics: ["Data Pipelines", "Legacy Migration"],
  },
  {
    id: "p",
    title: "Developer",
    project: "Project P",
    company: "US Real Estate Notarization Platform",
    type: "Real Estate",
    duration: "02/2022 – 08/2025",
    description: "Full-stack development for a real estate notarization platform serving the US market.",
    responsibilities: [
      "Optimized SQL queries resulting in significant performance improvements",
      "Led migration of workloads from AWS to Azure infrastructure",
      "Achieved and maintained 80% SonarQube code coverage",
      "Implemented and maintained Azure CI/CD pipelines",
      "Direct communication with US-based clients for requirement gathering",
    ],
    technologies: [".NET Core", "Entity Framework", "SQL Server", "Azure", "Vue.js", "CI/CD"],
    highlights: ["SQL Optimization", "AWS to Azure Migration", "80% Code Coverage"],
    metrics: ["80% Coverage", "3+ Years"],
  },
  {
    id: "g",
    title: "Developer",
    project: "Project G",
    company: "Microservices B2B Platform",
    type: "E-Commerce",
    duration: "04/2021 – 01/2022",
    description: "Developed microservices architecture for a B2B e-commerce platform.",
    responsibilities: [
      "Designed and implemented microservices using .NET Core",
      "Achieved 80% SonarQube code coverage across services",
      "Integrated PayPal payment gateway",
      "Implemented inter-service communication patterns",
    ],
    technologies: [".NET Core", "Microservices", "SQL Server", "PayPal API", "Docker"],
    highlights: ["Microservices Architecture", "PayPal Integration"],
    metrics: ["80% Coverage", "10 Months"],
  },
  {
    id: "internal",
    title: "Developer",
    project: "Internal Setup",
    company: "Branch Management System",
    type: "Internal Tools",
    duration: "01/2021 – 03/2021",
    description: "Internal branch management system for operational efficiency.",
    responsibilities: [
      "Developed branch management modules",
      "Implemented reporting dashboards",
      "Database design and optimization",
    ],
    technologies: [".NET Framework", "SQL Server", "JavaScript", "Bootstrap"],
    highlights: ["Internal Tools"],
    metrics: ["3 Months"],
  },
  {
    id: "k",
    title: "Developer",
    project: "Project K",
    company: "COVID-19 Notification Application",
    type: "Mobile App",
    duration: "06/2020 – 01/2021",
    description: "Mobile application for COVID-19 notifications and health tracking.",
    responsibilities: [
      "Developed cross-platform mobile application using Xamarin",
      "Implemented push notification system",
      "Built REST APIs for backend services",
    ],
    technologies: ["Xamarin", "C#", ".NET Core", "SQL Server", "Push Notifications"],
    highlights: ["Mobile Development", "Xamarin"],
    metrics: ["7 Months", "Cross-Platform"],
  },
];

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>("e");
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.05 });

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container px-4 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <div className={cn("text-center mb-16", isVisible ? "animate-fade-in" : "opacity-0")}>
          <Badge variant="outline" className="mb-4 px-4 py-1 text-xs tracking-wider">
            JOURNEY
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A journey through impactful projects, from mobile apps to enterprise platforms,
            showcasing growth and technical excellence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line with gradient */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
              <div className="h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            </div>

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={cn(
                  "relative mb-8 md:mb-12",
                  index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%]",
                  isVisible ? "animate-fade-in" : "opacity-0"
                )}
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-4 border-background -translate-x-1/2 mt-8 z-10 transition-all duration-300",
                    expandedId === exp.id
                      ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                      : "bg-muted hover:bg-primary/50"
                  )}
                />

                {/* Content card */}
                <div className={cn("ml-12 md:ml-0", index % 2 === 0 ? "md:mr-8" : "md:ml-8")}>
                  <GlassCard
                    variant={expandedId === exp.id ? "prominent" : "subtle"}
                    hover={true}
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      expandedId === exp.id && "shadow-xl shadow-primary/10"
                    )}
                  >
                    <button
                      onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                      className="w-full p-6 text-left"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Type Badge & Duration */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge className="bg-primary/20 text-primary border-0 text-xs">
                              {exp.type}
                            </Badge>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {exp.duration}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {exp.project} • {exp.company}
                          </p>

                          {/* Metrics */}
                          <div className="flex flex-wrap gap-2">
                            {exp.metrics.map((metric) => (
                              <span
                                key={metric}
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-secondary text-xs text-muted-foreground"
                              >
                                <Award className="h-3 w-3 text-primary" />
                                {metric}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Expand Icon */}
                        <div className="flex-shrink-0 p-2 rounded-full bg-secondary/50">
                          {expandedId === exp.id ? (
                            <ChevronUp className="h-4 w-4 text-primary" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded content */}
                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        expandedId === exp.id ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                      )}
                    >
                      <div className="px-6 pb-6 border-t border-border/50 pt-4">
                        <p className="text-muted-foreground mb-4">{exp.description}</p>

                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <span className="w-1 h-4 bg-primary rounded-full" />
                          Key Responsibilities
                        </h4>
                        <ul className="list-none text-sm text-muted-foreground mb-4 space-y-2 ml-3">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-2 flex-shrink-0" />
                              {resp}
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
                          <span className="w-1 h-4 bg-accent rounded-full" />
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="bg-background/50 border-primary/30 text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
