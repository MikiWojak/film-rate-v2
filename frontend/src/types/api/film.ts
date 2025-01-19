interface IBaseFilm {
    id: string;
    title: string;
    posterUrl: string;
    avgRate: number;
    createdAt: string;
    updatedAt: string;
    film2Users?: IFilm2User[];
}

interface IFilm2User {
    filmId: string;
    userId: string;
    rate: number;
    createdAt: string;
    updatedAt: string;
}

interface IFilm extends IBaseFilm {
    description: string;
    releaseDate: string;
}

interface IFilmShowLoaderData {
    film: Promise<IFilm>;
}

interface IFilmIndexLoaderData {
    films: Promise<IBaseFilm[]>;
}

interface IRateFilmBody {
    rate: number | '';
}

interface IRateFilmRequest {
    id: string;
    body: IRateFilmBody;
}

interface IStoreFilmRequest {
    title: string;
    poster: string;
    description: string;
    releaseDate: string;
}

type IStoreFilmRequestFields =
    | 'title'
    | 'poster'
    | 'description'
    | 'releaseDate';

export type {
    IFilm,
    IBaseFilm,
    IFilm2User,
    IRateFilmBody,
    IRateFilmRequest,
    IStoreFilmRequest,
    IFilmShowLoaderData,
    IFilmIndexLoaderData,
    IStoreFilmRequestFields
};
