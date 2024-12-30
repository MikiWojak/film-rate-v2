import config from '@/config';

// @TODO Come up with more robust solution
const getFullImagePath = (imagePath: string) =>
    `${config.apiMediaUrl}/${imagePath}`;

export default getFullImagePath;
