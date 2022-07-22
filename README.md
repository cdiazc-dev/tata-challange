# Tata challenge
## Nodejs AWS Lambda
### Ejecución de aplicación
Para iniciar con estre proyecto primero de deberá instalara Serverless Framework
```sh
npm install -g serverless
```
Una vez instalado Serverless Framework vamos actualizar nuestras credenciales de AWS.
```sh
serverless config credentials \
  --provider aws \
  --key <YOUR_ACCESS_KEY_ID> \
  --secret <YOUR_SECRET_ACCESS_KEY>
```
Para poder desplegar nuestros Lambdas y recursos sobre AWS debemos ejecutar el siguiente comando
```sh
serverless deploy --stage <YOUR_STAGE>
```
Para poder ejecutar nuestras pruebas unitarias deberemos primero ubicarnos en nuestra carpeta raíz y ejecutar el siguiente comando
```sh
cd tata-backend && npm run test
```
#### Ejecución de Lambda de forma local
Si deseamos ejecutar nuestro Lambda de forma local tenemos las siguientes ejecuciones para probar.
Tener encuenta para utilizar esto debemos tener configurado nuestro aws-cli, para que no ocurrá errores con las crendenciales de AWS al ingresar a DynamoDB
```sh
-- [GET] /characters
sls invoke local -f read_character --path mocks/read_character.json -e CHARACTER_TABLE_NAME=CharacterTable-local -e FILM_TABLE_NAME=FilmTable-local -e SWAPI_URL_BASE=https://swapi.py4e.com/api/
-- [GET] /characters/{id}
sls invoke local -f read_character_by_id --path mocks/read_character_by_id.json -e CHARACTER_TABLE_NAME=CharacterTable-local -e FILM_TABLE_NAME=FilmTable-local -e SWAPI_URL_BASE=https://swapi.py4e.com/api/
-- [POST] /characters
sls invoke local -f create_character --path mocks/create_character.json -e CHARACTER_TABLE_NAME=CharacterTable-local -e FILM_TABLE_NAME=FilmTable-local -e SWAPI_URL_BASE=https://swapi.py4e.com/api/
```
### APIs

Información de las API creadas.

| APIS | Información |
| ------ | ------ |
|(200)[GET] /characters |Devuelve un array de elementos de personajes registrados en DynamoDB.|
|(200)[GET] /characters/{id} |Devuelve un objeto con la información del personaje obtenida de DynamoDB.|
|(201)[POST] /characters |Devuelve un objeto con un mensaje de confirmación del registro del nuevo personaje sobre DynamoDB.|
|(201)[PUT] /characters |Devuelve un objeto con un mensaje de confirmación de la actulización del personaje sobre DynamoDB.|
|(201)[DELETE] /characters/{id} |Devuelve un objeto con un mensaje de confirmación de la eliminación del personaje sobre DynamoDB.|
|(200)[GET] /films |Devuelve un array de elementos con todas las películas registras en DynamoDB|
|(200)[POST] //films/bulk |Hace una consulta a la API de Starts Wars obteniendo todas las películas y cargándolas a DynamoDB, esta api devuelve un mensaje de ejecución exitosa|
