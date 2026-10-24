export default {
    apiUrl: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001/api',
    apiMediaUrl:
        process.env.EXPO_PUBLIC_API_MEDIA_URL ?? 'http://localhost:3001/public'
};
