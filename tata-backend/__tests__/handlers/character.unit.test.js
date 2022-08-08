import * as characterHandler from '../../src/handlers/character'


describe('environmental variables', () => {
    const OLD_ENV = process.env;
  
    beforeEach(() => {
        jest.resetModules()
        process.env = { ...OLD_ENV };
    });
  
    afterAll(() => {
        process.env = OLD_ENV;
    });

    test('Get characters', async() => {
        process.env = { ...OLD_ENV, ...{ CHARACTER_TABLE_NAME: 'CharacterTable-unittest' }}
        expect.assertions(2);
        try {
            const response = await characterHandler.handler({
                httpMethod: 'GET',
                path: '/characters'
            })
            expect(response.statusCode).toStrictEqual(200);
            expect(Array.isArray(JSON.parse(response.body))).toStrictEqual(true);
        } catch (err) {
            console.error(err);
            throw err
        }
    });

    test('Create character without errors', async() => {
        process.env = { ...OLD_ENV, ...{ CHARACTER_TABLE_NAME: 'CharacterTable-unittest' }}
        expect.assertions(3);
        try {
            const response = await characterHandler.handler({
                httpMethod: 'POST',
                body: JSON.stringify({
                    nombre: "Lesli Díaz Chávez",
                    altura: "170",
                    masa: "78",
                    color_pelo: "negro",
                    color_piel: "morena",
                    color_ojo: "negro",
                    anio_nacimiento: "1997",
                    genero: "male"
                })
            })
            expect(response.statusCode).toStrictEqual(201);
            expect(JSON.parse(response.body).isSuccess).toStrictEqual(true);
            expect(JSON.parse(response.body).message).toStrictEqual('El personaje se creó correctamente');
        } catch (err) {
            console.error(err);
            throw err
        }
    });

    test('Create character with error validations', async() => {
        process.env = { ...OLD_ENV, ...{ CHARACTER_TABLE_NAME: 'CharacterTable-unittest' }}
        expect.assertions(3);
        try {
            const response = await characterHandler.handler({
                httpMethod: 'POST',
                body: JSON.stringify({})
            })
            expect(response.statusCode).toStrictEqual(422);
            expect(JSON.parse(response.body).isSuccess).toStrictEqual(false);
            expect(Object.keys(JSON.parse(response.body).errors).length).toStrictEqual(8);
        } catch (err) {
            console.error(err);
            throw err
        }
    });

});

