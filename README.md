# Static-Site-Generator
Static site generator for vendor sites.
___
## Requirements
In order to use this static site generator you must have installed:

### Ruby
  - Mac users do not need to do anything for this as Ruby comes installed.
  - Windows users will need to install the latest version of [Ruby] (https://www.ruby-lang.org/en/downloads/).
  
### Node
We use Node.js to manage our package dependencies. Make have the latest version of [Node.js] (https://nodejs.org/en/)
  
___
## Setup

Clone the Repo or download the .zip.
From the terminal (or command line in Windows) navigate to your site's directory.

```
$ cd My/Site/Directory
```
Initiate Project

```
$ npm init
```

### Build
Run *install* to download and install dependencies

```
$ npm install
```

Run *build* to build site

```
$ npm run build
```
___
## Tasks
Once the site is built you can begin editing. We have a default watch task which will perform 3 seperate tasks for compiling the different parts of the site. Alternatively, you can perform individual tasks depending on which part of the site you wish to compile.

### Watch
This task will launch a browser window via **browser-sync** and watch for any changes to files and compile all files.

```
$ npm run watch
```

### HTML
To build the HTML pages we have setup a task called *html*. This task will compile the templates and includes into static HTML pages.

```
$ npm run html
```

### Sass
To compile the stylesheets we have setup a task called *sass*. This task will compile the .scss files into nested CSS and add vendor prefixes.

```
$ npm run sass
```

### Scripts
To compile scripts we have setup a task called *scripts*. This task watches for updates to our script files and concatenates them to `dist/js/scripts.js` .

```
$ npm run scripts
```
___
## Components to add:
- [x] Tabs
- [x] Accordions
- [x] Block Grid
- [x] Modals
- [X] Number Counter
- [ ] Contact form
- [ ] Wordpress feed
- [ ] Testimonials
- [ ] Profiles
- [ ] Full width CTA
- [ ] Heading styles