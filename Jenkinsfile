pipeline {
    agent any

    environment {
        ARM_CLIENT_ID       = credentials('AZURE_CLIENT_ID')
        ARM_CLIENT_SECRET   = credentials('AZURE_CLIENT_SECRET')
        ARM_SUBSCRIPTION_ID = credentials('AZURE_SUBSCRIPTION_ID')
        ARM_TENANT_ID       = credentials('AZURE_TENANT_ID')
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Virendra-94/Task-Manager-Azure'
            }
        }

        stage('Terraform Init') {
            steps {
                bat 'terraform init'
            }
        }

        stage('Terraform Plan') {
            steps {
                bat 'terraform plan -var-file="terraform.tfvars"'
            }
        }

        stage('Terraform Apply') {
            steps {
                bat 'terraform apply -auto-approve -var-file="terraform.tfvars"'
            }
        }

        stage('Deploy React App') {
            steps {
                dir('react-app') {
                    bat 'npm install'
                    bat 'npm run build'
                    bat 'cd .. && powershell Compress-Archive -Path react-app\\build\\* -DestinationPath react.zip'
                }

                bat """
                az login --service-principal -u %ARM_CLIENT_ID% -p %ARM_CLIENT_SECRET% --tenant %ARM_TENANT_ID%
                az webapp deploy --resource-group ${env.resource_group_name} --name ${env.web_app_name} --src-path react.zip --type zip
                """
            }
        }
    }
}
