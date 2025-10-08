import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Header = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <TouchableOpacity
        style={{ position: 'absolute', left: 0, top: 66 }}
        activeOpacity={0.7}
        onPress={handleGoBack}
      >
        <LinearGradient
          colors={['#9F0505', '#6B0404']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.backButton}
        >
          <Image source={require('../assets/icons/back.png')} />
        </LinearGradient>
      </TouchableOpacity>
      <View style={{ width: '73%', left: 30 }}>
        <LinearGradient
          colors={['#9F0505', '#6B0404']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >
          <Text style={styles.navBtnText}>{title}</Text>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  navBtnText: { fontWeight: '700', fontSize: 20, color: '#fff' },
  backButton: {
    width: 67,
    height: 76,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 76,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
