import firebase from "firebase";
import "@firebase/firestore";
const firebaseConfig={
   
  
    apiKey: "AIzaSyCU3L1UnAcL46Jnr0xLIK4r1dJZdbRPovY",
    authDomain: "todo-a4a94.firebaseapp.com",
    projectId: "todo-a4a94",
    databaseURL:"https://todo-a4a94.firebaseio.com",
    storageBucket: "todo-a4a94.appspot.com",
    messagingSenderId: "591330051472",
    appId: "1:591330051472:web:7635abfc8a0fcd3cfe5f15"
}
class Fire{
    constructor(callback){
this.init(callback)
    }
init(callback){
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig)
    }
    firebase.auth().onAuthStateChanged(user=>{
        if(user){
callback(null,user);
        }else {
            firebase.auth().signInAnonymously().catch(error=>{callback(error);});
        }
    });
}
getlists(callback){
    let ref=this.ref.orderBy('name');
    this.unsubscribe=ref.onSnapshot(snapshot=>{
        lists=[];
        snapshot.forEach(doc=>{
            lists.push({id: doc.id,...doc.data()});
        });
        callback(lists);
    });
}
addList(list){
  let ref=this.ref
  ref.add(list);  
}
updateList(list){
    let ref=this.ref
    ref.doc(list.id).update(list);
}

get userId(){
    return firebase.auth().currentUser.uid
}
get ref(){
    return firebase.firestore().collection("users").doc(this.userId).collection("lists");
}
detach(){
    this.unsubscribe();
}
}
export default Fire;