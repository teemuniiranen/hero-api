provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.env
      Service     = "hero-api"
    }
  }
}

provider "awscc" {
  region = var.aws_region
}