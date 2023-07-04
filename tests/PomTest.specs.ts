import { test, expect, type Page } from '@playwright/test';
import { LogInPage } from "../src/pages/LoginPage";

test(`@POM
Given yo estoy en la pagina de reservas
When me logueo con unas credenciales adecuadas
Then puedo iniciar la sesion`, 
async ({ page }) => {
    const loginpage = new LogInPage(page);
    
    loginpage.navigateUrl('https://demos.devexpress.com/rwa/dxhotels/');
  
    loginpage.logIn('iscayos147@gmil.com','1234ismael',page);

  });
  