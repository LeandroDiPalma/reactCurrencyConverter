export const heading = "currency converter";
const API_DOMAIN = "https://api.freecurrencyapi.com";
const API_KEY = "apikey=fca_live_ZvH4SJ6PS2MLBIqdVaHZa9Lx3BE3dDgQZrgYt9De";
export const endpointPath = (currencies) =>
  `${API_DOMAIN}/v1/latest?${API_KEY}&currencies=${currencies}`;


export const currenciesPath = () => 
  `${API_DOMAIN}/v1/currencies?${API_KEY}`;
