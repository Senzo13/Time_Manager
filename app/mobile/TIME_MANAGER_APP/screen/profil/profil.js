import { STRING } from "../../src/values/eng/string";
import { styles } from "../../styles/global/global";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Input from "../../src/components/input/input";
import React, { useState, useContext } from "react";
import Button from "../../src/components/button/button";
import { COLOR } from "../../src/values/color/color";
import { StateContext } from "../../src/context/state.context";
import serviceUser from "../../src/services/user/service.user";
import Alert from "../../src/components/alert/alert";
import { parseJwt } from "../../src/utils/utils.decodeToken";
export default function Profil() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { user, setUser } = useContext(StateContext);
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  // DEFINE FUNCTION FOR ALERT
  const refreshAlert = (type, message) => {
    setTypeAlert(type);
    setMessage(message);
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 4000);
  };

  // DEFINE FUNCTION FOR LOGOUT USER (RESET CONTEXT)
  const handleLogout = () => {
    setUser({
      email: "",
      id: "",
      role: "",
      username: "",
    });
  };

  // DEFINE FUNCTION FOR UPDATE USER
  const handleUpdate = () => {
    if (email !== "" || password !== "" || username !== "") {
      serviceUser
        .updateUserById(
          {
            email: email == "" ? user.email : email,
            password: password == "" ? user.password : password,
            username: username == "" ? user.username : username,
          },
          user.id,
          user.token
        )
        .then((res) => {
          refreshAlert("Success", STRING.TV_UPDATE);
          const obj = res.data.access;
          const jwtParsed = parseJwt(obj.substring(7));
          const jsonValue = jwtParsed;
          const user = {
            id: jsonValue.sub,
            username: jsonValue.username,
            email: jsonValue.email,
            role: jsonValue.role,
            token: obj.substring(7),
          };
          setUser(user);
          console.log("user updated");
        })
        .catch((err) => {
          refreshAlert("Danger", STRING.TV_UPDATE_ERROR);
          console.log(err);
        });
    } else {
      refreshAlert("Danger", STRING.TV_UPDATE_EMPTY);
    }
  };

  const handleDelete = () => {
    serviceUser
      .deleteUser(user.id, user.token)
      .then((res) => {
        console.log("user deleted");
        setUser({
          email: "",
          id: "",
          role: "",
          username: "",
        });
      })
      .catch((err) => {
        console.log(err);
        refreshAlert("Danger", STRING.TV_DELETE_ERROR);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {isAlert ? <Alert type={typeAlert} message={message} /> : null}
      <View style={styles.header}>
        <Text style={styles.Title}>{STRING.TV_WELCOME_PROFIL}</Text>
      </View>
      <View style={styles.form}>
        <Input
          props="email"
          value={email}
          onChange={(text) => setEmail(text)}
        />
        <Input
          props="username"
          value={username}
          onChange={(text) => setUsername(text)}
        />
        <Input
          props="password"
          value={password}
          onChange={(text) => setPassword(text)}
        />
      </View>
      <View style={styles.container_horizontal}>
        <TouchableOpacity onPress={() => handleDelete()}>
          <Button
            props={{
              title: STRING.BT_DELETE,
              color: COLOR.SAND,
              type: "delete",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleUpdate()}>
          <Button
            props={{
              title: STRING.BT_UPDATE,
              color: COLOR.SECONDARY,
              type: "update",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleLogout()}
          style={{ marginTop: 10 }}
        >
          <Button
            props={{
              title: STRING.BT_LOGOUT,
              color: COLOR.LOGOUT,
              type: "logout",
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
