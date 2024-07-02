---
title: ThemeBuilder
page_title: ThemeBuilder Overview
description: Learn what ThemeBuilder is and how to use it to customize the appearance of the Telerik UI for Blazor components in your applications.
slug: themebuilder
tags: telerik,blazor,theme,custom,themebuilder
published: True
position: 20
---

# ThemeBuilder Overview

The [ThemeBuilder](https://www.telerik.com/themebuilder) is a web application that enables you to create your custom styles and apply them to the Telerik UI components in your Blazor apps.

With the [ThemeBuilder online tool](https://themebuilderapp.telerik.com), you can create new custom themes, modify existing ones, and organize them in projects. You are in full control of the appearance of every Telerik UI for Blazor component while, at the same time, you can apply large-scale updates in seconds. To speed up the customization of your Blazor app, the ThemeBuilder preview visualizes every style change almost instantly.

Visit the [ThemeBuilder documentation portal](https://docs.telerik.com/themebuilder) to learn how to:

* [Create a custom theme](https://docs.telerik.com/themebuilder/get-started/first-steps-theme-builder)
* Migrate custom themes to new component versions [automatically](https://docs.telerik.com/themebuilder/web-app/automatic-migrations) or [manually](https://docs.telerik.com/themebuilder/web-app/migrating-projects)
* [Export and use a theme in your Blazor app](https://docs.telerik.com/themebuilder/exported-package)

## Implementing Design Requirements

If you work with designers, ThemeBuilder allows you to style the Telerik UI for Blazor components precisely as required by your application's design and to apply your brand colors.

To improve the collaboration between designers and developers, Telerik UI for Blazor comes with [four UI Kits for Figma]({% slug ui-kits/themes %}): Material, Bootstrap, Fluent, and Telerik UI Default. Your designers will use them to create the required application design and to apply your brand colors. To implement these design requirements, you need to create a new theme in ThemeBuilder and customize it:

1. Request the designer to send you a link to the UI kit with the customized colors in Figma.
2. Use the link to open the design in Figma. If you don't have a Figma account, you can create one for free.
3. Navigate to the **Components** page and locate the **Color Styles** in the [Inspect Panel](https://help.figma.com/hc/en-us/articles/360055203533-Use-the-Inspect-panel), where you can find the values of all colors used in the design.
4. Create a new project in the ThemeBuilder application. To choose the most suitable starting **Theme**, ask your designer which UI Kit was used: **Default**, **Bootstrap**, **Material**, or **Fluent**.
5. Copy the color codes from the **Color Styles** in Figma and paste them into the ThemeBuilder color editor with the same name. For example, copy the value of the `$primary` color in Figma and paste it into the `$kendo-color-primary` color editor in ThemeBuilder.

## See Also

* [Progress ThemeBuilder Application](https://themebuilderapp.telerik.com)
* [Progress ThemeBuilder Documentation](https://docs.telerik.com/themebuilder)
