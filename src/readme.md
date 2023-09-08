
# Sass Project Structure

## Basic
Here we have 3 partials connecting up to our `main.scss`.

**Base:** contained within this file are all y_o_ur resets, variables, mixins, and any utility classes.

**Layout:** contains all the CSS that handles the layout, such as the container and any grid systems.

**Components:** anything reusable such as buttons, navbars, cards etc.

**Main:** it should ONLY contain the imports for the above files.

## Advanced

- **The 7-1 Pattern**

```powershell
sass/
|
|- abstracts/ (or utilities/)
|   |- _variables.scss    // Sass Variables
|   |-_functions.scss    // Sass Functions
|   |- _mixins.scss       // Sass Mixins
|
|- base/
|   |-_reset.scss        // Reset/normalize
|   |- _typography.scss   // Typography rules
|
|- components/ (or modules/)
|   |-_buttons.scss      // Buttons
|   |- _carousel.scss     // Carousel
|   |-_slider.scss       // Slider
|
|- layout/
|   |- _navigation.scss   // Navigation
|   |-_grid.scss         // Grid system
|   |- _header.scss       // Header
|   |-_footer.scss       // Footer
|   |- _sidebar.scss      // Sidebar
|   |-_forms.scss        // Forms
|
|- pages/
|   |- _home.scss         // Home specific styles
|   |-_about.scss        // About specific styles
|   |- _contact.scss      // Contact specific styles
|
|- themes/
|   |-_theme.scss        // Default theme
|   |- _admin.scss        // Admin theme
|
|- vendors/
|   |-_bootstrap.scss    // Bootstrap
|   |- _jquery-ui.scss    // jQuery UI
|
`- main.scss              // Main Sass file
```

**Abstracts (or utilities):** holds Sass tools, helper files, variables, functions, mixins and other config files. These files are meant to be just helpers which don’t output any CSS when compiled.

**Base:** holds the boilerplate code for the project. Including standard styles such as resets and typographic rules, which are commonly used throughout your project.

**Components (or modules):** holds all of your styles for buttons, carousels, sliders, and similar page components (think widgets). Your project will typically contain a lot of component files — as the whole site/app should be mostly composed of small modules.

**Layout:** contains all styles involved with the layout of your project. Such as styles for your header, footer, navigation and the grid system.

**Pages:** any styles specific to individual pages will sit here. For example it’s not uncommon for the home page of your site to require page specific styles that no other page receives.

**Themes:** this is likely not used in many projects. It would hold files that create project specific themes. For example if sections of your site contain alternate color schemes.

**Vendors:** contains all third party code from external libraries and frameworks — such as Normalize, Bootstrap, jQueryUI, etc. However, there is often a need to override vendor code. If this is required, its good practice to create a new folder called `vendors-extensions/` and then name any files after the vendors they overwrite. The file`vendors-extensions/_bootstrap.scss` would contain all your Bootstrap overrides — as editing the vendor files themselves, isn’t generally a good idea.

**Main.scss**: This file should only contain your imports! For example..

```sass
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';

@import 'vendors/bootstrap';
@import 'vendors/jquery-ui';

@import 'base/reset';
@import 'base/typography';

@import 'layout/navigation';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';
@import 'layout/forms';

@import 'components/buttons';
@import 'components/carousel';
@import 'components/slider';

@import 'pages/home';
@import 'pages/about';
@import 'pages/contact';

@import 'themes/theme';
@import 'themes/admin';
```
