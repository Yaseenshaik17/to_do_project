pipeline {
    agent any
    
    environment {
        DOCKER_HOST = "unix:///var/run/docker.sock"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', 
                     url: 'https://github.com/Yaseenshaik17/to_do_project.git'
            }
        }

        stage('Build and Deploy') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t to-do-app .'
                    
                    // Stop and remove old container if exists
                    sh 'docker stop to-do-app-production || true'
                    sh 'docker rm to-do-app-production || true'
                    
                    // Run new container
                    sh 'docker run -d -p 8080:80 --name to-do-app-production to-do-app'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
