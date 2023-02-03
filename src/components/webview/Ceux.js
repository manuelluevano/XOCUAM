import { WebView } from "react-native-webview";
import * as React from "react";
import * as Progress from "react-native-progress";
import { Colors } from "../../constants/colors";
import { useRoute } from "@react-navigation/native";

const CEUX = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const route = useRoute();

  console.log(route.params.web);
  let web = route.params.web;
  return (
    <>
      {!isLoading ? (
        <Progress.Bar
          borderWidth={0}
          borderRadius={0}
          color={Colors.primary}
          progress={progress}
          width={null}
        />
      ) : null}
      {web === "UAM" ? (
        <WebView
          source={{ uri: "https://www.xoc.uam.mx/" }}
          onMessage={({ nativeEvent }) => alert(nativeEvent.data)}
          onLoadEnd={() => setIsLoading(true)}
          onLoadProgress={({ nativeEvent }) =>
            setProgress(nativeEvent.progress)
          }
        />
      ) : (
        <WebView
          source={{ uri: "https://extensionuniversitaria.xoc.uam.mx/" }}
          onMessage={({ nativeEvent }) => alert(nativeEvent.data)}
          onLoadEnd={() => setIsLoading(true)}
          onLoadProgress={({ nativeEvent }) =>
            setProgress(nativeEvent.progress)
          }
        />
      )}
    </>
  );
};

export default CEUX;
