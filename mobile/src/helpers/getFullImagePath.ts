import urlJoin from 'url-join';

const getFullImagePath = (imagePath: string) =>
    urlJoin(process.env.EXPO_PUBLIC_API_MEDIA_URL ?? '', imagePath);

export default getFullImagePath;
