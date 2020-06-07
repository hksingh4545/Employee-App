import React,{useState} from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList,Modal,Alert,KeyboardAvoidingView} from 'react-native';
import {TextInput,Button} from 'react-native-paper'

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

//all the arrangememnt in screen is done by view tag 


const CreateEmployee=(props)=>{
    const [Name,setName] = useState("") //return two variable it is responsible for dyanamic behaviour of component.if change then our component read automatically.
                                        //second variable is just method to change first variable
                                        //inside usestate is startin value
    const [Email,setEmail] = useState("")
    const [Phone,setPhone] = useState("")
    const [Picture,setPicture] = useState("")
    const [modal,setModal] = useState(false)

    const submitData=()=>{
            fetch("http://c869fdb4.ngrok.io/send",{
                method:"post",
                headers:{
                    'Content-Type' : 'application/json'
                },
                    body:JSON.stringify({
                        "name":Name,
                        "phone":Phone,
                        "email":Email,
                        "picture":Picture
                        
                    })
                })
                .then(res=>res.json())
                .then(data=>{
                        console.log(data)
                    })
                    .catch(err=>{
                            console.log(err)
                    })
                    
                    props.navigation.navigate("Home")
    }


    const pickPermission= async ()=>{       //check again and get persion
            const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(granted){
                    let data=await ImagePicker.launchImageLibraryAsync({
                        mediaTypes:ImagePicker.MediaTypeOptions.Images,
                        allowsEditing:true,
                        aspect:[1,1],
                        quality:0.5
                    })
                    console.log(data)
                    if(!data.cancelled){
                        let newfile={
                            uri:data.uri,
                            type:'test/jpg',
                            name:'test.jpg}'
                        }
                        handleupload(newfile)   //calling uplaod
                    }
            }
            else{
                    Alert.alert("give permission")

            }
    }

    const handleupload=(image)=>{               //how to upload data handle
        const data= new FormData()
        data.append('file',image)
        data.append('upload_preset','employeeapp')
        data.append('cloud_name','hksingh4343')

        fetch("https://api.cloudinary.com/v1_1/hksingh4343/image/upload",{
            method:'post',
            body:data
        }).then(res=>res.json()).
        then(data=>{
            console.log(data)
            setPicture(data.url)            //setting the value by checking in data
            setModal(false)
        })
    }

    return (
            <View style={style.root}>
                <KeyboardAvoidingView>
                    <TextInput
                        label='Name'
                        value={Name}
                        mode="outlined"
                        //keyboardType='number-pad'
                        
                        theme={theme.colors}
                        onChangeText={text => setName(text)}//calling of function for change
                        style={style.ok}
                    />
                    <TextInput
                        label='Email'
                        value={Email}
                        mode="outlined"
                        keyboardType='email-address' // it is to assign the type of input
                        theme={theme.colors}
                        onChangeText={text => setEmail(text)}//calling of function for change
                        style={style.ok}
                    />
                    <TextInput
                        label='Phone'
                        value={Phone}
                        mode="outlined"
                        keyboardType='number-pad'
                        theme={theme.colors}
                        onChangeText={text => setPhone(text)}//calling of function for change
                        style={style.ok}
                    />
                    
                    <Button icon={(Picture=="")?"upload":"check"} mode="contained" onPress={() => pickPermission()} style={{margin:20}}>  
                    {/* //nice trick */}
                        Press me
                    </Button>
                    <Button icon="check" mode="contained" onPress={() => submitData()} style={{margin:20}}>  
                    {/* //nice trick */}
                        save
                    </Button>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modal}
                        onRequestClose={()=>{
                            setModal(false)
                            //onrequestclose is for back button
                        }
                        }
                    >
                        <Button icon="camera" mode="contained" onPress={() => setModal(false)}> 
                            it is inside modal
                            cancel
                        </Button>
                    </Modal>
                    </KeyboardAvoidingView>
                    

            </View>
    )
}

const theme={
    colors: {
        colors:"#ff0"
    }
    
}
const style=StyleSheet.create({
    root:{
        flex:1,        
    },
     ok:{
         margin:10
     }
})
export default CreateEmployee
