variable "terracost_api_key" {
  type = string
  description = "Clé API Terracosts pour le module"
}

variable "tags" {
  type = map(string)
  description = "Tags supplémentaires à appliquer aux ressources"
  default = {}
}
