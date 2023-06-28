pipeline {
    agent any

    stages {
        stage('Testing') {
            when {
                branch "test/rut"
            }
            steps {
            // testing
            bat "python testing/testRut.py"

            // To run Maven on a Windows agent, use
            // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
    }
}