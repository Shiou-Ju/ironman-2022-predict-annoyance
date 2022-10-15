// TODO: not implemented yet
// https://stackoverflow.com/questions/64911558/custom-dialog-box-with-text-input-react-native
import React, {Button, Modal, TextInput, View} from 'react-native';

export const ModalInput = ({
  onTextChange,
  onSubmit,
  visible,
  value,
  toggle,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{justifyContent: 'center'}}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          height: 100,
          padding: 20,
          width: '80%',
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <TextInput
          value={value}
          onChangeText={onTextChange}
          placeholder={'Enter text'}
        />
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flexDirection: 'row', alignSelf: 'center'}}>
          <Button title="close" onPress={toggle} />
          <Button title="ok" onPress={onSubmit} />
        </View>
      </View>
    </Modal>
  );
};

export const modalOpen = ({props}) => {
  const {visible, text, onTextChange, setVisible} = props;
  return (
    <ModalInput
      visible={visible}
      value={text}
      onTextChange={onTextChange}
      toggle={() => setVisible(!visible)}
      onSubmit={() => setVisible(!visible)}
    />
  );
};
