import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/marketplace", label: "Marketplace" },
    { path: "/simulator", label: "Simulator" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 px-3 py-2 rounded-lg cursor-pointer transition-all">
              <Rocket className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">OrbitalEdge</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase()}`}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  className="font-medium"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" data-testid="button-signin">Sign In</Button>
            <Button data-testid="button-get-started">Get Started</Button>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-background">
          <nav className="flex flex-col p-4 gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  className="w-full justify-start font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-white/10">
              <Button variant="ghost" className="w-full" data-testid="button-mobile-signin">Sign In</Button>
              <Button className="w-full" data-testid="button-mobile-get-started">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
