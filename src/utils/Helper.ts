import AsyncStorage from '@react-native-async-storage/async-storage';

export const formatedDate = (date: string) => {
  const inputDate = new Date(date);

  return inputDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('portfolio-items');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    console.log('Error: ', e);
  }
};

export const setData = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('portfolio-items', jsonValue);
  } catch (e) {
    // saving error
    console.log('Error: ', e);
  }
};
