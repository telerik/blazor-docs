---
title: Null Reference when using filtering in Grid with data coming from a server 
description: How to fix a Null Reference exception when using filtering in Grid with data coming from a server?
type: troubleshooting
page_title: Null Reference when using filtering in Grid
slug: grid-kb-filtering-null-reference
position:
tags: telerik,blazor,grid,filtering,null,reference,exception
ticketid: 1524399
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
For our current project, we are grabbing data from the server and using it to dynamically populate a `TelerikGrid` in Blazor.  This is causing an issue with filtering in the `Grid`.

## Error Message
>warning `System.NullReferenceException: Object reference not set to an instance of an object.` <br />
>`at Telerik.Blazor.Components.Common.Filters.FilterList.TelerikFilterList.GetFilterOperators()`
>`at Telerik.Blazor.Components.Common.Filters.FilterList.TelerikFilterList.InitFilterOperators()`
>`at Telerik.Blazor.Components.Common.Filters.FilterList.TelerikFilterList.OnInitializedAsync()`
>`at Microsoft.AspNetCore.Components.ComponentBase.RunInitAndSetParametersAsync()`

## Cause\Possible Cause(s)
The possible reason for this error is a missing `FieldType` from the column that you try to filter.

## Solution
The `FieldType` is required when a `Grid` can't get its columns type through reflection. In cases, when the `Grid` is bound to an `object` rather than a real `model`.

The following sample project in the blazor-ui repository demonstrates an example of filtering in `Grid` with data coming from a server.

https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server/ServerApp

Additional useful information can be found at our `Grid` data binding documentation in the following link.

https://docs.telerik.com/blazor-ui/components/grid/columns/bound#grid-bound-column-parameters