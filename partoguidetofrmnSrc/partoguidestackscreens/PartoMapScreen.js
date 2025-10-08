import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { PARTO_PLACES } from '../partoguideconsts/partoPlaces';
import MapView, { Marker } from 'react-native-maps';
import Orientation from 'react-native-orientation-locker';
import { useCallback, useState } from 'react';
import MainBackground from '../partoguidecomponets/MainBackground';
import { BlurView } from '@react-native-community/blur';
import Header from '../partoguidecomponets/Header';
const { height } = Dimensions.get('window');

const PartoMapScreen = () => {
  const navigation = useNavigation();
  const [isVisibleCard, setIsVisibleCard] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  return (
    <MainBackground>
      <View style={[styles.container]}>
        <Header title={'Interactive map'} />

        <View
          style={[
            styles.mapContainer,
            isVisibleCard && { height: height * 0.29 },
          ]}
        >
          <MapView
            userInterfaceStyle="dark"
            style={styles.map}
            initialRegion={{
              latitude: 45.9237,
              longitude: 6.8694,
              latitudeDelta: 3.34,
              longitudeDelta: 3.34,
            }}
          >
            {PARTO_PLACES.map(marker => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                onPress={() => {
                  setSelectedMarker(marker), setIsVisibleCard(true);
                }}
              >
                {Platform.OS === 'ios' ? (
                  <Image source={require('../assets/icons/marker.png')} />
                ) : null}
              </Marker>
            ))}
          </MapView>
        </View>

        {isVisibleCard && (
          <View style={styles.cardContainer}>
            <View style={styles.cardBlurWrap}>
              <BlurView
                style={StyleSheet.absoluteFill}
                blurType="dark"
                blurAmount={15}
                reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
              />

              <Image source={selectedMarker.image} style={styles.pickerImg} />

              <View style={{ alignItems: 'center', gap: 15 }}>
                <Text style={styles.cardTitle}>{selectedMarker.name}</Text>

                <Text style={styles.coordinates}>
                  {selectedMarker.latitude}, {selectedMarker.latitude}
                </Text>

                <TouchableOpacity
                  style={{ width: '35%' }}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('PartoPlacesCardDetails', {
                      place: selectedMarker,
                      screen: 'Map',
                    })
                  }
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
                      More
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.066,
    padding: 14,
    paddingBottom: 40,
    alignItems: 'center',
  },
  map: {
    flex: 1,
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
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 20,
  },
  mapContainer: {
    width: '100%',
    height: height * 0.55,
    borderRadius: 22,
    overflow: 'hidden',
    marginTop: 68,
  },
  headBorders: {
    marginBottom: 13,
    borderRadius: 14,
    width: '70%',
  },
  headContainer: {
    height: 87,
    backgroundColor: '#080809',
    margin: 2,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  headText: {
    fontWeight: '600',
    fontSize: 17,
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
  shareBtn: {
    width: '100%',
    height: 37,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PartoMapScreen;
