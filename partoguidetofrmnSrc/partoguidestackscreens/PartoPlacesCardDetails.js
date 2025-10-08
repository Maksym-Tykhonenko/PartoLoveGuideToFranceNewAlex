import {
  Image,
  ImageBackground,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../partoguidecomponets/Header';
import { useStore } from '../partoguidestore/partoguidecontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker } from 'react-native-maps';

const PartoPlacesCardDetails = ({ route }) => {
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [toggleIconColor, setToggleIconColor] = useState(false);
  const { place, screen } = route.params;
  const { savePlace, deletePlace } = useStore();

  useFocusEffect(
    useCallback(() => {
      renderSavedPlaces(place);
    }, []),
  );

  const toggleSavedPlaces = () => {
    if (toggleIconColor) deletePlace(place), setToggleIconColor(false);
    else savePlace(place), setToggleIconColor(true);
  };

  const renderSavedPlaces = async item => {
    const jsonValue = await AsyncStorage.getItem('favoritesPlaces');

    const saved = JSON.parse(jsonValue);

    if (saved != null) {
      let filtered = saved.find(fav => fav.id === item.id);

      return filtered == null
        ? setToggleIconColor(false)
        : setToggleIconColor(true);
    }
  };

  const shareCard = async () => {
    try {
      await Share.share({
        message: `${place.name}
Coordinates: ${place.latitude} ${place.latitude} 
${place.description}`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Header
          title={[
            screen === 'Map' && 'Interactive map',
            screen === 'Rec' && 'Recommended places',
            screen === 'Saved' && 'Saved places',
          ]}
        />

        <>
          <View style={styles.cardContainer}>
            <View style={styles.cardBlurWrap}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={15}
                reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
              />
              <Image source={place.image} style={styles.pickerImg} />

              <View style={{}}>
                <Text style={styles.cardTitle}>{place.name}</Text>
                <Text style={styles.cardDescription}>{place.description}</Text>

                <Text
                  style={[
                    styles.cardCoordinates,
                    screen === 'Map' && { marginBottom: 38 },
                  ]}
                >
                  Coordinates: {place.latitude} {place.latitude}
                </Text>

                {screen !== 'Map' && (
                  <>
                    {isVisibleMap ? (
                      <View
                        style={{
                          borderRadius: 22,
                          overflow: 'hidden',
                          width: '100%',
                          height: 215,
                          marginBottom: 49,
                        }}
                      >
                        <MapView
                          userInterfaceStyle="dark"
                          style={{ flex: 1 }}
                          initialRegion={{
                            latitude: place.latitude,
                            longitude: place.longitude,
                            latitudeDelta: 0.07,
                            longitudeDelta: 0.07,
                          }}
                        >
                          <Marker
                            coordinate={{
                              latitude: place.latitude,
                              longitude: place.longitude,
                            }}
                          >
                            {Platform.OS === 'ios' ? (
                              <Image
                                source={require('../assets/icons/marker.png')}
                              />
                            ) : null}
                          </Marker>
                        </MapView>
                      </View>
                    ) : (
                      <TouchableOpacity
                        style={{ width: '100%', marginBottom: 18 }}
                        activeOpacity={0.7}
                        onPress={() => setIsVisibleMap(true)}
                      >
                        <Image
                          source={require('../assets/images/mapBg.png')}
                          style={{ borderRadius: 22, width: '100%' }}
                        />
                        <Text
                          style={[
                            styles.navBtnText,
                            { position: 'absolute', left: 8, bottom: 12 },
                          ]}
                        >
                          Open in map
                        </Text>
                      </TouchableOpacity>
                    )}
                  </>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <TouchableOpacity
                    style={{ width: '38%' }}
                    activeOpacity={0.7}
                    onPress={() => shareCard()}
                  >
                    <LinearGradient
                      colors={['#9F0505', '#6B0404']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.shareBtn}
                    >
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 15,
                          color: '#fff',
                        }}
                      >
                        Share
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ width: '38%' }}
                    activeOpacity={0.7}
                    onPress={() => toggleSavedPlaces()}
                  >
                    <LinearGradient
                      colors={
                        toggleIconColor
                          ? ['#51FF00', '#51FF00']
                          : ['#9F0505', '#6B0404']
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.shareBtn}
                    >
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 15,
                          color: toggleIconColor ? '#000' : '#fff',
                        }}
                      >
                        {toggleIconColor ? 'Saved' : 'Save'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 66, alignItems: 'center' },
  blurWrap: {
    width: '105%',
    borderRadius: 22,
    overflow: 'hidden',
    paddingTop: 30,
    paddingBottom: 20,
    gap: 30,
  },
  shareContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.29)',
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 0.2,
    paddingHorizontal: 5,
    marginHorizontal: 20,
  },
  cardBlurWrap: {
    width: '105%',
    borderRadius: 22,
    overflow: 'hidden',
    paddingTop: 14,
    paddingBottom: 13,
    paddingHorizontal: 30,
    gap: 30,
  },
  cardContainer: {
    width: '92%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 28,
  },
  label: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },

  shareBtn: {
    width: '100%',
    height: 36,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 10,
  },
  cardDescription: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
    marginBottom: 21,
  },
  cardCoordinates: {
    fontWeight: '400',
    fontSize: 15,
    color: '#fff',
    marginBottom: 13,
  },

  navBtnText: { fontWeight: '700', fontSize: 20, color: '#fff' },
});

export default PartoPlacesCardDetails;
