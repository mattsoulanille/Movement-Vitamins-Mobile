import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import ScreeningList from "./ScreeningList.js";
import { Button } from "react-native-elements";

export default class ScreeningScreen extends Component {
    static navigationOptions = {
        title: "Screening"
    }
    constructor() {
        super(...arguments);
        this.formData = {};
    }

    submit() {
        console.log("Submitting Screening");
        console.log(this.formData);
    }    
    
    render() {
	return (
            <ScrollView>
              <ScreeningList
                onNewData={(newData) => {this.formData = newData;}}
              />
              <Button
                title="Submit"
                rightIcon={{name:"arrow-forward"}}
                onPress={this.submit.bind(this)}
              />
            </ScrollView>
	);
    }
}
