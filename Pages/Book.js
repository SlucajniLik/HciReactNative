import React,{ useState }from 'react';
import { View, FlatList ,Text,Image,Button,Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LikeButton from '../Components/LikeButton';
// Additional imports if needed
function Book({ data,navigation })  {

 // const navigation = useNavigation();


  function onPressHandler(id) {


   
         
  navigation.navigate('Detalji',{ idBook:id});
console.log(id+"/////")
   
}





const [selected, setSelected] = useState(0);
  return (
 
    <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (



<View style={styles.container}>
<Image source={{uri: item.urlImage}} style={styles.image} />
<View style={styles.contentContainer}>
  
  <Text style={styles.title}>{item.name}</Text>
  <Pressable
  //style={styles.button}
  onPressIn={() => setSelected(item.id)}
          onPressOut={() => setSelected(0)}
 
        style={selected==item.id?styles.buttonPress :styles.button}
  onPress={()=>onPressHandler(item.id)}
>
  <Text style={styles.buttonText}>{"Pogledaj detalje"}</Text>
</Pressable>



</View>
</View>
)}
showsVerticalScrollIndicator={false} 
      />
        





  );
};

export default Book;


const styles = {
  container: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 12,
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
    borderRadius:25
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  button:{
backgroundColor:"green",
alignSelf:"flex-start",
marginTop:"auto",
marginVertical:10,
padding:7,
paddingHorizontal:15,
borderRadius:5
  }
  ,
  buttonPress:{
    backgroundColor:"lightgreen",
    alignSelf:"flex-start",
    marginTop:"auto",
    marginVertical:10,
    padding:7,
    paddingHorizontal:15,
    borderRadius:5
      }
      ,
  buttonText:{
  color:"white",
  fontWeight:"600"
  }
};











