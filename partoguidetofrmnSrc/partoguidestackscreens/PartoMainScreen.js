import {
  Image,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MainBackground from '../partoguidecomponets/MainBackground';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

const PartoMainScreen = () => {
  const navigation = useNavigation();

  const shareAppInfo = async () => {
    try {
      await Share.share({
        message: `PartoLove: Guide to France is your personal guide to the world of
romance, inspiration, and travel in France. The app will help you
find the best places for dates, atmospheric walks, and
unforgettable moments.`,
      });
    } catch (error) {
      alert.Alert(error.message);
    }
  };

  return (
    <MainBackground>
      <View style={styles.container}>
        <LottieView
          source={require('../assets/animations/confetti.json')}
          autoPlay
          style={{ width: 250, height: 170 }}
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
        <View style={styles.shareContainer}>
          <View style={styles.blurWrap}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={15}
              reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
            />

            <Text style={styles.description}>
              {Platform.OS === 'android' && 'Crown'} PartoLove: Guide to France
              is your personal guide to the world of romance, inspiration, and
              travel in France. The app will help you find the best places for
              dates, atmospheric walks, and unforgettable moments.
            </Text>

            <TouchableOpacity
              style={{ width: '35%' }}
              activeOpacity={0.7}
              onPress={shareAppInfo}
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
                    fontSize: 17,
                    color: '#fff',
                  }}
                >
                  Share
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.shareContainer, { marginTop: 24, width: '80%' }]}>
          <View
            style={[
              styles.blurWrap,
              { paddingHorizontal: 15, paddingTop: 20, gap: 13 },
            ]}
          >
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={15}
              reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
            />

            <TouchableOpacity
              style={{ width: '100%' }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('RecommendedPartoScreen')}
            >
              <LinearGradient
                colors={['#9F0505', '#6B0404']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.navButton}
              >
                <Text style={styles.navBtnText}>Recommended places</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%' }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('SavedPartoList')}
            >
              <LinearGradient
                colors={['#9F0505', '#6B0404']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.navButton}
              >
                <Text style={styles.navBtnText}>Saved places</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%' }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PartoDiaryOfMemoriesScreen')}
            >
              <LinearGradient
                colors={['#9F0505', '#6B0404']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.navButton}
              >
                <Text style={styles.navBtnText}>Diary of memories</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: '100%' }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PartoMapScreen')}
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
                Interactive map
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 53, alignItems: 'center', paddingBottom: 40 },
  blurWrap: {
    width: '105%',
    paddingTop: 29,
    paddingBottom: 14,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  shareContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    alignItems: 'center',
    borderWidth: 0.2,
    paddingHorizontal: 5,
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
    position: 'absolute',
    top: 90,
    width: 109,
    height: 109,
    borderRadius: 20,
  },
  navButton: {
    width: '100%',
    height: 65,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnText: { fontWeight: '700', fontSize: 20, color: '#fff' },
  shareBtn: {
    width: '100%',
    height: 37,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PartoMainScreen;
