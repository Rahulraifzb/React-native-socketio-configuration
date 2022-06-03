import { StyleSheet, Text, View,TextInput,Button } from 'react-native'
import React,{useState,useEffect} from 'react'
import useSocketContext from '../context/useSocketContext'

const ChatScreen = ({route,navigation}) => {
  const {socket} = useSocketContext()
  const {activeUser:user} = route.params;
  const [message,setMessage] = useState("")
  const [chatId,setChatId] = useState("")
  const [receiveMessage,setReceiveMessage] = useState("")

  const sendMessage = () => {
    socket.emit("send-message",user,message,() => setMessage(""))
  }

  useEffect(() => {
    socket.emit("join-chat",user)
  },[user])

  useEffect(() => {
    socket.on("receive-message",(message) => setReceiveMessage(message))
  },[])

  return (
    <View>
      <View>
        <Text>Message: {receiveMessage}</Text>
      </View>
      <TextInput 
        placeholder='Type your message..'
        value={message}
        onChangeText={(text) => setMessage(text)}
      />
      <Button 
        title='Send Message'
        onPress={sendMessage}
      />
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})