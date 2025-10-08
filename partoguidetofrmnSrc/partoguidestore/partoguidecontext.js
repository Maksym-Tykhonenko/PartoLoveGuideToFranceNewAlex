import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const PartoContextProvider = ({ children }) => {
  const [savedMemories, setSavedMemories] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [toggleIcon, setToggleIcon] = useState(false);

  // notes

  const saveMemory = async (data, edit) => {
    try {
      const stored = await AsyncStorage.getItem('memories');
      let memory = stored !== null ? JSON.parse(stored) : [];

      let updatedMemories;

      if (edit?.id) {
        updatedMemories = savedMemories.map(movie =>
          movie.id === edit.id ? data : movie,
        );
      } else {
        updatedMemories = [...memory, data];
      }

      await AsyncStorage.setItem('memories', JSON.stringify(updatedMemories));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getMemories = async () => {
    try {
      const savedData = await AsyncStorage.getItem('memories');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedMemories(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMemory = async selectedId => {
    const jsonValue = await AsyncStorage.getItem('memories');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedId.id);

    setSavedMemories(filtered);
    await AsyncStorage.setItem('memories', JSON.stringify(filtered));
  };

  // favorite places

  const savePlace = async data => {
    try {
      const stored = await AsyncStorage.getItem('favoritesPlaces');
      let place = stored !== null ? JSON.parse(stored) : [];

      const updatedPlaces = [...place, data];

      await AsyncStorage.setItem(
        'favoritesPlaces',
        JSON.stringify(updatedPlaces),
      );
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getPlaces = async () => {
    try {
      const savedData = await AsyncStorage.getItem('favoritesPlaces');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedPlaces(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePlace = async selectedId => {
    const jsonValue = await AsyncStorage.getItem('favoritesPlaces');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedId.id);

    setSavedPlaces(filtered);
    await AsyncStorage.setItem('favoritesPlaces', JSON.stringify(filtered));
  };

  const value = {
    saveMemory,
    getMemories,
    savedMemories,
    deleteMemory,
    toggleIcon,
    setToggleIcon,
    savePlace,
    getPlaces,
    deletePlace,
    savedPlaces,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
