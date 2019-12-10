import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, Dimensions, Linking, SafeAreaView, ScrollView } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import ModalSelector from 'react-native-modal-selector'
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import ParsedText from 'react-native-parsed-text';

import * as data from './data.json';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
const dataVal = data.crisis;
const options = data.options;
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
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.title}>Share what you know</Text>
                <ModalSelector
                            animationType={"fade"}
                            style={styles.dropdown}
                            data={options}

                            optionTextStyle={styles.optionTextStyle}
                            optionContainerStyle={styles.optionsContainerStyle}

                            cancelContainerStyle={styles.cancelContainerStyle}
                            cancelTextStyle={styles.cancelTextStyle}
                            initValue="Select one"
                            onChange={option => {
                                for (var i = 0; i < list.length; i++) {
                                    if (list[i].name == option.label) {
                                        this.updateCrisis(i);
                                        break;
                                    }
                                }
                            }} />
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
            </ScrollView>
    </SafeAreaView>
        );
    }
}
export default CrisisPicker

const styles = StyleSheet.create({
    optionsContainerStyle: {
        borderBottomColor: 'rgb(136, 28, 28)',
        backgroundColor: 'white',
    },
    optionTextStyle: {
        fontFamily: 'Helvetica',
        backgroundColor: 'white',
        color: 'rgb(136, 28, 28)',
    },
    cancelTextStyle: {
        fontFamily: 'Helvetica',
        textTransform: 'capitalize',
        backgroundColor: 'white',
        color: 'black',
    },
    cancelContainerStyle: {
        backgroundColor: 'white',
        borderRadius: 5

    },
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
        borderBottomColor: 'rgb(136, 28, 28)',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: 'rgb(136, 28, 28)',
        marginTop: height / 10
    },
    dropdown: {
        height: 50,
        width: width * 8 / 10,
        alignSelf: 'center',
        marginTop: height * 0.02,
        marginBottom: height * 0.02,
        marginHorizontal: width * 0.1,
        fontSize: 30,
        fontFamily: 'Helvetica',
    },
    phone: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    textContact: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Helvetica',
        marginTop: height / 20,
        marginBottom: height / 20
    },
    collapseContainer: {
        width: '95%',
        marginTop: 10,
    },
    collapseTitle: {
        height: 35,
        backgroundColor: 'rgb(136, 28, 28)'
    },
    collapseTitleText: {
        fontSize: 23,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: 'white'
    },
    collapseBody: {
       // height: height / 5
    }
})
