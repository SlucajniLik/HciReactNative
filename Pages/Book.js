import React from 'react';
import { View, FlatList ,Text,Image,Button,Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LikeButton from '../Components/LikeButton';
// Additional imports if needed
function Book({ data,navigation })  {

 // const navigation = useNavigation();


  function onPressHandler(id) {


   
         
  navigation.navigate('SingleBook',{ idBook:id});
console.log(id+"/////")
   
}






  return (
    <View style={styles.wrapper}>
    <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (



<View style={styles.container}>
<Image source={{uri: item.urlImage}} style={styles.image} />
<View style={styles.contentContainer}>
  
  <Text style={styles.title}>Naziv knjige:{item.name}</Text>
  <Pressable
  style={styles.button}
  onPress={()=>onPressHandler(item.id)}
>
  <Text style={styles.buttonText}>{"Pogledaj detalje"}</Text>
</Pressable>



</View>
</View>
)}
showsVerticalScrollIndicator={false} 
      />
        </View>





  );
};

export default Book;


const styles = {
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
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
  buttonText:{
  color:"white",
  fontWeight:"600"
  }
};












/*const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  bookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
};*/