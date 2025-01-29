---
title: Value cannot be null. (Parameter 'format')
description: Fix error Value cannot be null. (Parameter 'format') when using Telerik UI for Blazor.
type: troubleshooting
page_title: Value cannot be null. (Parameter 'format')
slug: common-kb-null-value-parameter-format
position: 
tags: telerik, blazor, null, value, parameter, format, localization
ticketid: 1528567, 1570325
res_type: kb
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

I am getting an error when I am using a Telerik Blazor component in an application with enabled localization.

## Error Message

The exact error message can vary. Here are just a few examples:

````C#.skip-repl
Unhandled exception rendering component: Value cannot be null. (Parameter 'format')
````

````C#.skip-repl
System.ArgumentNullException: Value cannot be null. (Parameter 'format')
    at System.String.FormatHelper(IFormatProvider provider, String format, ParamsArray args)
    at System.String.Format(String format, Object arg0, Object arg1)
    at Telerik.Blazor.Components.TelerikWizard.get_PagerMessage()
````

````C#.skip-repl
System.ArgumentNullException: Value cannot be null. (Parameter 'format')
    at System.String.FormatHelper(IFormatProvider provider, String format, ParamsArray args)
    at Telerik.Blazor.Components.Common.Filters.FilterMenu.TelerikFilterMenu.get_FilterMenuSettingsLabel() 
````

## Possible Cause

A similar error can occur if a component is used in a localized application, but the `.resx` files are missing some keys for the corresponding component.

The app either needs to implement localization for the Telerik components correctly, or not implement a localization service at all. Partial localization is not possible. So, it is essential that the `.resx` files for the Telerik components are always up-to-date and contain all the necessary keys.

## Solution

To solve the issue, make sure that:

* The [application is correctly configured to use localization](slug://globalization-localization)
* The resx files are up-to-date and contain [all required localization strings](slug://Telerik.Blazor.Resources.Messages)

Find the latest localization files in two places:

* (maintained by Telerik) In the offline version of our [Blazor demo site](https://demos.telerik.com/blazor-ui). Download our [UI for Blazor automated installer](slug://installation/msi) or [UI for Blazor ZIP archive](slug://installation/zip). Then, look inside folder `/demos/TelerikBlazorDemos/Resources/`.
* (maintained by the community) In the [telerik/blazor-ui-messages](https://github.com/telerik/blazor-ui-messages) GitHub repository

In some cases, you might not get an error, but components may appear partially localized (some texts are missing). More details on that are available at [Partially Localized Components, Missing Text, Not Translated Text](slug://common-kb-partial-localization).

## See Also

* [Telerik Blazor localization](slug://globalization-localization)
