import { test, expect } from '../fixtures/custom-fixtures'

const uniqueProjectName = `Test Auto Project ${Date.now()}`;



test('Successfully create a custom project with all fields', async ({ projectPage, page, mainPage, projectsPage, isMobile }) => {
        
    if (isMobile){
        await mainPage.moreBtn.click()
        await expect(mainPage.projectsButton).toBeVisible()
    }
    await mainPage.projectsButton.click()
    await projectsPage.createNewProjectBtn.click()       
    await projectPage.createProject(
        uniqueProjectName, 
        'Vancouver',  
        'La',
        "Apt 42"   
    );        
    await expect(page).not.toHaveURL(/.*new/);
    await expect(projectPage.findInputs(uniqueProjectName)).toBeVisible()
    await expect(projectPage.findInputs('La')).toBeVisible()
    await expect(projectPage.findInputs('Vancouver')).toBeVisible()
    await expect(projectPage.findInputs('Washington, United States')).toBeVisible()
    await mainPage.projectsButton.click()
    await expect(projectsPage.findProject(uniqueProjectName)).toBeVisible();
});    





    