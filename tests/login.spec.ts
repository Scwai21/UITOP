import { test, expect } from '../fixtures/custom-fixtures'

test.use({ storageState: {cookies: [], origins: []}})

test.describe('Positive case', () => {
   
    test('Positive login test', async ({ loginPage, mainPage, isMobile}) => {


        await loginPage.login('bacos38210@aixind.com', '123123', isMobile);
        await expect(mainPage.hiThereTitle).toHaveText('Hi there Bacos!')
        await expect(mainPage.successMsg).toHaveText('Signed in successfully.')

    
    });

})


test.describe('Negative case', () =>{

    test('Login with invalid password', async ({ loginPage, isMobile }) => {
        

        await loginPage.login('bacos38210@aixind.com', 'WrongPassword123', isMobile);
        
        await expect(loginPage.errorMsg).toBeVisible();
        await expect(loginPage.errorMsg).toHaveText('Invalid Email or password.'); 

    });

    test('Login with empty fields', async ({ loginPage, isMobile}) => {
        

        await loginPage.login('', '', isMobile);
        
        await expect(loginPage.errorMsg).toBeVisible();
        await expect(loginPage.errorMsg).toHaveText('Invalid Email or password.'); 

    });

    test('Login with invalid email format', async ({ loginPage, isMobile }) => {
        
        await loginPage.login('bacos38210aixind.com', '123123', isMobile);

        await loginPage.passwordField.click()
        await expect(loginPage.emailErrorMsg).toBeVisible();
        await expect(loginPage.emailErrorMsg).toHaveText('Please enter a valid email address'); 

    });

    test('Login without email', async ({ loginPage, isMobile }) => {
        
        await loginPage.login('', '123123', isMobile)

        await expect(loginPage.errorMsg).toBeVisible();
        await expect(loginPage.errorMsg).toHaveText('Invalid Email or password.'); 
        
    });

    
    test('Login without password', async ({ loginPage, isMobile }) => {
        await loginPage.login('bacos38210@aixind.com', '', isMobile)

        await expect(loginPage.errorMsg).toBeVisible();
        await expect(loginPage.errorMsg).toHaveText('Invalid Email or password.'); 
        
    })


})
    