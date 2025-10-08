import MainBackground from './MainBackground';
import { useCallback } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PARTO_PLACES } from '../partoguideconsts/partoPlaces';
import Header from './Header';
import { useStore } from '../partoguidestore/partoguidecontext';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PartoPlacesList = ({ place, screen }) => {
  const navigation = useNavigation();
  const { getMemories, getPlaces, savedPlaces } = useStore();

  useFocusEffect(
    useCallback(() => {
      getPlaces();
    }, []),
  );

  const filteredList = PARTO_PLACES.filter(
    item => item.category === place?.title,
  );

  let placesList;

  screen === 'RecommendsScreen'
    ? (placesList = filteredList)
    : (placesList = savedPlaces);

  useFocusEffect(
    useCallback(() => {
      getMemories();
    }, []),
  );

  return (
    <MainBackground>
      <View style={styles.container}>
        <Header
          title={
            screen === 'SavedScreen' ? 'Saved places' : 'Recommended places'
          }
        />
        {screen === 'RecommendsScreen' && (
          <View style={styles.shareContainer}>
            <View style={styles.blurWrap}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={15}
                reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
              />
              <Image source={place.image} style={styles.placeImg} />

              <View style={{ alignItems: 'center', gap: 29 }}>
                <Text style={styles.catText}>{place.title}</Text>
              </View>
            </View>
          </View>
        )}
        <>
          {placesList.length === 0 && (
            <>
              {Platform.OS === 'ios' ? (
                <Image
                  source={require('../assets/images/appLogo.png')}
                  style={styles.logo}
                />
              ) : (
                <Image
                  source={require('../assets/images/partoicon.png')}
                  style={styles.logo}
                />
              )}
              <View style={styles.emptyScreenContainer}>
                <View style={styles.emptyScreenBlurWrap}>
                  <BlurView
                    style={StyleSheet.absoluteFill}
                    blurType="dark"
                    blurAmount={15}
                    reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
                  />
                  <Image source={require('../assets/images/diary.png')} />

                  <View style={{ alignItems: 'center', gap: 29 }}>
                    <Text style={styles.emptyScreenText}>
                      You have no saved locations yet.
                    </Text>

                    <TouchableOpacity
                      style={{ width: '80%' }}
                      activeOpacity={0.7}
                      onPress={() =>
                        navigation.navigate('RecommendedPartoScreen')
                      }
                    >
                      <LinearGradient
                        colors={['#9F0505', '#6B0404']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.shareBtn}
                      >
                        <Text style={styles.buttonTxt}>Save</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
          {placesList.map((place, idx) => (
            <View style={styles.cardContainer} key={idx}>
              <View style={styles.cardBlurWrap}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="dark"
                  blurAmount={15}
                  reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
                />

                <Image source={place.image} style={styles.pickerImg} />

                <View style={{ alignItems: 'center', gap: 15 }}>
                  <Text style={styles.cardTitle}>{place.name}</Text>

                  <Text style={styles.coordinates}>
                    {place.latitude}, {place.latitude}
                  </Text>

                  <TouchableOpacity
                    style={{ width: '35%' }}
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('PartoPlacesCardDetails', {
                        place,
                        screen: screen === 'RecommendsScreen' ? 'Rec' : 'Saved',
                      })
                    }
                  >
                    <LinearGradient
                      colors={['#9F0505', '#6B0404']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.shareBtn}
                    >
                      <Text style={styles.buttonTxt}>More</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </>
      </View>
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 66, alignItems: 'center', paddingBottom: 40 },
  placeImg: { width: 105, height: 102, borderRadius: 22 },
  emptyScreenBlurWrap: {
    width: '105%',
    borderRadius: 22,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 30,
  },
  buttonTxt: { fontWeight: '700', fontSize: 15, color: '#fff' },
  emptyScreenContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 0.2,
    paddingHorizontal: 5,
  },
  emptyScreenText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
  },
  blurWrap: {
    width: '105%',
    borderRadius: 22,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 30,
  },
  shareContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 0.2,
    paddingHorizontal: 5,
    marginTop: 13,
  },
  cardBlurWrap: {
    width: '105%',
    borderRadius: 22,
    overflow: 'hidden',
    paddingTop: 14,
    paddingBottom: 13,
    paddingHorizontal: 30,
    gap: 20,
  },
  cardContainer: {
    width: '92%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  description: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 37,
  },
  logo: {
    width: 153,
    height: 153,
    marginTop: 23,
    marginBottom: 38,
    borderRadius: 20,
  },
  navButton: {
    width: '100%',
    height: 65,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    width: '100%',
    height: 37,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageContainer: {
    width: '100%',
    height: 159,
    borderRadius: 22,
    backgroundColor: 'rgba(38, 38, 38, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 34,
    gap: 5,
  },

  btnText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
  },
  catText: {
    fontWeight: '700',
    fontSize: 18,
    color: '#fff',
  },
  pickerImg: {
    width: '100%',
    height: 123,
    borderRadius: 22,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  coordinates: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
  },
  likedImg: {
    position: 'absolute',
    right: -16,
    zIndex: 300,
    top: -16,
  },
});

export default PartoPlacesList;
