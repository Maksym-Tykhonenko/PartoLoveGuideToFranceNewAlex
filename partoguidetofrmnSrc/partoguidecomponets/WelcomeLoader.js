import LottieView from 'lottie-react-native';
import { Dimensions, Image, Platform, StyleSheet, View } from 'react-native';
import MainBackground from '../partoguidecomponets/MainBackground';
const { height } = Dimensions.get('window');

const WelcomeLoader = () => {
  return (
    <MainBackground>
      <View style={styles.container}>
        <LottieView
          source={require('../assets/animations/confetti.json')}
          autoPlay
          style={{ width: 550, height: 470 }}
        />

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

        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/loaderImg.png')}
            style={{}}
          />
          <LottieView
            source={require('../assets/animations/pulsing.json')}
            autoPlay
            style={styles.spinner}
          />
        </View>
      </View>
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', marginTop: height * 0.05 },
  logo: {
    position: 'absolute',
    top: 90,
    width: 204,
    height: 204,
    borderRadius: 20,
  },
  spinner: { width: 380, height: 230, position: 'absolute', top: 160 },
});

export default WelcomeLoader;
