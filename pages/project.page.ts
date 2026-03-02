import { Page, Locator, expect } from '@playwright/test';

export class ProjectPage {
    readonly page: Page;
    readonly jurisdictionDropdown: Locator;
    readonly nameInput: Locator;
    readonly addressInput: Locator;
    readonly unitInput: Locator;
    readonly createProjectSubmitBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.jurisdictionDropdown = page.locator('[id="project_jurisdiction_id-ts-control"]'); 
        this.nameInput = page.getByPlaceholder('Enter a descriptive name for your collection');
        this.addressInput = page.getByRole('textbox', { name: 'Search' })   
        this.unitInput = page.getByPlaceholder('Optional');   
        this.createProjectSubmitBtn = page.locator('.alynea-sm-blue-solid-button')
    }

    async createProject(projectName: string, address: string, jurisdictionName: string, unit?: string){

        await this.jurisdictionDropdown.fill(jurisdictionName);
        await this.page.getByRole('listbox').filter({ hasText: jurisdictionName}).click();
        await this.nameInput.fill(projectName);
        await this.addressInput.fill(address);
        await this.addressInput.press('ArrowDown');
        await this.addressInput.press('Enter');
        if (unit) {
            await this.unitInput.fill(unit);
        }
        await expect(this.createProjectSubmitBtn).toBeEnabled();
        await this.createProjectSubmitBtn.click();

    }

    findInputs(name: string){
        return this.page.getByText(name, { exact: true })
    }

}



