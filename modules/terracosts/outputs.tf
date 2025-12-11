output "tags" {
  description = "Tags FinOps + TTL générés par le module"
  value = local.merged_tags
}

output "api_key_set" {
  description = "Indique si la clé API Terracosts est définie"
  value = length(var.terracost_api_key) > 0 ? "OK" : "Missing"
}
