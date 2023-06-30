properties([pipelineTriggers([githubPush()])])

pipeline {
    agent any

    stages {
        stage('Testing') {
            when {
                branch "dev"
            }
            steps {
            // testing registro
            echo "Testing Creación"
            bat "python testing/testRegistro.py"


            //testing Actualizar
            echo "Testing Atualizar"
            bat "python testing/testActualizar.py"
        

            //testing Leer
            echo "Testing Leer Registro"
            bat "python testing/test_lectura.py"

            //testing Eliminar
            echo "Testing Eliminar Registro"
            bat "python testing/testEliminar.py" 
            
            //testing Rut
            echo "Testing RUT"
            bat "python testing/testRut.py"

            //testing Nombre
            echo "Testing Nombre"
            bat "python testing/test_nombre.py"

            //testing Apellido
            echo "Testing Apellido"
            bat "python testing/test_apellidos.py"

            //testing Edad
            echo "Testing Edad"
            bat "python testing/testEdad.py"

            //testing Especialidad
            echo "Testing Especialidad"
            bat "python testing/test_especialidad.py"

            //testing Ubicacion
            echo "Testing Ubicacion"
            bat "python testing/testUbicacion.py"

            //testing Credencial
            echo "Testing Credencial"
            bat "python testing/testCredencial.py"

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