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

    #login as Admin
    driver.get(route + "/login")
    elem = driver.find_element(By.ID, "username")
    elem.send_keys("windu")

    elem = driver.find_element(By.ID, "password")
    elem.send_keys("!Q2w3e4r5t")
    elem.send_keys(Keys.ENTER)
    time.sleep(1.5)


    driver.get(route + "/directory")
    driver.maximize_window()
    time.sleep(0.5)


    elem = driver.find_element(By.LINK_TEXT, "Editar")
    
    elem.click()
    time.sleep(0.5)
    
    #Prueba de Rut Invalido
    elem = driver.find_element(By.ID, "rut")
    elem.clear()    
    elem.send_keys("231456278")
    
    #Relleno de los demas campos
    elem = driver.find_element(By.ID, "nombre")
    elem.clear()
    elem.send_keys("Humberto")
    
    elem = driver.find_element(By.ID, "apellido_P")
    elem.clear()
    elem.send_keys("Suazo")

    
    
    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)

    alert = driver.switch_to.alert
    alert.accept()

    driver.get(route + "/directory")
    time.sleep(1.0)
    elem = driver.find_element(By.ID, "search")
    elem.send_keys("Humberto")
    
    
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
    #login as Admin
    driver.get(route + "/login")
    elem = driver.find_element(By.ID, "username")
    elem.send_keys("windu")

    elem = driver.find_element(By.ID, "password")
    elem.send_keys("!Q2w3e4r5t")
    elem.send_keys(Keys.ENTER)
    time.sleep(1.5)


    driver.get(route + "/directory")
    driver.maximize_window()
    time.sleep(0.5)


    elem = driver.find_element(By.LINK_TEXT, "Editar")

    elem.click()
    time.sleep(0.5)


    elem = driver.find_element(By.ID, "rut")
    elem.clear()    
    elem.send_keys("444444444")

    
    
    #Relleno de los demas campos
    elem = driver.find_element(By.ID, "nombre")
    elem.clear()
    elem.send_keys("Humberto")
    
    elem = driver.find_element(By.ID, "apellido_P")
    elem.clear()
    elem.send_keys("Suazo")
    
    # Assume the button has the ID "submit" :)
    elem.send_keys(Keys.ENTER)

    time.sleep(1.0)

    alert = driver.switch_to.alert
    alert.accept()

    driver.get(route + "/directory")
    time.sleep(1.0)
    elem = driver.find_element(By.ID, "search")
    elem.send_keys("Humberto")
    
   
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




