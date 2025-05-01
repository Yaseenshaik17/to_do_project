pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Yaseenshaik17/to_do_project.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Building the project...'
                // Add your build commands if any, e.g., for Java: sh 'javac Main.java'
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add your test commands here if needed
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying the application...'
                // No Docker used
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
