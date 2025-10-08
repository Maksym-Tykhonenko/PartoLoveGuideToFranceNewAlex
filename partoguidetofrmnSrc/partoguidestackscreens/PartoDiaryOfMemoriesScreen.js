import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MainBackground from '../partoguidecomponets/MainBackground';
import { useCallback, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Header from '../partoguidecomponets/Header';
import { useStore } from '../partoguidestore/partoguidecontext';

const PartoDiaryOfMemoriesScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const navigation = useNavigation();
  const { getMemories, savedMemories } = useStore();

  useFocusEffect(
    useCallback(() => {
      getMemories();
    }, []),
  );

  const filteredMemories = savedMemories.filter(memory =>
    memory.title.toUpperCase().includes(inputValue.toUpperCase()),
  );

  const sortedByAscending = filteredMemories.sort((a, b) => {
    return b.favorite - a.favorite;
  });

  return (
    <MainBackground>
      <View style={styles.container}>
        <Header title={'Diary of memories'} />

        {savedMemories.length === 0 ? (
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
                  <Text style={styles.emptyScreenText}>
                    You have no memories yet
                  </Text>

                  <TouchableOpacity
                    style={{ width: '80%' }}
                    activeOpacity={0.7}
                    onPress={() =>
                      navigation.navigate('CreatePartoMemoryScreen')
                    }
                  >
                    <LinearGradient
                      colors={['#9F0505', '#6B0404']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.shareBtn}
                    >
                      <Text style={styles.buttonText}>Add a memory</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <TextInput
              placeholder="Search"
              style={[
                styles.input,
                inputValue && { fontWeight: '600', color: '#fff' },
              ]}
              placeholderTextColor={'rgba(0, 0, 0, 1)'}
              value={inputValue}
              onChangeText={setInputValue}
            />

            {sortedByAscending.map((memory, idx) => (
              <View style={styles.cardContainer} key={idx}>
                {memory.favorite && (
                  <Image
                    source={require('../assets/icons/likedImg.png')}
                    style={styles.likedImg}
                  />
                )}
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

                  <View style={{ alignItems: 'center', gap: 29 }}>
                    <Text style={styles.cardTitle}>{memory.title}</Text>

                    <TouchableOpacity
                      style={{ width: '35%' }}
                      activeOpacity={0.7}
                      onPress={() =>
                        navigation.navigate('MemoryPartoCardDetails', memory)
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
            ))}
            <TouchableOpacity
              style={{ width: '60%', marginTop: 32 }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('CreatePartoMemoryScreen')}
            >
              <LinearGradient
                colors={['#9F0505', '#6B0404']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.navButton}
              >
                <Text style={styles.btnText}>Add a memory</Text>
              </LinearGradient>
            </TouchableOpacity>
          </>
        )}
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
  input: {
    width: '80%',
    height: 52,
    borderRadius: 22,
    backgroundColor: 'rgba(38, 38, 38, 1)',
    paddingHorizontal: 12,
    marginTop: 30,
    marginBottom: 14,
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
  pickerText: {
    fontWeight: '400',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
  },
  descriptionInput: {
    width: '100%',
    height: 229,
    borderRadius: 22,
    backgroundColor: 'rgba(38, 38, 38, 1)',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  btnText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
  },
  emptyScreenText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#fff',
  },
  pickerImg: {
    width: '100%',
    height: 100,
    borderRadius: 22,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  likedImg: {
    position: 'absolute',
    right: -16,
    zIndex: 300,
    top: -16,
  },
  buttonText: { fontWeight: '700', fontSize: 15, color: '#fff' },
});

export default PartoDiaryOfMemoriesScreen;
