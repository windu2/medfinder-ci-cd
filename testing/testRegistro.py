from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

route = "http://localhost:5173"


#Prueba de Registro Inválido
def test1():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")
    driver.maximize_window()

    print(route + "/addMedico")
    
    #Prueba de Rut Invalido
    elem = driver.find_element(By.ID, "rut")    
    elem.send_keys("231456278")
    
    #Relleno de los demas campos
    elem = driver.find_element(By.ID, "nombre")
    elem.send_keys("Evaristo")
    
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
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)

    alert = driver.switch_to.alert
    alert.accept()

    driver.get(route + "/directory")
    time.sleep(1.0)
    elem = driver.find_element(By.ID, "search")
    elem.send_keys("Evaristo")
    
    
    time.sleep(0.5)

    res = ""
    try:
        assert "Información" not in driver.page_source
        res = "Test1 éxito"
    except:
        res = "Test1 fallo"
    
    return res

#Prueba de Rut Valido
def test2():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")
    driver.maximize_window()

    print(route + "/addMedico")
    
    #Prueba de Rut Valido
    elem = driver.find_element(By.ID, "rut")    
    elem.send_keys("888888888")
    
    #Relleno de los demas campos
    elem = driver.find_element(By.ID, "nombre")
    elem.send_keys("Evaristo")
    
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
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)

    alert = driver.switch_to.alert
    alert.accept()

    driver.get(route + "/directory")
    time.sleep(1.0)
    elem = driver.find_element(By.ID, "search")
    elem.send_keys("Evaristo")
    
   
    time.sleep(0.5)

    res = ""
    try:
        assert "Información" in driver.page_source
        res = "Test2 éxito"
    except:
        res = "Test2 fallo"
    
    return res

    



print(test1())
print(test2())




