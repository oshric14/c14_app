import { View } from "react-native";
import { WebView } from "react-native-webview";

import { AppText } from "@/components/ui";
import type { TopVideo } from "@/types/article";

type ArticleTopVideoProps = {
  video: TopVideo;
  category?: string;
};

const PLAYER_BASE = "https://www.c14.co.il/static/embeded/redge_player_3.6.0.html";

/**
 * Renders the article's lead video. The web embeds the Redge player as an
 * iframe pointing at a static HTML page; we load that same page in a WebView so
 * playback, controls and ads behave exactly as on the web.
 */
function ArticleTopVideo({ video, category }: ArticleTopVideoProps) {
  if (!video?.videoId) {
    return null;
  }

  const params = new URLSearchParams({ videoID: video.videoId });
  if (category) {
    params.set("category", category);
  }
  const uri = `${PLAYER_BASE}?${params.toString()}`;

  return (
    <View className="w-full">
      <View className="w-full" style={{ aspectRatio: 16 / 9 }}>
        <WebView
          source={{ uri }}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction
          javaScriptEnabled
          domStorageEnabled
          style={{ flex: 1, backgroundColor: "#000" }}
        />
      </View>

      {video.credit ? (
        <AppText variant="meta" className="px-[8px] py-[5px] text-[11px] text-brand-blue">
          {video.credit}
        </AppText>
      ) : null}
    </View>
  );
}

export default ArticleTopVideo;
