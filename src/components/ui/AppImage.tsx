import { Image, type ImageProps } from "expo-image";

const placeholder = require("@/assets/static/image_placeholder.png");

type AppImageSource = ImageProps["source"] | string | string[] | null | undefined;

type AppImageProps = Omit<ImageProps, "source"> & {
  source?: AppImageSource;
  withPlaceholder?: boolean;
};

function normalizeSource(source: AppImageSource): ImageProps["source"] {
  const selected = Array.isArray(source) ? source[0] : source;

  if (typeof selected === "string") {
    return selected ? { uri: selected } : placeholder;
  }

  return selected ?? placeholder;
}

function AppImage({
  source,
  contentFit = "cover",
  transition = 150,
  placeholder: customPlaceholder,
  withPlaceholder = true,
  ...props
}: AppImageProps) {
  return (
    <Image
      source={normalizeSource(source)}
      placeholder={withPlaceholder ? (customPlaceholder ?? placeholder) : customPlaceholder}
      contentFit={contentFit}
      transition={transition}
      {...props}
    />
  );
}

export default AppImage;
export type { AppImageProps, AppImageSource };
