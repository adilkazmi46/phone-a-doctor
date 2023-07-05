import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import SearchInput from '@components/input_fields/search_input';
import TEXT from '@components/text';
import {useFormik} from 'formik';
import {LoadingContext} from '@contexts/loadingContext';
import {searchDoctor} from '@utils/doctor';

const FindDoctor = ({
  setShowDoctors,
  setDoctors,
}: {
  setShowDoctors: any;
  setDoctors: any;
}) => {
  const loadingContext: any = useContext(LoadingContext);
  const form = useFormik({
    initialValues: {name: ''},
    onSubmit: async (values, actions) => {
      await loadingContext.handleToggleLoader(true);

      let query_param = `query_text=${values.name}`;
      let res: any = await searchDoctor(query_param);

      if (res.users) {
        await setDoctors(res.users);
        await setShowDoctors(true);
        actions.resetForm();
      }
      console.log('res 24=', res);
      await loadingContext.handleToggleLoader(false);
    },
  });

  return (
    <View style={styles.find_doctor_wrapper}>
      <TEXT text_style={styles.title}>find your doctor</TEXT>
      <View style={styles.input_wrapper}>
        <SearchInput
          placeholder="Search"
          handleOnChange={form.handleChange('name')}
          value={form.values.name}
          handleOnSubmit={() => {
            form.handleSubmit();
          }}
        />
      </View>
    </View>
  );
};

export default FindDoctor;
const styles = StyleSheet.create({
  find_doctor_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: pixelSizeVertical(30),
  },
  title: {
    color: '#1C1C1C',
    fontSize: fontPixel(24),
    lineHeight: fontPixel(36),
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  input_wrapper: {
    width: widthPixel(302),
    height: heightPixel(53),
    marginTop: pixelSizeVertical(20),
  },
});
