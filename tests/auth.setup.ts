import { test as setup, expect } from '../fixtures/custom-fixtures'

const authFile = "user.json"

setup('Auth', async ({ loginPage, mainPage, isMobile}) => {
        await loginPage.login('bacos38210@aixind.com', '123123', isMobile);
        await expect(mainPage.hiThereTitle).toHaveText('Hi there Bacos!')
        await expect(mainPage.successMsg).toHaveText('Signed in successfully.')

        await loginPage.createCookies(authFile)
});