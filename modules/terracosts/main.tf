locals {
  default_tags = {
    BusinessUnit = "Finance"
    ExpiresAt = "2025-12-31"
    FinOps = "true"
    ManagedBy = "terracosts"
  }
  merged_tags = merge(local.default_tags, var.tags)
}
