export const config = {
  googleMapAPI:
    process.env.REACT_APP_MAP_API_KEY ||
    "AIzaSyDx_OSRfTe1WJmyTKKodVubYubt39yGSJM",
  baseURL: process.env.REACT_APP_THIS_BACKEND || "",
  ddsURL: process.env.REACT_APP_DDS || "",
};
