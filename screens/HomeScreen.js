import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Button
} from "react-native";
import React, { useState } from "react";
import { Ionicons, EvilIcons, AntDesign } from "@expo/vector-icons";
import useSocketContext from "../context/useSocketContext";


const items = [
  {
    id: 1,
    name: "Roshni",
    image: require("../images/1.jpg"),
  },
  {
    id: 2,
    name: "Chanchal",
    image: require("../images/2.jpg"),
  },
  {
    id: 3,
    name: "Roli",
    image: require("../images/3.jpg"),
  },
  {
    id: 4,
    name: "Shalini",
    image: require("../images/4.jpg"),
  },
  {
    id: 5,
    name: "Shakshi",
    image: require("../images/5.jpg"),
  },
  {
    id: 6,
    name: "Vandana",
    image: require("../images/6.jpg"),
  },
  {
    id: 7,
    name: "Kajal",
    image: require("../images/7.jpg"),
  },
  {
    id: 8,
    name: "Sadhna",
    image: require("../images/8.jpg"),
  },
  {
    id: 9,
    name: "Deepmala",
    image: require("../images/9.jpg"),
  },
  {
    id: 10,
    name: "Radha",
    image: require("../images/10.jpg"),
  },
];

const ModalComponent = ({isOpen,setIsOpen,onRequestForChat,user}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setIsOpen(!isOpen)
      }}
    >
      <View style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}>
        <View style={{
          backgroundColor:"white",
          padding:20,
          borderRadius:20,
          width:200,
          shadowColor:"#000",
          alignItems:"center",
          shadowOffset:{
            width:0,
            height:2
          },
          shadowOpacity:0.25,
          shadowRadius:4,
          elevation:5
        }}>
          <Text>Are you sure?</Text>
          <Text style={{marginBottom:10}}>Chat with {user.name}</Text>
          <Button 
            title="Yes"
            onPress={onRequestForChat}
          />
        </View>
      </View>
    </Modal>
  )
}

const HomeScreen = ({ navigation }) => {
  const [isOpen,setIsOpen] = useState(false)
  const [activeUser,setActiveUser] = useState("")
  const {socket} = useSocketContext()

  const onClickModalOpen = (user) => {
    setIsOpen(!isOpen)
    setActiveUser(user)
  }

  const addUser = (data) => {
    console.log(" ---- Data ---- ",data.status === "success")
    if(data.status === "success"){
      navigation.navigate("Chat",{
        activeUser
      })
    }else{
      Alert.alert("Failed to add user!")
    }
  }

  const onRequestForChat = () => {
    setIsOpen(!isOpen)

    socket.emit("add-user",activeUser,addUser)
  }

  console.log(" ----- Is Open ------ ",isOpen)

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View>
            <View
              style={{ marginLeft: "auto", paddingTop: 6, paddingBottom: 6 }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity style={{ padding: 8 }}>
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 8 }}>
                  <EvilIcons name="search" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 8 }}>
                  <AntDesign name="gitlab" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Image
                source={require("../images/feature.jpg")}
                resizeMode="cover"
                style={{ width: "100%", height: 100 }}
              />
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <View style={{ width: "50%" }}>
                <Text
                  style={{ textAlign: "center", fontSize: 18, color: "red" }}
                >
                  Discover
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={{ textAlign: "center", fontSize: 18 }}>
                  Nearby
                </Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item, index }) => (
          <View style={{ width: "50%" }}>
            <TouchableOpacity
              style={{ width: "100%", padding: 8 }}
              onPress={() => onClickModalOpen(item)}
            >
              <View
                style={{
                  borderWidth: 3,
                  borderBottomWidth: 0,
                  borderColor: "red",
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: "100%", height: 100 }}
                  resizeMode={"cover"}
                />
                <Text style={{ backgroundColor: "rgba(255,0,0,0.6)" }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />

      <ModalComponent 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRequestForChat={onRequestForChat}
        user={activeUser}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
