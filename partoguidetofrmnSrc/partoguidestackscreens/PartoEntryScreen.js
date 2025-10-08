import {
  Image as PartoImage,
  StyleSheet,
  Text as PartoTxt,
  TouchableOpacity as PartoTouchableOpacity,
  View,
} from 'react-native';
import MainBackground from '../partoguidecomponets/MainBackground';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

const partoguideentrslds = [
  {
    partoGuideLbl:
      'Bonjour, lovers! I am your guide on a journey through France - the country of romance, tenderness and magical moments. ',
    partoGuideDesc:
      'Are you ready to discover the best places just for the two of you?',
    partoGuideBtn: 'Next',
    partoGuideImg: require('../assets/images/entry/1.png'),
  },
  {
    partoGuideLbl:
      'I will show you cozy restaurants, cafes and terraces, where a real atmosphere of love reigns. ',
    partoGuideDesc: 'Here, every moment will become special.',
    partoGuideBtn: 'Continue',
    partoGuideImg: require('../assets/images/entry/2.png'),
  },
  {
    partoGuideLbl:
      'You will be able to discover routes for walks together and catch magical moments - sunsets, starry nights and city panoramas that will be remembered forever.',
    partoGuideDesc: '',
    partoGuideBtn: 'Go',
    partoGuideImg: require('../assets/images/entry/3.png'),
  },
  {
    partoGuideLbl:
      'And you will also have your own diary - add photos, notes and save every moment of your love story in France. ',
    partoGuideDesc: 'Together we will make it unforgettable.',
    partoGuideBtn: 'Start',
    partoGuideImg: require('../assets/images/entry/4.png'),
  },
];

const PartoEntryScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const nextStep = () => {
    currentStep === 3
      ? navigation.replace('PartoMainScreen')
      : setCurrentStep(currentStep + 1);
  };

  return (
    <MainBackground>
      <View style={styles.container}>
        <PartoImage
          source={partoguideentrslds[currentStep].partoGuideImg}
          style={{ top: 40 }}
        />
      </View>
      <View style={styles.entryContainer}>
        <BlurView
          style={{
            width: '106%',
            height: '100%',
            borderRadius: 22,
            position: 'absolute',
          }}
          blurType="dark"
          blurAmount={1}
        />
        <PartoTxt style={styles.label}>
          {partoguideentrslds[currentStep].partoGuideLbl}
        </PartoTxt>
        <PartoTxt style={styles.description}>
          {partoguideentrslds[currentStep].partoGuideDesc}
        </PartoTxt>

        <PartoTouchableOpacity
          style={{ width: '80%' }}
          activeOpacity={0.7}
          onPress={nextStep}
        >
          <LinearGradient
            colors={['#9F0505', '#6B0404']}
            style={styles.gradBtn}
          >
            <PartoTxt
              style={{
                fontWeight: '700',
                fontSize: 24,
                color: '#fff',
              }}
            >
              {partoguideentrslds[currentStep].partoGuideBtn}
            </PartoTxt>
          </LinearGradient>
        </PartoTouchableOpacity>
      </View>
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 53, alignItems: 'center' },
  entryContainer: {
    width: '100%',
    padding: 50,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 22,
    paddingHorizontal: 13,
    alignItems: 'center',
    overflow: 'hidden',
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
  gradBtn: {
    width: '100%',
    height: 65,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PartoEntryScreen;
