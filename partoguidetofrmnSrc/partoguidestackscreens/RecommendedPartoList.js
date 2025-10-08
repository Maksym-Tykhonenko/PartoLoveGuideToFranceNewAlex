import PartoPlacesList from '../partoguidecomponets/PartoPlacesList';

const RecommendedPartoList = ({ route }) => {
  const place = route.params;

  return <PartoPlacesList place={place} screen={'RecommendsScreen'} />;
};

export default RecommendedPartoList;
