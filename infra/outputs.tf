# GraphQL API
output "appsync_graphql_api_id" {
  description = "ID of GraphQL API"
  value       = module.appsync.appsync_graphql_api_id
}

output "appsync_graphql_api_arn" {
  description = "ARN of GraphQL API"
  value       = module.appsync.appsync_graphql_api_arn
}

output "appsync_graphql_api_uris" {
  description = "URIs of GraphQL API"
  value = module.appsync.appsync_graphql_api_uris
}

output "cognito_user_pool_id" {
  description = "Cognito User Pool ID"
  value = aws_cognito_user_pool.this.id
}

output "cognito_client_id" {
  description = "Cognito Client ID"
  value = aws_cognito_user_pool_client.this.id
}

output "verified_permissions_policy_store_id" {
  description = "Verified Permissions Policy Store ID"
  value = aws_verifiedpermissions_policy_store.this.id
}
