## build all functions
sam build --use-container

## build unique function
sam build --use-container <functions_name>

## Sync only code unique function
sam sync --code --resource-id <functions_name> --stack-name liberty-payments-back-sam --profile <your_profile>

## Sync code and dependencies unique function
sam sync --resource-id <functions_name> --stack-name liberty-payments-back-sam --profile <your_profile>

## Deploy all functions is force
sam deploy --profile <your_profile>