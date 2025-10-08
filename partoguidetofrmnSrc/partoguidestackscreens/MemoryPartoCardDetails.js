import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../partoguidecomponets/Header';
import { useStore } from '../partoguidestore/partoguidecontext';
import LottieView from 'lottie-react-native';

const MemoryPartoCardDetails = ({ route }) => {
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  const navigation = useNavigation();
  const memory = route.params;
  const { saveMemory, getMemories, deleteMemory, toggleIcon, setToggleIcon } =
    useStore();

  useFocusEffect(
    useCallback(() => {
      getMemories();

      if (memory.favorite) setToggleIcon(true);
      else setToggleIcon(false);
    }, []),
  );

  const handleDeleteMemory = () => {
    deleteMemory(memory);
    setIsVisibleAlert(false);

    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const addToFavorites = () => {
    const updatedMemory = { ...memory, favorite: !memory.favorite };

    if (toggleIcon) {
      setToggleIcon(false);
      saveMemory(updatedMemory, memory);
    } else {
      setToggleIcon(true);
      saveMemory(updatedMemory, memory);
    }
  };

  const shareCard = async () => {
    try {
      await Share.share({
        message: `${memory.title}
${memory.description}`,
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {isVisibleAlert && (
          <BlurView style={styles.blurBg} blurType="dark" blurAmount={5} />
        )}
        <View style={styles.container}>
          <Header title={'Diary of memories'} />
          <>
            <View style={styles.cardContainer}>
              <View style={styles.cardBlurWrap}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="dark"
                  blurAmount={15}
                  reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
                />
                <Image
                  source={{ uri: memory.photo }}
                  style={styles.pickerImg}
                />

                <View style={{ gap: 29 }}>
                  <Text style={styles.cardTitle}>{memory.title}</Text>
                  <Text style={styles.cardDescription}>
                    {memory.description}
                  </Text>

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
                        <Text style={styles.buttonText}>Share</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', gap: 25 }}>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={addToFavorites}
                      >
                        {toggleIcon ? (
                          <LottieView
                            source={require('../assets/animations/love.json')}
                            autoPlay
                            style={{ width: 49, height: 49 }}
                          />
                        ) : (
                          <Image source={require('../assets/icons/like.png')} />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={() => setIsVisibleAlert(true)}
                      >
                        <Image source={require('../assets/icons/delete.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        </View>
      </ScrollView>
      {isVisibleAlert && (
        <Modal transparent={true} animationType="slide">
          <View style={{ marginTop: 300 }}>
            <View style={styles.shareContainer}>
              <View style={styles.blurWrap}>
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="dark"
                  blurAmount={10}
                />

                <View style={{ alignItems: 'center', gap: 29 }}>
                  <Text style={styles.modalText}>
                    Are you sure you want to delete the memory?
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      gap: 50,
                    }}
                  >
                    <TouchableOpacity
                      style={{ width: '30%' }}
                      activeOpacity={0.7}
                      onPress={() => handleDeleteMemory()}
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
                          Yes
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ width: '30%' }}
                      activeOpacity={0.7}
                      onPress={() => setIsVisibleAlert(false)}
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
                          No
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 66, alignItems: 'center', paddingBottom: 40 },
  buttonText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
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
  blurWrap: {
    width: '105%',
    borderRadius: 22,
    overflow: 'hidden',
    paddingTop: 37,
    paddingBottom: 27,
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
  shareContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.17)',
    borderRadius: 22,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 28,
    marginHorizontal: 20,
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
  logo: { width: 153, height: 153, marginTop: 23, marginBottom: 38 },
  navButton: {
    width: '100%',
    height: 65,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareBtn: {
    width: '100%',
    height: 46,
    borderRadius: 25.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
  },
  modalText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
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
  },
  cardDescription: {
    fontWeight: '600',
    fontSize: 15,
    color: '#fff',
    marginBottom: 190,
  },
  blurBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 20,
  },
});

export default MemoryPartoCardDetails;
