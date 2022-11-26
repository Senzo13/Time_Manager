import { StateContext } from "../../context/state.context";
import Auth from "../../../screen/authentification/auth";
import Overview from "../../../screen/overview/overview";
import Profil from "../../../screen/profil/profil";
import WorkingTimes from "../../../screen/working.times/workingtimes";
import { COLOR } from "../../values/color/color";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useContext, useEffect, useState } from "react";

export const StackNavigation = () => {
  const Tab = createMaterialBottomTabNavigator();
  const { user, setUser } = useContext(StateContext);

  return (
    <>
      {user.id == "" ? (
        <Auth />
      ) : (
        <NavigationContainer>
          <Tab.Navigator
            labeled={false}
            barStyle={{ backgroundColor: COLOR.SECONDARY }}
            activeColor={COLOR.SAND}
          >
            <Tab.Screen
              name="Auth"
              component={Overview}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="poll" color={color} size={26} />
                ),
              }}
            />

            <Tab.Screen
              name="WorkingTimes"
              component={WorkingTimes}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account-group"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />

            <Tab.Screen
              name="Update"
              component={Profil}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons
                    name="account-edit"
                    color={color}
                    size={26}
                  />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};
