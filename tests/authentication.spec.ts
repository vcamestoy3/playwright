import {test, expect} from "@playwright/test";

test.describe('Authentication', () => {
    test('can login', async ({page}) => {
        await page.goto('https://automationexercise.com/');
        
        await page.locator('button.fc-button.fc-cta-consent.fc-primary-button').click();
       
        const home = page.getByRole('heading', {name: 'Features Items', });
        await expect(home).toBeVisible();
       
        await page.getByRole('link', {name: ' Signup / Login'}).click();
        const loginLocator = page.getByRole('heading', {name: 'New User Signup!'});
        await expect(loginLocator).toBeVisible();
       
        //Data to change!!!
        const nameUser = 'Test';
        const lastNameUser = 'User';
        await page.getByPlaceholder('name').fill(nameUser+' '+lastNameUser);
        await page.locator('input[data-qa="signup-email"]').fill('test.playwright@yopmail.com');

        await page.getByRole('button', {name: 'Signup'}).click();
        
        const accountInformation = page.getByRole('heading', {name: 'Enter Account Information'});
        await expect(accountInformation).toBeVisible();
        
        //Enter Account Information Form
        await (page.locator('input[value="Mr"]')).click();
        await page.locator('input[data-qa="password"]').fill('Test1234');
        await page.locator('select[data-qa="days"]').selectOption('21');
        await page.locator('select[data-qa="months"]').selectOption('4');
        await page.locator('select[data-qa="years"]').selectOption('2000');
        await page.getByRole('checkbox', {name: 'newsletter'}).click();
        await (page.locator('input[name="optin"]')).click();

        // Address information Form
        await page.fill('input[name="first_name"]', nameUser);
        await page.fill('input[name="last_name"]',lastNameUser);
        await page.fill('input[name="company"]','Four Point Solutions');
        await page.fill('input[name="address1"]','Test Street');
        await page.fill('input[name="address2"]','Test Street 2');
        await page.selectOption('select[name="country"]','Canada');
        await page.fill('input[name="state"]','Ontario');
        await page.fill('input[name="city"]','Toronto');
        await page.fill('input[name="zipcode"]','H0H 0H0');
        await page.fill('input[name="mobile_number"]','1234567890');

        await page.getByRole('button', {name: 'Create Account'}).click();

        const accountCreated = page.getByRole('heading', {name: 'Account Created!'});
        await expect(accountCreated).toBeVisible();

        await page.getByRole('link', {name: 'Continue'}).click();

        const loggedIn = page.getByText('Logged in as '+nameUser+' '+lastNameUser);
        await expect(loggedIn).toBeVisible();

        await page.getByRole('link', {name: 'Delete Account'}).click();

        const deleteAccount = page.getByRole('heading', {name: 'Account Deleted!'});
        await expect(deleteAccount).toBeVisible();

        await page.getByRole('link', {name: 'Continue'}).click();


    
        
    });
});