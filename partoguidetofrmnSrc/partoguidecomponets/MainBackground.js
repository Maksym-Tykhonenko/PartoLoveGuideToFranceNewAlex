import { ImageBackground, ScrollView } from 'react-native';

const MainBackground = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
    </ImageBackground>
  );
};

export default MainBackground;
