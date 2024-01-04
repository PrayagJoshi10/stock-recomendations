import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import Images from '../../utils/Images';

interface Props {
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  onPress: (price: string, quantity: string) => void;
}

const EditPortfolioStockModal = ({
  modalVisible,
  setModalVisible,
  onPress,
}: Props) => {
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');
  const handleTextChange = (text: string, setText: (text: string) => void) => {
    setError('');
    const numericInput = text.replace(/[^0-9.]/g, '');
    setText(numericInput);
    return;
  };
  const onEditPress = () => {
    if (!quantity && !price) {
      setError('Enter quantity and price to edit.');
      return;
    }
    onPress(price, quantity);
    setPrice('');
    setQuantity('');
  };
  const onClose = () => {
    setError('');
    setPrice('');
    setQuantity('');
    setModalVisible(false);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <View style={styles.crossContainer}>
            <TouchableOpacity style={styles.crossButton} onPress={onClose}>
              <Image
                source={Images.cross}
                style={styles.cross}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Edit stock details.</Text>
          <View style={styles.contentContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Quantity"
              placeholderTextColor={Colors.gray_400}
              onChangeText={text => {
                handleTextChange(text, setQuantity);
              }}
              value={quantity}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter buy price"
              placeholderTextColor={Colors.gray_400}
              onChangeText={text => {
                handleTextChange(text, setPrice);
              }}
              value={price}
              keyboardType="numeric"
            />
            <Text style={styles.error}>{error}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onEditPress}>
                <Text style={styles.buttonLabel}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditPortfolioStockModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(107, 114, 128, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    width: responsiveWidth(87),
    maxWidth: 600,
    borderRadius: 8,
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(2),
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  title: {
    color: Colors.gray_700,
    fontSize: 16,
    fontFamily: Fonts.urbanist_600,
  },
  contentContainer: {width: '100%'},
  input: {
    height: 40,
    paddingHorizontal: 10,
    borderColor: Colors.gray_400,
    borderBottomWidth: 0.5,
    color: Colors.gray_700,
    marginTop: 20,
  },
  error: {
    marginTop: 10,
    color: Colors.red_600,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  button: {
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
    borderRadius: 8,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#00A9F1',
    elevation: 1,
    shadowOpacity: 0.7,
    shadowRadius: 2,
  },
  buttonLabel: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.urbanist_600,
  },
  crossContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  crossButton: {
    padding: 5,
  },
  cross: {
    height: responsiveHeight(2),
    minHeight: 16,
    width: responsiveHeight(2),
    minWidth: 16,
  },
});
