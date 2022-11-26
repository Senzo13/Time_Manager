import { styles } from "../../../styles/global/global";
import { Text, TouchableOpacity } from "react-native";
import { COLOR } from "../../values/color/color";

export default function Button({ props, callback }) {
  const { title, color } = props;

  const handleSubmitToRegister = () => {
    console.log("Register");
    // userService.register().then((res) => {
    //   navigation.navigate("Overview");
    // }).catch((err) => {
    //   console.log(err);
    // });
  };

  return (
    <Text
      style={[
        styles.ButtonSubmit,
        {
          backgroundColor: color,
          color: color == "#D7BA8B" ? COLOR.PRIMARY : COLOR.SAND,
        },
      ]}
    >
      {title}
    </Text>
  );
}
