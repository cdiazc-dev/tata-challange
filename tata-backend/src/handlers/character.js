import * as characterService from '../services/character.service';


const get = async (event, context) => {
    const pathElements = event.path.split('/');
    if (['characters', ''].includes(pathElements[pathElements.length - 1]))
        return getAllCharacters(event, context);
    else 
        return getByKey(event, context);
}

const getAllCharacters = async (event, context) => {
    console.log('[INFO] Starting with the Lambda read_character');
    const result = await characterService.get()
    console.log('[INFO] RESULT:', result);
    return {
        statusCode: 200,
        body: JSON.stringify(result ? result.Items : []),
    };
}

const getByKey = async (event, context) => {
    const { id } = event.pathParameters;
    const result = await characterService.getById(id);
    if (!result.isSuccess)
        return {
            statusCode: 404,
            body: JSON.stringify(result)
        }
    return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
    };
}

const create = async (event, context) => {
    console.log('[INFO] Starting with the Lambda create_character');
    const character = JSON.parse(event.body);
    const result = await characterService.create(character);
    if (!result.isSuccess)
        return {
            statusCode: 422,
            body: JSON.stringify(result)
        }
    return {
        statusCode: 201,
        body: JSON.stringify(result)
    };
}

const update = async (event, context) => {
    console.log('[INFO] Starting with the Lambda update_character');
    const { id } = event.pathParameters;
    const character = JSON.parse(event.body);
    const result = await characterService.update(id, character);
    if (!result.isSuccess)
        return {
            statusCode: 422,
            body: JSON.stringify(result)
        }
    return {
        statusCode: 201,
        body: JSON.stringify(result)
    };
}

const remove = async (event, context) => {
    console.log('[INFO] Starting with the Lambda delete_character');
    const { id } = event.pathParameters;
    const result = await characterService.remove(id);
    if (!result.isSuccess)
        return {
            statusCode: 422,
            body: JSON.stringify(result)
        }
    return {
        statusCode: 201,
        body: JSON.stringify(result)
    };
}


const character = async (event, context) => {
    console.log("[INFO] Starting with lambdas to characters")
    switch (event.httpMethod.toUpperCase()) {
        case "GET":
            return get(event, context);
        case "POST":
            return create(event, context);
        case "PUT":
            return update(event, context);
        case "DELETE":
            return remove(event, context);
    }

    return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Request URL not found'}),
    };
};


export const handler = character;