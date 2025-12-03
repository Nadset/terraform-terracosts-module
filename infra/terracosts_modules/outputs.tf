# outputs.tf - Outputs du module

output "module_tags" {
  value = var.tags
}

output "api_key_set" {
  value = var.terracost_api_key != "" ? "OK" : "Missing"
}

output "terracost_status" {
  value = "Module Terracost prêt – ajoute tags TTL et FinOps à tes ressources"
}

output "tags" {
  value = merge(var.tags, {
    ManagedBy = "terracosts"
    FinOpsAPIKey = var.terracost_api_key
    ExpiresAt = "2025-12-31"
    Environment = "dev"
    CostCenter = "default"
    BusinessUnit = "IT"
    Owner = "terraform"
  })
}
