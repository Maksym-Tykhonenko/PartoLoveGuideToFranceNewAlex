import MainBackground from '../partoguidecomponets/MainBackground';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import Header from '../partoguidecomponets/Header';
import { launchImageLibrary } from 'react-native-image-picker';
import { useStore } from '../partoguidestore/partoguidecontext';

const CreatePartoMemoryScreen = () => {
  const navigation = useNavigation();
  const [diaryTitle, setDiaryTitle] = useState('');
  const [diaryPhoto, setDiaryPhoto] = useState('');
  const [diaryDescription, setDiaryDescription] = useState('');
  const { saveMemory } = useStore();

  const isVisibleButton = diaryDescription && diaryPhoto && diaryTitle;

  let options = {
    storageOptions: {
      path: 'image',
      maxHeight: 700,
      maxWidth: 700,
    },
  };

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      setDiaryPhoto(response.assets[0].uri);
    });
  };

  const handleSaveMemory = () => {
    const newMemory = {
      id: Date.now(),
      title: diaryTitle,
      description: diaryDescription,
      photo: diaryPhoto,
      favorite: false,
    };

    saveMemory(newMemory);

    setTimeout(() => {
      navigation.goBack();
    }, 400);
  };

  return (
    <MainBackground>
      <View style={styles.container}>
        <Header title={'Diary of memories'} />

        <View style={styles.shareContainer}>
          <View style={styles.blurWrap}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={15}
              reducedTransparencyFallbackColor="rgba(0,0,0,0.5)"
            />

            <TextInput
              placeholder="Title"
              style={[
                styles.input,
                diaryTitle && { fontWeight: '600', color: '#fff' },
              ]}
              placeholderTextColor={'rgba(0, 0, 0, 1)'}
              value={diaryTitle}
              onChangeText={setDiaryTitle}
            />

            {diaryPhoto ? (
              <TouchableOpacity style={styles.imageContainer}>
                <Image
                  source={{ uri: diaryPhoto }}
                  style={{ width: '100%', height: '100%', borderRadius: 22 }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.imageContainer}
                onPress={imagePicker}
              >
                <Image source={require('../assets/icons/img.png')} />
                <Text style={styles.pickerText}>Add photo</Text>
              </TouchableOpacity>
            )}

            <TextInput
              placeholder="Description"
              textAlignVertical="top"
              multiline
              value={diaryDescription}
              style={[
                styles.descriptionInput,
                diaryDescription && {
                  fontWeight: '600',
                  color: '#fff',
                  padding: 20,
                },
              ]}
              placeholderTextColor={'rgba(0, 0, 0, 1)'}
              onChangeText={setDiaryDescription}
            />
          </View>
        </View>

        {isVisibleButton && (
          <TouchableOpacity
            style={{ width: '80%', marginTop: 16 }}
            activeOpacity={0.7}
            onPress={handleSaveMemory}
          >
            <LinearGradient
              colors={['#9F0505', '#6B0404']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.navButton}
            >
              <Text style={styles.btnText}>Save</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    </MainBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: 66, alignItems: 'center', paddingBottom: 40 },
  blurWrap: {
    width: '105%',
    paddingTop: 29,
    paddingBottom: 14,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  shareContainer: {
    width: '90%',
    borderRadius: 22,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 0.2,
    paddingHorizontal: 5,
    marginTop: 22,
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
    height: 37,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 52,
    borderRadius: 22,
    backgroundColor: 'rgba(38, 38, 38, 1)',
    paddingHorizontal: 12,
    marginBottom: 34,
    fontWeight: '400',
    fontSize: 15,
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
    padding: 12,
    fontWeight: '400',
    fontSize: 15,
  },
  btnText: {
    fontWeight: '700',
    fontSize: 24,
    color: '#fff',
  },
});

export default CreatePartoMemoryScreen;
