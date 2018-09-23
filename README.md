# Favourites

Favourites is a Mozilla Firefox WebExtension which can be used as an alternative to the common Firefox bookmarks. Favourites adds an icon to your browsers toolbar from which you can access all of your saved pages. The user can manage his favourite pages inside the WebExtensions settings page.

[![Mozilla Add-on](https://img.shields.io/badge/Version-1.1.0-green.svg)](https://addons.mozilla.org/en-US/firefox/addon/historify/) 

![picture alt](https://i.imgur.com/5cmaXY5.png "Demo screenshot") 

## Core Technical Concepts
Favourites uses the [WebExtension Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) which enables the WebExtension to locally save all of the users favourite websites. The WebExtension only uses a [popup page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups) and an [options page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Options_pages), no [background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_pages) or [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts). The popup page is used to show the user his favourite websites and the options page is used to manage these websites.

The project has two folders in the root directory: icons (where all the icons are saved) and ui (where all files are located which allow user interaction and from where the extension accesses the [Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) to store websites). Another important file which is located in the root directory is the [manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json). Like in any other WebExtension it stores metadata about the extension such as its name, version and permissions. The file also gives Favourites the permission to use the [Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) in order to use a popup in the toolbar and a options page for extension preferences.

Visualized project structure:

![picture alt](https://i.imgur.com/tML1eDV.png "Project structure") 

For additional information on Mozilla Firefox WebExtensions please visit [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension).

## Getting Started
To install the WebExtension please visit [addons.mozilla.org](http://addons.mozilla.org) and click the "add to Firefox" button. Alternatively you can also install it manually by downloading the installables from the projects [releases page](http://github.com/releases). If you want to install the extension manually, you have to drag&drop the installable (.xpi file) into your browser window and click the 'add' button. 

After installing you can click on the icon in the toolbar, then click the cogwheel to open settings and finally setup your favourite websites by typing in the details and clicking the add button.

## Contributing
#### Contributor Guidelines: TBA
#### Code Style/Requirements: TBA
#### Format for commit messages: TBA

## TODO
#### Next steps:
* See the projects [development board](https://github.com/flosommerfeld/Favourites/projects/1).
#### Features planned: 
* Loading images for favourites from online resources etc.
* Sorting the websites via the options page.
* Validation for website details (image, name, url).

#### Known bugs:
* If the first favourite is deleted the new first favourite doesn't have round corners.
* If many favourites are added, scrolling bars show up.


## Contact
Email address: [flosommerfeld@pm.me](mailto:flosommerfeld@pm.me)

## License

The contents of this repository are covered under the [GNU General Public License v2.0](LICENSE).
