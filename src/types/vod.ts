export type VodItemType = {
  guid: string;
  title: string;
  thumbnail: {
    url: string;
  };
  poster: {
    url: string;
  };
};

export type VodDataType = {
  channel: {
    items: VodItemType[];
  };
};
