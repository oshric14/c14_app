import { ScrollView, type ScrollViewProps } from "react-native";

type AppScrollViewProps = ScrollViewProps & {
  bottomNavPadding?: boolean;
};

function AppScrollView({
  bottomNavPadding = false,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  ...props
}: AppScrollViewProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={[
        bottomNavPadding ? { paddingBottom: 110 } : null,
        contentContainerStyle,
      ]}
      {...props}
    />
  );
}

export default AppScrollView;
export type { AppScrollViewProps };
