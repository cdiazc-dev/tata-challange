import * as repository from '../helpers/dynamoDB.helper';
import createError from 'http-errors';


export const get = async (id) => {
    try {
        console.log('[INFO] Get character with id on dynamodb table CharacterTable:', id);
        return await repository.get(process.env.CHARACTER_TABLE_NAME, { id });
    } catch (error) {
        console.error('ERROR:', error);
        throw new createError.InternalServerError(erro)
    }
}

export const scan = async () => {
    try {
        console.log('[INFO] Scan on dynamoDB table CharacterTable');
        return await repository.scan(process.env.CHARACTER_TABLE_NAME);
    } catch (error) {
        console.error('ERROR:', error)
        throw new createError.InternalServerError(error);
    }
}

export const create = async (character) => {
    try {
        console.log('[INFO] Create character on dynamodb table CharacterTable:', character);
        await repository.create(process.env.CHARACTER_TABLE_NAME, character);
    } catch (error) {
        console.error('ERROR:', error)
        throw new createError.InternalServerError(error);
    }
}

export const update = async (id, character) => {
    try {
        console.log('[INFO] Update character on dynamodb table CharacterTable with id:', id);
        console.log('[INFO] Update character on dynamodb table CharacterTable with new values:', character);
        return await repository.update(process.env.CHARACTER_TABLE_NAME, { id }, character);
    } catch (error) {
        console.error('ERROR:', error)
        throw new createError.InternalServerError(error);
    }
}

export const remove = async (id) => {
    try {
        console.log('[INFO] Remove character with id on dynamodb table CharacterTable:', id);
        return await repository.remove(process.env.CHARACTER_TABLE_NAME, { id });
    } catch (error) {
        console.error('ERROR:', error);
        throw new createError.InternalServerError(error)
    }
}



