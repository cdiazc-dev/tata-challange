import * as validator from './validations'

export const createValidation = (validations, character) => {
    validator.isEmptyOrNull(validations, 'nombre', character.nombre, 'El campo es requerido');
    validator.isEmptyOrNull(validations, 'altura', character.altura, 'El campo es requerido');
    validator.isEmptyOrNull(validations, 'masa', character.masa, 'El campo es requerido');
    validator.isEmptyOrNull(validations, 'color_pelo', character.color_pelo, 'El campo es requerido');
    validator.isEmptyOrNull(validations, 'color_piel', character.color_piel, 'El campo es requerido');
    validator.isEmptyOrNull(validations, 'color_ojo', character.color_ojo, 'El campo es requerido');
    validator.isEmptyOrNull(validations, 'anio_nacimiento', character.anio_nacimiento, 'El campo es requerido');
    validator.isEmptyOrNull(validations, 'genero', character.genero, 'El campo es requerido');
    validator.getValidation(validations);
}