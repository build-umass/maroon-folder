import React, { Component } from 'react';
import { View, Picker, Text, StyleSheet, Dimensions } from 'react-native';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

class CrisisPicker extends Component {
    state = { crisis: '', contact: '', respond: ''}
    updateCrisis = (crisis) => {
        this.setState({ crisis: crisis })
        if (crisis == 1) {
            this.state.contact = "This is 1"
        } else if (crisis == 2) {
            this.state.contact = "This is 2"
        } else if (crisis == 3) {
            this.state.contact = "This is 3"
        } else if (crisis == 4) {
            this.state.contact = "This is 4"
        } else if (crisis == 5) {
            this.state.contact = "This is 5"
        } else if (crisis == 6) {
            this.state.contact = "This is 6"
        } else if (crisis == 7) {
            this.state.contact = "This is 7"
        } else if (crisis == 8) {
            this.state.contact = "This is 8"
        } else if (crisis == 9) {
            this.state.contact = "This is 9"
        } else if (crisis == 10) {
            this.state.contact = "This is 10"
        } else if (crisis == 11) {
            this.state.contact = "This is 11"
        } else if (crisis == 12) {
            this.state.contact = "This is 12"
        } else if (crisis == 13) {
            this.state.contact = "This is 13"
        } else if (crisis == 14) {
            this.state.contact = "This is 14"
        } else {
            this.state.contact = ""
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.text}>Share what you know</Text>
                <Picker
                    selectedValue={this.state.crisis}
                    style={{ height: 100, width: width*8/10, marginTop: height / 10 }}
                    onValueChange={this.updateCrisis}>
                    <Picker.Item label="Select one" value="0"/>
                    <Picker.Item label="Alcohol, marijuna or drug abuse" value="1" />
                    <Picker.Item label="Anxiety, stress, panic" value="2" />
                    <Picker.Item label="Bias Incident" value="3" />
                    <Picker.Item label="Cyber misbehavior" value="4" />
                    <Picker.Item label="Disability related challenge" value="5" />
                    <Picker.Item label="Disruptive classroom behaviors" value="6" />
                    <Picker.Item label="Economic hardship" value="7" />
                    <Picker.Item label="Harassment, sexual harassment, stalking" value="8" />
                    <Picker.Item label="Hazing" value="9" />
                    <Picker.Item label="International crisis or Immigration status issue" value="10" />
                    <Picker.Item label="Isolation, loneliness" value="11" />
                    <Picker.Item label="Known or suspected health or medical issues" value="12" />
                    <Picker.Item label="Personal or family tragedy, loss, or crisis" value="13" />
                    <Picker.Item label="Relationship/interpersonal violence, sexual assault, stalking" value="14" />
                </Picker>
                <Text style={styles.text}>{this.state.crisis}</Text>
                <Text>{this.state.contact}</Text>
            </View>
        );
    }
}
export default CrisisPicker

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        fontFamily: 'Cochin',
        marginTop: height / 5
    }
})
