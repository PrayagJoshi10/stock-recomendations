import AsyncStorage from '@react-native-async-storage/async-storage';

export const formatedDate = (date: string) => {
  const inputDate = new Date(date);

  return inputDate.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
    console.log('Error: ', e);
  }
};

export const setData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    console.log('Error: ', e);
  }
};

export const calculateTotalInvestment = (
  price: string | number,
  quantity: string | number,
) => {
  if (!quantity || !price) {
    return '--';
  }
  const investment = Number(quantity) * Number(price);

  const investmentUpto2Decimal = investment.toFixed(2);
  return investmentUpto2Decimal;
};
export const calculateCurrentInvestment = (
  currentPrice: string | number | undefined,
  quantity: string | number | undefined,
) => {
  if (!quantity || !currentPrice) {
    return '--';
  }
  const currentInvestment = Number(currentPrice) * Number(quantity);

  const currentInvestmentUpto2Decimal = currentInvestment.toFixed(2);
  return currentInvestmentUpto2Decimal;
};

export const calculateCurrentProfit = (
  buyPrice: string | number | undefined,
  currentPrice: string | number | undefined,
  quantity: string | number | undefined,
) => {
  if (!quantity || !buyPrice || !currentPrice) {
    return '--';
  }
  const currentInvestment =
    Number(currentPrice) * Number(quantity) -
    Number(buyPrice) * Number(quantity);

  const currentInvestmentUpto2Decimal = currentInvestment.toFixed(2);
  return currentInvestmentUpto2Decimal;
};

export const calculateCurrentGains = (
  buyPrice: string | number | undefined,
  currentPrice: string | number | undefined,
  quantity: string | number | undefined,
) => {
  if (!quantity || !buyPrice || !currentPrice) {
    return '--';
  }
  const buyValue = Number(buyPrice) * Number(quantity);
  const currentValue = Number(currentPrice) * Number(quantity);

  // Calculate the percentage change
  const percentageChange = ((currentValue - buyValue) / buyValue) * 100;
  const percentageChangeUpto2Decimal = percentageChange.toFixed(2);
  return percentageChangeUpto2Decimal;
};
