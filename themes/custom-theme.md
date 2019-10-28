---
title: Custom Themes
page_title: Custom Themes
description: Create a custom theme for the UI for Blazor components based on the built-in ones.
slug: themes-custom
tags: telerik,blazor,theme,custom
published: True
position: 3
---

# Custom Themes

By customizing themes you can alter the default appearance of the Telerik components so they match the desired color scheme from your designers and fit with the rest of your site's coloring and style.

The Progress [**Sass Theme Builder for Blazor**](https://themebuilder.telerik.com/blazor-ui) is an Angular web application that enables you to create new or customize existing themes.

This article will walk you through the tool and will explain how to use the generated custom theme.

>caption Figure 1: The home screen of the Sass Theme Builder

![](images/theme-builder-overview.png)

## Create New Theme

To create a new theme:

1. On the initial Sass Theme Builder pane, select the **Start Theming** option.

1. Choose one of the existing themes to use as a base.

    >caption Figure 2: Selecting a base theme
    
    ![](images/theme-builder-select-base-theme.png)
    
1. Follow the next options in this article to customize the theme


## Modifying Themes

The Sass Theme Builder supports the following options for customization:

* Color pickers which customize the main aspects of the components' coloring based on your deired color scheme.
    * For the Material theme, there are fewer options as per its guidelines - colors are derived from fewer variables.
* Predefined color swatches - these are predefined color palettes that you can step on. They were chosen by our design team.

The following list describes the Theme Builder UI:

1. Color Swatches pane - expand it to see the available predefined palettes.
2. Base Theme name - the name of the theme you step onto.
3. Color pickers and other controls for customizing the theme.
4. Link to documentation.
5. Download the theme when you are done tweaking, so you can reference it in your project.
6. Components list - you can select which components to include in the preview.

The rest is the Preview pane where you can see the changes in real-time as you make them through the controls on the left.

>caption Figure 3: Theme Builder UI Explained

![](images/theme-builder-ui-explanations.png)

## Import Custom Theme

You can also upload a theme you have previously worked on:

1. On the initial Sass Theme Builder pane, select **Import Theme**.
1. Upload the `variables.scss` file which contains your current modifications of the customized theme. As a result, the selected components and styling elements load.
1. Start [customizing your theme](#modifying-themes).

>caption Figure 4: Importing themes for customization

![](images/theme-builder-import.png)

## Use The Custom Theme In Your Project

When you complete the modifications and the theme is ready to be used:

1. Download the theme as a compact archive by clicking the **Download** button.
1. Add the `all.css` file to your application. Save the `variables.scss` file for future reference in case you need to re-generate the theme again or customize it further.
1. Include the `all.css` file in the `head` tag of your index document.
    * Make sure that this is the only Telerik Theme that is referenced in the application.
    


## Manual Alternative

If you want finer control over the process, or you want to step onto a set of your custom variables, you can import the themes through `npm` and build them from scratch. You can find an example of doing that in the [Blazor Dashboard App Repo](https://github.com/telerik/blazor-dashboard). This can be especially useful for the Bootstrap theme so that you can use modified Bootstrap variables that it can incorporate.


## See Also

  * [Blazor Theme Builder](https://themebuilder.telerik.com/blazor-ui)
  * [Kendo SASS Themes](https://docs.telerik.com/kendo-ui/styles-and-layout/sass-themes)
