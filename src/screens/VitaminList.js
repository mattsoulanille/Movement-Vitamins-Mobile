// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { SearchBar, List, ListItem } from "react-native-elements";
import * as Papa from "papaparse";

import VitaminParse from "../parsing/VitaminParse.js";

export default class VitaminList extends Component {
    static navigationOptions = {
        title: "Movement Vitamins"
    }

    constructor() {
        super(...arguments);
        this.state = {
            loading: false,
            data: [],
            error: null,
        };

    }

    async getData() {
        // Vitamins to display are passed in the vitamins parameter
        // as a promise
        var data = await this.props.navigation.state.params.vitamins;
        this.setState({data});
    }

    componentDidMount() {
        this.getData();
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#FF0000",
                    marginLeft: "14%"
                }}
            />
        );
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <List>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.name}
                    //ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({ item }) => (
                        <ListItem
                            title={item.name}
                            //hideChevron
                            //subtitle={item.email}
                            //avatar={{ uri: item.picture.thumbnail }}
                            onPress={() => { navigate('VitaminInfo', { vitamin: item }); }}
                        />
                    )}
                />
            </List>
        );
    }
};
