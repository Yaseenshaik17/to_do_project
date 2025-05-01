pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "to-do-app"
        CONTAINER_NAME = "to-do-app-production"
        PORT_MAPPING = "8080:80"
    }

    stages {
        // Stage 1: Fetch latest code
        stage('Checkout SCM') {
            steps {
                git branch: 'main', 
                url: 'https://github.com/Yaseenshaik17/to_do_project.git'
            }
        }

        // Stage 2: Stop and remove old container if exists
        stage('Cleanup Old Container') {
            steps {
                script {
                    try {
                        sh "docker stop ${CONTAINER_NAME} || true"
                        sh "docker rm ${CONTAINER_NAME} || true"
                        echo "Old container removed successfully"
                    } catch (Exception e) {
                        echo "No existing container found - proceeding fresh"
                    }
                }
            }
        }

        // Stage 3: Build new Docker image
        stage('Build Image') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                }
            }
        }

        // Stage 4: Run new container
        stage('Deploy Updated Container') {
            steps {
                script {
                    sh """
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p ${PORT_MAPPING} \
                        ${DOCKER_IMAGE}:${env.BUILD_ID}
                    """
                }
            }
        }

        // Stage 5: Verify deployment
        stage('Health Check') {
            steps {
                script {
                    timeout(time: 1, unit: 'MINUTES') {
                        waitUntil {
                            try {
                                sh "curl -sSf http://localhost:8080 > /dev/null"
                                return true
                            } catch (Exception e) {
                                return false
                            }
                        }
                    }
                    echo "Application is healthy and responding"
                }
            }
        }
    }

    post {
        always {
            echo "Pipeline execution completed"
            // archiveArtifacts artifacts: '**/build/reports/**'
            // cleanWs() // Optional: Clean workspace
        }
        failure {
            slackSend channel: '#dev-alerts',
                     message: "🚨 Pipeline FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}"
        }
    }
}