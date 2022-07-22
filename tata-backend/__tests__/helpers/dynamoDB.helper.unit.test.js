import { v4 as uuid } from 'uuid';
import DynamoDBHelper from '../../src/helpers/dynamoDB.helper'

describe('environmental variables', () => {

    test('DynamoDBHelper is an object', () => {
        expect.assertions(1);
        expect(typeof DynamoDBHelper).toBe('object');
    });
    
    test('DynamoDBHelper check all methods', () => {
        expect.assertions(6);
        expect(typeof DynamoDBHelper.get).toBe('function');
        expect(typeof DynamoDBHelper.scan).toBe('function');
        expect(typeof DynamoDBHelper.create).toBe('function');
        expect(typeof DynamoDBHelper.bulk).toBe('function');
        expect(typeof DynamoDBHelper.update).toBe('function');
        expect(typeof DynamoDBHelper.remove).toBe('function');
    });
    
    const validTableName = 'CharacterTable-unittest';
    
    const newCharacter = {
        id: uuid(),
        nombre: "Carlos Díaz Chávez",
        altura: "170",
        masa: "78",
        color_pelo: "negro",
        color_piel: "morena",
        color_ojo: "negro",
        anio_nacimiento: "1997",
        genero: "male"
    }
    
    test('Dynamo create', async () => {
        expect.assertions(1);
        try {
            const res = await DynamoDBHelper.create(validTableName, newCharacter);
            expect(res).toStrictEqual({})
        } catch (error) {
            console.error('error in dynamo create test', error);
            throw error;
        }
    });
    
    test('Dynamo get character', async () => {
        expect.assertions(1);
        try {
            const res = await DynamoDBHelper.get(validTableName, { id: newCharacter.id });
            expect(res.Item).toStrictEqual(newCharacter);
        } catch (error) {
            console.error('error in dynamo get test', error);
            throw error;
        }
    });
    
    test('Dynamo scan characters', async () => {
        expect.assertions(1);
        try {
            const res = await DynamoDBHelper.scan(validTableName);
            expect(res.Items).toStrictEqual([newCharacter]);
        } catch (error) {
            console.error('error in dynamo scan test', error);
            throw error;
        }
    });
    
    test('Dynamo update characters', async () => {
        expect.assertions(2);
        try {
            const updateCharacter = {
                nombre: "Diego Díaz Chávez",
                altura: "173",
                masa: "72",
                color_pelo: "negro",
                color_piel: "morena",
                color_ojo: "negro",
                anio_nacimiento: "2007",
                genero: "male"
            }
            const resUpdate = await DynamoDBHelper.update(validTableName, { id: newCharacter.id }, updateCharacter);
            expect(resUpdate).toStrictEqual({})
            const res = await DynamoDBHelper.get(validTableName, { id: newCharacter.id });
            expect(res.Item).toStrictEqual({ id: newCharacter.id, ...updateCharacter })
        } catch (error) {
            console.error('error in dynamo update test', error);
            throw error;
        }
    });
    
    test('Dynamo remote characters', async () => {
        expect.assertions(1);
        try {
            const resUpdate = await DynamoDBHelper.remove(validTableName, { id: newCharacter.id });
            expect(resUpdate).toStrictEqual({})
        } catch (error) {
            console.error('error in dynamo remove test', error);
            throw error;
        }
    });
    
    
    test('Dynamo bulk characters', async () => {
        expect.assertions(1);
        try {
            const characters = [
                {
                    id: uuid(),
                    nombre: "Carlos Díaz Chávez",
                    altura: "173",
                    masa: "72",
                    color_pelo: "negro",
                    color_piel: "morena",
                    color_ojo: "negro",
                    anio_nacimiento: "2007",
                    genero: "male"
                },
                {
                    id: uuid(),
                    nombre: "Diego Díaz Chávez",
                    altura: "173",
                    masa: "72",
                    color_pelo: "negro",
                    color_piel: "morena",
                    color_ojo: "negro",
                    anio_nacimiento: "2007",
                    genero: "male"
                },
                {
                    id: uuid(),
                    nombre: "Luciana Díaz Chávez",
                    altura: "173",
                    masa: "72",
                    color_pelo: "negro",
                    color_piel: "morena",
                    color_ojo: "negro",
                    anio_nacimiento: "2007",
                    genero: "male"
                }
            ];
            const params = getCharacterObjectToDynamoDB(characters);
            const res = await DynamoDBHelper.bulk(params);
            expect(Object.keys(res.UnprocessedItems).length).toStrictEqual(0);
        } catch (error) {
            console.error('error in dynamo bulk test', error);
            throw error;
        }
    });
    
    const getCharacterObjectToDynamoDB = (characters) => {
        const ids = [];
        const params = {
            RequestItems: {}
        }
        params.RequestItems[validTableName] = [];
        characters.map((character) => {
            if (!ids.includes(character.id)) {
                params.RequestItems[validTableName].push({
                    PutRequest: {
                        Item: {
                            id: character.id,
                            nombre: character.nombre,
                            altura: character.altura,
                            masa: character.masa,
                            color_pelo: character.color_pelo,
                            color_piel: character.color_piel,
                            color_ojo: character.color_ojo,
                            anio_nacimiento: character.anio_nacimiento,
                            genero: character.genero
                        }
                    }
                });
                ids.push(characters.id)
            }
        });
        return params;
    }

});





