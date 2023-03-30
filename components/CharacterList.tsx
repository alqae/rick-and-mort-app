import React from 'react';
import { FlatList, StyleProp, ViewStyle, View, Text, StyleSheet } from 'react-native';
import { Character } from '../models';
import { colors } from '../theme/colors';
import { CharacterCard } from './CharacterCard';
import { Loader } from './Loader';

interface CharacterListProps {
  onLoadMore: () => void;
  data: Character[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  style: StyleProp<ViewStyle>;
}

export const CharacterList: React.FC<CharacterListProps> = ({ data, style, onLoadMore, currentPage, totalPages, isLoading }) => {
  if (isLoading) {
    return currentPage === 1 ? <Loader /> : null;
  }

  if (!data.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No results found!</Text>
      </View>
    )
  }

  return (
    <FlatList
      data={data}
      numColumns={2}
      style={style}
      keyExtractor={(item) => `product-${item.id}-${Math.random()}`}
      ListFooterComponent={currentPage !== totalPages ? <Loader /> : <React.Fragment />}
      onEndReached={() => {
        if (currentPage === totalPages) return;
        return onLoadMore();
      }}
      onEndReachedThreshold={0}
      renderItem={({ item: character }) => <CharacterCard {...character} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: colors.dark,
  },
  errorText: {
    color: colors.error,
    fontFamily: 'Roboto',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
  },
});
