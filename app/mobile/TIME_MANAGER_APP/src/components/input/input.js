import { STRING } from "../../values/eng/string";
import { COLOR } from "../../values/color/color";
import { useBoolean, TextInput, IconButton } from "@react-native-material/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState } from "react";
import { styles } from "./styles";

export default function Input({ props, value, onChange }) {
  const [hidePassword, setHidePassword] = useBoolean(true);

  const setInputByModel = (props) => {
    switch (props) {
      case "email":
        return [STRING.LOGIN_TV_LABEL_EMAIL, STRING.LOGIN_TV_PLACEHOLDER_EMAIL];
      case "password":
        return [
          STRING.REGISTER_TV_LABEL_PASSWORD,
          STRING.REGISTER_TV_PLACEHOLDER_PASSWORD,
        ];
      case "username":
        return [
          STRING.REGISTER_TV_LABEL_USERNAME,
          STRING.REGISTER_TV_PLACEHOLDER_USERNAME,
        ];
    }
  };

  const setIconByModel = (model) => {
    switch (model) {
      case "email":
        return <Icon name="email-outline" size={25} color={COLOR.SAND} />;
      case "username":
        return <Icon name="account" size={25} color={COLOR.SAND} />;
      case "password":
        return (
          <Icon
            name={hidePassword ? "eye" : "eye-off"}
            size={25}
            color={COLOR.SAND}
            onPress={() => setHidePassword.toggle()}
          />
        );
    }
  };

  return (
    <TextInput
      textAlign="left"
      label={setInputByModel(props)[0]}
      variant="filled"
      style={styles.input}
      color={COLOR.PRIMARY}
      placeholderTextColor={COLOR.PRIMARY}
      placeholder={setInputByModel(props)[1]}
      secureTextEntry={hidePassword && props === "password"}
      autoCapitalize="none"
      trailing={(_) => (
        <IconButton
          icon={(_) => setIconByModel(props)}
          onPress={() => setHidePassword.toggle()}
        />
      )}
      value={value}
      onChangeText={(text) => onChange(text)}
    />
  );
}
