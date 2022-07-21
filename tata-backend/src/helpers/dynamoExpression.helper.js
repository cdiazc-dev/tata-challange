export const getUpdateExpression = (object) => {
    if (Object.keys(object).length === 0) return '';
    let expressionUpdateDynamoDB = 'set '
    for(let key in object) {
        expressionUpdateDynamoDB = expressionUpdateDynamoDB + key + ' = :' + key + ', '
    }
    return expressionUpdateDynamoDB.trim().slice(0, -1);
}

export const getAttributeExpressionValues = (object) => {
    let attributeExpressionValues = {}
    for (let key in object) {
        attributeExpressionValues[':' + key] = object[key];
    }
    return attributeExpressionValues;
}