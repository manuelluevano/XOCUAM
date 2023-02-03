import { WebView } from "react-native-webview";
import * as React from "react";
import * as Progress from "react-native-progress";
import { Colors } from "../constants/colors";

const Cauce = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

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
      <WebView
        source={{ uri: "https://cauce.xoc.uam.mx/" }}
        onMessage={({ nativeEvent }) => alert(nativeEvent.data)}
        onLoadEnd={() => setIsLoading(true)}
        onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
      />
    </>
  );
};

export default Cauce;
