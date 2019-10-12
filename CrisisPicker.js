import React, { Component } from 'react';
import { View, Picker, Text, StyleSheet, Dimensions} from 'react-native';

var height = Dimensions.get('window').height; 

class CrisisPicker extends Component {
  state = { crisis: '' }
  updateCrisis = (crisis) => {
    this.setState({ crisis: crisis })
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style = {styles.text}>Share what you know</Text>
        <Picker
          selectedValue={this.state.crisis}
          style={{ height: 100, width: 250, marginTop: height/10}}
          onValueChange={this.updateCrisis}>
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
        <Text style = {styles.text}>{this.state.crisis}</Text>
      </View>
    );
  }
}
export default CrisisPicker

const styles = StyleSheet.create({
  text: {
     fontSize: 30,
     marginTop: 100,
     color: 'red'
  }
})
