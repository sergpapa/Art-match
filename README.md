# **ArtMatch - A single-player art memory game**

## **Introduction**

ArtMatch is a single-player memory game! Immerse yourself in the world of art as you challenge your memory to identify pairs of art pieces from the [Art Institute of Chicago](https://www.artic.edu).

*Welcome to [ArtMatch](https://8000-sergpapa-art-match-phmaf57uyd.us2.codeanyapp.com/index.html)*

![ArtMatch mockup]()

# **Contents**

- [**ArtMatch - A single-player art memory game**](#artmatch---a-single-player-art-memory-game)
  - [**Introduction**](#introduction)
- [**Contents**](#contents)
- [**User Experience (UX)**](#user-experience-ux)
  - [**User Stories**](#user-stories)
    - [**As a player, I want**](#as-a-player-i-want)
    - [**As a parent of a minor playing the game, I want**](#as-a-parent-of-a-minor-playing-the-game-i-want)
  - [**Wireframes**](#wireframes)
  - [**Site Structure**](#site-structure)
  - [**Design**](#design)
- [**Features**](#features)
  - [**Existing features**](#existing-features)
  - [**Future Features**](#future-features)
- [**Technologies Used**](#technologies-used)
- [**Testing**](#testing)
- [**Deployment**](#deployment)
    - [**Project Deployment Instructions**](#project-deployment-instructions)
    - [**Forking the Repository on GitHub**](#forking-the-repository-on-github)
    - [**Creating a Local Clone of this Project**](#creating-a-local-clone-of-this-project)
- [**Credits**](#credits)
- [**Acknowledgements**](#acknowledgements)

# **User Experience (UX)**

## **User Stories**

### **As a player, I want**

- intuitive controls that are easily accessible and comprehensible, so that I can have a seamless gaming experience across all devices.
- clear and easily understandable game rules, so that I can have a concise overview of how to engage with the game effectively.
- a user interface with user-friendly buttons and controls designed for effortless navigation, so that I can enjoy the game on various devices.
- an immersive audio-visual experience with captivating sound and visual effects, so that I can enhance my gameplay and receive feedback on in-game events.
- a quick game restart option with a dedicated button, so that I can initiate a new game promptly without unnecessary wait times.
- to track my progress with real-time scores, level progression, and mistakes made, so that I can be aware of my performance and game advancemen
- informative details about encountered paintings, so that I can gain educational benefits and enhance my art appreciation while playing.
- a leaderboard feature to showcase top scores, so that I can be motivated to compete and surpass my own achievements.
  
### **As a parent of a minor playing the game, I want**

- the game to have an educational scope, so that my child can learn about art while playing.
- a functional and visually appealing game, so that my child can enjoy playing.
- a mute button in the game, so that my child can play without disturbing others with noises.
- a game that provides a safe and secure environment for my child to play.
  
[Back to top](<#contents>)

## **Wireframes**

The wireframes for ArtMatch were produced in [Balsamiq](https://balsamiq.com). Inclued below, frames can be found for all distinct pages (home, plans, gallery, contact) in desktop, mobile and tablet view as they were initially envisioned.

- *Home Page General:*

![Home Page](assets/images/for-readme/wireframes/index.png)

- *Home Page on Correct Answer!*

![Home Page](assets/images/for-readme/wireframes/index-on-correct.png)

- *Rules Page:*
  
![Rules Page](assets/images/for-readme/wireframes/rules.png)
  
- *Board Page:*
  
![Board Page](assets/images/for-readme/wireframes/leaderboard.png)

[Back to top](<#contents>)

## **Site Structure**

The site consists of four pages with the main landing page being the [home page](https://sergpapa.github.io/Art-match/) where the user can play the game. Additionaly, there are the [rules page](https://sergpapa.github.io/Art-match/rules.html) and [board page](https://sergpapa.github.io/Art-match/board.html).

[Back to top](<#contents>)

## **Design**

- *Typography*

All text on the website is using a variation of the "Amatic SC" font family found on [Google Fonts - Amatic SC](https://fonts.google.com/?query=Amatic+SC)

- *Colour palette*

The color pallete chosen for the website consists of five colors: state grey, lavender pink, pink, misty rose and alabaster.The website is mainly colored with a soothing misty rose background, complemented by playful lavender pink for buttons and messages and pink oor the came cards. State grey provides balanced borders and text, while alabaster adds modern sophistication to details and shapes. This carefully chosen color palette aims to create a visually pleasing and cohesive user interface for an enhanced gaming experience.

![ArtMatch - Colour Pallete](assets/images/for-readme/color-pallete.png)

[Back to top](<#contents>)

# **Features**

The ArtMatch wesite is designed to be simple to navigate and easy to use. It includes a variety of features commonly found in most web games such as a navigation bar, gameplay mechanics and a leaderboard.

## **Existing features**

- ### **Navigation Menu**

    Can be found on the header of all pages of the websites below the logo. Makes navigation through pages easy and intuitive.
    The navigation manu is fully responsive to accomodate users of all decvces. The active page is always overlined. Any other manu item is overlined and turned to lavender pink when hovered over with the mouse to increase usability.

  - *Navigation Menu*

    ![Navigation Menu](assets/images/for-readme/navigation-menu.png)

- ### **Gameplay Features:**

  - *Level Building*

    The game is designed with multiple levels (5), increasing in difficulty every two levels. The number of cards in each level varies, and the layout adapts to the screen size. Levels progress as the player successfully completes the current level.

    ![level building](assets/images/for-readme/start-game.png)

  - *Card Load and Pairing*

    The game dynamically loads cards with artworks from a database. Each card is paired with another, and the player's goal is to match these pairs by clicking on them.

    ![Card Load and Pairing](assets/images/for-readme/flip-cards.png)

  - *Level Progression*

    Upon successfully matching all card pairs in a level, the player advances to the next level. The game adapts the grid layout and increases the difficulty with more cards as the levels progress.

    ![Level Progression](assets/images/for-readme/level.png)

  - *Score Keeping*
  
    The player's score is continuously updated based on successful matches. Each correct pair earns the player points, contributing to their overall score.

    ![Score Keeping](assets/images/for-readme/score.png)

  - *Lives Tracking*
  
    The player starts with a set number of lives. Incorrect matches result in the deduction of a life. When lives reach zero, the game ends.

    ![Lives Tracking](assets/images/for-readme/lives.png)

  - *Live Updates*

    The player receives real-time updates on their score, the current level, and the number of lives remaining. Messages appear at significant events, such as completing a level or losing a life.

    ![Live Updates](assets/images/for-readme/find-pair.png)

- ### **Rules**
  
  The website includes a dedicated page explaining the rules and interactions of the game.

  ![rules-page](assets/images/for-readme/rules.png)
  
- ### **Leaderboard**
  
  Players are able to log in their desired username and store their scores in their browser memory, invoking  the motive for a user to compete and surpass their previous achievements.

  ![leaderboard](assets/images/for-readme/leaderboard.png)
  
- ### **Sound Toggle**

  The game includes a sound toggler allowing players to mute or unmute the in-game sounds. This feature enhances the player's experience by providing control over the audio elements.

  ![Sound Toggler]()

[Back to top](<#contents>)

## **Future Features**

- Implementing the public API of the [Art Institute of Chicago API](https://api.artic.edu/docs/) and laod a random art piece each time.
  - This feature was initially intended to be part of the game,but due to long waiting times for the requests to be fulfilled, the feature was left for a future update.
- Universal Leaderboard. At the moment, sicne the game is not connected to a database, the leaderboard functinality is limited to storing scores in the browser memory. Each player can access previous scores if logged in from the same decvce, but players are not able to see other users' scores yet.
  
[Back to top](<#contents>)

# **Technologies Used**

- [HTML5](https://html.spec.whatwg.org) - content and structure of the website
- [CSS3](https://www.w3.org/Style/CSS/Overview.en.html) - styling
- [Balsamiq](https://balsamiq.com) - wireframes
- [GitHub](https://github.com) - Hosting and storing
- [Codeanywhere](https://codeanywhere.com) - coding workspace
- [GIMP](https://www.gimp.org) - image editing
  
[Back to top](<#contents>)

# **Testing**

Please follow this [link](./TESTING.md) to learn more about testing FPC.

[Back to top](<#contents>)

# **Deployment**

### **Project Deployment Instructions**

This website is deployed on GitHub pages. Follow these steps to deploy a project:

  1. In the GitHub repository, go on the **Settings** tab.
  2. In the Settings menu, move to the **Pages** section on the left-hand side.
  3. In **Source**, select the **main** branch and click **save**.
  4. After selecting the master branch, the page will automatically reload, displaying a ribbon indicating the successful deployment.

![GitHub-deployment](assets/images/for-readme/github-deply.png)

  You can access the live link to the GitHub deployed version - [https://sergpapa.github.io/FPC/](https://sergpapa.github.io/FPC/)

### **Forking the Repository on GitHub**

To create a duplicate of the GitHub Repository, known as forking, you can view and make changes to this copy without impacting the original repository. To fork the repository, follow these steps:

1. Log in on **GitHub** and find the [repository](https://github.com/sergpapa/Art-match).
2. On the right-hand side of your page, next to the repository name, you can find a **Fork** button. Click it to create a duplicate of the original repository in your GitHub account.

![GitHub-forking](assets/images/for-readme/github-fork.png)

### **Creating a Local Clone of this Project**

To clone this project from GitHub to your local environment, follow these steps:

1. Below the repository's name, click on the **Code** tab.
2. Under **Clone with HTTPS**, click on the clipboard icon to copy the URL.

![Cloning](assets/images/for-readme/github-clone.png)

3. In your prefered IDE, open **Git Bash**.
4. Change the current working directory to the location where you want to create the cloned directory.
5. Type **git clone**, and then paste the copied URL from GitHub.
6. Press **enter** to vcreate the local clone.

[Back to top](<#contents>)

# **Credits**

- Font: [Google Fonts](https://fonts.google.com)
- Icons: [Fontawesome](https://fontawesome.com)
- Images [Art Institute of Chicago](https://www.artic.edu)
- Logo: [LOGO](https://logo.com)
- Wireframes: [Balsamiq](https://balsamiq.com)
- Flip cards: [w3schools](https://www.w3schools.com)
- Image Editing: [GIMP 2.10.34](https://www.gimp.org)
- Color Palette: [Coolors](https://coolors.co)

[Back to top](<#contents>)

# **Acknowledgements**

This website was developed as a part of my Portfolio 2 Project for the Web Application Developemnt Diploma at the [Code Institute](https://codeinstitute.net/). I want to express my gratitude to my mentor, [Precious Ijege](https://www.linkedin.com/in/precious-ijege-908a00168/), as well as the Slack community and everyone at the Code Institute for their valuable assistance and support throughout this project.

Sergios Papastergiou
2023
