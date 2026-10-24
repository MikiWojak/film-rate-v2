import urlJoin from 'url-join';

import config from '@/config';

const getFullImagePath = (imagePath: string) => {
    const { apiMediaUrl } = config;

    return urlJoin(apiMediaUrl, imagePath);
};

export default getFullImagePath;
