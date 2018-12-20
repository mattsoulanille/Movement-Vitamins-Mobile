import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import { SearchBar, List, ListItem } from "react-native-elements";


export default class ScreeningList extends Component {

    constructor() {
	super(...arguments);
        this.state = {
            loading: false,
            data: [],
        };
    }

    async getScreeningFormat() {
	// TODO: Pull this from the server
	
	var screeningFormat = require("./defaultScreeningFormat.json");
	this.setState({data: screeningFormat.values});
    }

    componentDidMount() {
        this.getScreeningFormat();
    }

    render() {
	this.newData(this.state.data);
        return (
	    <List containerStyle={{marginTop:0}}>
	      <FlatList
	        data={this.state.data}
                keyExtractor={item => item.name}
            //ItemSeparatorComponent={this.renderSeparator}
	        renderItem={this.getListEntry.bind(this)}
	      />
            </List>
	);
    }


    newData(data) {
	var formatted = {};
	for (let i in data) {
	    var datum = data[i];
	    formatted[datum.dataName] = datum.value;
	}
	    
	this.props.onNewData(formatted);
    }


    updateState(index, val) {
	this.setState(previousState => {
            var newData = [...previousState.data];
            newData[index].value = val;
            console.log(val);
            return {data:newData};
	});
	
    }

    getListEntry({item, index}) {
	var props = {
            title: item.name,
            hideChevron:true,

	};

	if (item.format == "number") {
            props.textInput = true;
            props.textInputStyle = {
		paddingTop: 0,
		paddingBottom: 0,
		marginVertical: 3.5
            };
            props.textInputSelectTextOnFocus = true;
            props.textInputKeyboardType = "numeric";
            props.textInputPlaceholder = "Number";
            props.textInputValue = typeof item.value == "undefined" ? "" : ""+item.value;
            props.textInputOnChangeText = (val) => {
		// Stupid hacky
		var sanitized = val.match(/[0-9]*(.[0-9]*)?/g)[0];
		this.updateState(index, sanitized);

            };
	}
	else {
            props.switchButton = true;
            props.switched = item.value || false;
            props.onSwitch = this.updateState.bind(this, index);
	}
	

	return React.createElement(ListItem, props);
    }
}
