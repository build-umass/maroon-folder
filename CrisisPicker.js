import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet, Dimensions, Linking, SafeAreaView, ScrollView, Image} from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import ParsedText from 'react-native-parsed-text';

import * as data from './data.json';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

import { Thumbnail, List, ListItem, Separator } from 'native-base';

const dataVal = data.crisis;
const list = dataVal.map((item) => item);

class CrisisPicker extends Component {

    constructor(props){
        super(props);

        this.icons = {
            'up'    : require('./images/Arrowhead-01-128.png'),
            'down'  : require('./images/Arrowhead-Down-01-128.png')
        };

        this.state = {
          collapsed1:false, //do not show the body by default
          collapsed2:false,
        }
    }


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

        let icon1 = this.icons['down'];
        let icon2 = this.icons['up'];

        let c1 = this.state.collapsed1 ? icon1 : icon2;
        let c2 = this.state.collapsed2 ? icon1 : icon2;

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
                <Collapse
                    style={styles.collapseContainer}
                    isCollapsed={this.state.collapsed1}
    	              onToggle={(isCollapsed)=>this.setState({collapsed1:isCollapsed})}>
                    <CollapseHeader>
                        <View style={styles.collapseTitle}>
                            <Text style={styles.collapseTitleText}>How to respond?</Text>
                            <Image
                                style={styles.buttonImage}
                                source={c1}
                            ></Image>
                        </View>
                    </CollapseHeader>
                    <CollapseBody style={styles.collapseBody}>
                        <Text>{this.state.respond}</Text>
                    </CollapseBody>
                </Collapse>
                <Collapse
                    style={styles.collapseContainer}
                    isCollapsed={this.state.collapsed2}
    	              onToggle={(isCollapsed)=>this.setState({collapsed2:isCollapsed})}>>
                    <CollapseHeader>
                        <View style={styles.collapseTitle}>
                            <Text style={styles.collapseTitleText}>Report</Text>
                            <Image
                                style={styles.buttonImage}
                                source={c2}
                            ></Image>
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
        backgroundColor: '#D3D3D3',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    collapseTitleText: {
        fontSize: 25,
        textAlign: 'center',
        fontFamily: 'Cochin'
    },
    collapseBody: {
        height: height / 5
    },
    buttonImage: {
        height: 25,
        width: 25,
    }
});

export default CrisisPicker;
