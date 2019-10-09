import React, {Component} from 'react'
import firebase from 'firebase'
import * as firebaseConfig from '/Users/talalbazerbachi/Documents/GitHub/Project-341/src/firebase.config.js';
firebase.initializeApp(firebaseConfig);

class ChatRoom extends Component{
    constructor(props,context){
        super(props,context)
        this.updateMessage=this.updateMessage.bind(this)
        this.submitMessage=this.submitMessage.bind(this)
        this.state={
            message: '',
            messages:[]
        }
    }
    //this is called 'life cycle method' function called by the system not the user
    componentDidMount(){
        console.log('component did mount')
        firebase.database().ref('messages/').on('value',(snapshot)=>{
            const currentMessages= snapshot.val()
            if(currentMessages!=null){
                this.setState({
                    messages:currentMessages
                })
            }
        })

    }
    updateMessage(event){
        //event and target is where the function is coming from.
        console.log('updateMessage:'+event.target.value)
        this.setState({
            message:event.target.value
        })
    }
    submitMessage(event){
        console.log('submitMessage: '+this.state.message)
        const nextMessage={
            id:this.state.messages.length,
            text:this.state.message
        }
        firebase.database().ref('messages/'+nextMessage.id).set(nextMessage)
  //       var list=Object.assign([], this.state.messages)
 //      list.push(nextMessage)
 //        this.setState({
 //           messages:list
  //      })
        

    }
    render(){
        const currentMessage=this.state.messages.map((message,i)=>{
            return(
                <li key={message.id}>{message.text}</li>
            )
        })
        return(
            <div>
            <ol>
                {currentMessage}
            </ol>
            <input onChange={this.updateMessage} type="text" placeholder="Type here"/>
            <br/>
            <button onClick={this.submitMessage}>Submit message</button>
            </div>
        )
    }
}
export default ChatRoom;
//state is used when the component is storing information that is only usefull for itself (my mood is a state)
//property is something assigned to a component(my name, height, etc.. is a property)
//state values are visual values.
//porps are actual properties.
