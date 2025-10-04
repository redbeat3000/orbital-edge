import { Link } from "wouter";
import { Rocket, Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Marketplace", path: "/marketplace" },
    { label: "Simulator", path: "/simulator" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Pricing", path: "/pricing" },
  ],
  Company: [
    { label: "About", path: "/about" },
    { label: "Blog", path: "/blog" },
    { label: "Careers", path: "/careers" },
    { label: "Contact", path: "/contact" },
  ],
  Resources: [
    { label: "Documentation", path: "/docs" },
    { label: "API Reference", path: "/api" },
    { label: "Support", path: "/support" },
    { label: "Status", path: "/status" },
  ],
  Legal: [
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
    { label: "Security", path: "/security" },
    { label: "Compliance", path: "/compliance" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 mb-4 cursor-pointer">
                <Rocket className="w-6 h-6 text-primary" />
                <span className="text-xl font-bold">OrbitalEdge</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              LEO-as-a-Service platform for research and innovation
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-muted hover-elevate active-elevate-2 flex items-center justify-center transition-all"
                data-testid="link-twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-muted hover-elevate active-elevate-2 flex items-center justify-center transition-all"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-lg bg-muted hover-elevate active-elevate-2 flex items-center justify-center transition-all"
                data-testid="link-github"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path}>
                      <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 OrbitalEdge. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Launch less. Do more in orbit.
          </p>
        </div>
      </div>
    </footer>
  );
}
