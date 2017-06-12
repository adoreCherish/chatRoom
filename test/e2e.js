var webdriver = require('selenium-webdriver');
var By = webdriver.By;
var driver = new webdriver.Builder()
    .withCapabilities({
    	browserName:'chrome',
    	'chromeOptions':{
    		args:['test-type']
    	}
    })
    .build();
driver.get('http://localhost:3000/index/index');
driver.findElement(By.id('clickSure')).click();
var myModal = driver.findElement(By.id('myModal'));
driver.wait(myModal.isDisplayed(), 1000);
driver.quit();