import React, { Component } from 'react';
import { View, Picker, Text, StyleSheet, Dimensions, Image, Button } from 'react-native';
import * as data from './data.json';
var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from 'accordion-collapse-react-native';
import { Thumbnail, List, ListItem, Separator } from 'native-base';

const dataVal = data.crisis;


class CrisisPicker extends Component {
    state = {
      id: '',
      crisis: '',
      contact: '',
      respond: '',
      respondData: ''
    };
    updateCrisis = (id) => {
        this.setState({ id: id})
        if (id > -1) {
            this.setState({ id: id, crisis: dataVal[id].name, contact: dataVal[id].contact, respond: dataVal[id].respond, respondData: 'Contacts' })
        } else if(id == -1) {
          this.setState({ id: '', crisis: '', contact: '', respond: '', respondData: '' })
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.text}>Share what you know</Text>
                <Picker
                    selectedValue={this.state.id}
                    style={{ height: 100, width: width * 8 / 10, marginTop: height / 10 }}
                    onValueChange={this.updateCrisis}>
                    <Picker.Item label="Select one" value="-1"/>
                    {dataVal.map((item, index) => {
                        return (<Picker.Item label={item.name} value={index} key={index} />)
                    })}
                </Picker>
                <Text style={styles.text}>{this.state.id}</Text>
                <Text>{this.state.contact}</Text>
                <Collapse>
                  <CollapseHeader>
                    <Text style={styles.headline}>{this.state.respondData}</Text>
                  </CollapseHeader>
                  <CollapseBody>
                    <Text>{this.state.respond}</Text>
                  </CollapseBody>
              </Collapse>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontFamily: 'Cochin',
        marginTop: height / 5
    },
    headline: {
      textAlign: 'center',
      color: 'blue'
    },
    iconView: {
      padding: 20,
      height: 5,
      width: 5,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor:'#ffffff',
    }
});

export default CrisisPicker;
