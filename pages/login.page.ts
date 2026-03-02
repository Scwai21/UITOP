import { Page, Locator, expect } from '@playwright/test'


export class LoginPage{
    readonly page: Page
    readonly logInButton: Locator
    readonly emailField: Locator
    readonly passwordField: Locator 
    readonly lostPasswordButton: Locator
    readonly createAccountButton: Locator
    readonly signUpButton: Locator
    readonly accountLogInButton: Locator
    readonly closeButton: Locator
    readonly logInButtonInWindow: Locator
    readonly emailErrorMsg: Locator
    readonly burgerMenuButton: Locator
    readonly form: Locator
    readonly errorMsg: Locator
    readonly cookieAcceptButton: Locator
    

    constructor( page: Page ){
        this.page = page
        this.logInButton = page.getByRole('button', { name: 'Log In' })
        this.emailField = page.getByRole('textbox', { name: 'Email address' })
        this.passwordField = page.getByRole('textbox', { name: 'Password' })
        this.lostPasswordButton = page.locator('.block.text-sm.text-gray-500.hover:underline.hover:text-slate-900')
        this.createAccountButton = page.getByRole('button', { name: 'Create account' })
        this.signUpButton = page.getByRole('button', { name: 'Sign Up' })
        this.accountLogInButton = page.locator('input').filter({ hasText: 'Log in' })
        this.closeButton = page.getByAltText('Close')
        this.logInButtonInWindow = page.locator('[data-login-target="loginModal"]').getByRole('button', { name:'Log In' })
        this.emailErrorMsg = page.getByText('Please enter a valid email').first()
        this.burgerMenuButton = page.getByAltText('Burger menu')
        this.form = page.getByText('Log in to your account')
        this.errorMsg = page.getByText('Invalid Email or password.')
        this.cookieAcceptButton = page.getByRole('button', { name:"Accept" })
    }

    async goto(){
        await this.page.goto('https://staging-stack.alynea.io', { waitUntil: 'commit' })

        try {
            await this.cookieAcceptButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.cookieAcceptButton.click();
        } catch (error) {
            console.log('Сookie banner already closed');
        }

    }

    async login(email: string, password: string, isMobile?: boolean){
        await this.page.waitForURL('https://staging-stack.alynea.io', { waitUntil: "commit" })

        if(isMobile){
            await this.burgerMenuButton.click()
        }

        await this.logInButton.waitFor({ state: 'visible', timeout: 30000 })
        await expect(async () => {
            if (!(await this.form.isVisible())) {
                await this.logInButton.first().click();
            }
            
            await expect(this.form).toBeVisible({ timeout: 20000 });
        }).toPass({ timeout: 30000 });
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.accountLogInButton.waitFor({ state: 'visible', timeout: 15000 })
        await expect(async () => {
            await this.accountLogInButton.click()  
        }).toPass({ timeout: 30000 });
        
    }

    async createCookies(path: string){
        await this.page.context().storageState({ path: path })
    }

}
