import urlJoin from 'url-join';

import config from '@/config';

const getFullImagePath = (imagePath: string) => {
    return urlJoin(config.apiMediaUrl, imagePath);
};

export default getFullImagePath;
