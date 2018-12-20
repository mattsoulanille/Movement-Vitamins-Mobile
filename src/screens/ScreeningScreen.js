import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import ScreeningList from "./ScreeningList.js";
import { Button } from "react-native-elements";
import VitaminParse from "../parsing/VitaminParse.js";

export default function ScreeningScreenBind(communication) {
    return class ScreeningScreen extends Component {
        static navigationOptions = {
            title: "Screening"
        }
        constructor() {
            super(...arguments);
            this.formData = {};
        }

        async submit() {
            const { navigate } = this.props.navigation;

            console.log("Submitting Screening");
            console.log(this.formData);
            var screeningData = await communication.submitScreening(this.formData);
            console.log(screeningData);

            var recommendedVitamins = screeningData.vitamin_data.map(VitaminParse);
            
            navigate('Vitamins', {vitamins: recommendedVitamins });
            
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
    };
}
