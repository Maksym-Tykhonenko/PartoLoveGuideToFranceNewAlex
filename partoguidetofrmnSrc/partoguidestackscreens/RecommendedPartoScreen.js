import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MainBackground from '../partoguidecomponets/MainBackground';
import { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CategoryCarousel from '../partoguidecomponets/CategoryCarousel';

import Header from '../partoguidecomponets/Header';
import { useStore } from '../partoguidestore/partoguidecontext';

const RecommendedPartoScreen = () => {
  const navigation = useNavigation();
  const { getMemories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('');

  useFocusEffect(
    useCallback(() => {
      getMemories();
    }, []),
  );

  return (
    <MainBackground>
      <View style={styles.container}>
        <Header title={'Recommended places'} />

        <>
          <View style={styles.shareContainer}>
            <View style={styles.blurWrap}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={15}
                reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
              />
              <Image source={require('../assets/images/diary.png')} />

              <View style={{ alignItems: 'center', gap: 29 }}>
                <Text style={styles.chooseCatText}>
                  {`Choose the category that interests you.`}
                </Text>
              </View>
            </View>
          </View>
        </>

        <CategoryCarousel
          categories={[
            {
              id: '1',
              title: 'The atmosphere of love',
              image: require('../assets/images/cat1.png'),
            },
            {
              id: '2',
              title: 'Walks for two',
              subtitle: 'Main',
              image: require('../assets/images/cat2.png'),
            },
            {
              id: '3',
              title: 'The Magic of the Moment',
              subtitle: 'Main',
              image: require('../assets/images/cat3.png'),
            },
          ]}
          onSelect={item => setSelectedCategory(item)}
        />

        <>
          {selectedCategory && (
            <TouchableOpacity
              style={{ width: '60%', marginTop: 32 }}
              activeOpacity={0.7}
              disabled={!selectedCategory}
              onPress={() =>
                navigation.navigate('RecommendedPartoList', selectedCategory)
              }
            >
              <LinearGradient
                colors={['#9F0505', '#6B0404']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.navButton}
              >
                <Text style={styles.btnText}>Choose</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </>
      </View>
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 66, alignItems: 'center', paddingBottom: 40 },
  blurWrap: {
    width: '105%',
    borderRadius: 22,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  shareContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 0.2,
    paddingHorizontal: 5,
    marginTop: 40,
  },
  logo: { width: 153, height: 153, marginTop: 23, marginBottom: 38 },
  navButton: {
    width: '100%',
    height: 65,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
  },
  chooseCatText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
    width: '200',
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default RecommendedPartoScreen;
