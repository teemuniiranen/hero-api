terraform {
  required_providers {
    aws    = {
      source  = "hashicorp/aws"
      version = ">= 5.37.0"
    }
    awscc = {
      source  = "hashicorp/awscc"
      version = "~> 0.71.0"
    }
  }
}
