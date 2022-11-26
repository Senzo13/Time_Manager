import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { styles } from "../../styles/global/global";
import { STRING } from "../../src/values/eng/string";
import Input from "../../src/components/input/input";
import Button from "../../src/components/button/button";
import { COLOR } from "../../src/values/color/color";
import serviceUser from "../../src/services/user/service.user";
import Alert from "../../src/components/alert/alert";
import { StateContext } from "../../src/context/state.context";
import { parseJwt } from "../../src/utils/utils.decodeToken";

export default function Auth({ props }) {
  // DEFINE CONST AND STATES CHANGING
  const [notRegister, setNotRegister] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [loader, setLoader] = useState(false);
  const { user, setUser } = useContext(StateContext);
  // DEFINE STATE FOR INPUTS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log("mon user");
    console.log(user);
  }, []);

  // DEFINE FUNCTION FOR ALERT
  const refreshAlert = (type, message) => {
    setTypeAlert(type);
    setMessage(message);
    setIsAlert(true);
    setTimeout(() => {
      setIsAlert(false);
    }, 4000);
  };

  // DEFINE FUNCTION FOR RESET INPUTS VALUES AFTER SUBMIT
  const resetInput = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  // DEFINE FUNCTION FOR CHANGE FORM VIEW (REGISTER OR LOGIN)
  const setIsNotRegister = () => {
    setNotRegister(!notRegister);
    return notRegister;
  };

  // DEFINE FUNCTION FOR SUBMIT FORM (LOGIN)
  const SignIn = () => {
    setLoader(true);
    if (email != "" || password != "") {
      serviceUser
        .getUserByMailAndPassword(email, password)
        .then((res) => {
          refreshAlert("Success", "Connexion réussis");
          console.log(res.data);
          console.log("JE SET LE JWT");
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
          console.log("mon user");
          setLoader(false);
          resetInput();
        })
        .catch((err) => {
          console.log(err);
          refreshAlert("Danger", "Email ou mot de passe incorrect");
          setLoader(false);
          resetInput();
        });
    } else {
      refreshAlert("Danger", "Veuillez remplir tous les champs");
      setLoader(false);
      resetInput();
    }
  };

  // DEFINE FUNCTION FOR SUBMIT FORM (REGISTER)
  const SignUp = () => {
    setLoader(true);
    if (email != "" && password != "" && username != "") {
      serviceUser
        .createUser({
          user: {
            email: email,
            password: password,
            username: username,
          },
        })
        .then((res) => {
          refreshAlert("Success", "Inscription réussis");
          console.log(res);
          setLoader(false);
          resetInput();
        })
        .catch((err) => {
          console.log(err);
          refreshAlert("Danger", "Email ou mot de passe incorrect");
          setLoader(false);
          resetInput();
        });
    } else {
      refreshAlert("Danger", "Veuillez remplir tous les champs");
      setLoader(false);
      resetInput();
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isAlert ? <Alert type={typeAlert} message={message} /> : null}

        <View style={styles.header}>
          <Text style={styles.Title}>{STRING.TV_WELCOME}</Text>
        </View>
        {notRegister == true ? (
          <>
            <View style={styles.form}>
              <Input
                props="email"
                value={email}
                onChange={(text) => setEmail(text)}
              />
              <Input
                props="password"
                value={password}
                onChange={(text) => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.position}
                onPress={() => setIsNotRegister()}
              >
                <Text style={styles.Register}>{STRING.LOGIN_TV_REGISTER}</Text>
              </TouchableOpacity>
            </View>
            {loader ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="#2B3241"
              />
            ) : (
              <TouchableOpacity
                style={{ alignSelf: "center", marginBottom: "10%" }}
                onPress={() => SignIn()}
              >
                <Button
                  props={{
                    title: STRING.BT_SUBMIT,
                    color: COLOR.SECONDARY,
                    type: "update",
                  }}
                />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
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
              <TouchableOpacity
                style={styles.position}
                onPress={() => setIsNotRegister()}
              >
                <Text style={styles.Register}>{STRING.REGISTER_TV_LOGIN}</Text>
              </TouchableOpacity>
            </View>
            {loader ? (
              <ActivityIndicator
                style={styles.loader}
                size="large"
                color="#2B3241"
              />
            ) : (
              <TouchableOpacity
                style={{ alignSelf: "center", marginBottom: "10%" }}
                onPress={() => SignUp()}
              >
                <Button
                  props={{
                    title: STRING.BT_SUBMIT,
                    color: COLOR.SECONDARY,
                    type: "update",
                  }}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </SafeAreaView>
    </>
  );
}
