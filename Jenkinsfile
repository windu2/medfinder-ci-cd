properties([pipelineTriggers([githubPush()])])

pipeline {
    agent any

    stages {
        stage('Testing') {
            when {
                branch "test/actualizar"
            }
            steps {
            // testing
            bat "python testing/testActualizar.py"
            // To run Maven on a Windows agent, use
            // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
            when {
                branch "test/rut"
            }
            steps {
            // testing
            bat "python testing/testRut.py"

            // To run Maven on a Windows agent, use
            // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
            when {
                branch "test/registro"
            }
            steps {
            // testing
            bat "python testing/testRegistro.py"

            // To run Maven on a Windows agent, use
            // bat "mvn -Dmaven.test.failure.ignore=true clean package"
            }
        }
    }
    post {
    success {
      slackSend color: '#36a64f', message: "Deployment of MedFinder CI/CD to production succeeded!"
    }
    failure {
      slackSend color: '#ff0000', message: "Deployment of Medfinder CI/CD to production failed!"
    }
  }
}