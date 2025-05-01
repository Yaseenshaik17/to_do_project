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

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building updated Docker image...'
                    sh 'docker build --no-cache -t to-do-app:latest .'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    echo 'Stopping and removing old container (if exists)...'
                    sh 'docker stop to-do-app-production || true'
                    sh 'docker rm to-do-app-production || true'

                    echo 'Running updated Docker container...'
                    sh 'docker run -d -p 8080:80 --name to-do-app-production to-do-app:latest'
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
