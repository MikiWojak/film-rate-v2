import { IBaseFilm } from '@/types/api/film';
import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
    film: IBaseFilm | null;
    onClose: () => void;
};

// @TODO Block BG!
// @TODO Unify - not found and content or sth else
// @TODO Remove rate
const RateModal = ({ film, onClose }: Props) => {
    if (!film) {
        return (
            <div>
                <button onClick={onClose}>X</button>
                <div>Cannot load modal!</div>
            </div>
        );
    }

    const { title } = film;

    return (
        <div className="flex justify-center items-center fixed top-0 z-10 w-screen h-screen p-4 bg-black/20">
            <div className="flex flex-col gap-4 p-4 bg-white rounded-2xl w-full sm:max-w-100">
                <div className="flex justify-end">
                    <button onClick={onClose}>
                        <XMarkIcon className="size-4" />
                    </button>
                </div>

                <div>
                    <h2 className="font-medium text-center md:text-2xl">
                        Rate film
                    </h2>
                    <h1 className="text-2xl font-bold text-center md:text-3xl">
                        {title}
                    </h1>
                </div>

                <select className="block w-full p-2 rounded-lg outline-2 bg-white border-2 border-slate-400 focus:outline-black sm:p-4">
                    <option disabled selected>
                        -- Rate film --
                    </option>
                    <option value="10">(10) Masterpiece</option>
                    <option value="9">(9) Great</option>
                    <option value="8">(8) Very Good</option>
                    <option value="7">(7) Good</option>
                    <option value="6">(6) Fine</option>
                    <option value="5">(5) Average</option>
                    <option value="4">(4) Bad</option>
                    <option value="3">(3) Very Bad</option>
                    <option value="2">(2) Horrible</option>
                    <option value="1">(1) Appalling</option>
                </select>

                <button className="block w-full p-2 bg-violet-500 rounded-lg text-white font-medium hover:bg-violet-600 disabled:bg-violet-200 disabled:hover:bg-violet-200 sm:p-4">
                    Rate
                </button>
            </div>
        </div>
    );
};

export default RateModal;
