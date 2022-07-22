import DynamoDBHelper from '../helpers/dynamoDB.helper';
import createError from 'http-errors';


export const scan = async () => {
    try {
        console.log('[INFO] Scan on dynamoDB table FilmTable');
        return await DynamoDBHelper.scan(process.env.FILM_TABLE_NAME);
    } catch (error) {
        console.error('ERROR:', error)
        throw new createError.InternalServerError(error);
    }
}

export const bulk = async (params) => {
    try {
        console.log('[INFO] Bulk create on dynamoDB table FilmTable');
        return await DynamoDBHelper.bulk(params);
    } catch (error) {
        console.error('ERROR:', error)
        throw new createError.InternalServerError(error);
    }
}