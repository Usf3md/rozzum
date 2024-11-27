import Image from "next/image";
import React from "react";
import DarkSVG from "@/public/logo-dark.svg";
import LightSVG from "@/public/logo-light.svg";
import { useTheme } from "next-themes";
type Props = {
  size: number;
};

const Logo = ({ size }: Props) => {
  const { theme } = useTheme();
  let LogoSVG = LightSVG;
  if (theme === "dark") LogoSVG = DarkSVG;
  return (
    <div className="w-11 h-11 bg-foreground rounded-full flex items-center justify-center">
      <Image src={LogoSVG} alt="logo" width={size} height={size} />
    </div>
  );
};

export default Logo;
