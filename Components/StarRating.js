import React, { useState ,useEffect} from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can choose a different icon library if you prefer
import axios from "axios";
import { baseUlr } from "../config";
const StarRating = ({ maxStars, starss,setStarss,onPress,userIdd,bookIdd,average,setAverage}) => {


  //const [average, setAverage] = useState(10);
 




  useEffect(()=>{
    console.log(bookIdd+"[[[[[")

    if(bookIdd)
    {
      axios
      .get(baseUlr+"getAverageMark/"+bookIdd)
      .then((response) => {
        console.log(response.data+"Averageee")
        if(response.data!=0)
        {
        setAverage(response.data.toFixed(2))
        }
        else
        {
          setAverage(1)
        }
      })
    }
  
     

 
     },[bookIdd])




  const handleStarPress = (selectedRating) => {
 
   if(starss==1)
   { 
    setStarss(selectedRating);
    onPress(selectedRating);

   
    var rate={
      userId: userIdd,
      bookId: bookIdd,
      mark:selectedRating
    }

    axios
    .post(baseUlr+"setMark",rate)
    .then((response) => {
      console.log(response.data+"rate")



      axios
      .get(baseUlr+"getAverageMark/"+bookIdd)
      .then((response) => {
        console.log(response.data+"Averageee")
        setAverage(response.data.toFixed(2))
       
      })
     
    })

console.log(selectedRating+"ocenaaaa")

   }
   
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          activeOpacity={0.7}
        >
          <Icon
            name={i <= starss ? 'star' : 'star-outline'}
            size={30}
            color={i <= starss ? 'gold' : 'gray'}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={styles.container}>
    
    
    <View style={{flexDirection: 'row'}}>
      {renderStars()}
    </View>
    
    {/* <Text>Ocena:{starss>1?average:0}</Text> */}
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
});

export default StarRating;
