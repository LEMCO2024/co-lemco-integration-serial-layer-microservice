const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");
const DatabaseConecctionData = require("./db_conecction_data")
const { DATABASE_SECRET_NAME } = require("./constans")
const secretManagerClient = new SecretsManagerClient();

const getDBConecctionData = async () => {
    const secretData = await getSecretValue(DATABASE_SECRET_NAME);
    return new DatabaseConecctionData(secretData.DB_USER, secretData.DB_PASSWORD,
        secretData.DB_HOST, secretData.DB_NAME, secretData.DB_PORT)
};

const getSecretValue = async (secretName) => {
    const getSecretValueCommand = new GetSecretValueCommand({ SecretId: secretName });
    console.log("Getting secret value of: ", secretName)
    return await secretManagerClient.send(getSecretValueCommand)
        .then(secretManagerResponse => {
            if (secretManagerResponse.SecretString) {
                return JSON.parse(secretManagerResponse.SecretString);
            }
            if (secretManagerResponse.SecretBinary) {
                const buffer = new Buffer(secretManagerResponse.SecretBinary, "base64");
                return JSON.parse(buffer.toString("ascii"));
            }
        })
        .catch((error) => {
            process.stderr.write("error retrievingSecretValue: ", error);
            reject(error);
        });
};

module.exports = {
    getDBConecctionData
};