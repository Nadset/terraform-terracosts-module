# Terracost Terraform Module

Ce module ajoute des tags FinOps et TTL automatiques à tes ressources Terraform.

## Utilisation
```hcl
module "terracosts" {
  source = "Nadset/module/terracosts"
  terracost_api_key = "ta-cle"
}

resource "aws_instance" "web" {
  # ... ta config
  tags = module.terracosts.tags
}
