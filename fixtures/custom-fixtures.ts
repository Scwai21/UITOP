import { test as base, expect} from '@playwright/test'
import { LoginPage } from '../pages/login.page'
import { MainPage } from '../pages/main.page'
import { ProjectPage } from '../pages/project.page'
import { ProjectsPage } from '../pages/projects.page'

type MyFixtures = {
    loginPage: LoginPage
    mainPage: MainPage
    projectPage: ProjectPage
    projectsPage: ProjectsPage

}

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use ) => {
        const loginPage = new LoginPage(page)
        await loginPage.goto()
        await use(loginPage)
    },

    mainPage: async({ page }, use) => {
        const mainPage = new MainPage(page)
        await mainPage.goto()
        await use(mainPage)
    },

    projectPage: async({ page }, use) => {
        const projectPage = new ProjectPage(page)
        await use(projectPage)
    },

    projectsPage: async({ page }, use) => {
        const projectsPage = new ProjectsPage(page)
        await use(projectsPage)
    }


})

export {expect}