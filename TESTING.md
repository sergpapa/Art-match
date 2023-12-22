# **TESTING**

The ArtMatch website has been tested manually as well as with automated services like code validators and browser developer tools.

# **Contents**

- [**TESTING**](#testing)
- [**Contents**](#contents)
  - [**Code Validators**](#code-validators)
    - [*w3schools HTML Validator*](#w3schools-html-validator)
    - [*w3schools CSS Validator*](#w3schools-css-validator)
    - [*JsHint JavasScript Validator*](#jshint-javasscript-validator)
  - [**Features Testing**](#features-testing)
  - [**Responsiveness Test**](#responsiveness-test)
  - [**Browser Compatibility**](#browser-compatibility)
  - [**Testing User Stories**](#testing-user-stories)
  - [**Known Bugs**](#known-bugs)
    - [**Resolved**](#resolved)
  - [**Additional Testing**](#additional-testing)
    - [**Lighthouse**](#lighthouse)
  
## **Code Validators**

### *[w3schools HTML Validator](https://validator.w3.org)*

- [Home page](https://sergpapa.github.io/Art-match/)
  
  ![Home-page-validator](assets/images/for-testing/home-page-html-validator.png)

- [Rules page](https://sergpapa.github.io/Art-match/rules.html)
  
  ![Rules-page-validator](assets/images/for-testing/rules-page-html-validator.png)

- [Board page](https://sergpapa.github.io/Art-match/board.html)
  
  ![Board-page-validator](assets/images/for-testing/board-page-html-validator.png)

### *[w3schools CSS Validator](https://jigsaw.w3.org/css-validator/)*

![css-validator](assets/images/for-testing/css-validator.png)

### *[JsHint JavasScript Validator](https://jshint.com)*

![js-validator](assets/images/for-testing/js-validator.png)

[Back to top](#contents)

## **Features Testing**

- ### Navigation Menu
  
  Expected - Feature is expected to redirect to the various website pages.
  Testing - Tested the feature by clicking each link manually and examining the result.
  Result - The feature acted as expected and redirected to other pages

- ### Gameplay features
  
  - *Level Building and Level Progression*
  
    Expected - Feature is expected to keep track of the levels and build new levels when user wins one.
    Testing - Tested the feature by manually playing the game to check the feature's effectiveness. Additionaly, tested by changing the level count directly through the game.level key on the game object.
    Result - The feature acted as expected and created levels normally.
  
  - *Card Load and Pairing*
  
    Expected - Feature is expected to connect cards together and load images from the database on thir back sides.
    Testing - Tested the feature manually by checking site response and on Dev Tools by console.log the card pairs and their img elements.
    Result - The feature acted as expected and connected the cards successfully.

  - *Score Keeping and Leaderboard*
  
    Expected - Feature is expected to keep track of the user's score and updated the leaderboard accordinglly.
    Testing - Tested the feature manually by playing the game and checking score und leaderboard updates.
    Result - The feature acted as expected and score and leaderboard are displaying normally.

  - *Lives Tracking*
  
    Expected - Feature is expected to keep track of the user's lives and act as a game over trigger.
    Testing - Tested the feature manually by playing the game and testing if lives are lost if a player makes an error. At 0 health the game is over.
    Result - The feature acted as expected and lives tracking works successfully.

- ### **Rules**
  
  Expected - Feature is expected to show the rules of the game to the user so they can understand how to play the game.
  Testing - Tested the feature manually by accessing the rules page.
  Result - The feature acted as expected and score and the rules are displaying normally.

## **Responsiveness Test**

Responsiveness tests were carried out manually with a combination of device testing and [Google Chrome Developer Tools](https://developer.chrome.com/docs/devtools/).

|         |**iPhone 11**|**Samsung Galaxy S8+**| **Pixel 5**|**iPad Mini**|**iPad Air**|**iPad Pro**|**Display <1200px**|**Display >1200px**|
|---------|-------------|----------------------|------------|-------------|------------|------------|-------------------|-------------------|
|  Render |   Pass      |       Pass           |  Pass      |    Pass     |   Pass     |  Pass      | Pass              |      Pass         |
|  Images |   Pass      |       Pass           |  Pass      |    Pass     |   Pass     |  Pass      | Pass              |      Pass         |
|  Links  |   Pass      |       Pass           |  Pass      |    Pass     |   Pass     |  Pass      | Pass              |      Pass         |

[Back to top](#contents)

## **Browser Compatibility**

ArtMatch has been tested in multiple browsers with no visible issues. Google Chrome, Mozilla Firefox, Safari, Microsoft Edge.Appearance, functionality and responsiveness were found consistent throughout on a range of device sizes and browsers.

## **Testing User Stories**

[Back to top](#contents)

## **Known Bugs**

### **Resolved**

[Back to top](#contents)

## **Additional Testing**

### **Lighthouse**

The website has been tested using [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) to test individual pages on:

- Performance - how does the page perform on loading?
- Accessibility - is the website accessible to all users?
- Best Practices - Does the code follow best practices?
- SEO - Is the pages optimized for search engines?
  
  An example of the Lighthouse results in the FPC home page is shown below:

  ![Lighthouse-home-page](assets/images/for-testing/lighthouse.png)

Back to [README.md](./README.md#testing).
