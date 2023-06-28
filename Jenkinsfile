pipeline {
    agent any

    stages {
        stage('Build') {
            when {
                branch "test/rut"
            }
            steps {
            // Run Maven on a Unix agent.
            cd testing
            python test.py

            // To run Maven on a Windows agent, use
            // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
    }
}