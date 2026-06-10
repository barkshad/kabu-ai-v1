import { cn } from "../lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("rounded-full bg-surface-container-high flex items-center justify-center border border-outline overflow-hidden", className)}>
      <img src="https://www.kabarak.ac.ke/wp-content/uploads/2020/04/Kabarak-University-logo.png" alt="Kabu Logo" className="w-[80%] h-[80%] object-contain" />
    </div>
  );
}
