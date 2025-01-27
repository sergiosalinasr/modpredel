pipeline {
    agent any
    environment {
        DOCKER_COMPOSE_FILE = 'docker\\dc_anndpgkcmpd.yml'
        PROJECT_NAME = 'dc_anndpgkcmpd'
        DC_NODE_TMP = 'docker\\dc_ndpgkcmpd.yml'
        PROJECT_NODE_TMP = 'dc_ndpgkcmpd'
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

        stage('Start Temporary Services for Testing') {
            steps {
                script {
                    bat """
                        echo Iniciando servicios temporales para pruebas con Docker Compose...
                        docker compose -f %DC_NODE_TMP% -p %PROJECT_NODE_TMP% up -d
                    """
                }
            }
        }

        stage('Run API Tests with Newman') {
            steps {
                script {
                    // Ejecutar las pruebas con Newman y capturar el resultado
                    def result = bat(returnStatus: true, script: """
                        echo Ejecutando pruebas de APIs con Newman...
                        cd nodempd
                        newman run src/postman/MPD_Test.postman_collection.json -e src/postman/dev_mpd.postman_environment.json
                    """)
                    if (result != 0) {
                        error "Las pruebas de Newman fallaron. Deteniendo el pipeline."
                    }
                }
            }
        }

        stage('Stop Temporary Services') {
            steps {
                script {
                    bat """
                        echo Deteniendo servicios temporales después de pruebas...
                        docker compose -f %DC_NODE_TMP% -p %PROJECT_NODE_TMP% down --volumes --remove-orphans
                    """
                }
            }
        }

        stage('Build Angular Docker Image') {
            steps {
                script {
                    bat """
                        echo Construyendo la imagen Docker para Angular...
                        docker build --no-cache -t i_angularmpd2 -f angularmpd/src/docker/DockerfileBuildApp2 .
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
