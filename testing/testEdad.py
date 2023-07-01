from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

route = "http://localhost:5173"

#Prueba de Edad invalida (Edad=0)
def test1():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")

    print(route + "/addMedico")

    "Prueba Edad Invalida"
    
    elem = driver.find_element(By.ID, "rut")
    elem.send_keys("198762156")

    elem = driver.find_element(By.ID, "nombre")
    elem.send_keys("Josefa")

    elem = driver.find_element(By.ID, "apellido_P")
    elem.send_keys("Castro")

    elem = driver.find_element(By.ID, "apellido_M")
    elem.send_keys("Espinoza")

    "Campo evaluado"
    elem1 = driver.find_element(By.ID, "edad")
    elem1.send_keys("0")

    elem = driver.find_element(By.ID, "especialidad")
    elem.send_keys("Cirujano")

    elem = driver.find_element(By.ID, "ubicacion")
    elem.send_keys("https://goo.gl/maps/EJocG2LnmFPJNspj7")

    elem = driver.find_element(By.ID, "credencial")
    elem.send_keys("”https://www.soundczech.cz/temp/lorem-ipsum.pdf")

    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)
    
    res = ""
    try:
        assert "El valor debe ser superior o igual a 1" in elem1.get_attribute("validationMessage")
        res = "Test1 éxito"
    except:
        res = "Test1 fallo"
    
    return res


#Prueba de Edad invalida (Edad=100)
def test2():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")

    print(route + "/addMedico")

    "Prueba Edad Invalida"
    
    elem = driver.find_element(By.ID, "rut")
    elem.send_keys("198762156")

    elem = driver.find_element(By.ID, "nombre")
    elem.send_keys("Josefa")

    elem = driver.find_element(By.ID, "apellido_P")
    elem.send_keys("Castro")

    elem = driver.find_element(By.ID, "apellido_M")
    elem.send_keys("Espinoza")

    "Campo evaluado"
    elem2 = driver.find_element(By.ID, "edad")
    elem2.send_keys("100")

    elem = driver.find_element(By.ID, "especialidad")
    elem.send_keys("Cirujano")

    elem = driver.find_element(By.ID, "ubicacion")
    elem.send_keys("https://goo.gl/maps/EJocG2LnmFPJNspj7")

    elem = driver.find_element(By.ID, "credencial")
    elem.send_keys("”https://www.soundczech.cz/temp/lorem-ipsum.pdf")

    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)
    
    res = ""
    try:
        assert "El valor debe ser inferior o igual a 99" in elem2.get_attribute("validationMessage")
        res = "Test2 éxito"
    except:
        res = "Test2 fallo"
    
    return res


#Prueba de Edad Valida (Edad=1)
def test3():
    driver = webdriver.Chrome()
    driver.get(route + "/addMedico")

    print(route + "/addMedico")

    "Prueba Edad Valida"
    
    elem = driver.find_element(By.ID, "rut")
    elem.send_keys("198762156")

    elem = driver.find_element(By.ID, "nombre")
    elem.send_keys("Josefa")

    elem = driver.find_element(By.ID, "apellido_P")
    elem.send_keys("Castro")

    elem = driver.find_element(By.ID, "apellido_M")
    elem.send_keys("Espinoza")

    "Campo evaluado"
    elem = driver.find_element(By.ID, "edad")
    elem.send_keys("1")

    elem = driver.find_element(By.ID, "especialidad")
    elem.send_keys("Cirujano")

    elem = driver.find_element(By.ID, "ubicacion")
    elem.send_keys("https://goo.gl/maps/EJocG2LnmFPJNspj7")

    elem = driver.find_element(By.ID, "credencial")
    elem.send_keys("https://www.soundczech.cz/temp/lorem-ipsum.pdf")

    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(2.3)
    
    alert = driver.switch_to.alert

    res = ""
    try:
        assert "Usuario Creado" in alert.text
        res = "Test3 éxito"
    except:
        res = "Test3 fallo"
    
    return res

print(test1())
print(test2())
print(test3())