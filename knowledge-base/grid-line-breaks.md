---
title: Render Line Breaks in Grid Column
description: How to create new lines inside a Grid column.
type: how-to
page_title: Render Line Breaks in Grid Column
slug: grid-kb-line-breaks
position: 
tags: 
ticketid: 1650530
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

This knowledge base article answers the following questions:

* How do I display line breaks inside a Grid column?
* Is it possible to render HTML inside a Grid column?

## Solution

1. To create a new line break in the HTML content of a Grid cell, replace the `\n` segment with the `<br>` HTML tag. 
2. To render the `<br>` HTML tag from a string, use a <a href="https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.markupstring?view=aspnetcore-8.0" target="_blank"><code>MarkupString<code></a>. 
3. To define the `MarkupString`, use the column's `Template`.

````RAZOR
<TelerikGrid Data="@GridData" Height="400px">
    <GridColumns>
        <GridColumn Field="@(nameof(Item.Text))" Title="Test">
            <Template>
                @{
                    var item = (Item)context;

                    @(new MarkupString($"{item.Text.Replace("\n", "<br>")}"))
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@(nameof(Item.Name))" />
    </GridColumns>
</TelerikGrid>

@code {
    private IEnumerable<Item> GridData = Enumerable.Range(1, 10).Select(x => new Item
    {
        Id = x,
        Name = "Item " + x,
        Text = "Test\nTest\nTest"
    });

    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Text { get; set; }
    }
}
````

## See Also

* [Grid Column Template](slug:grid-templates-column)