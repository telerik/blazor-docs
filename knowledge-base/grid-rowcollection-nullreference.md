---
title: Null Reference Expection from the GridRowCollection
description: Fixing a Null Reference Exception Thrown from the GridRowCollection.
type: troubleshooting
page_title: Null Reference Expection from the GridRowCollection
slug: grid-kb-nullref-gridrowcollection
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

I upgraded the version of the Telerik UI from Blazor components from `<3.0.0` to `>3.0.0` and I get a `NullReferenceException` from the `GridRowCollection` class.

## Error Message

>warning Error: System.NullReferenceException: Object reference not set to an instance of an object.
   at Telerik.Blazor.Components.Grid.GridRowCollection`1.BuildRenderTree(RenderTreeBuilder __builder)

## Cause

The Telerik Grid for Blazor throws a NullReferenceException from the GridRowCollection class when both the `Data` paramater and `OnRead` event handler are defined:

````CSHTML

<TelerikGrid Data="@DataCollection" OnRead="@OnReadHandler">
    ...
</TelerikGrid>
````

## Solution

Remove either the `Data` parameter or the `OnRead` event handler.

## See Also

* [Changes in the OnRead Event in 3.0.0]({%slug changes-in-3-0-0%}#onread)
* [Common OnRead Documentation]({%slug common-features-data-binding-onread%})
* [Common How to Provide Data Documentation]({%slug common-features-data-binding-overview%})

