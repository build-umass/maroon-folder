import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet} from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = {
          data: props.data,
          expanded : false,
        }
    }

  render() {

    return (
      <View>
           <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
               <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
               <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.WHITE} />
           </TouchableOpacity>
           <View style={styles.parentHr}/>
           {
               this.state.expanded &&
               <View style={styles.childView}>
                   <Text style= {styles.child}>{this.props.data}</Text>
               </View>
           }
      </View>
    )
  }

  onClick=(index)=>{
    const temp = this.state.data.slice()
    temp[index].value = !temp[index].value
    this.setState({data: temp})
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    font:{
       // fontFamily: 'Minion-Pro-Regular'
    },
    button:{
        width:'100%',
        height:54,
        alignItems:'center',
        paddingLeft:35,
        paddingRight:35,
        fontSize: 12,
        backgroundColor: 'rgb(136, 28, 28)'
    },
    title:{
        fontSize: 16,
        fontWeight:'bold',
        color: Colors.WHITE,
        fontFamily: 'Helvetica'
    },
    // itemActive:{
    //     fontSize: 12,
    //     color: Colors.GREEN,
    // },
    // itemInActive:{
    //     fontSize: 12,
    //     color: Colors.DARKGRAY,
    // },
    // btnActive:{
    //     borderColor: Colors.GREEN,
    // },
    // btnInActive:{
    //     borderColor: Colors.DARKGRAY,
    // },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: 'rgb(136, 28, 28)',
    },
    childRow:{
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: Colors.GRAY,
    },
    parentHr:{
        height:1,
        color: Colors.WHITE,
        width:'100%'
    },
    childHr:{
        height:1,
        backgroundColor: Colors.LIGHTGRAY,
        width:'100%',
    },
    colorActive:{
        borderColor: Colors.GREEN,
    },
    colorInActive:{
        borderColor: Colors.DARKGRAY,
    },
    child:{
        paddingTop: 10,
        textAlign: 'left',
        fontSize: 17,
        fontFamily: 'Helvetica',
        paddingBottom: 15,
    },
    childView:{
       
    }

});
