# NOVA-Static-Site (v0.01)
Static site generator for vendor sites.
___
## Requirements
In order to use this static site generator you must have installed:

### Ruby
  - Mac users do not need to do anything for this as Ruby comes installed.
  - Windows users will need to install the latest version of [Ruby] (https://www.ruby-lang.org/en/downloads/).
  
### Node
We use Node.js to manage our package dependencies. Make have the latest version of [Node.js] (https://nodejs.org/en/)
  
### Gulp
We use [Gulp.js] (www.gulpjs.com) to handle our tasks and builds. Please make sure you have the latest version installed.

___
## Setup

Clone the Repo or download the .zip.
From the terminal (or command line in Windows) navigate to your site's directory.

```
$ cd My/Site/Directory
```
### Build
Run Gulp to build site

```
$ gulp
```
___
## Tasks
Once the site is built you can begin editing. We have a default watch task which will perform 3 seperate tasks for compiling the different parts of the site. Alternatively, you can perform individual tasks depending on which part of the site you wish to compile.

### Watch
This task will watch for any changes to files and compile all files.

```
$ gulp watch
```

### HTML
To build the HTML pages we have setup a task called *fileinclude*. This task will compile the templates and includes into static HTML pages.

```
$ gulp fileinclude
```

### Sass
To compile the stylesheets we have setup a task called *sass*. This task will compile the Scss into nested CSS and add vendor prefixes.

```
$ gulp sass
```

### Scripts
To compile any used scripts we have setup a task called *scripts*. This task compliles and minifies any scripts used in the site.

```
$ gulp scripts
```
___
## Components to add:
- [ ] Tabs
- [ ] Accordions
- [x] Tabs-to-accordions
- [ ] Progress bar
- [ ] Contact form
- [ ] Wordpress feed
