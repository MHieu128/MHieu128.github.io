import { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle,
  Loader2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const contactLinks = [
  {
    href: "mailto:minhhieudn98@gmail.com",
    Icon: Mail,
    label: "Email",
    value: "minhhieudn98@gmail.com",
  },
  {
    href: "https://www.linkedin.com/in/minhhieudn98",
    Icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/minhhieudn98",
  },
  {
    href: "https://github.com/MHieu128",
    Icon: Github,
    label: "GitHub",
    value: "github.com/MHieu128",
  },
];

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send message");
      }

      setIsSubmitted(true);
      toast({
        title: "Message sent! ✨",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 3000);
    } catch (err) {
      toast({
        title: "Failed to send",
        description:
          err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-teal-dark/20 via-background to-background" />
      <div className="absolute inset-0 bg-dot-pattern bg-dot-md opacity-20" />

      {/* Decorative orbs */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]" />

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
            CONTACT
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to
            hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <GlassCard
            className={cn(
              "p-8",
              isVisible ? "animate-slide-in-left" : "opacity-0",
            )}
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or opportunity..."
                  rows={5}
                  required
                  className="bg-background/50 border-border/50 focus:border-primary transition-colors resize-none"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full relative overflow-hidden group"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              </Button>
            </form>
          </GlassCard>

          {/* Contact Info */}
          <div
            className={cn(
              "space-y-6",
              isVisible ? "animate-slide-in-right" : "opacity-0",
            )}
            style={{ animationDelay: "0.3s" }}
          >
            {/* Intro */}
            <GlassCard className="p-6">
              <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you're looking for a dedicated developer for your team
                or have a project that needs expertise in .NET and modern web
                technologies, I'm here to help bring your ideas to life.
              </p>
            </GlassCard>

            {/* Contact Links */}
            <div className="space-y-3">
              {contactLinks.map(({ href, Icon, label, value }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="block"
                >
                  <GlassCard
                    variant="subtle"
                    className="p-4 flex items-center gap-4 group"
                  >
                    <div className="p-3 w-16 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {value}
                      </p>
                    </div>
                  </GlassCard>
                </a>
              ))}
            </div>

            {/* Location */}
            <GlassCard variant="subtle" className="p-4 flex items-center gap-4">
              <div className="p-3 w-16 rounded-xl bg-secondary">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-sm">Location</p>
                <p className="text-xs text-muted-foreground">Vietnam (GMT+7)</p>
              </div>
            </GlassCard>

            {/* Availability */}
            <GlassCard className="p-4 border-primary/30">
              <div className="flex items-center justify-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-sm font-medium">
                  Currently available for new opportunities
                </span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
    <Toaster />
    </>
  );
}
