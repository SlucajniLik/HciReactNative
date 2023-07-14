import React from 'react';
import { View, FlatList ,Text,Image,Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
          <View>    
           <Image  source={{uri: item.urlImage}}  style={styles.image}/>
         
          <Text>{item.name}</Text>
      <Button  onPress={()=>onPressHandler(item.id)} title={"Pogledaj detalje"}></Button>
          </View>
        )}
        
      />
        </View>
  );
};

export default Book;

const styles = {
  wrapper: {
    flex: 1,
    backgroundColor: 'red',
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
};