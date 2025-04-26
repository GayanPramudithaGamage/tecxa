import { OpenExchangeRatesResponse, transformToDTO, CurrencyRatesDTO } from './dto/currency';

const API_KEY = '48c134dd636e4041ae5187971af30825';
const BASE_URL = 'https://openexchangerates.org/api/'

export const fetchLatestRates = async (): Promise<CurrencyRatesDTO> => {
  try {
    const response = await fetch(`${BASE_URL}/latest.json?app_id=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: OpenExchangeRatesResponse = await response.json();
    // Transform the raw API response to our DTO format
    return transformToDTO(data);
  } catch (error) {
    console.error('Error fetching latest rates:', error);
    throw error;
  }
};