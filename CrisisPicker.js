import React, { Component } from 'react';
import { Picker, Alert, View, Text, StyleSheet, Dimensions, Linking, SafeAreaView, ScrollView, Image } from 'react-native';
import { CustomPicker } from 'react-native-custom-picker';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import ParsedText from 'react-native-parsed-text';

import SplashScreen from 'react-native-splash-screen';
import Accordian from './app/Accordian';
import {Colors} from './app/Colors';

import * as data from './data.json';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

import {Thumbnail, List, ListItem, Separator} from 'native-base';

const dataVal = data.crisis;
const options = data.options;
const list = dataVal.map(item => item);

class CrisisPicker extends Component {
  
  componentDidMount() {    
    setTimeout(SplashScreen.hide(), 2500);
  }
  constructor(props) {
    super(props);

    this.icons = {
      up: require('./images/Arrowhead-01-128.png'),
      down: require('./images/Arrowhead-Down-01-128.png'),
    };

    this.state = {
      // collapsed1:false, //do not show the body by default
      // collapsed2:false,
      id: '',
      crisis: '',
      contact: '',
      respond: '',
      report: '',
      show: '',
    };
  }

  updateCrisis = id => {
    this.setState({id: id});
    if (id > -1) {
      this.setState({
        id: id,
        crisis: dataVal[id].name,
        contact: dataVal[id].refer,
        respond: dataVal[id].respond,
        report: dataVal[id].report,
      });
    }
  };

  renderOption(settings) {
    const {item, getLabel} = settings;
    return (
      <View style={styles.optionContainer}>
        <View style={styles.innerContainer}>
          <Text style={{alignSelf: 'flex-start', padding: 8}}>
            {getLabel(item.toString())}
          </Text>
        </View>
      </View>
    );
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
                        <Text style={styles.title}>Recognize and Respond</Text>
                        <Picker
                            selectedValue={this.state.id}
                            style={styles.dropdown}
                            onValueChange={this.updateCrisis}>
                            <Picker.Item label="Select one" value="-1" />
                            {dataVal.map((item, index) => {
                                return (<Picker.Item label={item.name} value={index} key={index} />)
                            })}
                        </Picker>
                        {
                            this.state.showCall && <Text                             
                            style = {{                                
                                fontSize: 30,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontFamily: 'Times New Roman',
                                color: 'rgb(136, 28, 28)',
                                marginTop: height *0.25,
                                color: 'black',
                                textDecorationLine: 'none',                                
                            }}>UMPD:</Text>                            
                            
                        }
                        {
                            this.state.showCall && <Text 
                            // onPress = {this.handlePhonePress}
                            style = {{
                                fontSize: 30,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                fontFamily: 'Times New Roman',
                                color: 'rgb(136, 28, 28)',
                                marginTop: 0,
                                color: 'blue',
                                textDecorationLine: 'underline',                                
                            }}>(413) 545-2121</Text>
                        }
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
                        <View style={styles.answer}>

                        {    !this.state.showCall && <Collapse style={styles.collapseContainer}>
                                <CollapseHeader>
                                    <View style={styles.collapseTitle}>
                                        <Text style={styles.collapseTitleText}>How to Respond?</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody style={styles.collapseBody}>
                                    <Text style={styles.collapseBodyText}>{this.state.respond}</Text>
                                </CollapseBody>
                            </Collapse>
                        }
                        {   !this.state.showCall && <Collapse style={styles.collapseContainer}>
                                <CollapseHeader>
                                    <View style={styles.collapseTitle}>
                                        <Text style={styles.collapseTitleText}>Report</Text>
                                    </View>
                                </CollapseHeader>
                                <CollapseBody style={styles.collapseBody}>
                                    <Text style={styles.collapseBodyText}>{this.state.report}</Text>
                                </CollapseBody>
                            </Collapse>
                        }    
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
    answer: {
        flex: 1,
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
    optionContainer: {
        padding: 10,
        borderBottomColor: 'rgb(136, 28, 28)',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Times New Roman',
        color: 'rgb(136, 28, 28)',
        marginTop: height / 20
    },
    dropdown: {
        height: 50,
        width: width * 8 / 10,
        alignSelf: 'center',
        marginTop: height * 0.01,
        marginBottom: 0,
        // marginHorizontal: width * 0.1,
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
        marginTop: height / 5,
        marginBottom: 0
    },
    collapseContainer1: {        
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,   
        marginBottom: 10,     
        
    },
    collapseContainer2: {
        width: '100%',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 50
    },
    collapseTitle: {
        borderRadius: 5,
        padding: 8,
        height: 50,
        backgroundColor: 'rgb(136, 28, 28)'
    },
    collapseTitleText: {        
        fontSize: 23,
        textAlign: 'center',
        fontFamily: 'Helvetica',
        color: 'white',    
    },
    collapseBody: {
        marginTop: 10,          
        // height: height / 5
    },
    collapseBodyText: {
        fontSize: 18,
        fontFamily: 'Helvetica',
        color: 'black',
    }
});

export default CrisisPicker;
