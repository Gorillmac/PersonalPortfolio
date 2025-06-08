import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ 
        scale: 1.1, 
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.5 } 
      }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full h-12 w-12 border-2 border-primary hover:border-primary/50 bg-background"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-primary" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </motion.div>
  );
}