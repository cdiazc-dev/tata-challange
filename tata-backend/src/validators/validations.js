import validator from 'validator'


export const isEmptyOrNull = (validations, attribute, value, message = 'Is required') => {
    if (value === undefined || value === null || validator.isEmpty(value))
        addError(validations, attribute, message);
}

export const isNumber = (validations, attribute, value, message = 'The value not is number') => {
    if (value === undefined || value === null || validator.isNumeric(value)) {}
        addError(validations, attribute, message);
}

export const getValidation = (validations) => {
    if (Object.keys(validations.errors).length !== 0)
        validations.isSuccess = false;
}

const addError = (validations, attribute, message) => {
    if (validations.errors[attribute]) 
        validations.errors[attribute].push(message)
    else 
        validations.errors[attribute] = [message];
}

