from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

route = "http://localhost:5173"


#Prueba de Nombre invalido con espacio al inicio
def test1():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")

    print(route + "/addMedico")
    
    #Rellenar con rut cualquiera
    elem = driver.find_element(By.ID, "rut")    
    elem.send_keys("231456278")
    
    #Relleno de los demas campos
    elem1 = driver.find_element(By.ID, "nombre")
    elem1.send_keys(" Oscar")
    
    elem = driver.find_element(By.ID, "apellido_P")
    elem.send_keys("Reyes")

    elem = driver.find_element(By.ID, "apellido_M")
    elem.send_keys("Hevia")

    elem = driver.find_element(By.ID, "edad")
    elem.send_keys("18")

    elem = driver.find_element(By.ID, "especialidad")
    elem.send_keys("Cardiologo")

    elem = driver.find_element(By.ID, "ubicacion")
    elem.send_keys("https://goo.gl/maps/EJocG2LnmFPJNspj7")

    elem = driver.find_element(By.ID, "credencial")
    elem.send_keys("https://www.soundczech.cz/temp/lorem-ipsum.pdf")
    
    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)
    
    res = ""
    try:
        assert "Utiliza un formato que coincida con el solicitado" in elem1.get_attribute("validationMessage")
        res = "Test1 éxito"
    except:
        res = "Test1 fallo"
    
    return res

#Prueba de Nombre con largo mayor a 50 caracteres
def test2():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")

    print(route + "/addMedico")
    
    
    elem = driver.find_element(By.ID, "rut")    
    elem.send_keys("231456278")
    
    #Relleno de los demas campos
    elem1 = driver.find_element(By.ID, "nombre")
    elem1.send_keys("JuanJuanJuanJuanJuanJuanJuanJuanJuanJuanJuanJuanJuan")
    
    elem = driver.find_element(By.ID, "apellido_P")
    elem.send_keys("Correa")

    elem = driver.find_element(By.ID, "apellido_M")
    elem.send_keys("Perez")

    elem = driver.find_element(By.ID, "edad")
    elem.send_keys("23")

    elem = driver.find_element(By.ID, "especialidad")
    elem.send_keys("Cardiologo")

    elem = driver.find_element(By.ID, "ubicacion")
    elem.send_keys("https://goo.gl/maps/EJocG2LnmFPJNspj7")

    elem = driver.find_element(By.ID, "credencial")
    elem.send_keys("https://www.soundczech.cz/temp/lorem-ipsum.pdf")
    
    # Assume the button has the ID "submit" :)
    #elem.send_keys(Keys.ENTER)

    time.sleep(1.3)

    #alert = driver.switch_to.alert
    res = ""

    try:
        assert elem1.get_property("value") =="JuanJuanJuanJuanJuanJuanJuanJuanJuanJuanJuanJuanJuan" 
        res = "Test2 fallo"
    except:
        res = "Test2 éxito"
    
    return res

#Prueba de nombre invalido con símbolo especial
def test3():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")

    print(route + "/addMedico")
    
    #Rellenar con rut cualquiera
    elem = driver.find_element(By.ID, "rut")    
    elem.send_keys("231456278")
    
    #Relleno de los demas campos
    elem1 = driver.find_element(By.ID, "nombre")
    elem1.send_keys("O!24@-,-..scar")
    
    elem = driver.find_element(By.ID, "apellido_P")
    elem.send_keys("Reyes")

    elem = driver.find_element(By.ID, "apellido_M")
    elem.send_keys("Hevia")

    elem = driver.find_element(By.ID, "edad")
    elem.send_keys("18")

    elem = driver.find_element(By.ID, "especialidad")
    elem.send_keys("Cardiologo")

    elem = driver.find_element(By.ID, "ubicacion")
    elem.send_keys("https://goo.gl/maps/EJocG2LnmFPJNspj7")

    elem = driver.find_element(By.ID, "credencial")
    elem.send_keys("https://www.soundczech.cz/temp/lorem-ipsum.pdf")
    
    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)
    
    res = ""
    try:
        assert "Utiliza un formato que coincida con el solicitado" in elem1.get_attribute("validationMessage")
        res = "Test3 éxito"
    except:
        res = "Test3 fallo"
    
    return res

print(test1())
print(test2())
print(test3())