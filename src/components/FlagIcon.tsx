interface FlagIconProps {
  country: 'DE' | 'AT';
  className?: string;
}

export const FlagIcon = ({ country, className = "w-6 h-6" }: FlagIconProps) => {
  if (country === 'DE') {
    return (
      <svg className={className} viewBox="0 0 5 3" xmlns="http://www.w3.org/2000/svg">
        <rect width="5" height="3" fill="#000"/>
        <rect width="5" height="2" y="1" fill="#D00"/>
        <rect width="5" height="1" y="2" fill="#FFCE00"/>
      </svg>
    );
  }

  if (country === 'AT') {
    return (
      <svg className={className} viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#ED2939"/>
        <rect width="900" height="200" y="200" fill="#FFFFFF"/>
      </svg>
    );
  }

  return null;
};
