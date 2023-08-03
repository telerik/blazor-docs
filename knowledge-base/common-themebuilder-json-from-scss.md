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
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>UI for Blazor, ThemeBuilder</td>
		</tr>
	</tbody>
</table>


## Description

I have a custom theme `SCSS` (SASS) or `JSON` file with variables and values, which I created with [the ThemeBuilder application](https://themebuilderapp.telerik.com). I want to import this `SCSS` file to the ThemeBuilder to make some changes, but the Theme Builder now requires a `ZIP` file import.

> Starting with R3 2022, ThemeBuilder is accessible from a [new URL](https://themebuilderapp.telerik.com). This new ThemeBuilder version replaces the previous ThemeBuilder and provides more free features through its Pro, Ultimate, and Enterprise tiers. All your existing custom themes will continue to work in the new ThemeBuilder.  

## Cause\Possible Cause(s)

Older versions of the ThemeBuilder applications were accepting `SCSS` (SASS) or `JSON` files to import an existing custom theme. Because this approach caused some issues, the team switched to the `ZIP` import instead.

## Suggested Workarounds

All themes created with ThemeBuilder must be migrated to the latest application version. Once the theme migrates to the latest version, you can make all needed modifications within the ThemeBuilder application. [Learn how to manually migrate a theme with ThemeBuilder Pro here ...](https://docs.telerik.com/themebuilder/web-app/migrating-projects)

The ThemeBuilder application, licensed with [the Ultimate and Enterprise tiers](https://www.telerik.com/themebuilder/pricing), provides the option for automatic migration of themes generated with older ThemeBuilder versions. Once the theme migrates to the latest version, you can make all needed modifications within the ThemeBuilder application. [Learn more about the automatic migration with ThemeBuilder Ultimate here...](https://docs.telerik.com/themebuilder/web-app/automatic-migrations)
