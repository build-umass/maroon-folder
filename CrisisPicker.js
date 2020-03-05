import React, { Component } from 'react';
import { Picker, Alert, View, Text, StyleSheet, Dimensions, Linking, SafeAreaView, ScrollView, Image } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import ParsedText from 'react-native-parsed-text';

import Accordian from './app/Accordian'
import { Colors } from './app/Colors';

import * as data from './data.json';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

import { Thumbnail, List, ListItem, Separator } from 'native-base';

const dataVal = data.crisis;
const options = data.options;
const list = dataVal.map((item) => item);

class CrisisPicker extends Component {

    constructor(props) {
        super(props);

        this.icons = {
            'up': require('./images/Arrowhead-01-128.png'),
            'down': require('./images/Arrowhead-Down-01-128.png')
        };

        this.state = {
            // collapsed1:false, //do not show the body by default
            // collapsed2:false,
            id: '',
            crisis: '',
            contact: '',
            respond: '',
            report: '',
            show: ''
        }
    }

    updateCrisis = (id) => {
        this.setState({ id: id });
        if (id > -1) {
            this.setState({ id: id, crisis: dataVal[id].name, contact: dataVal[id].refer, respond: dataVal[id].respond, report: dataVal[id].report });
        }
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
                <Image 
                    style= {{width: 120, height:50, alignSelf: 'flex-end', paddingTop: 10}}
                    resizeMode="contain"
                      source={require('./assets/UnivOfMassLogoOld.png')}
                    />
                <Text style={styles.title}>Recognize & Respond</Text>
                        <Picker
                            selectedValue={this.state.id}
                            style={styles.dropdown}
                            onValueChange={this.updateCrisis}>
                            <Picker.Item label="Select one" value="-1" />
                            {dataVal.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}
                        </Picker>

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
                        <View style={styles.answer}>
                            <Collapse style={styles.collapseContainer}>
                                <CollapseHeader>
                                    <View style={styles.collapseTitle}>
                                    <Text style={styles.collapseTitleText}>  How to respond?</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody style={styles.collapseBody}>
                                    <Text style={styles.collapseBodyText}>{this.state.respond}</Text>
                                </CollapseBody>
                            </Collapse>
                            <Collapse style={styles.collapseContainer}>
                                <CollapseHeader>
                                    <View style={styles.collapseTitle}>
                                        <Text style={styles.collapseTitleText}>  Report</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody style={styles.collapseBody}>
                                    <Text style={styles.collapseBodyText}>{this.state.report}</Text>
                                </CollapseBody>
                            </Collapse>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    optionsContainerStyle: {
        borderBottomColor: 'rgb(136, 28, 28)',
        backgroundColor: 'white',
    },
    optionTextStyle: {
        fontFamily: 'Helvetica',
        backgroundColor: 'white',
        color: 'black'
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
    answer: {
        flex: 2,
        width: '95%',
    },
    container: {
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
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: 'rgb(136, 28, 28)',
        marginTop: height / 60
    },
    dropdown: {
        height: '0%',
        width: width * 9 / 10,
        alignSelf: 'center',
        marginTop: height * 0.001,
        marginBottom: 0,
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
        lineHeight: 30,
        fontFamily: 'Helvetica',
        marginTop: height / 4,
        marginBottom: 30,
    },
    collapseContainer: {
        width: '95%',
        marginTop: 8,
    },
    collapseTitle: {
        height: 42,
        backgroundColor: 'rgb(136, 28, 28)'
    },
    collapseTitleText: {
        marginTop: 6.5,
        fontSize: 25,
        textAlign: 'left',
        alignContent: 'center',
        fontFamily: 'Helvetica',
        color: 'white'
    },
    collapseBody: {
        paddingTop: 7,
        paddingBottom: 7 
    },
    collapseBodyText: {
        fontSize: 16,
        fontFamily: 'Helvetica'
    }
});

export default CrisisPicker;
