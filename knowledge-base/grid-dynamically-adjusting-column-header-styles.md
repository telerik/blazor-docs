---
title: Dynamically Adjusting Column Header Cell Style in Blazor Grid
description: Learn how to dynamically change the style of a column header cell in a Telerik Blazor Grid based on condition.
type: how-to
page_title: How to Dynamically Style Column Header Cell in a Telerik Blazor Grid
slug: grid-dynamically-adjusting-column-header-styles
tags: grid, blazor, header, headerclass
res_type: kb
ticketid: 1670074
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

I am dynamically creating Grid columns in a loop and trying to adjust the column header cell style based on some condition and value from the [column field]({%slug components/grid/columns/bound%}#data-binding). Ideally, I want to implement logic to make this adjustment based on the value in the header cell. I have not been able to achieve this in the `HeaderTemplate` tag or in any of the cell render events handlers. In other templates, I have access to the `@context` field, which would make this easy, but that doesn't seem to work in the `HeaderTemplate`.

## Solution

To dynamically add style to a column's header cell when dynamically creating columns in a loop, use the [HeaderClass parameter]({%slug components/grid/columns/bound%}#appearance) to set a class under a condition and apply different styles depending on the class. For scenarios with numerous and more complex conditions, create a method to determine the appropriate class. 

It's important to note that the [HeaderTemplate]({%slug grid-templates-column-header%}) does not receive a context argument because it is not related to rows and models, as outlined in the [Templates Overview]({%slug components/grid/features/templates%}) of the Telerik UI for Blazor documentation.

### Example

```csharp

```

## See Also

- [Grid HeaderClass Parameter]({%slug components/grid/columns/bound%}#appearance)
- [Grid Column Header Template]({%slug grid-templates-column-header%})
- [Templates Overview - Telerik UI for Blazor]({%slug components/grid/features/templates%})
