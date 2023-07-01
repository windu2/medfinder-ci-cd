from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

route = "http://localhost:5173"

#Prueba de Credencial Invalida 
def test1():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")

    print(route + "/addMedico")

    "Prueba de Credencial Invalida"
    
    elem = driver.find_element(By.ID, "rut")
    elem.send_keys("333333333")

    elem = driver.find_element(By.ID, "nombre")
    elem.send_keys("Juan")

    elem = driver.find_element(By.ID, "apellido_P")
    elem.send_keys("Castro")

    elem = driver.find_element(By.ID, "apellido_M")
    elem.send_keys("Espinoza")

    elem = driver.find_element(By.ID, "edad")
    elem.send_keys("25")

    elem = driver.find_element(By.ID, "especialidad")
    elem.send_keys("Cirujano")

    elem = driver.find_element(By.ID, "ubicacion")
    elem.send_keys("https://goo.gl/maps/EJocG2LnmFPJNspj7")

    #Campo evaluado
    elem1 = driver.find_element(By.ID, "credencial")
    elem1.send_keys("[Entrada no esta formato url]")

    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)

    res = ""
    try:
        assert "Introduce una URL" in elem1.get_attribute("validationMessage")
        res = "Test1 éxito"
    except:
        res = "Test1 fallo"
    
    return res

#Prueba de Credencial Valida 
def test2():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")

    print(route + "/addMedico")

    "Prueba de Credencial Valida"
    
    elem = driver.find_element(By.ID, "rut")
    elem.send_keys("333333333")

    elem = driver.find_element(By.ID, "nombre")
    elem.send_keys("Juan")

    elem = driver.find_element(By.ID, "apellido_P")
    elem.send_keys("Castro")

    elem = driver.find_element(By.ID, "apellido_M")
    elem.send_keys("Espinoza")

    elem = driver.find_element(By.ID, "edad")
    elem.send_keys("25")

    elem = driver.find_element(By.ID, "especialidad")
    elem.send_keys("Cirujano")

    elem = driver.find_element(By.ID, "ubicacion")
    elem.send_keys("https://goo.gl/maps/EJocG2LnmFPJNspj7")

    #Campo Evaluado
    elem = driver.find_element(By.ID, "credencial")
    elem.send_keys("https://www.soundczech.cz/temp/lorem-ipsum.pdf")

    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)
    
    alert = driver.switch_to.alert

    res = "Usuario Creado"
    try:
        assert "" in alert.text
        res = "Test2 éxito"
    except:
        res = "Test2 fallo"
    
    return res

print(test1())
print(test2())