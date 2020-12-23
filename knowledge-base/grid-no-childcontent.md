---
title: GridColumn does not have a property ChildContent
description: Fixing an exception GridColumn does not have a property ChildContent.
type: troubleshooting
page_title: GridColumn does not have a property ChildContent
slug: grid-kb-no-childcontent
position: 
tags: 
ticketid: 1470288
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
When opening the page I get an error

> `Telerik.Blazor.Components.GridColumn' does not have a property matching the name 'ChildContent'. `

similar code is used somewhere else in the application without any problems


## Steps to Reproduce
````CSHTML
<TelerikGrid Data="@MyData" Sortable="true" Height="500px">
    <GridColumns>
        <GridColumn Field="ID"></GridColumn>
        <GridColumn Field="TheName" Title="Employee Name">
            @*<Template>some template</Template>*@
            @* Adding comments while debuging or trying things out causes the exception *@
            Adding content such as text here directly will also cause this exception
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public IEnumerable<object> MyData = Enumerable.Range(1, 50).Select(x => new { ID = x, TheName = "name " + x });
}
````

## Error Message
InvalidOperationException: Object of type 'Telerik.Blazor.Components.GridColumn' does not have a property matching the name 'ChildContent'.

## Cause\Possible Cause(s)
Having a comment or any other content directly in the grid column tag definition causes such an exception. The razor engine tries to add it as content of the column (basically, an unnamed `RenderFragment`), but the `GridColumn` has several named `RenderFragment` instances, so it cannot have an unnamed one.

## Solution
Remove comments entirely.

Remove content directly in the column tags - use the relevant [templates]({%slug components/grid/features/templates%}) to add it.

If you want to keep certain code so you can put it back in later, move it outside of the grid, or comment out the entire column and add a simple copy of its basic definition (field, size, etc.) without the comments.

