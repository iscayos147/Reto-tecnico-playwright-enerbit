import { Locator, Page } from '@playwright/test';
import * as Tesseract from 'tesseract.js';
import { createWorker } from 'tesseract.js';

export class LogInPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly captchaImg: Locator;
  readonly captchaInput: Locator;
  readonly logInErrorMessage: Locator;
  readonly captcha: string;

constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#//*[@id="HeaderControl_LogonControl_LoginFormLayout_txtEmail_I"]');
    this.passwordInput = page.locator('[//*[@id="HeaderControl_LogonControl_LoginFormLayout_txtPassword_I_CLND"]');
    this.logInButton = page.locator('//*[@id="HeaderControl_LogonControl_btnLoginNow_CD"]/span');
    this.captchaImg = page.locator('//*[@id="HeaderControl_LogonControl_LoginFormLayout_Captcha_IMG"]');
    this.logInErrorMessage = page.locator('//*[@id="HeaderControl_LogonControl_LoginFormLayout_Captcha_TB_I"]');
    this.logInErrorMessage = page.locator('.error-message-container');
}

  async navigateUrl(url) {
    await this.page.goto(url);
  }

  async logIn(username: string, password: string,page) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    let resultado: string = '';
    let ruta: string = 'https://demos.devexpress.com';
    let rutadestino = './captcha.png';

    ruta = ruta + await this.captchaImg.getAttribute('src');

    await page.waitForTimeout(1000);
    await page.capturarPantalla(page, rutadestino, this.captchaImg);


    const worker = await createWorker({
        logger: m => console.log(m),
      });  
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize('./captcha.png');
      console.log('texto de imagen es: '+text);
      resultado = text;
      await worker.terminate();
    await this.captchaInput.fill(resultado);
    await this.logInButton.click();
  }

  async getErrorMessageClassAttribute() {
    return await this.logInErrorMessage.getAttribute("class");
  }

  async capturarPantalla(page , rutaDestino: string, xpath: string): Promise<void> {

    await page.locator(xpath).screenshot({ path: rutaDestino });
  }

  
}   