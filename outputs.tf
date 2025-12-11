output "ec2_id" {
  description = "ID de l'instance EC2 test"
  value = aws_instance.test.id
}

output "tags_applied" {
  description = "Tags appliqués sur l'instance EC2"
  value = aws_instance.test.tags
}
