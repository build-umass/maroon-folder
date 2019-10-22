import React, { Component } from 'react';
import { View, Picker, Text, StyleSheet, Dimensions } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

import * as data from './data.json';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
const dataVal = data.crisis;

class CrisisPicker extends Component {
    state = { id: '', crisis: '', contact: '', respond: '', report: '', show: '' }
    updateCrisis = (id) => {
        this.setState({ id: id });
        if (id > -1) {
            this.setState({ id: id, crisis: dataVal[id].name, contact: dataVal[id].refer, respond: dataVal[id].respond, report: dataVal[id].report});
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.title}>Share what you know</Text>
                <Picker
                    selectedValue={this.state.id}
                    style={styles.dropdown}
                    onValueChange={this.updateCrisis}>
                    <Picker.Item label="Select one" value="-1" />
                    {dataVal.map((item, index) => {
                        return (<Picker.Item label={item.name} value={index} key={index} />)
                    })}
                </Picker>
                <Text style={styles.textContact}>{this.state.contact}</Text>
                <Collapse style={styles.collapseContainer}>
                    <CollapseHeader>
                        <View style={styles.collapseTitle}>
                            <Text style={styles.collapseTitleText}>How to respond?</Text>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={styles.collapseBody}>
                        <Text>{this.state.respond}</Text>
                    </CollapseBody>
                </Collapse>
                <Collapse style={styles.collapseContainer}>
                    <CollapseHeader>
                        <View style={styles.collapseTitle}>
                            <Text style={styles.collapseTitleText}>Report</Text>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={styles.collapseBody}>
                        <Text>{this.state.report}</Text>
                    </CollapseBody>
                </Collapse>
            </View>
        );
    }
}
export default CrisisPicker

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontFamily: 'Cochin',
        marginTop: height / 10
    },
    dropdown: {
        height: 100,
        width: width * 8 / 10,
        marginTop: height / 20
    },
    textContact: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Cochin',
        marginTop: height / 5,
        marginBottom: height / 20
    },
    collapseContainer: {
        width: '95%',
        marginTop: 10,
    },
    collapseTitle: {
        height: 35, 
        backgroundColor: '#D3D3D3'
    },
    collapseTitleText: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Cochin'
    },
    collapseBody: {
        height: height / 5
    }
})
