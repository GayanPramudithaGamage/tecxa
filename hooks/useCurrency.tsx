// src/hooks/useCurrency.ts
import { useState, useEffect } from 'react';
import { fetchLatestRates } from '../api/client';
import { CurrencyRatesDTO } from '../api/dto/currency';

export const useCurrency = () => {
  const [rates, setRates] = useState<CurrencyRatesDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Load rates on component mount
  useEffect(() => {
    loadRates();
  }, []);
  
  // Function to load latest rates
  const loadRates = async () => {
    try {
      setLoading(true);
      const data = await fetchLatestRates();
      setRates(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch rates'));
    } finally {
      setLoading(false);
    }
  };
  
  // Convert currency function
  const convertCurrency = (amount: number, from: string, to: string): number => {
    if (!rates || !amount) return 0;
    
    // Handle base currency case
    if (from === rates.base) {
      return amount * (rates.rates[to] || 0);
    }
    
    // Convert from source to base, then to target
    const amountInBaseCurrency = amount / (rates.rates[from] || 1);
    return amountInBaseCurrency * (rates.rates[to] || 0);
  };
  
  // Get all available currencies
  const getAvailableCurrencies = (): {label: string, value: string}[] => {
    if (!rates) return [];
    
    return Object.keys(rates.rates).map(code => ({
      label: code,
      value: code
    }));
  };
  
  // Get exchange rate between two currencies
  const getExchangeRate = (from: string, to: string): number => {
    if (!rates) return 0;
    return convertCurrency(1, from, to);
  };
  
  return {
    rates,
    loading,
    error,
    convertCurrency,
    getAvailableCurrencies,
    getExchangeRate,
    loadRates
  };
};