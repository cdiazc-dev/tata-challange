import * as filmRepository from '../repository/film.repository';
import * as SWAPI from '../swapi/swapi'


export const get = async () => {
    console.log('[INFO] Starting scan');
    const result = await filmRepository.scan()
    console.log('[INFO] The result of the scan is:', result);
    return result;
}

export const bulk = async () => {
    console.log('[INFO] Starting bulk create');
    const films = await SWAPI.getFilms();
    const params = getFilmObjectToDynamoDB(films);
    console.log('[INFO] Items to insert on dynamoDB FilmTable:', params);
    const result = await filmRepository.bulk(params)
    console.log('[INFO] The result of the scan is:', result);
    return {
        isSuccess: true,
        message: 'Las películas se han actualizado según SWAPI',
        unprocessedItems: Object.keys(result.UnprocessedItems).length
    };
}

const getFilmObjectToDynamoDB = (films) => {
    const ids = [];
    const params = {
        RequestItems: {}
    }
    params.RequestItems[process.env.FILM_TABLE_NAME] = [];
    films.data.results.map((film) => {
        if (!ids.includes(film.episode_id)) {
            params.RequestItems[process.env.FILM_TABLE_NAME].push({
                PutRequest: {
                    Item: {
                        id: film.episode_id,
                        titulo: film.title,
                        apertura: film.opening_crawl,
                        director: film.director,
                        productor: film.producer,
                        fecha_lanzamiento: film.release_date,
                    }
                }
            });
            ids.push(film.episode_id)
        }
    });
    return params;
}