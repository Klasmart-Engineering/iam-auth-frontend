import { errorPages } from '../page_objects/errorPages';
import { When } from "cypress-cucumber-preprocessor/steps";

When(`I click on home button`, () => {
    errorPages.clickOnHomeButton();
});
