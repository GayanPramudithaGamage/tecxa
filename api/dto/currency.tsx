export interface OpenExchangeRatesResponse {
    disclaimer: string;
    license: string;
    timestamp: number;
    base: string;
    rates: {
      [currencyCode: string]: number;
    };
  }

  export interface CurrencyRatesDTO {
    base: string;
    timestamp: number;
    lastUpdated: string; 
    rates: {
      [currencyCode: string]: number;
    };
  }
  
  export const transformToDTO = (response: OpenExchangeRatesResponse): CurrencyRatesDTO => {
    return {
      base: response.base,
      timestamp: response.timestamp,
      lastUpdated: new Date(response.timestamp * 1000).toLocaleString(),
      rates: response.rates
    };
  };