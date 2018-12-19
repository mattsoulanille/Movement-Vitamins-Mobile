/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import VitaminList from './src/screens/VitaminList.js';
import VitaminInfo from './src/screens/VitaminInfo.js';
import HomeScreen from './src/screens/HomeScreen.js';
import ScreeningList from "./src/screens/ScreeningList.js";
import LoginScreen from "./src/screens/LoginScreen.js";
import { createStackNavigator } from 'react-navigation';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'react-native';
import MainTabNavigator from './src/navigation/MainTabNavigator';

import Communication from "../communication/Communication.js";
var communication = 




// Yes it's terrible. I should be using contexts.
global.communication = new Communication("http://54.196.72.127");

export default AppNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
