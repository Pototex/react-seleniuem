const {Builder, By, Key, until} = require("selenium-webdriver")
const { expect, assert } = require("chai");

const driver = new Builder().forBrowser("firefox").build()
const TIMEOUT = 5000

describe('create new account', () => {

  before(() => {
    driver.navigate().to("http://localhost:3001/")
  })

  it('click on create button account', async () => {
    const button = By.id('selenium-create-account-button')
    const createButton = await driver.wait(until.elementLocated(button))
    createButton.click()
  })

  it('enter to new account workflow 2', async () => {
    const modal = By.css('.modals-title')
    const modalButton = By.css('.css-772z44')

    await driver.wait(until.elementLocated(modal))
    await driver.findElement(modalButton).click()

    const text = await driver
      .findElement(By.id('selenium-id-title'))
      .getText()

    expect(text).to.equal('Para crear su expediente y empezar a utilizar Tramite ¡YA!, por favor, llene el siguiente formulario con sus datos. Los campos requeridos se muestran con un asterisco (*).');
  
    const se = await driver.findElement(By.css(".css-x1e6q1"))
    se.click()
    await driver.wait(until.elementLocated(By.id("downshift-0-item-0")))
    const firstOption = await driver.findElement(By.id("downshift-0-item-0"))
    firstOption.click()

    const idType = await driver.findElement(By.id("2"))
    idType.click()

    const idValue = await driver.findElement(By.name('idValue'))
    idValue.sendKeys(Math.floor(100000000 + Math.random() * 900000000))
  })

  it('should show personal data step', async () => {
    testNextStep()

    const divPersonalData = By.css(".css-bfkivm-PersonalData")
    await driver.wait(until.elementLocated(divPersonalData))
  })

  it('should fill the personal data form', async () => {
    const name = By.name('name')
    const lastName = By.name('lastName') 
    const male = By.id('Masculino')
    const birthPlace = By.name('birthPlace')
    const datePicker = By.className('css-itpvvj')
    const year = By.className('react-datepicker__year-select')
    const yearToSelect = By.css('option[value="1949"]')
    const dayToSelect = By.className('react-datepicker__day react-datepicker__day--015')
    const status = By.id('Viudo')

    await driver.findElement(name).sendKeys('Pepe')
    await driver.findElement(lastName).sendKeys('White')
    await driver.findElement(male).click()
    await driver.findElement(birthPlace).sendKeys('Costa Rica')

    const dp = await driver.findElement(datePicker)
    dp.click()
    await driver.wait(until.elementLocated(year))
    await driver.findElement(year).click()
    await driver.wait(until.elementLocated(yearToSelect))
    await driver.findElement(yearToSelect).click()
    await driver.findElement(dayToSelect).click()

    await driver.wait(until.elementLocated(status))
    await driver.findElement(status).click()
  })

  it('should show complement data step', async () => {
    testNextStep()
    const divContactData = By.className('css-12ajx83-ContactData')
    await driver.wait(until.elementLocated(divContactData), TIMEOUT)
  })

  it('should fill the contact data form', async () => {
    const provincia = By.id('selenium-state')
    const provinciaSelect = By.id('downshift-1-item-1')
    const city = By.id('selenium-city')
    const citySelect = By.id('downshift-2-item-0')
    const district = By.id('selenium-district')
    const districtSelect = By.id('downshift-3-item-0')
    const telephone = By.name('telephone')
    const userEmail = By.name('userMail')
    const userConfirmEmail = By.name('userConfirmMail')

    const provinciaElem = await driver.findElement(provincia)
    await provinciaElem.click()
    await driver.wait(until.elementLocated(provinciaSelect))
    await driver.findElement(provinciaSelect).click()

    const cityElem = await driver.findElement(city)
    await cityElem.click()
    await driver.wait(until.elementLocated(citySelect))
    await driver.findElement(citySelect).click()
    
    const districtElem = await driver.findElement(district)
    await districtElem.click()
    await driver.wait(until.elementLocated(districtSelect))
    await driver.findElement(districtSelect).click()

    await driver.findElement(telephone).sendKeys('8990-9090')
    const email = `test_${randomNumber()}@mailinator.com`
    await driver.findElement(userEmail).sendKeys(email)
    await driver.findElement(userConfirmEmail).sendKeys(email)
  })

  it('should show user/password step', async () => {
    testNextStep()
    const divUser = By.className('css-v879d7-User')
    await driver.wait(until.elementLocated(divUser), TIMEOUT)
  })

  it('should setup user password', async () => {
    const password = By.name('password')
    const confirmPassword = By.name('confirmPassword')

    await driver.findElement(password).sendKeys('asp128..')
    await driver.findElement(confirmPassword).sendKeys('asp128..')
  })  

  it('should show confirm step', async () => {
    testNextStep()
    const divCreateAccount = By.className('css-16cz2x2-CreateAccount')
    await driver.wait(until.elementLocated(divCreateAccount), TIMEOUT)
  })

  it('should accpet terms and conditions', async () => {
    const accept = By.name('accept')
    const captcha = By.className('grecaptcha-box')

    await driver.wait(until.elementLocated(captcha), TIMEOUT)

    const acceptElem = await driver.wait(until.elementLocated(accept), TIMEOUT)
    acceptElem.click()
  })  

  it('should create user account', async () => {
    const createUserButton = By.id("selenium-create-user")
    const button = await driver.wait(until.elementLocated(createUserButton), TIMEOUT)
    button.click()
  })

  it('should show confirm step', async () => {
    testNextStep()
    const divResume = By.className('css-mlwsik-Resume')
    const message = By.id('selenium-confirm')

    await driver.wait(until.elementLocated(divResume))

    const messageElem = await driver.findElement(message).getText()
    expect(messageElem).to.equal('Gracias por registrarse.')
  })

  const randomNumber = () => {
    return Math.floor(Math.random() * 1000)
  }

  const testNextStep = async () => {
    const nextButton = By.className('btn-next css-1fzew3c')
    const button = await driver.wait(until.elementLocated(nextButton))
    button.click()
  }

  after(() => {
    setTimeout(() => { driver.quit() }, 15000)   
  })

})