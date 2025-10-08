import { BlurView } from '@react-native-community/blur';
import React, { useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

export default function CategoryCarousel({
  categories = [],
  onSelect = () => {},
}) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const isLandscape = SCREEN_WIDTH > SCREEN_HEIGHT;
  const ITEM_WIDTH = Math.round(SCREEN_WIDTH * (isLandscape ? 0.4 : 0.68));
  const ITEM_SPACING = Math.round((SCREEN_WIDTH - ITEM_WIDTH) / 2);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: ITEM_SPACING }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
      >
        {categories.map((item, index) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [12, 0, 12],
            extrapolate: 'clamp',
          });

          return (
            <TouchableOpacity
              activeOpacity={0.9}
              key={item.id}
              onPress={() => {
                onSelect(item);
                setSelectedItem(index);
              }}
            >
              <Animated.View
                style={[
                  styles.catContainer,
                  {
                    width: ITEM_WIDTH,
                    transform: [{ scale }, { translateY }],
                    opacity,
                  },
                  selectedItem === index && {
                    borderColor: '#fff',
                    borderWidth: 2,
                  },
                ]}
              >
                <View style={styles.catBlurWrap}>
                  <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="dark"
                    blurAmount={15}
                    reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
                  />
                  <Image source={item.image} style={styles.image} />

                  <View style={{ alignItems: 'center', gap: 29 }}>
                    <Text style={styles.chooseCatText}>{item.title}</Text>
                  </View>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 320,
    justifyContent: 'center',
  },
  card: {
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 205,
    borderRadius: 22,
  },
  imagePlaceholder: {
    width: '100%',
    height: 170,
    backgroundColor: '#eee',
  },
  textWrap: {
    padding: 12,
  },
  chooseCatText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#666',
  },
  catBlurWrap: {
    width: '103%',
    borderRadius: 26.5,
    overflow: 'hidden',
    paddingTop: 20,
    paddingBottom: 23,
    paddingHorizontal: 30,
    gap: 20,
    height: 290,
  },
  catContainer: {
    width: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 26.5,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 20,
  },
});
