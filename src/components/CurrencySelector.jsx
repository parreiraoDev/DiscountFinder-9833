import { motion } from 'framer-motion';

export const CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  KRW: { symbol: '₩', name: 'South Korean Won' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' }
};

const CurrencySelector = ({ selectedCurrency, onCurrencyChange }) => {
  return (
    <motion.select
      onChange={(e) => onCurrencyChange(e.target.value)}
      value={selectedCurrency}
      className="px-3 py-2 rounded-lg bg-gray-100 border-none focus:ring-2 focus:ring-primary"
    >
      {Object.entries(CURRENCIES).map(([code, currency]) => (
        <option key={code} value={code}>
          {currency.symbol} {code}
        </option>
      ))}
    </motion.select>
  );
};

export default CurrencySelector;