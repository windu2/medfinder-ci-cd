from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

route = "localhost:5173"


driver = webdriver.Chrome()
driver.get(route + "/addMedico")
assert "Python" in driver.title
elem = driver.find_element(By.NAME, "rut")
elem.clear()
elem.send_keys("111111111")
elem.send_keys(Keys.RETURN)
assert "No results found." not in driver.page_source
driver.close()