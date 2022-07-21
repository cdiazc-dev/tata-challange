import { v4 as uuid } from 'uuid';
import * as characterValidator from '../validators/character.validator';
import * as characterRepository from '../repository/character.repostiroy';


export const get = async () => {
    console.log('[INFO] Starting scan');
    const result = await characterRepository.scan()
    console.log('[INFO] The result of the scan is:', result);
    return result;
}

export const getById= async (id) => {
    console.log('[INFO] Starting get character with id:', id);
    const result = await characterRepository.get(id)
    console.log('[INFO] The result of the get character by id is:', result);
    if (!result.Item) {
        return { isSuccess: false, message: 'Personaje no encontrado con el identificador: ' + id }
    }
    return { isSuccess: true, Item: result.Item };
}

export const create = async(character) => {
    const validations = { isSuccess: true, errors: {} };
    console.log('[INFO] Starting validation to object:', character);
    characterValidator.createValidation(validations, character);
    console.log('[INFO] The validation result is:', validations);
    if (!validations.isSuccess)
        return validations;
    const newCharacter = mapCharacterToNewObject(character);
    newCharacter.id = uuid(),
    newCharacter.created_at = new Date().toISOString();
    console.log('[INFO] Triying create a new character:', validations);
    await characterRepository.create(newCharacter)
    return { isSuccess: true, message: 'El personaje se creó correctamente'};
}

export const update = async(id, character) => {
    const validations = { isSuccess: true, errors: {} };
    console.log('[INFO] Starting validation to object:', character);
    characterValidator.createValidation(validations, character);
    console.log('[INFO] The validation result is:', validations);
    if (!validations.isSuccess)
        return validations;
    const result = await getById(id);
    if (!result.isSuccess) 
        return result
    const updateCharacter = mapCharacterToNewObject(character);
    updateCharacter.updated_at = new Date().toISOString();
    console.log('[INFO] Triying update character:', validations);
    await characterRepository.update(id, updateCharacter)
    return { isSuccess: true, message: 'El personaje se actualizó correctamente'};
}


export const remove = async (id) => {
    let result = await getById(id);
    if (!result.isSuccess) 
        return result
    console.log('[INFO] Starting remove character with id:', id);
    await characterRepository.remove(id)
    console.log('[INFO] The result of the get character by id is:', result);
    return { isSuccess: true, message: 'El personaje se ha eliminado correctamente'};;
}


const mapCharacterToNewObject = (character) => {
    return {
        nombre: character.nombre,
        altura: character.altura,
        masa: character.masa,
        color_pelo: character.color_pelo,
        color_piel: character.color_piel,
        color_ojo: character.color_ojo,
        anio_nacimiento: character.anio_nacimiento,
        genero: character.genero,
    }
}