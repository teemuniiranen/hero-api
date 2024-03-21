variable "aws_region" {
  description = "AWS region for all resources."

  type    = string
  default = "eu-north-1"
}

variable "env" {
  description = "Name of the environment."

  type    = string
  default = "dev"
}

variable "nameprefix" {
  description = "Prefix for names so that they can be customized."

  type    = string
  default = "hero"
}
