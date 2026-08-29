import type React from "react";

export const LogoIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <text
      x="0"
      y="24"
      fill="currentColor"
      fontSize="24"
      fontWeight="800"
      fontFamily="Inter, system-ui, -apple-system, sans-serif"
      letterSpacing="-0.5"
    >
      SB
    </text>
  </svg>
);

export const Logo = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 135 28"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <text
      x="0"
      y="22"
      fill="currentColor"
      fontSize="22"
      fontWeight="800"
      fontFamily="Inter, system-ui, -apple-system, sans-serif"
      letterSpacing="-0.5"
    >
      SkillBridge
    </text>
  </svg>
);