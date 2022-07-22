import { v4 as uuid } from 'uuid';
import DynamoDBHelper from '../../src/helpers/dynamoDB.helper'

test('DynamoDBHelper is an object', () => {
    expect(typeof DynamoDBHelper).toBe('object');
});

test('DynamoDBHelper has get and write', () => {
    expect(typeof DynamoDBHelper.get).toBe('function');
    expect(typeof DynamoDBHelper.scan).toBe('function');
    expect(typeof DynamoDBHelper.create).toBe('function');
    expect(typeof DynamoDBHelper.bulk).toBe('function');
    expect(typeof DynamoDBHelper.update).toBe('function');
    expect(typeof DynamoDBHelper.remove).toBe('function');
});

const validTableName = 'CharacterTable-unittest';

test('Dynamo create', async () => {
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
    expect.assertions(1);
    try {
        const res = await DynamoDBHelper.create(validTableName, newCharacter);
        console.log(res);
        expect(res).toBe(newCharacter);
    } catch (error) {
        console.log('error in dynamo write test', error);
    }
});
