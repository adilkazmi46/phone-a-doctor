import TEXT from '@components/text';
import BigTick from '@svgs/big_tick';
import {
  fontPixel,
  heightPixel,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React from 'react';
import {Modal, StyleSheet, View, TouchableOpacity} from 'react-native';

const SuccessfullModal = ({
  handleCloseModal,
  date,
}: {
  handleCloseModal: any;
  date: string;
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        visible={true}>
        <View style={styles.modal_wrapper}>
          <View style={[styles.centeredView, styles.modal_body]}>
            <View style={styles.tick_wrapper}>
              <BigTick />
            </View>
            <TEXT text_style={styles.text}>
              We have successfully appointment request for {date}
            </TEXT>
            <TouchableOpacity
              onPress={() => {
                handleCloseModal();
              }}>
              <View style={styles.btn_wrapper}>
                <TEXT text_style={styles.btn_text}>close</TEXT>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SuccessfullModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  modal_wrapper: {
    backgroundColor: 'rgba(57,72,85,0.9)',
    flex: 1,
  },
  modal_body: {
    backgroundColor: 'white',
    width: widthPixel(280),
    height: heightPixel(365),
    borderRadius: 10,
    position: 'absolute',
    top: 224,
    left: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  tick_wrapper: {
    width: widthPixel(120),
    height: heightPixel(120),
    marginTop: pixelSizeVertical(60),
  },
  text: {
    color: '#1c1c1c',
    fontSize: fontPixel(14),
    lineHeight: fontPixel(20),
    textAlign: 'center',
    marginTop: pixelSizeVertical(40),
    marginBottom: pixelSizeVertical(25),
    width: widthPixel(180),
    minHeight: heightPixel(60),
  },
  btn_wrapper: {
    width: widthPixel(80),
    height: heightPixel(24),
    backgroundColor: '#27AD80',
    borderRadius: 5,
    elevation: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: '#ffffff',
    fontSize: fontPixel(12),
    lineHeight: fontPixel(16),
    textTransform: 'uppercase',
  },
});
