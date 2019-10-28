import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView  } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

import * as data from './data.json';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
const dataVal = data.crisis;
const list = dataVal.map((item) => item);

class CrisisPicker extends Component {
    state = { id: '', crisis: '', contact: '', respond: '', report: '', show: '' }
    updateCrisis = (id) => {
        this.setState({ id: id });
        if (id > -1) {
            this.setState({ id: id, crisis: dataVal[id].name, contact: dataVal[id].refer, respond: dataVal[id].respond, report: dataVal[id].report});
        }
    }
    
    renderOption(settings) {
        const { item, getLabel } = settings
        return (
            <View style={styles.optionContainer}>
                <View style={styles.innerContainer}>
                    <Text style={{ alignSelf: 'flex-start', padding: 8, }}>{getLabel(item.toString())}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.title}>Share what you know</Text>
                <CustomPicker
                        optionTemplate={this.renderOption}
                        options={dataVal.map(item => item.name)}
                        style={styles.dropdown}
                        placeholder={'Select one'}
                        onValueChange={(item) => {
                            for (i = 0; i < list.length; i++) {
                                if (list[i].name == item) {
                                    this.updateCrisis(i);
                                    break;
                                }
                            }
                        }}
                    />
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
            </ScrollView>
    </SafeAreaView>
        );
    }
}
export default CrisisPicker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: height * 0.005,
        marginBottom: height * 0.005,
    },
    scrollView: {
        marginHorizontal: 5,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    optionContainer: {
        padding: 10,
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 30,
        fontFamily: 'Cochin',
        marginTop: height / 10
    },
    dropdown: {
        height: 50,
        width: width * 8/10,
        alignSelf: 'center',
        marginTop: height * 0.02,
        marginHorizontal: width * 0.1,
        fontSize: 30,
        fontFamily: 'Cochin',
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
