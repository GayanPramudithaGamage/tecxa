import { OpenExchangeRatesResponse, transformToDTO, CurrencyRatesDTO } from './dto/currency';


const API_KEY =  process.env.EXPO_PUBLIC_OPEN_EXCHANGE_RATES_API_KEY;
const BASE_URL = 'https://openexchangerates.org/api/'

export const fetchLatestRates = async (): Promise<CurrencyRatesDTO> => {
  try {
    const response = await fetch(`${BASE_URL}/latest.json?app_id=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: OpenExchangeRatesResponse = await response.json();

    return transformToDTO(data);
  } catch (error) {
    console.error('Error fetching latest rates:', error);
    throw error;
  }
};