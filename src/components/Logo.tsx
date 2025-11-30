interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Logo = ({ size = "md", className = "" }: LogoProps) => {
  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  return (
    <span className={`font-brand ${sizes[size]} font-semibold tracking-wide ${className}`}>
      Eleviora
    </span>
  );
};
