import { View, Text, TouchableOpacity } from "react-native";
import { STRING } from "../../src/values/eng/string";
import { styles } from "../../styles/global/global";
import { useState, useContext } from "react";
import { COLOR } from "../../src/values/color/color";
import serviceClocks from "../../src/services/clock/service.clock";
import utils_dateformat from "../../src/utils/utils.dateformatter";
import { StateContext } from "../../src/context/state.context";
import serviceWorkingTimes from "../../src/services/workingtimes/service.workingTimes";
export default function Overview() {
  const [isClocking, setIsClocking] = useState(false);
  const { user, setUser } = useContext(StateContext);
  const toggle = () => {
    setIsClocking(!isClocking);
    if (isClocking == false) {
      setIsClocking(true);
      serviceClocks
        .createClockByUserId(
          {
            clocks: {
              time: utils_dateformat.formatDate(new Date()).toString(),
              status: true,
            },
          },
          // this.props.user.id
          user.id,
          user.token
        )
        .then((response) => {
          console.log("response", response.data.data);
          console.log("Clocking in");
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      setIsClocking(false);
      serviceClocks
        .createClockByUserId(
          {
            clocks: {
              time: utils_dateformat.formatDate(new Date()).toString(),
              status: false,
            },
          },
          // this.props.user.id
          user.id,
          user.token
        )
        .then((response) => {
          console.log("response", response.data.data);
          serviceWorkingTimes
            .createWorkingTimes(
              {
                start: response.data.data.time,
                end: utils_dateformat.formatDate(new Date()).toString(),
              },
              user.id,
              user.token
            )
            .then((response) => {
              console.log("Clocking out");
              console.log("Working times created");
            });
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Title}>
          {STRING.TV_WELCOME_PERSONAL} {user.username}
        </Text>
      </View>
      <View style={styles.clocks}>
        <View
          style={{
            backgroundColor: COLOR.SECONDARY,
            height: "auto",
            borderRadius: 15,
            padding: 32,
          }}
        >
          <Text
            style={[styles.Register, { textAlign: "center", marginBottom: 20 }]}
          >
            {STRING.TV_BUTTON_CLOCKING}
          </Text>
          <TouchableOpacity onPress={() => toggle()}>
            <Text style={styles.ButtonClocks}>
              {isClocking ? STRING.TV_CLOCKING : STRING.TV_NOT_CLOCKING}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
