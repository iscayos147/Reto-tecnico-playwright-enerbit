import { Locator, Page } from '@playwright/test';


export class HomePage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly logInButton: Locator;
  readonly captchaImg: Locator;
  readonly captchaInput: Locator;
  readonly logInErrorMessage: Locator;

constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#//*[@id="HeaderControl_LogonControl_LoginFormLayout_txtEmail_I"]');
    this.passwordInput = page.locator('[//*[@id="HeaderControl_LogonControl_LoginFormLayout_txtPassword_I_CLND"]');
    this.logInButton = page.locator('//*[@id="HeaderControl_LogonControl_btnLoginNow_CD"]/span');
    this.captchaImg = page.locator('//*[@id="HeaderControl_LogonControl_LoginFormLayout_Captcha_IMG"]');
    this.logInErrorMessage = page.locator('//*[@id="HeaderControl_LogonControl_LoginFormLayout_Captcha_TB_I"]');
    this.logInErrorMessage = page.locator('.error-message-container');
}