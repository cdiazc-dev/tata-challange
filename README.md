# Tata challenge
## Nodejs AWS Lambda

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
## Plugins

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |
