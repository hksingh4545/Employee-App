import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View , Image, ScrollView, FlatList, ShadowPropTypesIOS,ActivityIndicator} from 'react-native';
import {Card, FAB} from 'react-native-paper'


const Home=(props)=>{
    
    let [data,setData]=useState([])
    const [loading,setLoading]=useState(true)

    // data=[
    //     {id:"1",name:"HK",phone:"123456789",email:"abc@gmail.com",picture:"https://images.unsplash.com/photo-1567336273898-ebbf9eb3c3bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=486&q=80"},            ///make id string so no warning came
    //     {id:"2",name:"pK",phone:"789456123",email:"abcd@gmail.com",picture:"https://images.unsplash.com/photo-1564923630403-2284b87c0041?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {id:"3",name:"tK",phone:"987654321",email:"abce@gmail.com",picture:"https://images.unsplash.com/photo-1571929232190-30f765788262?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    //     {id:"4",name:"oK",phone:"147258369",email:"abcf@gmail.com",picture:"https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    // ]

    const fetching=()=>{                //this function is called in refreshing again and again 
        fetch("http://371fcfcd.ngrok.io/")
        .then(res=>res.json())
        .then(result=>{
                setData(result)
                setLoading(false)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    useEffect(()=>{
        fetching()
        },[])   //set this [] blank


    const rendersender = ((item)=>{
        return(
            <Card style={style.mycard} key={item._id} onPress={()=>props.navigation.navigate("Profile",{item})}> 
            {/* how to send the data */}
            <View style={style.direction}>
            <Image
            style={{width:60,height:60,borderRadius:30,borderColor:'#fff'}}
            source={{uri:item.picture}}

            />
            <View style={style.text}>
            <Text> 
                {item.name}
            </Text>
            <Text >{item.phone}</Text>
            </View>
            </View>
        </Card>
        )
    })
    return(
        <View style={{flex:1}}>
            
            <FlatList
            data={data}
            renderItem={({item})=>{
                //console.log(item) always check dynamic so curly
                return rendersender(item)
            }}
            keyExtractor={item=>item._id}
            onRefresh={()=>fetching()}    // it is used to refresh the data
            refreshing={loading}            // this also
            />
           
        
            <FAB onPress={()=>props.navigation.navigate("create")}          //navigation through this to gven name
                style={style.fab}
                small
                icon="plus"
                //onPress={() => console.log('Pressed')}
            />
            </View>
    )       // as it is a dynamic code so put in  braces and it is not function just variable
} 

const style = StyleSheet.create({ 
    mycard:{
        backgroundColor:'#388387',
        margin:10,
        padding:10,
        //alignItems:'center',
        //justifyContent:'flex-start'
        },
    direction:{
        flexDirection:'row',
        padding:6,
    },
    text:{
        fontSize:20,
        marginLeft:10,
        
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
      contentContainer: {
        paddingVertical: 20
      },
})
export default Home