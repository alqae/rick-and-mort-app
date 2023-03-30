import React from 'react';
import axios from 'axios';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/MainStack';
import { Badge, CharacterList, GenderCard } from '../components';
import { Character, GetCharactersResponse } from '../models';
import { colors } from '../theme/colors';

export interface HomeProps extends NativeStackScreenProps<RootStackParamList, 'Home'> { }

export const HomeScreen: React.FC<HomeProps> = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  /// Bottom Sheet
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const showFiltersModal = React.useCallback(() => bottomSheetRef.current?.present(), []);
  const hideFiltersModal = React.useCallback(() => bottomSheetRef.current?.dismiss(), []);
  /// Filters
  const [text, onChangeText] = React.useState('');
  const [status, setStatus] = React.useState<string>();
  const [gender, setGender] = React.useState<string>();
  /// Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [hits, setHits] = React.useState<Character[]>([]);

  React.useEffect(() => {
    fetchData();
  }, [currentPage, text]);

  const fetchData = async (clearFilters = false) => {
    try {
      if (clearFilters) {
        setIsLoading(true);
        setStatus(undefined);
        setGender(undefined);
        onChangeText('');
      }

      const params = new Map<string, string | number>()
      params.set('page', currentPage);

      if (status != undefined && !clearFilters) {
        params.set('status', status);
      }

      if (gender != undefined && !clearFilters) {
        params.set('gender', gender);
      }

      if (text != undefined && text !== '' && !clearFilters) {
        setIsLoading(true);
        params.set('name', text);
      }

      const response = await axios.get<GetCharactersResponse>(
        'https://rickandmortyapi.com/api/character',
        { params: Object.fromEntries(params) },
      );

      setTotalPages(response.data.info.pages);
      setHits(currentPage === 1 ? response.data.results : [...hits, ...response.data.results]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setCurrentPage(1);
      setHits([]);
    }
  }

  const applyFilters = () => {
    hideFiltersModal();
    setIsLoading(true);
    setCurrentPage(1);
    fetchData();
  }

  const clearFilters = () => {
    hideFiltersModal();
    fetchData(true);
  }

  const statusOptions = [
    { text: 'Alive', isActive: status === 'Alive' },
    { text: 'Dead', isActive: status === 'Dead' },
    { text: 'Unknown', isActive: status === 'Unknown' },
  ];

  const genderOptions = [
    { icon: 'mars', text: 'Male', isActive: gender === 'Male' },
    { icon: 'venus', text: 'Female', isActive: gender === 'Female' },
    { icon: 'genderless', text: 'Genderless', isActive: gender === 'Genderless' },
    { icon: 'question', text: 'Unknown', isActive: gender === 'Unknown' },
  ];

  const hasFilters = (status != null || gender != null || text != '');

  return (
    <View style={styles.container}>
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={["100%"]}
        enablePanDownToClose={true}
        enableOverDrag={true}
        index={0}
        backgroundStyle={{ backgroundColor: colors.dark, borderRadius: 16 }}
      >
        <View style={{ padding: 24, flex: 1 }}>
          <View style={{
            marginTop: -8,
            marginBottom: 24,
            marginHorizontal: -8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <TouchableOpacity onPress={hideFiltersModal} style={{alignSelf:'center'}}>
              <IconMaterial name="arrow-back" size={24} color={colors.light} />
            </TouchableOpacity>

            <Text style={[styles.label, { marginLeft: 16, alignSelf: 'center' }]}>Filters</Text>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={[styles.label, { marginBottom: 8 }]}>Status</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {statusOptions.map((option, index) => ( 
                <Badge
                  key={index}
                  text={option.text}
                  isActive={option.isActive}
                  onPress={() => setStatus(option.text)}
                />
              ))}
            </View>
          </View>

          <View style={{ marginBottom: 24 }}>
            <Text style={[styles.label, { marginBottom: 8 }]}>Gender</Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              {genderOptions.map((option, index) => (
                <GenderCard
                  key={index}
                  icon={option.icon}
                  text={option.text}
                  isActive={option.isActive}
                  onPress={() => setGender(option.text)}
                />
              ))}
            </View>
          </View>

          <TouchableOpacity onPress={applyFilters} style={{ marginTop: 'auto' }}>
            <LinearGradient style={styles.button} colors={colors.greenGradient}>
              <Text style={styles.buttonText}>Apply</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>

      <View style={styles.row}>
        <View style={styles.searchSection}>
          <IconMaterial style={styles.searchIcon} name="search" size={20} />
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="#E5E5E5"
            placeholder="Search Character"
            onChangeText={onChangeText}
            style={styles.input}
            value={text}
          />
        </View>

        <TouchableOpacity style={styles.filterButton} onPress={showFiltersModal}>
          <LinearGradient style={styles.filterButton} colors={['#99F531', '#36951B']}>
            <IconFontAwesome name="sliders" style={styles.filterButtonIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Characters ({hits.length})</Text>

        {hasFilters && (
          <TouchableOpacity onPress={clearFilters}>
            <Text style={[styles.label, styles.highlightedText]}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>

      <CharacterList
        data={hits}
        isLoading={isLoading}
        onLoadMore={() => setCurrentPage(currentPage + 1)}
        currentPage={currentPage}
        totalPages={totalPages}
        style={{ marginHorizontal: -12, marginTop: -12 }}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: colors.dark,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  searchInput: {
    height: 40,
    margin: 0,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 20,
    margin: 0,
    lineHeight: 20,
    color: colors.light,
  },
  highlightedText: {
    color: colors.cyan,
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 4,
    marginRight: 16,
    height: 50,
  },
  searchIcon: {
    padding: 14,
    color: colors.lightGray,
  },
  input: {
    flex: 1,
    paddingHorizontal: 0,
    paddingRight: 14,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 28,
    color: colors.dark,
  },
  filterButton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  filterButtonIcon: {
    color: colors.dark,
    fontSize: 30,
  },
  modalTitle: {
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: colors.light,
  },
  button: {
    paddingVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: colors.dark,
    fontFamily: 'Roboto',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 16,
    lineHeight: 28,
  },
});
