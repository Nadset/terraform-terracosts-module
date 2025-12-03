# main.tf - Logique du module Terracost

# Variables (déclarées ici)
variable "terracost_api_key" {
  type = string
  description = "API key Terracosts"
}

variable "tags" {
  type = map(string)
  default = {}
}

# Locals (optionnel, pour logique)
locals {
  finops_tags = {
    ManagedBy = "terracosts"
    FinOpsAPIKey = var.terracost_api_key
    ExpiresAt = "2025-12-31"
    Environment = "dev"
    CostCenter = "default"
    BusinessUnit = "IT"
    Owner = "terraform"
  }
}

# Outputs
output "tags" {
  value = merge(var.tags, local.finops_tags)
}

output "api_key_set" {
  value = var.terracost_api_key != "" ? "OK" : "Missing"
}
