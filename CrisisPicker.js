import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {CustomPicker} from 'react-native-custom-picker';
import ModalSelector from 'react-native-modal-selector';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import ParsedText from 'react-native-parsed-text';

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
    let comp, comp2;
    if (this.state.respond != '') {
      comp = <Accordian title={'How to Respond?'} data={this.state.respond} />;
      comp2 = <Accordian title={'Report'} data={this.state.report} />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.title}>Share what you know</Text>
            <ModalSelector
              animationType={'fade'}
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
              }}
            />
            <ParsedText
              style={styles.textContact}
              parse={[
                {
                  type: 'phone',
                  style: styles.phone,
                  onPress: this.handlePhonePress,
                },
              ]}
              childrenProps={{allowFontScaling: false}}>
              {this.state.contact}
            </ParsedText>
            <Text style={styles.textContact}>Hello</Text>
            <View style={styles.answer}>
              {comp}
              {comp2}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
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
      flex:1,
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
=======
  optionsContainerStyle: {
    backgroundColor: 'white',
  },
  optionTextStyle: {
    backgroundColor: 'white',
  },
  cancelTextStyle: {
    textTransform: 'capitalize',
    backgroundColor: 'white',
  },
  cancelContainerStyle: {
    backgroundColor: 'white',
    borderRadius: 5,
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
    alignItems: 'stretch',
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: 'OpenSans-Bold',
    marginTop: height / 10,
  },
  dropdown: {
    height: 50,
    width: (width * 8) / 10,
    alignSelf: 'center',
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    marginHorizontal: width * 0.1,
    fontSize: 30,
    fontFamily: 'Minion-Pro',
  },
  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  textContact: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'OpenSans',
    marginTop: height / 20,
    marginBottom: height / 20,
  },
  collapseContainer: {
    width: '95%',
    marginTop: 10,
  },
  collapseTitle: {
    height: 35,
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collapseTitleText: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'OpenSans',
  },
  collapseBody: {
    height: height / 5,
  },
  buttonImage: {
    height: 25,
    width: 25,
  },
>>>>>>> Stashed changes
});

export default CrisisPicker;
