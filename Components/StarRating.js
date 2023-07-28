import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can choose a different icon library if you prefer

const StarRating = ({ maxStars, initialRating, onPress }) => {
  const [rating, setRating] = useState(initialRating);

  const handleStarPress = (selectedRating) => {
    setRating(selectedRating);
    onPress(selectedRating);
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
            name={i <= rating ? 'star' : 'star-outline'}
            size={30}
            color={i <= rating ? 'gold' : 'gray'}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  return <View style={styles.container}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
});

export default StarRating;
