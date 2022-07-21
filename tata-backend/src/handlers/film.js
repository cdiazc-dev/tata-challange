import * as filmService from '../services/film.service';


const get = async (event, context) => {
    console.log('[INFO] Starting with the Lambda read_films');
    const result = await filmService.get()
    console.log('[INFO] RESULT:', result);
    return {
        statusCode: 200,
        body: JSON.stringify(result ? result.Items : []),
    };
}

const bulkUpload = async (event, context) => {
    console.log('[INFO] Starting with the Lambda bulk_films');
    const result = await filmService.bulk()
    console.log('[INFO] RESULT:', result);
    return {
        statusCode: 200,
        body: JSON.stringify(result),
    };
}

const film = async (event, context) => {
    console.log("[INFO] Starting with lambdas to characters")
    switch (event.httpMethod.toUpperCase()) {
        case "GET":
            return get(event, context);
        case "POST":
            return bulkUpload(event, context);
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Request URL not found'}),
    };
};


export const handler = film;