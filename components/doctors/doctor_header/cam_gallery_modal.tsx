import PrimaryButton from '@components/buttons/primaryButton';
import TEXT from '@components/text';
import CameraWhite from '@svgs/camera';
import CameraIcon from '@svgs/cameraIcon';
import GalleryIcon from '@svgs/gallery_icon';
import RedCross from '@svgs/red_cross';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

const CamGalleryModal = ({
  handleGallery,
  handleCamera,
  handleCloseModal,
  handleUploadImage,
  showUploadBtn,
  isUploading,
}: {
  handleGallery: any;
  handleCamera: any;
  handleCloseModal: any;
  handleUploadImage: any;
  showUploadBtn: boolean;
  isUploading: boolean;
}) => {
  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.modal_wrapper}>
        <View style={styles.gallery_image_wrapper}>
          <View style={styles.header}>
            <TEXT text_style={styles.title}>Upload Image</TEXT>
            <TouchableOpacity
              onPress={() => {
                handleCloseModal();
              }}
              style={styles.close_icon}>
              <RedCross />
            </TouchableOpacity>
          </View>

          <View style={styles.uploadItems_wrapper}>
            <TouchableOpacity
              onPress={() => {
                handleGallery();
              }}
              style={styles.upload_item}>
              <View style={styles.icon}>
                <GalleryIcon />
              </View>
              <TEXT text_style={styles.text}>gallery</TEXT>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                handleCamera();
              }}
              style={styles.upload_item}>
              <View style={styles.icon}>
                <CameraIcon />
              </View>
              <TEXT text_style={styles.text}>camera</TEXT>
            </TouchableOpacity>
          </View>
          {showUploadBtn === true ? (
            <View style={styles.upload_btn}>
              <PrimaryButton
                text={isUploading === true ? 'uploading' : 'upload profile pic'}
                handleOnPress={handleUploadImage}
              />
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default CamGalleryModal;
const styles = StyleSheet.create({
  modal_wrapper: {
    backgroundColor: 'rgba(57,72,85,0.9)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery_image_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: heightPixel(300),
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    paddingHorizontal: pixelSizeHorizontal(30),
    paddingVertical: pixelSizeVertical(25),
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    marginTop: pixelSizeVertical(10),
    color: '#1c1c1c',
    textTransform: 'capitalize',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(20),
  },
  uploadItems_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: pixelSizeVertical(25),
  },
  upload_item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: widthPixel(100),
    height: heightPixel(100),
  },
  close_icon: {
    width: widthPixel(50),
    height: heightPixel(50),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: widthPixel(50),
    height: heightPixel(50),
    backgroundColor: '#27AD80',
    borderRadius: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: fontPixel(14),
    lineHeight: fontPixel(18),
    color: '#1c1c1c',
    textTransform: 'capitalize',
  },
  upload_btn: {
    width: widthPixel(200),
    height: heightPixel(40),
  },
});
