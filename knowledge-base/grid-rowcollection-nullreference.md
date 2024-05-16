---
title: NullReferenceException for GridRowCollection
description: How to fix a null reference exception thrown for the GridRowCollection property of the Telerik Blazor Grid.
type: troubleshooting
page_title: NullReferenceException for the Grid GridRowCollection
slug: grid-kb-nullreferenceexception-gridrowcollection
position: 
tags: 
ticketid: 1643250, 1642910, 1604815, 1574971, 1577863, 1580684
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

I upgraded the version of the Telerik UI from Blazor components and I get a `NullReferenceException` from the `GridRowCollection` class.

## Error Message

>warning Error: System.NullReferenceException: Object reference not set to an instance of an object.
   at Telerik.Blazor.Components.Grid.GridRowCollection`1.BuildRenderTree(RenderTreeBuilder __builder)

## Cause

The Telerik UI Grid for Blazor throws a `NullReferenceException` for the `GridRowCollection` property when using both the `Data` parameter and `OnRead` event handler:

<div class="skip-repl"></div>

````CSHTML
<TelerikGrid Data="@GridData"
             OnRead="@OnGridRead">
</TelerikGrid>

## Solution

Remove either the `Data` parameter or the `OnRead` event handler.

## See Also

* [Changes in the `OnRead` event in version 3.0]({%slug changes-in-3-0-0%}#onread)
* [Common `OnRead` event documentation]({%slug common-features-data-binding-onread%})
* [How to provide data to Telerik Blazor components]({%slug common-features-data-binding-overview%}#how-to-provide-data)

