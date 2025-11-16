interface FlagIconProps {
  country: 'DE' | 'AT' | 'US';
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

  if (country === 'US') {
    return (
      <svg className={className} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="16" fill="#FFF"/>
        <g>
          <path d="M 16 0 A 16 16 0 0 0 2.34 2.46 L 29.66 2.46 A 16 16 0 0 0 16 0 Z" fill="#B22234"/>
          <path d="M 2.34 4.92 L 29.66 4.92 L 29.66 7.38 L 2.34 7.38 Z" fill="#FFF"/>
          <path d="M 2.34 7.38 L 29.66 7.38 L 29.66 9.84 L 2.34 9.84 Z" fill="#B22234"/>
          <path d="M 2.34 9.84 L 29.66 9.84 L 29.66 12.3 L 2.34 12.3 Z" fill="#FFF"/>
          <path d="M 2.34 12.3 L 29.66 12.3 L 29.66 14.76 L 2.34 14.76 Z" fill="#B22234"/>
          <path d="M 2.34 14.76 L 29.66 14.76 L 29.66 17.22 L 2.34 17.22 Z" fill="#FFF"/>
          <path d="M 2.34 17.22 L 29.66 17.22 L 29.66 19.68 L 2.34 19.68 Z" fill="#B22234"/>
          <path d="M 2.34 19.68 L 29.66 19.68 L 29.66 22.14 L 2.34 22.14 Z" fill="#FFF"/>
          <path d="M 2.34 22.14 L 29.66 22.14 L 29.66 24.6 L 2.34 24.6 Z" fill="#B22234"/>
          <path d="M 2.34 24.6 L 29.66 24.6 L 29.66 27.06 L 2.34 27.06 Z" fill="#FFF"/>
          <path d="M 2.34 27.06 L 29.66 27.06 L 29.66 29.52 L 2.34 29.52 Z" fill="#B22234"/>
          <path d="M 2.34 29.52 A 16 16 0 0 0 16 32 A 16 16 0 0 0 29.66 29.52 L 2.34 29.52 Z" fill="#FFF"/>
          <rect x="0" y="0" width="12.8" height="14.76" fill="#3C3B6E"/>
        </g>
      </svg>
    );
  }

  return null;
};
