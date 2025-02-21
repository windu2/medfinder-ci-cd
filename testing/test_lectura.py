from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

route = "http://localhost:5173"


#Prueba de lectura de Registro válido (Médico ya existente)
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


    elem = driver.find_element(By.LINK_TEXT, "Información")
    
    elem.click()
    time.sleep(0.5)
    
    res = ""
    try:
        assert "Médico" not in driver.page_source
        res = "Test1 fallo"
    except:
        res = "Test1 éxito"
    
    return res

print(test1())


