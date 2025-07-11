const API_URL = process.env.NODE_ENV === "development" ? process.env.EXPO_PUBLIC_DEV_API_URL: process.env.EXPO_PUBLIC_API_URL;

export default {
    API_URL
}