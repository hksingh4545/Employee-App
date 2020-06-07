import React,{useState} from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList,Modal, Linking,Platform, ShadowPropTypesIOS,Alert} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {Title,Card,Button} from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'; 

const Profile=(props)=>{

    


    const openDial=()=>{
            if(Platform.OS==="android"){
                    Linking.openURL("tel:123456789")
            }
            else{
                Linking.openURL("tel:123456789")
            }
    }
    
    const {_id,name,phone,email,picture}=props.route.params.item

    const [update,setUpdate]=useState(false)

    const updating=()=>{
        props.navigation.navigate("create",{
            _id,name,phone,email,picture,update
        })
    }

    const DeletePro=()=>{
        fetch("http://371fcfcd.ngrok.io/delete",{
            method:'post',
            headers:{
                'Content-Type' : 'application/json'
            },
                body:JSON.stringify({
                    "id":_id
                })
            })
            .then(res=>res.json())
            .then((data)=>{
                console.log(data)
                Alert.alert("Delete successfully")
            })
            .catch((err)=>{
                console.log(err)
                Alert.alert("Delete not successfully")
            })
            props.navigation.navigate("Home")
    }

    return (
        <View style={styles.root}>


            <LinearGradient      //giving shading effect
            colors={['#388387', 'transparent']}
            style={{height:"20%"}}
            />


            <View style={{alignItems:'center',justifyContent:'center',padding:10,margin:-50}}>   
                <Image style={{height:150, width:150, borderRadius:75 }}
                source={{uri:picture}}/> 
                {/* //picture cannot be used as {picture} */}
            </View>
            <View style={{fontSize:25,padding:10,alignItems:'center',justifyContent:'center',margin:25}}>
                <Title >{name}</Title>
            </View>
            <View >
                <Card style={styles.mycard} onPress={()=>  //onpress is used to create click
                        Linking.openURL('mailto:${email}')
                    } >
                    <View style={styles.cardcontent}>
                    <Entypo name="email" size={24} color="black"  />
                    <Text style={{margin:10}}>{email}</Text>
                    </View>
                </Card>
                <Card style={styles.mycard} onPress={()=>openDial()} >
                    <View style={styles.cardcontent}>
                    <Entypo name="mobile" size={24} color="black" />
                    <Text style={{margin:10}}>{phone}</Text>
                    </View>
                </Card>
                <View style={{margin:10}}> 
                <Button icon="camera" mode="contained" 
                    onPress={() =>
                        updating()
                    } 
                    style={{margin:10}}> 

                            Update
                </Button>
                <Button icon="camera" mode="contained" onPress={() => DeletePro(false)} style={{margin:10}}> 
                            DELETE
                 </Button>
                 </View>
            </View>
                
        </View>
    )
}
const styles=StyleSheet.create({
    root:{
        flex:1,
        
    },
    mycard:{
            margin:3,
    },
    cardcontent:{
        flexDirection:'row',

    }
})
export default Profile