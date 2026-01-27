---
title: Importing SASS theme in ThemeBuilder
description: The ThemeBuilder application requires a ZIP file to import a theme. Here is how to create it if you don't have it.
type: troubleshooting
page_title: ZIP File for Theme Builder Import Unavailable
slug: common-kb-themebuilder-json-from-scss
position: 
tags: telerik, blazor, custom, theme, themebuilder
ticketid: 1523785, 1521445, 1525713, 1618579
res_type: kb
components: ["general"]
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

I have older custom themes exported as  SCSS (SASS) and JSON files with variables and values, which I created with previous versions of [the ThemeBuilder application](https://themebuilderapp.telerik.com). I want to import this SCSS file into ThemeBuilder to make some changes, but the Theme Builder now requires a ZIP file import.

> Starting with R3 2022, ThemeBuilder is accessible from a [new URL](https://themebuilderapp.telerik.com). This new ThemeBuilder version replaces the previous ThemeBuilder and provides more free features through its Pro, Ultimate, and Enterprise tiers. All your existing custom themes will continue to work in the new ThemeBuilder.  

## Cause

Previous versions of the ThemeBuilder application were accepting SCSS (SASS) or JSON files when importing an existing custom theme. As this approach caused some issues, the latest ThemeBuilder version accepts only ZIP files.

## Suggested Workarounds

All themes created with previous ThemeBuilder versions must be migrated to the latest application version. Then, you can make all needed modifications within the ThemeBuilder application. [Learn how to manually migrate a theme with ThemeBuilder Pro](https://docs.telerik.com/themebuilder/web-app/migrating-projects).

The ThemeBuilder [Ultimate and Enterprise](https://www.telerik.com/themebuilder/pricing) licenses allow you to automatically migrate themes generated with older ThemeBuilder versions. Once the theme is migrated to the latest version, you can make all needed modifications within the ThemeBuilder application. [Learn more about the automatic migration with ThemeBuilder Ultimate](https://docs.telerik.com/themebuilder/web-app/automatic-migrations).
