import SearchInput from '@components/input_fields/search_input';
import TEXT from '@components/text';
import {LoadingContext} from '@contexts/loadingContext';
import {getAllCategories} from '@utils/medical_departments';
import {Form} from 'formik';
import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native';
import styles from './styles';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {searchDoctor} from '@utils/doctor';

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const loadingContext: any = useContext(LoadingContext);
  const focus = useIsFocused();
  const navigation: any = useNavigation();

  useEffect(() => {
    const GetAllCategories = async () => {
      await loadingContext.handleToggleLoader(true);
      let tmp: any = await getAllCategories();
      setCategories(tmp);
      await loadingContext.handleToggleLoader(false);
    };
    GetAllCategories();
  }, [focus]);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchDoctors = async (val: string) => {
    await loadingContext.handleToggleLoader(true);
    let res: any = await searchDoctor(`medical_category=${val}`);
    if (res.users) {
      await loadingContext.handleToggleLoader(false);
      navigation.navigate('DoctorsList', {doctors: res.users});
    }
  };

  return (
    <View style={styles.all_categories_wrapper}>
      <ScrollView>
        <View style={styles.search_input_wrapper}>
          <SearchInput
            placeholder="search for doctors"
            value={searchQuery}
            handleOnChange={(value: string) => {
              setSearchQuery(value);
            }}
            handleOnSubmit={() => {}}
          />
        </View>
        {categories.length > 0 &&
          categories.map((item: any, index: number) => {
            console.log('item=', item.category);
            if (item.category.includes(searchQuery) === true) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleSearchDoctors(item.category);

                    // navigation.navigate('MedicalDepartments', {});
                  }}
                  key={index}>
                  <View style={styles.category}>
                    <TEXT text_style={styles.category_text}>
                      {item.category}
                    </TEXT>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
      </ScrollView>
    </View>
  );
};

export default AllCategories;
