*** Settings ***
Library  Selenium2Library

*** Test Cases ***
# Open Google
#     Open Browser  https://www.google.com  chrome
#     Maximize Browser Window
#     Wait Until Page Contains Element  name=q
#     Input Text  name=q  Robot Framework
#     Press Keys  name=q  RETURN
#     Wait Until Page Contains  Robot Framework
#     Close Browser

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
    