module "appsync_authorizer" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = join("-", [var.nameprefix, "appsync-auth", var.env])
  description   = "AppSync AWS_LAMBDA authorization"
  handler       = "authorizer.handler"
  runtime       = "nodejs20.x"
  cloudwatch_logs_retention_in_days = 7
  publish = true

  create_package         = false
  local_existing_package = "../out/appsync/authorizer.zip"

  allowed_triggers = {
    AppSync = {
      principal = "appsync.amazonaws.com"
      action = "lambda:InvokeFunction"
    }
  }

  attach_policy_statements = true
  policy_statements = {
    avp = {
      effect    = "Allow",
      actions   = ["verifiedpermissions:isauthorized"],
      resources = [aws_verifiedpermissions_policy_store.this.arn]
    }
  }

  environment_variables = {
    DEBUG = "true"
    COGNITO_USER_POOL_ID = aws_cognito_user_pool.this.id
    COGNITO_CLIENT_ID = aws_cognito_user_pool_client.this.id
    POLICY_STORE_ID = aws_verifiedpermissions_policy_store.this.id
  } 
}

module "appsync" {
  source = "terraform-aws-modules/appsync/aws"
  name = join("-", [var.nameprefix, "appsync", var.env])
  schema = file("../schema.graphql")
  visibility = "GLOBAL"
  create_logs_role = true
  logs_role_name = join("-", [var.nameprefix, "appsync-logs-role", var.env])
  logging_enabled = true
  log_field_log_level = "ALL"
  authentication_type = "AWS_LAMBDA"

  lambda_authorizer_config = {
    authorizer_uri = join(":", [module.appsync_authorizer.lambda_function_arn, module.appsync_authorizer.lambda_function_version])
    authorizer_result_ttl_in_seconds = 0
  }

  datasources = {
    dynamodb_table = {
      type       = "AMAZON_DYNAMODB"
      table_name = join("-", [var.nameprefix, "table", var.env])
      region     = var.aws_region
    }
  }

  resolvers = {
    "Query.getHero" = {
      kind  = "UNIT"
      type  = "Query"
      field = "getHero"
      code  = file("../out/appsync/getHero.js")
      runtime = {
        name            = "APPSYNC_JS"
        runtime_version = "1.0.0"
      }
      data_source = "dynamodb_table"
    }

    "Query.listHeroes" = {
      kind  = "UNIT"
      type  = "Query"
      field = "listHeroes"
      code  = file("../out/appsync/listHeroes.js")
      runtime = {
        name            = "APPSYNC_JS"
        runtime_version = "1.0.0"
      }
      data_source = "dynamodb_table"
    }

    "Mutation.addHero" = {
      kind  = "UNIT"
      type  = "Mutation"
      field = "addHero"
      code  = file("../out/appsync/addHero.js")
      runtime = {
        name            = "APPSYNC_JS"
        runtime_version = "1.0.0"
      }
      data_source = "dynamodb_table"
    }
  }
}