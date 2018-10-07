# Favourites [![Mozilla Add-on](https://img.shields.io/badge/Version-1.2.3-green.svg)](https://github.com/flosommerfeld/Favourites/releases/tag/v1.2.3)

Favourites is a Mozilla Firefox WebExtension which can be used as an alternative to the common Firefox bookmarks. Favourites adds an icon to your browsers toolbar from which you can access all of your saved pages. The user can manage his favourite pages inside the WebExtensions settings page.



![picture alt](https://i.imgur.com/5cmaXY5.png "Demo screenshot")

<details>
<summary>Click here to view more demo screenshots</summary>
<br>

#### Settings page

![picture alt](https://i.imgur.com/fIgy4mk.png "Settings page")

#### Context menu feature

![picture alt](https://i.imgur.com/9t5fsag.gif "Context menu feature")

</details>


## Getting Started
To install the WebExtension please click the big "Add to Firefox" button below which takes you to [addons.mozilla.org](http://addons.mozilla.org). Alternatively you can also install it manually by downloading the installables from the projects [releases page](https://github.com/flosommerfeld/Favourites/releases). If you want to install the extension manually, you have to drag&drop the installable (.xpi file) into your browser window and click the 'add' button.

After installing you can click on the icon in the toolbar, then click the cogwheel to open settings and finally setup your favourite websites by typing in the details and clicking the add button. Note that new websites can also be added via `Rightclick` -> `Add website to favourites`.

[![Add to Firefox](https://i.imgur.com/t68JfGQ.png)](https://addons.mozilla.org/en-US/firefox/addon/favourites/)


## Core Technical Concepts
Favourites uses the [WebExtension Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) which enables the WebExtension to locally save all of the users favourite websites. The WebExtension only uses a [popup page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups) and an [options page](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Options_pages), no [background scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension#Background_pages) or [content scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts). The popup page is used to show the user his favourite websites and the options page is used to manage these websites.

The project has two folders in the root directory: icons (where all the icons are saved) and ui (where all files are located which allow user interaction and from where the extension accesses the [Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) to store websites). Another important file which is located in the root directory is the [manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json). Like in any other WebExtension it stores metadata about the extension such as its name, version and permissions. The file also gives Favourites the permission to use the [Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) in order to use a popup in the toolbar and a options page for extension preferences. Since version [1.2.0](https://github.com/flosommerfeld/Favourites/releases/tag/v1.2.0) Favourites has a [background script](https://github.com/flosommerfeld/Favourites/blob/master/background-script.js) which was added in order to add new websites via the context menu. The script is always running in the background and waits for the user to open the context menu and to click the "Add website [..]" button. If the button is clicked the background script gets information about the active tab (via the [activeTab](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions#activeTab_permission) permission) and accesses the [Storage API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage)  to save the new website.

Visualized project structure:

![picture alt](https://i.imgur.com/DBqPu1a.png "Project structure")

For additional information on Mozilla Firefox WebExtensions please visit [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Anatomy_of_a_WebExtension).


## Contributing
#### Contributor Guidelines: TBA
#### Code Style/Requirements: TBA
#### Format for commit messages: TBA


## TODO
#### Next steps:
* See the [development board](https://github.com/flosommerfeld/Favourites/projects/1).
#### Features planned:
* Loading images for favourites from online resources etc.
* Sorting the websites via the options page.


#### Known bugs:
* See [issues board](https://github.com/flosommerfeld/Favourites/issues)


## Contact
Email address: [flosommerfeld@pm.me](mailto:flosommerfeld@pm.me)


## License

The contents of this repository are covered under the [GNU General Public License v2.0](LICENSE).
