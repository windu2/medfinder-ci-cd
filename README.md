# Django + React Api Rest

[Tutorial for django with react login](https://sushil-kamble.medium.com/django-rest-framework-react-authentication-workflow-2022-part-1-a21f22b3f358)

In this project we have an approach in how to use Django for backend and React for frontend. It consist in a TODO application, with dynamic rendering.

I recommed to read the [wiki](https://scgitlab.sc.eso.org/psw/optools/boilerplates/optools-boilerplate-frontend-ads/-/wikis/home) before start the development.

## Install prerequisites

Check the python version is the correct one
```shell
python --version  # at least 3.9, otherwise install python using e.g. Homebrew
```

Install packages needed at system level for the project, for instance, OpenLDAP for authentication
```shell
brew install openldap
```
and other system level packages the project might need (graphviz, oracle client, just to name a few).

### Virtual enviroment

Create a [virtual enviroment](https://docs.python.org/3/library/venv.html) for the project.
```shell
cd <project-folder>
python3 -m venv venv
```

Activate the enviroment and install the development requirements.
```shell
source venv/bin/activate
pip install -r requirements/development.txt
```
### Frontend

Install npm and node.js.
```shell
brew install node
```

Install the frontend requeriments.
```shell
cd <project-folder>/frontend
npm install
```

You are all set!

For next steps you can see [How to create a new component](app-component)

### To run in Dev
First we will need two terminals running in parallel. 

All this commands are excetued inside the project folder.

#### First terminal
```shell
source venv/bin/activate
cd backend
python .\manage.py runserver
```


#### Second terminal
```shell
cd frontend
npm install
npm start
```
With this two terminals running you should see something like this

![example_image](example.png "Example image")


# For develop
If you are going to develop over this template, please read the wiki for further information

## Versions
* python version = 3.10
* npx version = 8.19
* create-react-app = 5.0

## Reinitailize git repository

- Delete `.git` folder in project root
  > Make sure you turn on the "Show hidden files, folders and disks" option.
- `git init`

# About
This repo is part of [SM2023 Internship: "Fulana"](https://gitlab.eso.org/vlizana/sm2023-fulana/-/wikis/home), done in summer of 2023 at PSW, Paranal Observatory


