import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Update navbar appearance based on scroll position
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.pageYOffset + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", target: "about" },
    { name: "Skills", target: "skills" },
    { name: "Projects", target: "projects" },
    { name: "Experience", target: "experience" },
    { name: "Tech Quiz", target: "tech-quiz" },
    { name: "Contact", target: "contact" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/">
              <div className="text-xl md:text-2xl font-bold transition cursor-pointer">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ofentse</span>
                <span className="text-secondary">Moshwaneng</span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.target}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={`#${link.target}`}
                  className={`nav-link relative text-neutral-dark hover:text-primary transition duration-300 font-medium ${
                    activeSection === link.target 
                      ? "active font-semibold text-primary after:absolute after:bottom-[-5px] after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-primary after:to-secondary after:rounded-full" 
                      : ""
                  }`}
                >
                  {link.name}
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Menu"
                className="text-primary hover:bg-primary/10 hover:text-primary"
              >
                <motion.div
                  whileHover={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] border-l border-primary/20 bg-white/95">
              <div className="pt-3 pb-6 text-center">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-bold text-xl">Ofentse</span>
                <span className="text-secondary font-bold text-xl">Moshwaneng</span>
              </div>
              <nav className="flex flex-col space-y-1 mt-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.target}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <a
                      href={`#${link.target}`}
                      className={`text-neutral-dark hover:text-primary py-3 px-4 rounded-lg transition duration-300 font-medium hover:font-semibold flex items-center hover:bg-primary/5 ${
                        activeSection === link.target ? "text-primary bg-primary/5 font-semibold" : ""
                      }`}
                    >
                      {link.name}
                      {activeSection === link.target && (
                        <motion.span 
                          className="w-1.5 h-1.5 bg-primary rounded-full ml-2"
                          layoutId="activeIndicator"
                        />
                      )}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
