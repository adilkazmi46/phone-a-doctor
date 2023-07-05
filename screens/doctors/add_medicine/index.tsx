import AddMedicineModal from '@components/add_medicine';
import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import ErrorTEXT from '@components/text/error_text';
import {useNavigation, useRoute} from '@react-navigation/native';
import AddIcon from '@svgs/add_icon';
import DeleteIcon from '@svgs/delete_icon';
import EditIcon from '@svgs/edit_icon';
import {getAllMedicines} from '@utils/index';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, TextInput, TouchableOpacity, View} from 'react-native';
import styles from '../prescription/styles';
import {useIsFocused} from '@react-navigation/native';
import {LoadingContext} from '@contexts/loadingContext';

const AddMedicine = () => {
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [editIndex, setEditIndex] = useState<number>();
  const [isEdit, setIsEdit] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const loadingContext: any = useContext(LoadingContext);
  const router = useRoute();

  //@ts-ignore
  const appointment = router.params.appointment;
  //@ts-ignore
  const complains = router.params.complains;
  //@ts-ignore
  const age = router.params.age;
  //@ts-ignore
  const dygnosis = router.params.dygnosis;

  const handleAddMedicine = async (medicine: any) => {
    console.log('medicine hnle add mediince =', medicine);
    let med = {
      _id: medicine.medicine._id,
      medicineType: medicine.medicine.medicineType,
      generic_name: medicine.medicine.generic_name,
      instructions: medicine.instruction,
      dose_frequency: medicine.dose_frequency,
      dose_duration: medicine.dose_duration,
      duration_unit: medicine.duration_type,
    };
    //@ts-ignore
    setSelectedMedicines([med, ...selectedMedicines]);
    console.log('selected meds=', selectedMedicines);
    setShowAddMedicine(false);
  };

  const handleDeleteMedicine = async (Index: number) => {
    let tmp_medicines = await selectedMedicines.filter(
      (item: string, index: number) => {
        return index != Index;
      },
    );
    await setSelectedMedicines(tmp_medicines);
  };
  const handleEditMedicine = async (med: any, index: any) => {
    let tmp_selected_meds = selectedMedicines;
    //@ts-ignore
    tmp_selected_meds[index] = await med;
    console.log('edited=', tmp_selected_meds[index]);
    setSelectedMedicines(tmp_selected_meds);
    console.log('selected 67=', selectedMedicines);
    setEditIndex(undefined);
    setIsEdit(false);
    setShowAddMedicine(false);
  };
  const navigation = useNavigation();

  const focus = useIsFocused();
  useEffect(() => {
    const get_all_medicines = async () => {
      await loadingContext.handleToggleLoader(true);
      let res = await getAllMedicines();
      console.log('res=', res);
      //@ts-ignore
      if (res.medicines) {
        //@ts-ignore
        setMedicines(res.medicines);
      }
      await loadingContext.handleToggleLoader(false);
    };
    if (focus === true) {
      if (
        appointment === null ||
        age === null ||
        dygnosis === null ||
        complains === null
      ) {
        //@ts-ignore
        navigation.navigate('DoctorsHome');
      } else {
        if (appointment.is_prescription_written === true) {
          setSelectedMedicines(appointment.prescription.medicines);
        } else {
          setSelectedMedicines([]);
        }
        get_all_medicines();
      }
    }
  }, [focus]);
  const handleNext = async () => {
    if (selectedMedicines.length === 0) {
      setShowErrors(true);
    } else {
      console.log(router.params);
      //@ts-ignore
      navigation.navigate('Investigation', {
        appointment: appointment,
        age,
        complains,
        dygnosis,
        medicines: selectedMedicines,
      });
    }
  };
  useEffect(() => {
    //@ts-ignore
    console.log('edit index 123 === ', editIndex, selectedMedicines[editIndex]);
  }, [editIndex]);
  return (
    <View style={styles.prescriptions_wrapper}>
      <ScrollView
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'column',
        }}>
        <TEXT text_style={styles.new_prescription_label}>
          new prescription for
        </TEXT>
        <View style={styles.patient_info_wrapper}>
          <TEXT text_style={styles.patient_name}>
            {appointment.user[0].full_name}
          </TEXT>
          <TEXT text_style={styles.patient_info}>
            {appointment.user[0].gender} | {age} years |{' '}
            {appointment.user[0].patient.weight} kg
          </TEXT>
        </View>

        <TEXT text_style={styles.complains_label}>Rx</TEXT>

        <TouchableOpacity
          onPress={() => {
            setShowAddMedicine(true);
          }}>
          <View
            style={styles.add_prescription_item_wrapper}
            pointerEvents="none">
            <TextInput
              editable={false}
              style={styles.input_wrapper}
              placeholder="Enter Medicine"
            />
            <View style={styles.add_btn_wrapper}>
              <AddIcon />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.prescription_items_wrapper}>
          {selectedMedicines.map((item: any, index: number) => {
            console.log('item med selected=', item);
            return (
              <View key={index} style={styles.medicine_item}>
                <View style={styles.content_wrapper}>
                  <TEXT text_style={styles.content_text}>
                    {item.generic_name}
                  </TEXT>
                  <TEXT text_style={styles.content_text}>
                    {item.dose_frequency}, {item.dose_duration}
                    {item.duration_unit}
                  </TEXT>
                </View>
                <View style={styles.content_wrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      setEditIndex(index);
                      setIsEdit(true);
                      setShowAddMedicine(true);
                    }}
                    style={styles.edit_icon}>
                    <EditIcon color="#27AE80" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteMedicine(index);
                    }}
                    style={styles.del_icon}>
                    <DeleteIcon />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        {showAddMedicine === true ? (
          <AddMedicineModal
            medicines={medicines}
            handleAddMedicine={(medicine: any) => {
              handleAddMedicine(medicine);
            }}
            isEdit={isEdit}
            //@ts-ignore
            med_edit={isEdit === true ? selectedMedicines[editIndex] : null}
            handleEditMedicine={(med: any) => {
              handleEditMedicine(med, editIndex);
            }}
            handleCloseModal={() => {
              setShowAddMedicine(false);
            }}
          />
        ) : null}
        <ErrorTEXT>
          {showErrors === true && selectedMedicines.length === 0
            ? 'please add atleast 1 medicine'
            : null}
        </ErrorTEXT>
        <View style={styles.next_btn}>
          <PrimaryButton
            text="next"
            handleOnPress={() => {
              handleNext();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddMedicine;
