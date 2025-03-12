import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    // Use CoinGecko's free API endpoint
    baseUrl:  'https://api.coingecko.com/api/v3',
  }),
  keepUnusedDataFor: 300, // Cache data for 5 minutes
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => ({
        url: '/coins/markets',
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: count,
          page: 1,
          sparkline: false,
        },
      }),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => ({
        url: `/coins/${coinId}`,
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: false,
        },
      }),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => ({
        url: `/coins/${coinId}/market_chart`,
        params: {
          vs_currency: 'usd',
          days: timeperiod,
          interval: 'daily',
        },
      }),
    }),
    getExchanges: builder.query({
      query: () => '/exchanges',
    }),
    getGlobalStats:  builder.query({
      query: () => '/global',
    }),
  }),
});

export default cryptoApi;

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
  useGetGlobalStatsQuery,
} = cryptoApi;
