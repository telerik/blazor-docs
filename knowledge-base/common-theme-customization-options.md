---
title: Blazor Theme Customization Options
description: How to customize or override the Telerik Blazor CSS themes. What is the best approach for each development scenario.
type: how-to
page_title: Blazor Theme Customization Options
slug: common-kb-theme-customization-options
position: 
tags: themes, styling, css
ticketid: 1545598, 1557991, 1559673
res_type: kb
category: knowledge-base
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

What is the best approach to create a base company fully customized CSS stylesheet for Telerik UI for Blazor?

How to provide visual flexibility and change the appearance of the components? How to override CSS styles with the app via style sheets or CSS isolation?

What are your recommendations to change the overall component styles? Should I modify the css manually?

Is there a simple and streamlined way to customize all component styles?


## Solution

Generally, there are **three** ways to customize the appearance of the Telerik Blazor components. Each approach adds an extra step to **every** UI for Blazor version update.

1. [Use the ThemeBuilder to create a custom theme]({%slug themes-custom%}#using-themebuilder).
    * This option allows [customization of the theme **colors** with the free version, or **full control** with the Pro version](https://docs.telerik.com/themebuilder/introduction#themebuilder-tiers).
    * Upgrading the custom theme is straight-forward via [manual](https://docs.telerik.com/themebuilder/web-app/migrating-projects) or [automatic](https://docs.telerik.com/themebuilder/web-app/automatic-migrations) approach.
2. [Build a custom theme from our SASS source]({%slug themes-custom%}#manual-alternative).
    * This option provides **full control** over the resulting CSS code.
    * Upgrading requires you to pull the changes from the [**`kendo-themes`** repo](https://github.com/telerik/kendo-themes) and **rebuild** the custom theme. Ideally, make only [variable and style overrides](https://github.com/telerik/kendo-themes/wiki/Core-Code-Concepts) with minimal edits to our source code itself. However, major customizations may require more changes and maintenance.
3. [Override theme styles with additional CSS code]({%slug themes-override%}).
    * This approach is possible with **both built-in themes or custom themes** made by the ThemeBuilder.
    * This option allows **full control** over the styling, but makes sense only up to a certain amount of customization. Beyond that, resort to building the theme from the source.
    * Upgrading may require changes to the additional custom CSS code, but only if there are breaking changes in the HTML output and styling.

To change the sizing and layout of most or all our components, go for manual theme build. For minor adjustments here and there, consider overrides only.

The final decision depends on what and how much you need to customize and what future requirements may appear.

[**Figma UI Kits**](https://www.telerik.com/figma-kits) allow designers to include visual representations of the Telerik components in their application designs. Custom kits still [require you to create a custom theme afterwards](/blazor-ui/styling-and-themes/figma-ui-kits#choosing-how-to-use-the-ui-kits).


## See Also

* [How to Override Theme Styles]({%slug themes-override%})
* [Using Custom Themes]({%slug themes-custom%})
