import { FaAmazon } from 'react-icons/fa';
import {
  SiAliexpress,
  SiShein,
  SiAsos,
  SiZalando,
  SiRakuten,
  SiShopee,
  SiBoohoo,
  SiJd,
  SiLazada,
  SiTemu,
  SiFarfetch
} from 'react-icons/si';

export const SOURCES = {
  AMAZON: 'amazon',
  ALIEXPRESS: 'aliexpress',
  SHEIN: 'shein',
  ASOS: 'asos',
  ZALANDO: 'zalando',
  ABOUTYOU: 'aboutyou',
  JDCOM: 'jdcom',
  RAKUTEN: 'rakuten',
  LAZADA: 'lazada',
  SHOPEE: 'shopee',
  TEMU: 'temu',
  BOOHOO: 'boohoo',
  FARFETCH: 'farfetch',
  YESSTYLE: 'yesstyle'
};

export const sourceDetails = {
  [SOURCES.AMAZON]: {
    name: 'Amazon',
    color: '#FF9900',
    icon: 'FaAmazon',
    regions: ['global', 'eu', 'us', 'uk', 'de', 'fr', 'it', 'es']
  },
  [SOURCES.ALIEXPRESS]: {
    name: 'AliExpress',
    color: '#FF4747',
    icon: 'SiAliexpress',
    regions: ['global']
  },
  [SOURCES.SHEIN]: {
    name: 'SHEIN',
    color: '#000000',
    icon: 'SiShein',
    regions: ['global']
  },
  [SOURCES.ASOS]: {
    name: 'ASOS',
    color: '#2D2D2D',
    icon: 'SiAsos',
    regions: ['global', 'eu', 'uk']
  },
  [SOURCES.ZALANDO]: {
    name: 'Zalando',
    color: '#FF6900',
    icon: 'SiZalando',
    regions: ['eu']
  },
  [SOURCES.ABOUTYOU]: {
    name: 'ABOUT YOU',
    color: '#FF0F0F',
    icon: 'SiShopify', // Using Shopify icon as placeholder
    regions: ['eu']
  },
  [SOURCES.JDCOM]: {
    name: 'JD.com',
    color: '#FF0000',
    icon: 'SiJd',
    regions: ['asia']
  },
  [SOURCES.RAKUTEN]: {
    name: 'Rakuten',
    color: '#BF0000',
    icon: 'SiRakuten',
    regions: ['global', 'asia']
  },
  [SOURCES.LAZADA]: {
    name: 'Lazada',
    color: '#0F146D',
    icon: 'SiLazada',
    regions: ['asia']
  },
  [SOURCES.SHOPEE]: {
    name: 'Shopee',
    color: '#EE4D2D',
    icon: 'SiShopee',
    regions: ['asia']
  },
  [SOURCES.TEMU]: {
    name: 'TEMU',
    color: '#E61873',
    icon: 'SiTemu',
    regions: ['global']
  },
  [SOURCES.BOOHOO]: {
    name: 'boohoo',
    color: '#FF0092',
    icon: 'SiBoohoo',
    regions: ['global', 'eu', 'uk']
  },
  [SOURCES.FARFETCH]: {
    name: 'FARFETCH',
    color: '#000000',
    icon: 'SiFarfetch',
    regions: ['global']
  },
  [SOURCES.YESSTYLE]: {
    name: 'YesStyle',
    color: '#000000',
    icon: 'SiShopify', // Using Shopify icon as placeholder
    regions: ['global', 'asia']
  }
};