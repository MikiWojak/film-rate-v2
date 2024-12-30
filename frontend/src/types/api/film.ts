interface IBaseFilm {
    id: string;
    title: string;
    posterUrl: string;
    avgRate: number;
    createdAt: string;
    updatedAt: string;
}

interface IFilm extends IBaseFilm {
    description: string;
    releaseDate: string;
}

interface IFilmIndexLoaderData {
    films: Promise<IBaseFilm[]>;
}

interface IFilmShowLoaderData {
    film: Promise<IFilm[]>;
}

export type { IFilm, IBaseFilm, IFilmShowLoaderData, IFilmIndexLoaderData };
