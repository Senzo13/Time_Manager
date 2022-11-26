import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../../styles/global/global";
import { STRING } from "../../src/values/eng/string";
import { COLOR } from "../../src/values/color/color";
import serviceWorkingTimes from "../../src/services/workingtimes/service.workingTimes";
import { useEffect, useContext, useState, useCallback } from "react";
import { StateContext } from "../../src/context/state.context";
import React, { useFocusEffect } from "@react-navigation/native";

export default function WorkingTimes() {
  const [array, setArray] = useState([]);
  const { user, setUser } = useContext(StateContext);

  useFocusEffect(
    useCallback(() => {
      setArray([]);
      console.log("useFocusEffect");
      getAllWorkingTimes();
    }, [])
  );

  const getAllWorkingTimes = () => {
    serviceWorkingTimes
      .getWorkingTimeWithId(user.id, user.token)
      .then((response) => {
        Object.values(response.data).forEach((element) => {
          setArray((array) => [...array, element]);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.Title}>{STRING.TV_WORKING_TIMES}</Text>
      </View>
      <View style={styles.tableauWorkingTimes}>
        <View style={styles.bandeau}>
          <View style={{ flex: 2 }}>
            <Text style={styles.Register}>{STRING.TV_ID}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={styles.Register}>{STRING.TV_START}</Text>
          </View>

          <View style={{ flex: 2 }}>
            <Text style={styles.Register}>{STRING.TV_END}</Text>
          </View>
        </View>

        {array != null && array != undefined && array.length > 0
          ? array[0].map((item, index) => (
              <View style={styles.tableau}>
                <View style={{ flex: 2 }} key={index}>
                  <Text style={styles.Register}>{item.id}</Text>
                </View>
                <View style={{ flex: 3 }} key={index + 1}>
                  <Text style={styles.Register}>{item.start}</Text>
                </View>
                <View style={{ flex: 2 }} key={index + 2}>
                  <Text style={styles.Register}>{item.end}</Text>
                </View>
              </View>
            ))
          : null}
      </View>
    </View>
  );
}
