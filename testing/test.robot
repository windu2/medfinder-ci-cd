*** Settings ***
Library  Selenium2Library

*** Test Cases ***

Open MedicInfo
    Open Browser  http://localhost:5173/  chrome
    Maximize Browser Window
    Wait Until Page Contains Element  xpath=//a[contains(text(),'Revisa Aquí')]
    Click Element  xpath=//a[contains(text(),'Revisa Aquí')]
    Wait Until Page Contains Element  xpath=//a[contains(text(), 'Información')]
    Click Element  xpath=//a[contains(text(), 'Información')]
    Wait Until Page Contains Element  xpath=//p[contains(text(), 'Credencial')]
    Capture Page Screenshot
    Sleep  5s
    Close Browser

Valid Create Medic
    Open Browser  http://localhost:5173/  chrome
    Maximize Browser Window
    Wait Until Page Contains Element  xpath=//a[contains(text(),'Login Administrador')]
    Click Element  xpath=//a[contains(text(),'Login Administrador')]
    Input Text  username  brunalga
    Input Text  password  cristian10
    Click Element  xpath=//button[contains(text(),'Login')]
    Sleep  3s
    Click Element  xpath=//a[contains(text(),'Crear Médico')]
    Input Text  rut  19620033-9
    Input Text  nombre  Cristian
    Input Text  apellido_P  Bruna
    Input Text  apellido_M  Reyes
    Input Text  edad  25
    Input Text  especialidad  Cirujano
    Input Text  ubicacion  https://goo.gl/maps/EJocG2LnmFPJNspj7
    Input Text  credencial  https://www.soundczech.cz/temp/lorem-ipsum.pdf
    Sleep  3s
    Submit Form
    Go To  http://localhost:5173/directory
    Sleep  3s
    Close Browser

Invalid Create Medic
    Open Browser  http://localhost:5173/  chrome
    Maximize Browser Window
    Wait Until Page Contains Element  xpath=//a[contains(text(),'Login Administrador')]
    Click Element  xpath=//a[contains(text(),'Login Administrador')]
    Input Text  username  brunalga
    Input Text  password  cristian10
    Click Element  xpath=//button[contains(text(),'Login')]
    Sleep  3s
    Click Element  xpath=//a[contains(text(),'Crear Médico')]
    Input Text  rut  sdsdf
    Input Text  nombre  234567
    Input Text  apellido_P  @@@@;;;55
    Input Text  apellido_M  345678
    Input Text  edad  100
    Input Text  especialidad  Cirujano
    Input Text  ubicacion  https://goo.gl/maps/EJocG2LnmFPJNspj7
    Input Text  credencial  https://www.soundczech.cz/temp/lorem-ipsum.pdf
    Sleep  3s
    Submit Form
    Go To  http://localhost:5173/directory
    Sleep  3s
    Close Browser

Delete Medic
    Open Browser  http://localhost:5173/  chrome
    Maximize Browser Window
    Wait Until Page Contains Element  xpath=//a[contains(text(),'Login Administrador')]
    Click Element  xpath=//a[contains(text(),'Login Administrador')]
    Input Text  username  brunalga
    Input Text  password  cristian10
    Click Element  xpath=//button[contains(text(),'Login')]
    Sleep  3s
    Click Element  xpath=//a[contains(text(),'Ver Médicos')]
    Click Element  xpath=//button[contains(text(),'Eliminar')]
    Sleep  3s
    Handle Alert   accept
    Sleep  3s
    Close Browser

Valid Edit Medic
    Open Browser  http://localhost:5173/  chrome
    Maximize Browser Window
    Wait Until Page Contains Element  xpath=//a[contains(text(),'Login Administrador')]
    Click Element  xpath=//a[contains(text(),'Login Administrador')]
    Input Text  username  brunalga
    Input Text  password  cristian10
    Click Element  xpath=//button[contains(text(),'Login')]
    Sleep  3s
    Click Element  xpath=//a[contains(text(),'Ver Médicos')]
    Click Element  xpath=//a[contains(text(),'Editar')]
    Sleep  3s
    Input Text  nombre  Pedro
    Input Text  apellido_M  Pascal
    Sleep  3s
    Submit Form
    Sleep  3s
    Close Browser

Edit Without Login
    Open Browser  http://localhost:5173/EditMedico/3  chrome
    Maximize Browser Window
    Sleep  3s
    Input Text  nombre  Pedro
    Input Text  apellido_M  Pascal
    Sleep  3s
    Submit Form
    Go To  http://localhost:5173/directory
    Go To  http://localhost:5173/medico/3
    Sleep  3s
    Close Browser

Use Search
    Open Browser  http://localhost:5173  chrome
    Maximize Browser Window
    Wait Until Page Contains Element  xpath=//a[contains(text(),'Revisa Aquí')]
    Click Element  xpath=//a[contains(text(),'Revisa Aquí')]
    Input Text  search  Ped
    Sleep  3s
    Close Browser
    