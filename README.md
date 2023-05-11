# MedFinder

Este programa permite realizar búsqueda de médicos por especialidad, ver su información, ubicación e incluso su certificado de título. Además cuenta con un login para administradores que pueden editar los médicos o agregar nuevos.

## Preparación

> Esta sección es para instalar venv en el sistema y tener un entorno de ejecucion común. Si no lo necesita o no lo usará puede saltarse a la siguiente sección.

### Creación de Virtual Enviroment

Al instalar python3 en el sistema, este incluye la opción de crear venvs, que son entornos de ejecución de códigos aislados, por lo que no interfieren con todo el computador o servidor donde se hospedan.

Crearemos un entorno virtual llamado `venv`:

```shell
python3 -m venv venv
```

Ahora podemos ejecutarlo con el siguiente comando desde la carpeta raíz del programa:

```shell
source venv/bin/activate
```

### Instalación de requerimientos

Con el Virtual Enviroment activado, instalamos los paquetes requeridos dentro del `requirement.txt` con el siguiente comando:

```shell
pip install -r requirements/development.txt
```

Con esto tenemos todo listo para ejecutar el programa!

## Como ejecutar

1. Se deben abrir dos terminales para ejecutar el `frontend` y `backend` en un mismo pc.
2. En ambas terminales ejecutar el ambiente con `source venv/bin/activate`
3. En la primera ejecutar el `backend` con python utilizando el siguiente comando:

> Nota: Recuerda correr antes las migraciones con `python manage.py runserver`

```shell
cd backend
python3 manage.py runserver
```

4. En la segunda terminal ejecutar el `frontend` con python utilizando el siguiente comando:

> Nota: Recuerda instalar las dependencias con `npm install`

```shell
cd frontend
npm start
```

5. Ahora se puede ingresar a `http://localhost:5173` y ver la aplicación!

## Consideraciones

1. Correr los comandos en las notas de los pasos 3 y 4.


# Como contribuir

Para contribuir en el código se puede realizar un fork del git actual, y luego hacer un pull request que será revisado por los dueños del Git actual.

# Licencia

Para ver las licencia GNU-3 haga click [aqui](https://github.com/PyComm/PyComm/blob/main/LICENSE)
