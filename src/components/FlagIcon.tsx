interface FlagIconProps {
  country: 'DE' | 'AT';
  className?: string;
}

export const FlagIcon = ({ country, className = "w-6 h-6" }: FlagIconProps) => {
  if (country === 'DE') {
    return (
      <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#000"/>
        <path d="M 16 0 A 16 16 0 0 1 32 16 L 0 16 A 16 16 0 0 1 16 0 Z" fill="#000"/>
        <path d="M 0 16 L 32 16 L 32 16 A 16 16 0 0 1 16 32 A 16 16 0 0 1 0 16 Z" fill="#FFCE00"/>
        <path d="M 2.34 10.67 A 16 16 0 0 1 16 0 A 16 16 0 0 1 29.66 10.67 L 2.34 10.67 Z" fill="#000"/>
        <path d="M 2.34 21.33 A 16 16 0 0 0 16 32 A 16 16 0 0 0 29.66 21.33 L 2.34 21.33 Z" fill="#FFCE00"/>
        <rect x="0" y="10.67" width="32" height="10.66" fill="#D00"/>
      </svg>
    );
  }

  if (country === 'AT') {
    return (
      <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#ED2939"/>
        <path d="M 2.34 10.67 A 16 16 0 0 1 16 0 A 16 16 0 0 1 29.66 10.67 L 2.34 10.67 Z" fill="#ED2939"/>
        <path d="M 2.34 21.33 A 16 16 0 0 0 16 32 A 16 16 0 0 0 29.66 21.33 L 2.34 21.33 Z" fill="#ED2939"/>
        <rect x="0" y="10.67" width="32" height="10.66" fill="#FFFFFF"/>
      </svg>
    );
  }

  return null;
};
