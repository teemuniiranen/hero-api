resource "aws_cognito_user_pool" "this" {
  name = join("-", [var.nameprefix, "pool", var.env])
}

resource "aws_cognito_user_pool_client" "this" {
    name = join("-", [var.nameprefix, "pool-client", var.env])
    user_pool_id = aws_cognito_user_pool.this.id

    token_validity_units {
      access_token  = "hours"
      id_token      = "hours"
      refresh_token = "days"
    }

    access_token_validity = 8
    id_token_validity = 8
    refresh_token_validity = 30

    explicit_auth_flows = [
      "ALLOW_REFRESH_TOKEN_AUTH",
      "ALLOW_CUSTOM_AUTH",
      "ALLOW_USER_SRP_AUTH",
      "ALLOW_ADMIN_USER_PASSWORD_AUTH"
    ]
}

resource "aws_cognito_user_group" "user" {
  name         = "User"
  user_pool_id = aws_cognito_user_pool.this.id
}

resource "aws_cognito_user_group" "admin" {
  name         = "Admin"
  user_pool_id = aws_cognito_user_pool.this.id
}