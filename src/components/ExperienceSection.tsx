import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Briefcase,
  Calendar,
  MapPin,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: "ipms",
    title: "Software Engineer",
    project: "IPMS — Intellectual Property Management System",
    company: "Hypertek",
    type: "LegalTech",
    duration: "Apr 2026 – Present",
    description:
      "An enterprise platform covering the full IP lifecycle — trademarks, patents, industrial designs and geographical indications — with registration and approval workflows, document management, fee calculation, domain-name management and automated crawling of external registries such as WIPO.",
    responsibilities: [
      "Designed and shipped an AI-driven IP infringement early-warning system: a five-signal weighted risk model scoring each filing High/Medium/Low with per-factor bilingual explanations the legal team can audit, verified end to end by 46 automated tests on a production-shaped database",
      "Added a self-learning layer — logistic regression in NumPy, retrained weekly by a Kubernetes CronJob — predicting infringement probability over a six-month horizon, with time-ordered holdout validation and AUC/precision activation gates",
      "Kept the feature fail-safe: PostgreSQL model registry with append-only audit log, and in-process inference that falls back to the rule engine on any error; risk preview measured about 8 ms per request against a 300 ms budget",
      "Chose trigram similarity (pg_trgm + unaccent) over embeddings to catch Vietnamese look-alike brand names, and materialized views over JSONB case data to keep trend and hotspot queries fast",
      "Delivered core IP features end to end across API, search, admin and crawler services — alert management, bulk IP import, domain-name management, and React Flow visualization of IP relationship and approval-workflow graphs",
      "Hardened the Python crawler (owner extraction, WIPO ID fallback matching, retry logic) and established centralized logging and observability on AKS",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "NumPy",
      "React",
      "Next.js",
      "TypeScript",
      "React Flow",
      "PostgreSQL",
      "Docker",
      "Azure Kubernetes Service",
      "GitLab CI",
    ],
    highlights: [
      "Applied ML",
      "React Flow",
      "AKS Observability",
    ],
    metrics: [
      "AI Risk Scoring",
      "4 Services",
    ],
  },
  {
    id: "insurance",
    title: "Software Engineer",
    project: "Legacy Insurance System Modernization — Japan (NDA)",
    company: "FPT Software",
    type: "Insurance",
    duration: "Mar 2026 – Jun 2026",
    description:
      "A legacy-system modernization project for Japan's agricultural and livestock insurance business, migrating business applications from Microsoft Access to a centralized .NET-based monolithic architecture to improve maintainability, scalability, performance and long-term sustainability.",
    responsibilities: [
      "Analyzed legacy Microsoft Access applications and migrated their business logic onto the new .NET platform",
      "Developed and maintained .NET applications within the target monolithic architecture",
      "Migrated and optimized SQL databases to improve query performance on the consolidated schema",
      "Resolved defects and delivered enhancements driven by customer feedback",
      "Clarified requirements and handled customer comments directly with the onshore team",
      "Conducted code reviews and supported deployment activities across releases",
    ],
    technologies: [
      "C#",
      ".NET 10 MVC",
      "SQL Server",
      "Visual Studio 2022",
      "GitLab",
      "TortoiseSVN",
    ],
    highlights: [
      "Legacy Migration",
      "Enterprise Scale",
    ],
    metrics: [
      "Team of 180",
      "MS Access → .NET",
    ],
  },
  {
    id: "healthcare",
    title: "Software Engineer & Data Engineer",
    project: "Healthcare Patient-Outreach Platform — U.S. (NDA)",
    company: "FPT Software",
    type: "Healthcare",
    duration: "Sep 2025 – Feb 2026",
    description:
      "A healthcare platform that automates patient outreach, manages care data, and streamlines operational workflows.",
    responsibilities: [
      "Implemented and maintained data-processing workflows and pipelines in Azure Data Factory",
      "Migrated Azure Functions from the in-process model to the isolated worker model, unblocking future .NET upgrades",
      "Delivered campaign scheduling, data synchronization and system enhancement initiatives",
      "Improved SonarQube code coverage and drove continuous improvement in performance, reliability and platform modernization",
    ],
    technologies: [
      "C#",
      "TypeScript",
      ".NET Core",
      "Angular",
      "Azure Data Factory",
      "Azure Functions",
      "SQL Server",
      "Azure Repos",
    ],
    highlights: [
      "Azure Data Factory",
      "Isolated Worker Migration",
    ],
    metrics: [
      "Data Pipelines",
      "Azure Functions",
    ],
  },
  {
    id: "notarization",
    title: "Software Engineer",
    project: "US Real-Estate Document Notarization (NDA)",
    company: "FPT Software",
    type: "Real Estate",
    duration: "Mar 2022 – Sep 2025",
    description:
      "A platform for the notarization of US real-estate documents, handling high-volume transactions.",
    responsibilities: [
      "Worked directly with US clients to clarify requirements and resolve critical issues affecting high-volume transactions",
      "Proposed and implemented technical solutions that improved system reliability and scalability",
      "Optimized SQL performance through new and refactored stored procedures, significantly reducing query execution time",
      "Migrated workloads from AWS to Azure, improving performance while reducing operational cost",
      "Built and maintained Azure CI/CD pipelines, automating build and deployment to eliminate manual release errors",
      "Developed RESTful APIs, web services and responsive web views, integrating multiple third-party services",
      "Achieved 80% SonarQube code coverage and supported production releases with minimal downtime",
      "Contributed to a Vue.js component-based architecture with reusable components adopted across the product",
    ],
    technologies: [
      "C#",
      "JavaScript",
      ".NET 8 API",
      ".NET Framework MVC",
      "Vue.js",
      "DevExtreme",
      "Azure",
      "GitLab",
    ],
    highlights: [
      "SQL Optimization",
      "AWS to Azure Migration",
      "80% Code Coverage",
    ],
    metrics: [
      "80% Coverage",
      "3.5 Years",
    ],
  },
  {
    id: "b2b",
    title: "Software Engineer",
    project: "B2B Microservices Data & Operations Application (NDA)",
    company: "FPT Software",
    type: "Microservices",
    duration: "Apr 2021 – Jan 2022",
    description:
      "A microservices application offered to third parties, providing tools to collect company data and manage internal business operations.",
    responsibilities: [
      "Gathered and analyzed business requirements with the BrSE, translating them into database design and new web services on a microservices architecture",
      "Produced project documentation for handover and maintenance",
      "Developed unit tests sustaining at least 80% code coverage",
      "Troubleshot and resolved production issues",
    ],
    technologies: [
      "Python",
      "Flask",
      "Microservices",
      "RESTful API",
      "Docker",
      "PayPal REST APIs",
      "SQL Server",
    ],
    highlights: [
      "Microservices Architecture",
      "PayPal Integration",
    ],
    metrics: [
      "80% Coverage",
      "10 Months",
    ],
  },
  {
    id: "branch",
    title: "Software Engineer",
    project: "Company Branch & Organization Management (Internal)",
    company: "Ugotechs",
    type: "Internal Tools",
    duration: "Jan 2021 – Mar 2021",
    description:
      "An internal system for company branch and organization management.",
    responsibilities: [
      "Gathered and analyzed business requirements with the client and translated them into the database design",
      "Built new web pages for branch and organization management",
      "Troubleshot and resolved production issues",
    ],
    technologies: [
      "C#",
      ".NET Framework MVC",
      "SQL Server",
      "Windows Server",
      "GitLab",
    ],
    highlights: [
      "Internal Tools",
    ],
    metrics: [
      "3 Months",
    ],
  },
  {
    id: "covid",
    title: "Software Engineer",
    project: "COVID-19 Notification & Information App (NDA)",
    company: "Ugotechs",
    type: "Mobile App",
    duration: "Jun 2020 – Jan 2021",
    description:
      "A mobile application to notify users exposed to COVID-19 and share COVID-related information.",
    responsibilities: [
      "Gathered and analyzed business requirements with the client and translated them into function and screen designs",
      "Developed unit tests sustaining at least 80% code coverage",
      "Troubleshot and resolved production issues",
    ],
    technologies: [
      "C#",
      "Xamarin.Android",
      ".NET Framework 4.8",
      "SQL Server",
      "GitLab",
    ],
    highlights: [
      "Mobile Development",
      "Xamarin",
    ],
    metrics: [
      "7 Months",
      "Cross-Platform",
    ],
  },
];

export default function ExperienceSection() {
  // All entries open by default; each card can be collapsed independently.
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(experiences.map((e) => e.id)),
  );
  const isExpanded = (id: string) => expandedIds.has(id);
  const toggle = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const { ref: sectionRef, isVisible } = useScrollAnimation({
    threshold: 0.05,
  });

  return (
    <section id="experience" className="py-24 relative overflow-x-clip">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container px-4 relative z-10" ref={sectionRef}>
        {/* Section Header */}
        <div
          className={cn(
            "text-center mb-16",
            isVisible ? "animate-fade-in" : "opacity-0",
          )}
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1 text-xs tracking-wider"
          >
            JOURNEY
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A journey through impactful projects, from mobile apps to enterprise
            platforms, showcasing growth and technical excellence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line with gradient */}
            <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
              <div className="h-full bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            </div>

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={cn(
                  "relative mb-8 md:mb-12",
                  index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%]",
                  isVisible ? "animate-fade-in" : "opacity-0",
                )}
                style={{ animationDelay: `${0.2 + index * 0.15}s` }}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-[18px] md:left-1/2 w-4 h-4 rounded-full border-4 border-background -translate-x-1/2 mt-8 z-10 transition-all duration-300",
                    isExpanded(exp.id)
                      ? "bg-primary scale-125 shadow-lg shadow-primary/50"
                      : "bg-muted hover:bg-primary/50",
                  )}
                />

                {/* Content card */}
                <div
                  className={cn(
                    "ml-10 md:ml-0",
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8",
                  )}
                >
                  <GlassCard
                    variant={isExpanded(exp.id) ? "prominent" : "subtle"}
                    hover={true}
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isExpanded(exp.id) && "shadow-xl shadow-primary/10",
                    )}
                  >
                    <button
                      onClick={() => toggle(exp.id)}
                      aria-expanded={isExpanded(exp.id)}
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
                            {exp.company} • {exp.project}
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
                          {isExpanded(exp.id) ? (
                            <ChevronUp className="h-4 w-4 text-primary" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Expanded content — grid-rows animation so tall cards are never clipped */}
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isExpanded(exp.id)
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                      <div className="px-6 pb-6 border-t border-border/50 pt-4">
                        <p className="text-muted-foreground mb-4">
                          {exp.description}
                        </p>

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
