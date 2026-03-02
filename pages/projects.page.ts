import {Page, Locator} from '@playwright/test'

export class ProjectsPage{
    readonly page: Page
    readonly projectList: Locator
    readonly createNewProjectBtn: Locator;

    constructor(page:Page){
        this.page = page
        this.projectList = page.locator('.grid > div');
        this.createNewProjectBtn = page.getByRole('link', { name: 'Create Custom Project' });
    }

    findProject(name: string){
        return this.projectList.filter({ hasText: name }).first()
    }

    

}