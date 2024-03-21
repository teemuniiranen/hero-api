# AWS AppSync API with Amazon Verified Permissions

This is an example AWS project to deploy an Amazon DynamoDB-backed AWS AppSync API, which uses Amazon Verified Permissions to handle API access. Amazon Cognito User Pool is used as a user directory, and two groups are created by default, one named User and the other Admin. These groups are used to provide role-based access control (RBAC).

![Architecture](/images/architecture.png)

## Prerequisites

OpenTofu (or Terraform) installed: https://opentofu.org/docs/intro/install/

Node installed: https://nodejs.org/en/learn/getting-started/how-to-install-nodejs

AWS CLI installed: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html

Terragrunt installed (optional): https://terragrunt.gruntwork.io/docs/getting-started/install/

## Repository Structure

The most important resources when thinking about developing the solution further:

```
schema.graphql
infra
 └ appsync.tf
   cognito.tf
   dynamodb.tf
   main.tf
   outputs.tf
   provider.tf
   variables.tf
   verified-permissions.tf
policies
 └ schema.json
   admin_policy.cedar
   user_policy.cedar
src
 └ appsync
   └ authorizer
     resolvers
test
 └ appsync
   └ authorizer
     resolvers
deployment
 └ terragrunt.hcl
   dev
    └ env.hcl
      hero-api
       └ terragrunt.hcl
```

Where:

- **schema.graphql**: Amazon AppSync schema
- **infra**: All infrastructure code can be found here. To turn on caching, change the `authorizer_result_ttl_in_seconds` value higher than zero seconds in the `appync.tf` file.
- **policies**: Amazon Verified Permissions schema and the policies.
- **src**: TypeScript source code for AppSync Lambda Authorizer and the resolvers.
- **test**: Unit tests.
- **deployment**: Sample Terragrunt configuration you can use to deploy. The `env.hcl` file contains all the environment specific variables for running Terragrunt.

NOTE: Terragrunt has a great support for immutable, versioned Terraform modules where you can have the actual deployments part in another git repository and reference the modules in another one. https://terragrunt.gruntwork.io/docs/getting-started/quick-start/#promote-immutable-versioned-terraform-modules-across-environments

## Generating TypeSript Types

If you change the schema.graphql, you can generate the TypeScript types with AWS Amplify codegen command:

```
$ npx @aws-amplify/cli codegen add
$ npx @aws-amplify/cli codegen
```

## DynamoDB

The following access patterns are supported.

Table:

| Access pattern |       PK       |       SK |
| -------------- | :------------: | -------: |
| Get Hero       | HERO_ID#\<id\> | PROFILE# |

Global Secondary Index 1:

| Access pattern             |  GSI1PK  |      GSI1SK |
| -------------------------- | :------: | ----------: |
| List Heroes                | PROFILE# |             |
| List Heroes by EMEA region | PROFILE# | REGION#EMEA |

Check out /src/appsync/resolvers for the implementation.

## Deployment

To deploy with Terragrunt:

```
$ cd deployment/dev/hero-api
$ terragrunt init
$ terragrunt apply
```

From the output, note down the user identifier (cognito_user_pool_id) and the Cognito client identifier (cognito_client_id).

## Creating Cognito Users with AWS CLI

Create user:

```
aws cognito-idp admin-create-user \
  --user-pool-id <your cognito user pool id> \
  --username test-user
```

Change the generated password and make it permanent:

```
aws cognito-idp admin-set-user-password \
  --user-pool-id <your cognito user pool id> \
  --username test-user \
  --password <your password> \
  --permanent
```

And assign the user to the User group:

```
aws cognito-idp admin-add-user-to-group \
  --user-pool-id  <your cognito user pool id> \
  --username test-user \
  --group-name User
```

Repeat the process to create an admin user by changing at least the username and the group name to Admin.

## Sign in with AWS CLI

Sign in to get the tokens for the API:

```
aws cognito-idp admin-initiate-auth \
  --auth-flow ADMIN_NO_SRP_AUTH \
  --user-pool-id  <your cognito user pool id> \
  --client-id  <your cognito client id> \
  --auth-parameters USERNAME=test-user,PASSWORD=<your password>
```

Copy the value of the AccessToken property in the response:

```
{
    "ChallengeParameters": {},
    "AuthenticationResult": {
        "AccessToken": "eyJra...
```

## Testing APIs with the Access token

You can do this in the AWS Console. Open AWS AppSync service and the Queries tool under the API.

To test with Postman, curl, etc. Note appsync_graphql_api_uris output (GRAPHQL address) and post the query payload. Use the token in Authorization header. Add Content-Type header with value "application/json".

### AddHero

POST https://myappsyncid.appsync-api.eu-north-1.amazonaws.com/graphql

```
{
  "query": "mutation MyMutation($alias: String!, $name: String!, $region: REGION!) { addHero(alias: $alias, name: $name, region: $region) { heroId alias name region } }",
  "variables": {
    "name": "Dr. Isaac Richardson",
    "alias": "Quantum Man",
    "region": "EMEA"
  }
}
```

### GetHero

POST https://myappsyncid.appsync-api.eu-north-1.amazonaws.com/graphql

```
{
    "query": "query MyQuery($heroId: ID!) { getHero(heroId: $heroId) { heroId region alias } }",
    "variables": {
        "heroId": "d7c05ef2-e315-4683-a3dd-5857c84e76d8"
    }
}
```

### ListHeroes

POST https://myappsyncid.appsync-api.eu-north-1.amazonaws.com/graphql

```
{
    "query": "query MyQuery($region: REGION!) { listHeroes(region: $region) { heroes { heroId alias name region } } }",
    "variables": {
        "region": "EMEA"
    }
}
```
