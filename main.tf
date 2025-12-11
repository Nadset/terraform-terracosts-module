provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners = ["amazon"]
  filter {
    name = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
  filter {
    name = "virtualization-type"
    values = ["hvm"]
  }
}

module "terracosts" {
  source = "./modules/terracosts"
  terracost_api_key = var.terracost_api_key
  tags = {
    Project = "TestTerraform"
  }
}

resource "aws_instance" "test" {
  ami = data.aws_ami.amazon_linux_2.id
  instance_type = "t3.micro"
  tags = module.terracosts.tags
}
