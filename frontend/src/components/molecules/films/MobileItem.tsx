import dayjs from 'dayjs';

import type { IBaseFilm } from '@/types/api/film';

type Props = {
    film: IBaseFilm;
};

const MobileItem = ({ film }: Props) => {
    const { title, avgRate, createdAt, updatedAt } = film;

    const formattedAvgRate = avgRate.toFixed(2);
    const formattedCreatedAt = dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss');
    const formattedUpdatedAt = dayjs(updatedAt).format('DD.MM.YYYY HH:mm:ss');

    return (
        <section className="p-4 bg-gray-200 rounded-2xl hover:bg-gray-300">
            <p>Title:</p>
            <p>
                <b>{title}</b>
            </p>

            <p>Avg Rate:</p>
            <p>
                <b>{formattedAvgRate}</b>
            </p>

            <p>Created At:</p>
            <p>
                <b>{formattedCreatedAt}</b>
            </p>

            <p>Updated At:</p>
            <p>
                <b>{formattedUpdatedAt}</b>
            </p>
        </section>
    );
};

export default MobileItem;
