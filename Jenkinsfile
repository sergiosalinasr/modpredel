pipeline {
    agent any
    environment {
        DOCKER_COMPOSE_FILE = 'docker\\dc_anndpgkcmpd.yml'
        PROJECT_NAME = 'dc_anndpgkcmpd'
        CONTAINER_NAME = 'c_nodempd' // Cambia al nombre del contenedor que deseas verificar
    }
    stages {
        stage('Build Node.js Docker Image') {
            steps {
                script {
                    bat """
                        echo Construyendo la imagen Docker para Node.js...
                        cd nodempd
                        docker build --no-cache -t i_nodempd -f src/docker/Dockerfile .
                    """
                }
            }
        }

        stage('Build Angular Docker Image') {
            steps {
                script {
                    bat """
                        echo Construyendo la imagen Docker para Angular...
                        cd ../angularmpd
                        docker build --no-cache -t i_angularmpd2 -f src/docker/DockerfileBuildApp2 .
                    """
                }
            }
        }

        stage('Check and Stop Docker Compose') {
            when {
                expression {
                    // Verifica si el proyecto Docker Compose tiene servicios corriendo
                    def stdout = bat(returnStdout: true, script: "docker compose -p %PROJECT_NAME% ps --status running").trim()
                    return stdout.contains('Up') // Cambia esto según cómo Docker Compose liste servicios en Windows
                }
            }
            steps {
                script {
                    bat """
                        echo Deteniendo servicios Docker Compose del proyecto %PROJECT_NAME%...
                        docker compose -p %PROJECT_NAME% down --volumes --remove-orphans
                    """
                }
            }
        }

        stage('Deploy New Version') {
            steps {
                script {
                    bat """
                        echo Desplegando nueva versión con Docker Compose...
                        docker compose -f %DOCKER_COMPOSE_FILE% -p %PROJECT_NAME% up -d
                    """
                }
            }
        }
    }
}
