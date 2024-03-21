resource "aws_verifiedpermissions_policy_store" "this" {
  validation_settings {
    mode = "STRICT" // validate against the schema
  }
  description = "Hero App Policy Store"
}

resource "aws_verifiedpermissions_schema" "example" {
  policy_store_id = aws_verifiedpermissions_policy_store.this.id

  definition {
    value = file("../policies/schema.json")
  }
}

resource "awscc_verifiedpermissions_policy" "admin_policy" {
  policy_store_id = aws_verifiedpermissions_policy_store.this.id
  definition = {
    static = {
      statement   = file("../policies/admin_policy.cedar")
      description = "Admin Policy"
    }
  }
}

resource "awscc_verifiedpermissions_policy" "user_policy" {
  policy_store_id = aws_verifiedpermissions_policy_store.this.id
  definition = {
    static = {
      statement   = file("../policies/user_policy.cedar")
      description = "User Policy"
    }
  }
}
