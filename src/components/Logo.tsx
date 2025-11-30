import moleculeIcon from "@/assets/molecule-icon.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizes = {
    sm: { text: "text-xl", icon: "w-5 h-5" },
    md: { text: "text-3xl", icon: "w-7 h-7" },
    lg: { text: "text-4xl", icon: "w-9 h-9" },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={moleculeIcon} 
        alt="Eleviora Molecule" 
        className={`${currentSize.icon} object-contain`}
      />
      <span className={`font-brand ${currentSize.text} font-semibold tracking-wide`}>
        Eleviora
      </span>
    </div>
  );
};
