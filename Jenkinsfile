pipeline {
    agent any

    environment {
        ARM_CLIENT_ID       = credentials('AZURE_CLIENT_ID')
        ARM_CLIENT_SECRET   = credentials('AZURE_CLIENT_SECRET')
        ARM_SUBSCRIPTION_ID = credentials('AZURE_SUBSCRIPTION_ID')
        ARM_TENANT_ID       = credentials('AZURE_TENANT_ID')
        resource_group_name = 'react-firebase-rg' // <-- set this
        web_app_name        = 'react-firebase-app-viren'    // <-- set this
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/Virendra-94/Task-Manager-Azure'
            }
        }

        stage('Terraform Init') {
            steps {
                bat 'terraform init'
            }
        }

        stage('Terraform Plan') {
            steps {
                bat """
                    terraform plan ^
                      -var subscription_id=%ARM_SUBSCRIPTION_ID% ^
                      -var client_id=%ARM_CLIENT_ID% ^
                      -var client_secret=%ARM_CLIENT_SECRET% ^
                      -var tenant_id=%ARM_TENANT_ID%
                """
            }
        }

     stage('Generate terraform.tfvars') {
    steps {
        bat '''
            echo subscription_id="%ARM_SUBSCRIPTION_ID%" > terraform.tfvars
            echo client_id="%ARM_CLIENT_ID%" >> terraform.tfvars
            echo client_secret="%ARM_CLIENT_SECRET%" >> terraform.tfvars
            echo tenant_id="%ARM_TENANT_ID%" >> terraform.tfvars
            echo resource_group_name="react-firebase-rg" >> terraform.tfvars
            echo location="East US" >> terraform.tfvars
            echo app_service_plan="react-plan-viren" >> terraform.tfvars
            echo web_app_name="react-firebase-app-viren" >> terraform.tfvars
        '''
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
                    bat 'set CI=false && npm run build'
                    bat 'dir build' // <--- ADD THIS to confirm build folder was created
                    // With this:
                    bat '''
                        echo "Zipping build folder..."
                        $fullPath = Resolve-Path "react-app\\build\\*"
                        Compress-Archive -Path $fullPath -DestinationPath react.zip
                        '''
                }

                bat """
                az login --service-principal -u %ARM_CLIENT_ID% -p %ARM_CLIENT_SECRET% --tenant %ARM_TENANT_ID%
                az webapp deploy --resource-group %resource_group_name% --name %web_app_name% --src-path react.zip --type zip
                """
            }
        }
    }
}
