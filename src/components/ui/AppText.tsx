import { Text, type TextProps, type TextStyle } from "react-native";

import { fontFamily } from "@/theme/typography";

type AppTextVariant =
  | "body"
  | "title"
  | "headline"
  | "subtitle"
  | "meta"
  | "roofTitle"
  | "error";

type AppTextWeight = keyof typeof fontFamily;

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  weight?: AppTextWeight;
  align?: TextStyle["textAlign"];
};

const variantClassName: Record<AppTextVariant, string> = {
  body: "text-[16px] leading-[22px] text-black",
  title: "text-[19px] leading-[22px] text-black",
  headline: "text-[32px] leading-[36px] text-black",
  subtitle: "text-[19px] leading-[25px] text-black",
  meta: "text-[13px] text-black",
  roofTitle: "text-[16px] leading-tight text-[#E01F26]",
  error: "text-center text-[18px] text-black",
};

const variantWeight: Record<AppTextVariant, AppTextWeight> = {
  body: "regular",
  title: "bold",
  headline: "black",
  subtitle: "regular",
  meta: "regular",
  roofTitle: "medium",
  error: "medium",
};

function AppText({
  variant = "body",
  weight,
  align = "right",
  className,
  style,
  ...props
}: AppTextProps) {
  const family = fontFamily[weight ?? variantWeight[variant]];

  return (
    <Text
      className={`${variantClassName[variant]} ${className ?? ""}`}
      style={[{ fontFamily: family, textAlign: align }, style]}
      {...props}
    />
  );
}

export default AppText;
export type { AppTextProps, AppTextVariant, AppTextWeight };
