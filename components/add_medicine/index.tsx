import PrimaryButton from '@components/buttons/primaryButton';
import CheckBox from '@components/checkbox';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
import {useNavigation} from '@react-navigation/native';
import RedCross from '@svgs/red_cross';
import {useIsFocused} from '@react-navigation/native';

import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const AddMedicineModal = ({
  handleAddMedicine,
  isEdit,
  med_edit,
  handleEditMedicine,
  handleCloseModal,
  medicines,
}: {
  handleAddMedicine: any;
  isEdit?: boolean;
  med_edit?: any;
  handleEditMedicine?: any;
  handleCloseModal: any;
  medicines: Array<any>;
}) => {
  const [selectedMedicine, setSelectedMedicine] = useState({});

  const navigation = useNavigation();
  const [duration, setDuration] = useState('');
  const [dose, setDose] = useState('');
  const [instruction, setInstruction] = useState('');
  const [durationQuantity, setDurationQuantity] = useState('');
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (isEdit && isEdit === true) {
      setSelectedMedicine(med_edit);
      setDose(med_edit.dose_frequency);
      setInstruction(med_edit.instructions);
      setDurationQuantity(med_edit.dose_duration);
      setDuration(med_edit.duration_unit);
    }
  }, []);
  useEffect(() => {
    console.log('selected med=', selectedMedicine);
  }, [selectedMedicine]);
  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.modal_wrapper}>
        <ScrollView
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            display: 'flex',
          }}>
          <View style={styles.add_medicine_wrapper}>
            <View style={styles.header}>
              <TEXT text_style={styles.medicine_list}>add medince</TEXT>
              <TouchableOpacity
                onPress={() => {
                  handleCloseModal();
                }}
                style={styles.close_icon_wrapper}>
                <RedCross />
              </TouchableOpacity>
            </View>
            <ScrollView style={{flex: 1, height: '100%', width: '100%'}}>
              {/* @ts-ignore */}
              {selectedMedicine.medicineType != null &&
              //  @ts-ignore
              selectedMedicine.generic_name != null &&
              //  @ts-ignore
              selectedMedicine._id != null ? (
                <>
                  <View style={styles.medicine_wrapper}>
                    <View style={styles.icon_wrapper}>
                      <Image
                        source={
                          //  @ts-ignore
                          selectedMedicine.medicineType === 'capsule'
                            ? require('@images/capsule.png')
                            : //  @ts-ignore
                            selectedMedicine.medicineType === 'capsule'
                            ? require('@images/injection.png')
                            : require('@images/capsule.png')
                        }
                      />
                      <TEXT text_style={styles.capsule_icon_text}>
                        {/* @ts-ignore */}
                        {selectedMedicine.medicineType}
                      </TEXT>
                    </View>
                    <TEXT text_style={styles.medicine_name}>
                      {/* @ts-ignore */}
                      {selectedMedicine.generic_name}
                    </TEXT>
                  </View>
                  <TEXT text_style={styles.input_label}>dose frequency</TEXT>
                  <TextInput
                    style={styles.dose_input}
                    value={dose}
                    onChangeText={(value: string) => {
                      setDose(value);
                    }}
                  />
                  <TEXT text_style={styles.input_label}>Duration</TEXT>
                  <TextInput
                    keyboardType="number-pad"
                    style={styles.dose_input}
                    value={durationQuantity}
                    onChangeText={(value: string) => {
                      setDurationQuantity(value);
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setDuration('once');
                    }}>
                    <View style={styles.checkbox_wrapper}>
                      <CheckBox
                        isChecked={duration === 'once' ? true : false}
                      />
                      <TEXT
                        text_style={[
                          styles.checkbox_label,
                          duration === 'once' ? {color: '#27AD80'} : {},
                        ]}>
                        Once
                      </TEXT>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDuration('days');
                    }}>
                    <View style={styles.checkbox_wrapper}>
                      <CheckBox isChecked={duration === 'day' ? true : false} />
                      <TEXT
                        text_style={[
                          styles.checkbox_label,
                          duration === 'day' ? {color: '#27AD80'} : {},
                        ]}>
                        day
                      </TEXT>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDuration('weeks');
                    }}>
                    <View style={styles.checkbox_wrapper}>
                      <CheckBox
                        isChecked={duration === 'weeks' ? true : false}
                      />
                      <TEXT
                        text_style={[
                          styles.checkbox_label,
                          duration === 'weeks' ? {color: '#27AD80'} : {},
                        ]}>
                        weeks
                      </TEXT>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDuration('months');
                    }}>
                    <View style={styles.checkbox_wrapper}>
                      <CheckBox
                        isChecked={duration === 'months' ? true : false}
                      />
                      <TEXT
                        text_style={[
                          styles.checkbox_label,
                          duration === 'months' ? {color: '#27AD80'} : {},
                        ]}>
                        months
                      </TEXT>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDuration('continue');
                    }}>
                    <View style={styles.checkbox_wrapper}>
                      <CheckBox
                        isChecked={duration === 'continue' ? true : false}
                      />
                      <TEXT
                        text_style={[
                          styles.checkbox_label,
                          duration === 'continue' ? {color: '#27AD80'} : {},
                        ]}>
                        continue
                      </TEXT>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setDuration('not required');
                    }}>
                    <View style={styles.checkbox_wrapper}>
                      <CheckBox
                        isChecked={duration === 'not required' ? true : false}
                      />
                      <TEXT
                        text_style={[
                          styles.checkbox_label,
                          duration === 'not required' ? {color: '#27AD80'} : {},
                        ]}>
                        not required
                      </TEXT>
                    </View>
                  </TouchableOpacity>

                  <TEXT text_style={styles.input_label}>instruction</TEXT>
                  <TextInput
                    style={styles.instructions_input}
                    multiline={true}
                    value={instruction}
                    onChangeText={(value: string) => {
                      setInstruction(value);
                    }}
                  />

                  <ErrorTEXT>{showError === true ? error : null}</ErrorTEXT>
                  <View style={styles.add_btn_wrapper}>
                    <PrimaryButton
                      text={isEdit === true ? 'edit medicine' : 'add medicine'}
                      handleOnPress={() => {
                        console.log('edit=', isEdit);
                        if (dose.length === 0) {
                          setError('dose frequency is required');
                          setShowError(true);
                        } else if (duration.length === 0) {
                          setError('dose duration is required');
                          setShowError(true);
                        } else if (durationQuantity.length === 0) {
                          setError('dose quantity is required');
                          setShowError(true);
                        } else if (instruction.length === 0) {
                          setError('instruction is required');
                          setShowError(true);
                        } else {
                          if (isEdit === true) {
                            handleEditMedicine({
                              medicine: selectedMedicine,
                              dose_frequency: dose,
                              instruction: instruction,
                              duration_type: duration,
                              dose_duration: durationQuantity,
                            });
                          } else {
                            console.log('is_edit=', isEdit, {
                              medicine: selectedMedicine,
                              dose_frequency: dose,
                              instruction: instruction,
                              duration_type: duration,
                              dose_duration: durationQuantity,
                            });
                            handleAddMedicine({
                              medicine: selectedMedicine,
                              dose_frequency: dose,
                              instruction: instruction,
                              duration_type: duration,
                              dose_duration: durationQuantity,
                            });
                          }
                        }
                        //navigation.navigate('Investigation');
                      }}
                    />
                  </View>
                </>
              ) : (
                <>
                  {medicines.map((item: any, index: number) => {
                    console.log('med_item=', item);
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setSelectedMedicine(item);
                        }}>
                        <View style={styles.medicine_wrapper}>
                          <View style={styles.icon_wrapper}>
                            <Image source={require('@images/capsule.png')} />
                            <TEXT text_style={styles.capsule_icon_text}>
                              {item.medicineType}
                            </TEXT>
                          </View>
                          <TEXT text_style={styles.medicine_name}>
                            {item.generic_name}
                          </TEXT>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddMedicineModal;

const styles = StyleSheet.create({
  modal_wrapper: {
    backgroundColor: 'rgba(57,72,85,0.9)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add_medicine_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: pixelSizeHorizontal(25),
    paddingVertical: pixelSizeVertical(30),
    height: heightPixel(543),
    width: '100%',
    marginTop: pixelSizeVertical(100),
    //top: 100,
    //position: 'absolute',
    alignItems: 'flex-start',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  close_icon_wrapper: {
    width: widthPixel(15),
    height: heightPixel(15),
  },
  medicine_list: {
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    color: '#1c1c1c',
    textTransform: 'capitalize',
    alignSelf: 'flex-start',
  },
  medicine_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: pixelSizeVertical(25),
    marginHorizontal: pixelSizeHorizontal(10),
  },
  icon_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: widthPixel(50),
  },
  capsule_icon_text: {
    fontSize: fontPixel(8),
    lineHeight: fontPixel(12),
    color: '#1c1c1c',
  },
  medicine_name: {
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '700',
    textTransform: 'capitalize',
    color: '#1c1c1c',
    marginTop: pixelSizeVertical(5),
    marginLeft: pixelSizeHorizontal(10),
  },
  input_label: {
    fontSize: fontPixel(14),
    lineHeight: fontPixel(24),
    color: '#2E353D',
    marginTop: pixelSizeVertical(10),
    textTransform: 'capitalize',
  },
  dose_input: {
    width: widthPixel(319),
    height: heightPixel(38),
    marginTop: pixelSizeVertical(5),
    backgroundColor: 'rgba(39, 173, 128, 0.1)',
    borderRadius: 8,
    fontSize: fontPixel(14),
    lineHeight: fontPixel(24),
    color: '#2E353D',
    paddingVertical: 0,
  },
  checkbox_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pixelSizeVertical(5),
  },
  checkbox_label: {
    color: '#686868',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(21),
    marginLeft: pixelSizeHorizontal(5),
    textTransform: 'capitalize',
  },
  instructions_input: {
    width: widthPixel(319),
    height: heightPixel(81),
    borderRadius: 8,
    backgroundColor: 'rgba(39,173,128,0.1)',
    paddingHorizontal: pixelSizeHorizontal(10),
    paddingVertical: pixelSizeVertical(10),
    textAlign: 'left',
    textAlignVertical: 'top',
    marginTop: pixelSizeVertical(10),
  },
  add_btn_wrapper: {
    marginTop: pixelSizeVertical(24),
    width: widthPixel(242),
    height: heightPixel(42),
    alignSelf: 'center',
  },
});
