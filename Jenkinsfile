pipeline {
    agent any

    stages {
        stage('Build') {
            when {
                branch "test/rut"
            }
            steps {
            // Run Maven on a Unix agent.
            bat cd testing
            bat python testRut.py

            // To run Maven on a Windows agent, use
            // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
    }
}