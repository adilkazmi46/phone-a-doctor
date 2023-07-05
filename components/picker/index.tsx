import React from 'react';
import {Platform} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';

const SelectPicker = React.forwardRef(
  (
    {
      handleOnChange,
      items,
      label,
    }: {handleOnChange: any; items: Array<any>; label: string},
    ref,
  ) => {
    return (
      <>
        {Platform.OS === 'android' ? (
          <Picker
            //@ts-ignore
            ref={ref}
            style={{display: 'none'}}
            onValueChange={async (itemValue: any, itemIndex) => {
              await handleOnChange(itemValue, itemIndex);
            }}>
            <Picker.Item value={undefined} label="options" />
            {items.map((item, index) => {
              if (item[label]) {
                return (
                  <Picker.Item
                    value={item}
                    label={item[label]}
                    key={index}
                    fontFamily="Poppins-Regular"
                  />
                );
              }
            })}
          </Picker>
        ) : null}
        {Platform.OS === 'ios' ? (
          <RNPickerSelect
            items={items}
            //@ts-ignore
            ref={ref}
            style={{
              inputIOS: {
                display: 'none',
              },
              inputAndroid: {
                display: 'none',
              },
            }}
            onValueChange={async (itemValue, itemIndex) => {
              handleOnChange(itemValue, itemIndex);
            }}></RNPickerSelect>
        ) : null}
      </>
    );
  },
);

export default SelectPicker;
