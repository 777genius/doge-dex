import { FC, SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size: number;
}

// Doge coin icon (simple coin with D symbol)
export const OrderlyIcon: FC<IconProps> = (props) => {
  const { size = 14, ...rest } = props;
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="7" cy="7" r="6.5" fill="none" stroke="white" strokeOpacity="0.54" strokeWidth="1"/>
      <text x="7" y="10" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white" fillOpacity="0.54" textAnchor="middle">Ð</text>
    </svg>
  );
};

export const OrderlyActiveIcon: FC<IconProps> = (props) => {
  const { size = 14, ...rest } = props;
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <circle cx="7" cy="7" r="6.5" fill="#FFD700" stroke="#FFA500" strokeWidth="0.5"/>
      <text x="7" y="10" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="#000" textAnchor="middle">Ð</text>
    </svg>
  );
};
