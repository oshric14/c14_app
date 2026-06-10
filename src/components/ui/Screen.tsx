import { View, type ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = ViewProps & {
  safeArea?: boolean;
};

function Screen({
  safeArea = false,
  className,
  children,
  ...props
}: ScreenProps) {
  const Component = safeArea ? SafeAreaView : View;

  return (
    <Component className={`flex-1 bg-white ${className ?? ""}`} {...props}>
      {children}
    </Component>
  );
}

export default Screen;
export type { ScreenProps };
