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
    post {
    success {
      slackSend color: '#36a64f', message: "Deployment of myapp to production succeeded!"
    }
    failure {
      slackSend color: '#ff0000', message: "Deployment of myapp to production failed!"
    }
  }
}