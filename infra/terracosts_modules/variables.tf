# variables.tf - Déclarations des variables

variable "terracost_api_key" {
  type = string
  description = "API key Terracosts pour scan auto"
}

variable "tags" {
  type = map(string)
  default = {}
}
