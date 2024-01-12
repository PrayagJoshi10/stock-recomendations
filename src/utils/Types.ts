export interface StockListResponse {
  Close: number;
  Date: string;
  High: number;
  High_T: number;
  Industry: string;
  LTP: number;
  Low: number;
  Open: number;
  PercentageChange: number;
  Prev_RSI: number;
  RSI: number;
  Status: string;
  Symbol: string;
  logo: string;
}

export interface PortfolioCardTypes {
  Symbol: string;
  Date: string;
  Quantity: string;
  Price: string;
  Logo: string;
  Level: string;
}

interface Values {
  Close: number;
  Date: string;
  High: number;
  LTP: number;
  Low: number;
  Open: number;
  Prev_RSI: number;
  RSI: number;
  SL: number;
  SMA20: number;
  Target1: number;
  Target2: number;
  Target3: number;
  Volume: number;
  percentage: string;
}

interface Entry {
  Date: string;
  Note: string;
  SL: number;
  'Trade Status': string;
}

export interface StockInfo {
  Entry: Entry;
  SL: {
    Date: string;
    Note: string;
    Profit: number;
    'Remaining Shares': number;
    SL: number;
  };
  Info: string;
  Stock: {
    Industry: string;
    Logo: string;
    Name: string;
    Values: Values;
    Status: string;
  };
  TGT1: {
    Date: string;
    Note: string;
    Profit: number;
    'Remaining Shares': number;
    SL: number;
  };
  TGT2: {
    Date: string;
    Note: string;
    Profit: number;
    'Remaining Shares': number;
    SL: number;
  };
  TGT3: {
    Date: string;
    Note: string;
    Profit: number;
    'Remaining Shares': number;
    SL: number;
  };
  TotalProfit: {
    Profit: number;
    'Trade Status': string;
  };
}
