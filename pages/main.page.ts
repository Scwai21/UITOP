import {Page, Locator} from '@playwright/test'


export class MainPage{
    readonly page: Page
    readonly hiThereTitle: Locator
    readonly successMsg: Locator
    readonly projectsButton: Locator
    readonly moreBtn: Locator

    constructor(page: Page){
        this.page = page
        this.hiThereTitle = page.getByText('Hi there Bacos');
        this.successMsg = page.getByText('Signed in successfully.');
        this.projectsButton = page.getByAltText('Projects')
        this.moreBtn = page.getByRole('button', { name: 'More' })
    }

    async goto(){
        await this.page.goto('https://staging-stack.alynea.io', { waitUntil: "commit" })
    }




}