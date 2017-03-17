
Project Address
================================================================================

You can visit our site [here](https://boardex-b8a9e.firebaseapp.com).

Overview
================================================================================

BoarDex is a web application that categorizes and organizes board games. Users
can create board game entries, update and delete them, as well as rate them
based on different categories. Users can also filter board games by different
fields - namely playing time, number of players, materials, and age.

## screen shot for homepage on computer
![demo-pc-home](/demo-pics/demo-pc-home.png)
## screen shot for info page on computer
![demo-pc-info](/demo-pics/demo-pc-info.png)
## screen shot for edit page on computer
![demo-pc-edit](/demo-pics/demo-pc-edit.png)
## screen shot for login page on computer
![demo-pc-login](/demo-pics/demo-pc-login.png)
## screen shot for home page on phone or tablet
![demo-phone-home](/demo-pics/demo-phone-home.png)

Technology
================================================================================

- Frontend: HTML, CSS (SASS), JS (vanilla JS and VueJS)
- Backend: Firebase 
- Image Management: [Cloudinary](http://Cloudinary.com)

Code Architecture
================================================================================
## html
We have seperated html files for every other page.
We structured our html files semantically as opposed to presentationally.
For example, on our home page, we have split our page into seperate parts, 
such as header, sidebar, and gamelist. Naturally, in our `index.html` file,
we have different classes for each different part.

## sass
Because of the way that we structured our html, we similiarly structured our
stylesheets.  
So, instead of having one stypesheet per page, we have different stylesheets
based on different components of our page.
For example, instead of having a stypesheet called `index.css`, we broke it up into
`header.css`, `sidebar.css`, and `list.css`, which match with the home page accordingly.
This also allowed us to reuse stylesheets on components that appear across multiple pages.

## js
With the same idea, we split up our javascript files based on functionality. 

File Organization
================================================================================
Our files are organized inside a **public** folder.
Inside our **public** folder, our files are seperated into different folders by
file types.
Notice that we are using `sass` to write our `css` files, 
so all our `css` files will be generated using a script `makesass.sh`.

## Our file tree
    - firebase generated files
    - README
    - public/
        - all html files
        - deploy.sh
        - makesass.sh
        - sass/
        - fonts/
        - img/
        - js/

Performance
================================================================================

## Uploading Time VS Page Loading Time

- the speed of upload image is slower when the user try to edit a game.
- general page loading speed is much faster.

We implemented an image resizing feature so that 
regardless of the image size that a user may try to upload, 
the image will always be scaled down to a fixed size 
that is relatively small.
We utilized a third party image management service (Cloudinary) to resize our images.

In order to use *Cloudinary*, 
we needed to get the URL of the images that the user uploads.
To do this, we needed to upload the images into our firebase storage first,
and then download the shrinked images from CLoudinary.
After that, we replaced the original images with the resized one.
So, we need to actually upload to our storage twice to get the job done,
which naturally slows down the image upload process.

While doing this slowed down the speed of uploading images when a user is
adding/editing a game, unifying all the uploaded images improved the load time
of our web pages tremendously.

Concerns and Limitations
=============================================================================

## third-party tools limitation:
Because our resizing feature is dependent on a thrid-party service, there are certain limits.
For example, for free users like us, there is a limit on the total number of images that
we can upload per month, as well as the amount of data that we can transfer.

## user interaction
Because of the scope of the class, we did not have enough time to add more user
interaction features, such as commenting, reviewing and discussing games with one another.

Future Goals 
================================================================================

## Favorite feature
We intended to allow users to create a list of favorite games. 
However, because we decided to change our original plan and let users create,
edit, and delete games, these features took priority.
We hope to let the users to have their collection of favorite games in the future.

## custom tags
Right now, logged-in users are only allowed to add predefined tags to a game.
We think it might be helpful if they can create tages of their own. 

## progressive image loading
To make our website more user-friendly and give the user more perception of the current status of our webpage, we would like to change the image loading process from one by one to
loading all images progressively. 

Notes
================================================================================

The VueJS framework adds certain attributes (e.g. `v-model`)
to the tags.
When using these attributes,
the pages will fail the validator
because of unknown attributes.
