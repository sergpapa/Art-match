# **TESTING**

The ArtMatch website has been tested manually as well as with automated services like code validators and browser developer tools.

# **Contents**

- [**TESTING**](#testing)
- [**Contents**](#contents)
  - [**Code Validators**](#code-validators)
    - [*w3schools HTML Validator*](#w3schools-html-validator)
    - [*w3schools CSS Validator*](#w3schools-css-validator)
  - [**Responsiveness Test**](#responsiveness-test)
  - [**Browser Compatibility**](#browser-compatibility)
  - [**Testing User Stories**](#testing-user-stories)
  - [**Known Bugs**](#known-bugs)
    - [**Resolved**](#resolved)
    - [**Un-resolved**](#un-resolved)
  - [**Additional Testing**](#additional-testing)
    - [**Lighthouse**](#lighthouse)
  
## **Code Validators**

### *[w3schools HTML Validator](https://validator.w3.org)*

- [Home page](https://sergpapa.github.io/Art-match/)
  
  ![Home-page-validator](assets/images/for-testing/home-page-html-validator.png)

- [Rules page](https://sergpapa.github.io/Art-match/rules.html)
  
  ![Rules-page-validator]()

- [Board page]()
  
  ![Board-page-validator]()


### *[w3schools CSS Validator](https://jigsaw.w3.org/css-validator/)*

![css-validator](assets/images/home-page-css-validator.png)

[Back to top](#contents)

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

A console error was continuously thrown for a request of favicon.ico, although no such file existed in the repository.

![favicon-bug](assets/images/favicon-bug.png)

The following code found on [Stackoverflow](https://stackoverflow.com/questions/1321878/how-to-prevent-favicon-ico-requests) by [Sridhar Ratnakumar](https://stackoverflow.com/users/55246/sridhar-ratnakumar) and [Diego Perini](https://stackoverflow.com/users/445673/diego-perini) that seems to have resolved the issue:

~~~ html
<link rel="icon" href="data:;base64,iVBORw0KGgo=">
~~~

On a second iteration, [fpc-favicon](assets/images/logo-favicon.png) was added on the project. Decided to keep the bug fix as the advice above also served as a fix for people not wanting to add a **favicon** file.

### **Un-resolved**

Performance testing on the [Gallery Page](https://sergpapa.github.io/FPC/gallery.html) with [Google Chrome Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) showcases poor results varying from 37-72%.

![Gallery-Performance](assets/images/performance-bug.png)

Actions taken: All images were converted from .jpg or .jpeg to .webp files in order to resuce size and payload. No significant result in performance. This bug does not seem to affect how quickly the page loads across devices.

[Back to top](#contents)

## **Additional Testing**

### **Lighthouse**

The website has been tested using [Google Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/) to test individual pages on:

- Performance - how does the page perform on loading?
- Accessibility - is the website accessible to all users?
- Best Practices - Does the code follow best practices?
- SEO - Is the pages optimized for search engines?
  
  An example of the Lighthouse results in the FPC home page is shown below:

  ![Lighthouse-home-page](assets/images/lighthouse-home-page.png)

Back to [README.md](./README.md#testing).