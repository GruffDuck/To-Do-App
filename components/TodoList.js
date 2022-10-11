import React from "react";
import { Modal, StyleSheet,Text,TouchableOpacity,View } from "react-native";
import Colors from "../Colors";
import TodoModal from "./TodoModal";


export default class TodoList extends React.Component{
    state={
        showListVisible:false
    }
    toogleListModal(){
        this.setState({showListVisible: !this.state.showListVisible})
    }
 render(){
    const list=this.props.list
    const completedCpunt=list.todos.filter(todo=>todo.completed).length;
    const remainingCount=list.todos.length-completedCpunt;
    return(
        <View>
            <Modal animationType="slide" visible={this.state.showListVisible} onRequestClose={()=>this.toogleListModal()}>
              <TodoModal list={list} closeModal={()=>this.toogleListModal()} updateList={this.props.updateList} />
            </Modal>
 <TouchableOpacity style={[styles.listContainer,{backgroundColor:list.color}] }onPress={()=>this.toogleListModal()} >
         <Text style={styles.listTitle} numberOfLines={1}>
             {list.name}
         </Text>
         <View style={{alignItems:"center"}}>
             <Text style={styles.count}>{remainingCount}</Text>
             <Text style={styles.subtitle}>Remaining</Text>
         </View>
         <View style={{alignItems:"center"}}>
             <Text style={styles.count}>{completedCpunt}</Text>
             <Text style={styles.subtitle}>Completed</Text>
         </View>
        </TouchableOpacity>
        </View>
       
         );
}
   
};
const styles =StyleSheet.create({
    listContainer:{
        paddingVertical:32,
        paddingHorizontal:16,
        borderRadius:6,
        marginHorizontal:12,
        alignItems:"center",
        width:200
    },
    listTitle:{
        fontSize:24,
        fontWeight:"700",
        color:Colors.white,
        marginBottom:18
    },
    count:{
        fontSize:48,
        fontWeight:"200",
        color:Colors.white
    },
    subtitle:{
        fontSize:12,
        fontWeight:"700",
        color:Colors.white
    }
})