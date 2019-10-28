import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, Dimensions, Linking, SafeAreaView, ScrollView } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import ParsedText from 'react-native-parsed-text';

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
            this.setState({ id: id, crisis: dataVal[id].name, contact: dataVal[id].refer, respond: dataVal[id].respond, report: dataVal[id].report });
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

    handlePhonePress(phone, matchIndex) {
        Alert.alert(`${phone} has been pressed!`);
        // Linking.openURL(`tel:${phone}`).catch((err) => console.error('Unable to place a call', err));
    }

    render() {
        return (
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
                <ParsedText
                    style={styles.textContact}
                    parse={
                        [
                            { type: 'phone', style: styles.phone, onPress: this.handlePhonePress },
                        ]
                    }
                    childrenProps={{ allowFontScaling: false }}
                >
                    {this.state.contact}
                </ParsedText>
                <Text style={styles.textContact}></Text>
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
        width: width * 8 / 10,
        alignSelf: 'center',
        marginTop: height * 0.02,
        marginHorizontal: width * 0.1,
        fontSize: 30,
        fontFamily: 'Cochin',
    },
    phone: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    textContact: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Cochin',
        marginTop: height / 20,
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
