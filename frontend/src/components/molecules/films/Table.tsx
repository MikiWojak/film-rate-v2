import dayjs from 'dayjs';

import { IBaseFilm } from '@/types/api/film';

type Props = {
    films: IBaseFilm[];
};

const Table = ({ films }: Props) => {
    const filmRows = films.map(film => {
        const { title, avgRate, createdAt, updatedAt } = film;

        const formattedAvgRate = avgRate.toFixed(2);
        const formattedCreatedAt = dayjs(createdAt).format(
            'DD.MM.YYYY HH:mm:ss'
        );
        const formattedUpdatedAt = dayjs(updatedAt).format(
            'DD.MM.YYYY HH:mm:ss'
        );

        return (
            <tr className="hover:bg-gray-200">
                <td className="p-2 border border-black">{title}</td>
                <td className="p-2 border border-black">{formattedAvgRate}</td>
                <td className="p-2 border border-black">
                    {formattedCreatedAt}
                </td>
                <td className="p-2 border border-black">
                    {formattedUpdatedAt}
                </td>
            </tr>
        );
    });

    return (
        <table className="w-full table-auto border-collapse border border-black">
            <thead>
                <tr>
                    <th className="p-2 border border-black">Title</th>
                    <th className="p-2 border border-black">Avg Rate</th>
                    <th className="p-2 border border-black">Created At</th>
                    <th className="p-2 border border-black">Updated At</th>
                </tr>
            </thead>
            <tbody className="text-center">{filmRows}</tbody>
        </table>
    );
};

export default Table;
