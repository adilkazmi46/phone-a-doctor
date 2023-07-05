import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

const AddCompliants = ({
  selectedComplaints,
  complaints,
  setSelectedComplaints,
  handleCloseModal,
}: {
  selectedComplaints: Array<string>;
  complaints: Array<string>;
  setSelectedComplaints: any;
  handleCloseModal: any;
}) => {
  const [selected, setSelected] = useState(selectedComplaints);
  const handleSelecteComplaint = async (item: string) => {
    let is_selected = await selected.includes(item);
    console.log('selected=', selected);
    console.log('item=', item);
    console.log('is_selected=', is_selected);
    if (is_selected === false) {
      await setSelected([item, ...selected]);
    } else {
      let new_selected = await selected.filter(
        (complaint: string, index: number) => {
          return item != complaint;
        },
      );
      await setSelected(new_selected);
      new_selected = [];
    }
  };
  console.log('items=', complaints);
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
          <View style={styles.add_complaints_wrapper}>
            <TEXT text_style={styles.title}>Complaints</TEXT>
            <ScrollView
              style={{
                flex: 1,
                height: '100%',
                width: '100%',
                display: 'flex',
              }}>
              {complaints.map((item: any, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.complaints_item,
                      selected.includes(
                        item.complain
                          ? item.complain.toLowerCase()
                          : item.dygnosis
                          ? item.dygnosis.toLowerCase()
                          : item.medicine
                          ? item.medicine.toLowerCase()
                          : null,
                      ) === true
                        ? styles.selected_complaint
                        : {},
                    ]}
                    onPress={() => {
                      handleSelecteComplaint(
                        item.complain
                          ? item.complain.toLowerCase()
                          : item.dygnosis
                          ? item.dygnosis.toLowerCase()
                          : item.medicine
                          ? item.medicine.toLowerCase()
                          : null,
                      );
                    }}
                    key={index}>
                    <TEXT text_style={styles.complaint}>
                      {item.complain
                        ? item.complain
                        : item.dygnosis
                        ? item.dygnosis
                        : item.medicine
                        ? item.medicine
                        : null}
                    </TEXT>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <View style={styles.confirm_btn}>
              <PrimaryButton
                text="confrim"
                handleOnPress={() => {
                  setSelectedComplaints(selected);
                  handleCloseModal();
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default AddCompliants;
const styles = StyleSheet.create({
  modal_wrapper: {
    backgroundColor: 'rgba(57,72,85,0.9)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  add_complaints_wrapper: {
    width: widthPixel(300),
    height: heightPixel(600),
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    marginTop: pixelSizeVertical(100),
    paddingVertical: pixelSizeVertical(10),
    paddingHorizontal: pixelSizeHorizontal(15),
  },
  title: {
    color: '#1c1c1c',
    fontSize: fontPixel(18),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
    marginBottom: pixelSizeVertical(25),
  },
  complaints_item: {
    marginVertical: pixelSizeVertical(5),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: widthPixel(300),
    height: heightPixel(40),
  },
  complaint: {
    color: '#1c1c1c',
    fontWeight: 'bold',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(20),
    textTransform: 'capitalize',

    borderRadius: 10,
    paddingHorizontal: pixelSizeHorizontal(10),
  },
  selected_complaint: {
    backgroundColor: 'rgba(39,173,128,0.1)',
  },
  confirm_btn: {
    width: widthPixel(250),
    height: heightPixel(50),
    alignSelf: 'center',
    marginVertical: pixelSizeVertical(15),
  },
});
