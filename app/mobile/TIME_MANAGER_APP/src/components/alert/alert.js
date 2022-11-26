import { View, Text, StyleSheet } from "react-native";
import { styles } from "../../../styles/global/global";
import { useEffect, useState } from "react";
import { COLOR } from "../../values/color/color";

export default function Alert({ type, message }) {
  const [height, setHeight] = useState(0);
  const [padding, setPadding] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setHeight(5);
      setPadding(10);
    }, 0);
    setTimeout(() => {
      setHeight(0);
      setPadding(0);
    }, 4000);
  }, []);

  return (
    <>
      {type == "Danger" ? (
        <View
          style={[
            styles.alertDanger,
            { height: height + "%", padding: padding },
          ]}
        >
          <Text style={{ textAlign: "center" }}>{message}</Text>
        </View>
      ) : (
        <View
          style={[
            styles.alertSuccess,
            { height: height + "%", padding: padding },
          ]}
        >
          <Text style={{ textAlign: "center" }}>{message}</Text>
        </View>
      )}
    </>
  );
}
