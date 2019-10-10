import React,{Component} from 'react';
import firebase from 'firebase';
import config from './../firebase.config';


class Messages extends Component{
    constructor(props,context){
        super(props,context)
        this.updateMessage=this.updateMessage.bind(this)
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
    
        this.setState({
            message:event.target.value
        })
    }
    
    render(){
        return(
 
            <ol>
                {
                    this.state.messages.map((message,i)=>{
            return(
                <li key={message.id}>{message.text}</li>
            )
        })
                }
            </ol>

        )
    }
}

export default Messages;














