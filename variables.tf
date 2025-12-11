variable "terracost_api_key" {
  type = string
  description = "Clé API Terracosts pour le module"
  validation {
    condition = length(var.terracost_api_key) > 0
    error_message = "La clé API Terracosts ne peut pas être vide."
  }
}
