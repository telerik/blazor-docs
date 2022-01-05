---
title: Value cannot be null. (Parameter 'format')
description: Fix error Value cannot be null. (Parameter 'format') when using Telerik UI for Blazor.
type: troubleshooting
page_title: Value cannot be null. (Parameter 'format')
slug: common-kb-null-value-parameter-format
position: 
tags: telerik, blazor, null, value, parameter, format, localization
ticketid: 1528567
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

I am trying to use a Wizard component in an application that has localization enabled but I am getting an error.

## Error Message

>warning Unhandled exception rendering component: Value cannot be null. (Parameter 'format')
System.ArgumentNullException: Value cannot be null. (Parameter 'format')
at System.String.FormatHelper(IFormatProvider provider, String format, ParamsArray args)
at System.String.Format(String format, Object arg0, Object arg1)
at Telerik.Blazor.Components.TelerikWizard.get_PagerMessage()
at Telerik.Blazor.Components.TelerikWizard.BuildRenderTree(RenderTreeBuilder __builder)
at Microsoft.AspNetCore.Components.Rendering.ComponentState.RenderIntoBatch(RenderBatchBuilder batchBuilder, RenderFragment renderFragment)
at Microsoft.AspNetCore.Components.RenderTree.Renderer.RenderInExistingBatch(RenderQueueEntry renderQueueEntry)
at Microsoft.AspNetCore.Components.RenderTree.Renderer.ProcessRenderQueue()


## Cause\Possible Cause(s)

You may run across a similar error for other components as well. It occurs if a component is used in a localized application, but the `.resx` files are missing some keys for the corresponding component.

The app either needs to implement localization for the Telerik components correctly, or not implement a localization service at all. Partial localization is not possible. So, it is essential that the `.resx` files for the Telerik components are always up-to-date and contain all the necessary keys.

## Solution

To solve the issue, make sure that:

* The [application is correctly configured to use localization]({%slug globalization-localization%})
* The resx files are up-to-date and contain [all required localization strings](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Resources.Messages)


You can find the latest localization files in two places:

* In the /Resources/ folder of our demo site. The demo site is part of the UI for Blazor installation: /demos/TelerikBlazorDemos/Resources/ (maintained by Telerik)
* In the [telerik/blazor-ui-messages](https://github.com/telerik/blazor-ui-messages) GitHub repository (maintained by the community)

In some cases, you might not get an error, but components could appear partially localized (some texts are missing). More details on that are available at [Partially Localized Components, Missing Text, Not Translated Text]({%slug common-kb-partial-localization%}).
