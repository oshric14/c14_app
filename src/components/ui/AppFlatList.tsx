import { FlatList, View, type FlatListProps } from "react-native";

type AppFlatListProps<ItemT> = FlatListProps<ItemT> & {
  separatorHeight?: number;
};

function AppFlatList<ItemT>({
  separatorHeight = 10,
  showsVerticalScrollIndicator = false,
  ItemSeparatorComponent,
  ...props
}: AppFlatListProps<ItemT>) {
  return (
    <FlatList
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      ItemSeparatorComponent={
        ItemSeparatorComponent ??
        (() => <View style={{ height: separatorHeight }} />)
      }
      {...props}
    />
  );
}

export default AppFlatList;
export type { AppFlatListProps };
