// https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { SearchBar, List, ListItem } from "react-native-elements";
import * as Papa from "papaparse";

import VitaminParse from "../parsing/VitaminParse.js";

import Communication from "../communication/Communication.js";

var comm = new Communication("http://54.196.72.127");


export default class VitaminList extends Component {
    static navigationOptions = {
        title: "Movement Vitamins"
    }

    constructor() {
        super(...arguments);

        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
        };

    }

    async getData() {
        // Temporary. Will refactor pulling vitamin data once the API supports it.
        this.setState({ loading: true });

        var allVitamins;
        var errors = [];
        try {
            allVitamins = await comm.getAllVitamins();
            console.log(allVitamins);
        }
        catch (e) {
            errors.push(e);
        }

        try {
            this.setState({
                data: allVitamins.map(VitaminParse),
                error: errors.length == 0 ? errors : null,
                loading: false,
                refreshing: false
            });
        }
        catch (error) {
            this.setState({ error, loading: false });
        }
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
