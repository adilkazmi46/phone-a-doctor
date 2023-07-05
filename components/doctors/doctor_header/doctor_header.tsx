import TEXT from '@components/text';
import CameraWhite from '@svgs/camera';
import HomeDocProfile from '@svgs/home_doc_profile';
import {uploadProfilePic} from '@utils/doctor';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  widthPixel,
} from '@utils/normalize';
import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CamGalleryModal from './cam_gallery_modal';
import {useDispatch, useSelector} from 'react-redux';
import {LoadingContext} from '@contexts/loadingContext';
import {save_user} from '@actions/auth';

const DoctorHeader = ({isHome}: {isHome: boolean}) => {
  const [isOnline, setIsOnline] = useState(isHome || false);
  const [image, setImage] = useState({});
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showUploadBtn, setShowUploadBtn] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showLoadingImageIndicator, setShowLoadingImageIndicator] =
    useState(false);
  const loadingContext: any = useContext(LoadingContext);
  const [doctorPicURL, setdoctorPicURL] = useState('');
  const doctor = useSelector((state: any) => {
    return state.user.doctor;
  });
  const user: any = useSelector((state: any) => {
    return state.user;
  });
  const handleCameraImage = async () => {
    await launchCamera({mediaType: 'photo', quality: 1}, res => {
      if (res.didCancel === true) {
      } else {
        if (res.assets) {
          setImage(res.assets[0]);
          setShowUploadBtn(true);
        }
      }
    });
  };
  useEffect(() => {
    if (doctor.profilePic) {
      if (doctor.profilePic.key) {
        // Storage.get(doctor.profilePic.key)
        //   .then(res => {
        //     console.log('profile image', JSON.stringify(res));
        //     setdoctorPicURL(res);
        //   })
        //   .catch((err: any) => {
        //     console.log('errr,=', err);
        //   });
      }
    }
  }, [doctor]);
  const handleGalleryImage = async () => {
    await launchImageLibrary({mediaType: 'photo', quality: 1}, res => {
      if (res.didCancel === true) {
      } else {
        if (res.assets) {
          setImage(res.assets[0]);
          setShowUploadBtn(true);
        }
      }
    });
  };

  const handleUploadImage = async () => {
    if (isUploading === false) {
      await loadingContext.handleToggleLoader(true);
      setIsUploading(true);
      let res: any = await uploadProfilePic({img: image});
      await dispatch(save_user(res.user));
      setShowModal(false);
      setIsUploading(false);
      await loadingContext.handleToggleLoader(false);
    }
  };

  return (
    <View style={styles.profile_header}>
      {user.profile_pic ? (
        <TouchableOpacity
          onPress={async () => {
            setShowModal(true);
          }}
          style={styles.image_profile_wrapper}>
          <Image
            source={{
              uri: user.profile_pic.url,
            }}
            style={[styles.profile_pic]}></Image>
          {/* {showLoadingImageIndicator === true ? (
              <ActivityIndicator
                color="#27AD80"
                style={{alignSelf: 'center'}}
              />
            ) : null} */}

          <View style={styles.white_camera_wrapper}>
            <CameraWhite />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={async () => {
            setShowModal(true);
          }}
          style={styles.profile_pic}>
          <HomeDocProfile />
        </TouchableOpacity>
      )}
      <View style={styles.content_wrapper}>
        <TEXT text_style={styles.name}>
          {doctor.title}.{user.full_name}
        </TEXT>
        <TEXT text_style={styles.doc_title}>eye specialist</TEXT>
        {isHome === true ? (
          <View style={styles.go_online_wrapper}>
            <TEXT text_style={styles.goOnline}>go online now</TEXT>
            <Switch
              trackColor={{
                false: 'rgba(155,155,155,0.1)',
                true: 'rgba(155,155,155,0.1)',
              }}
              thumbColor={isOnline ? '#27AD80' : '#27AD80'}
              ios_backgroundColor="rgba(155,155,155,0.1)"
              onValueChange={() => {
                setIsOnline(!isOnline);
              }}
              value={isOnline}
            />
          </View>
        ) : null}
      </View>
      {showModal === true ? (
        <CamGalleryModal
          handleCamera={handleCameraImage}
          handleGallery={handleGalleryImage}
          isUploading={isUploading}
          handleCloseModal={() => {
            setShowModal(false);
          }}
          showUploadBtn={showUploadBtn}
          handleUploadImage={handleUploadImage}
        />
      ) : null}
    </View>
  );
};

export default DoctorHeader;

const styles = StyleSheet.create({
  profile_header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: pixelSizeVertical(31),
    height: heightPixel(125),
    width: widthPixel(300),
  },
  profile_pic: {
    width: widthPixel(100),
    height: heightPixel(100),
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: pixelSizeVertical(20),
    marginLeft: pixelSizeHorizontal(25),
  },
  name: {
    color: '#1c1c1c',
    fontWeight: '500',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },
  doc_title: {
    color: '#686868',
    fontSize: fontPixel(13),
    lineHeight: fontPixel(24),
    textTransform: 'capitalize',
  },
  goOnline: {
    color: '#1c1c1c',
    fontSize: fontPixel(16),
    lineHeight: fontPixel(24),
    fontWeight: '500',
    textTransform: 'capitalize',
    marginRight: pixelSizeHorizontal(5),
  },
  go_online_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image_profile_wrapper: {
    width: widthPixel(100),
    height: heightPixel(100),
    borderRadius: 50,
  },
  white_camera_wrapper: {
    width: widthPixel(20),
    height: heightPixel(20),
    backgroundColor: '#27AD80',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: pixelSizeVertical(-25),
    marginLeft: 'auto',
  },
});
