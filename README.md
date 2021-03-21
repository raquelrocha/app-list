# AppList

This exercise is part of Talkdesk's recruitment process, implemented by Raquel Rocha.

## Description

The user is able to see all the apps available. This apps are listed in pages, each page with 3 apps as its content.
If the user wishes to search an App, just write something in the Search input and the results will be updated. To clear the search, either click on the 'Clear' on the right side of the input or just delete the text.

If the user wishes to filter by categories, the user can just click on the list of categories (left side) and it will update the app list accordingly.
If the user, prior to select a category, had searched something (lets say "Te"), then after selecting a category it will search for Apps of that Category with the name containing "Te".
If the user wishes to 'unselect' the category, just needs to click it again.

## Steps of implementation

The first step was to get all the requirements to work.
First, i implemented the app-list which received the data from App Component and would show it in pages with maximum of 3 app-item per page.
Then i implemented the search feature, which would filter the data of app-list (using Angular Component Input/Output logic).
Then i implemented the Categories component, which shows the categories list (created in App List) and allows the user to filter the apps by category.

Found the 1st problem here, if the user inputs some value in the search (lets say 'Text'), the list shows only apps with the name 'Text'. But then, if the user decided to click on the Category 'Voice Analytics', the app would ignore completly the search value and show apps with the category 'Voice Analytics' (even if the app name didnt contain 'Text'). I decided to add this to do the TO DO list and then decide a possible solution for this (either reset the search everytime a category is clicked, or filter category+search value together).

After this, all the requirements were done (show apps ordered by subscription total value, pagination, search and category filtering).

Since more than one component was using the app-list data, the project had multiple Inputs/Outputs to control its change.
Therefore, i decided to create a 'central' service which would contain a subscribable object with the apps list and would also be the one to change it (filterByCategory, filterByName).
With this, only the AppList component would need to subscribe to the AppList object of that service, and everytime it was modified (either by the Search or Category component when invoking the respetive filter methods), the AppList component would update its view.

Now, what remained on the TO DO list was the filter by category&search.
First, i created a Clear option in the search input - to allow the user to clear the search (since it allowed the user to clear the Category filter, it should also allow the search with a more clear action instead of just deleting the text).

Then i modified the filter methods in the App Service.
In the filter by category, it verifies if there is a previous value for the Name and filters first by that (invoking the filterByName), then uses the updated list to filter by category (same, in reverse, for the filter by value).

After this was done, i dedicated the rest of the time to improvements (style and unit tests).

## Run project

To run this project, simply type `ng serve` or `npm run start`. Navigate to `http://localhost:4200/`. 

## Running unit tests

Run `ng test` or `npm run tests` to execute the unit tests via [Karma](https://karma-runner.github.io).


