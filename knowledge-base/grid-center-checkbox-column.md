---
title: Center the Grid Checkbox Column
description: How to center the selection checkboxes in the GridCheckboxColumn.
type: how-to
page_title: Center the Grid Checkbox Column
slug: grid-kb-center-checkbox-column
position: 
tags: grid, treelist, center, checkbox, checkboxcolumn
ticketid: 1540685
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor, <br />
                TreeList for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

How to center the selection checkboxes in the GridCheckboxColumn?

## Solution

There are a few alternative ways to center the checkboxes in the GridCheckboxColumn or the TreeListCheckboxColumn.

* The easiest option is to set a smaller column width:

    ````CSHTML
    <GridCheckboxColumn Width="40px" />
    ````

* Use CSS, which centers the content of the first Grid/TreeList column, no matter what that column is.

    ````CSHTML
    <TelerikGrid Class="center-first-column" />

    <style>
        .center-first-column th:first-child,
        .center-first-column td:first-child {
            text-align: center;
        }
    </style>
    ````

* Use the `OnCellRender` event of the [Grid]({%slug grid-column-events%}) or [TreeList]({%slug treelist-column-events%}) to render a custom CSS class for the checkbox column table cells. Then, apply a `text-align:center` style for this class. You will need [CSS specificity](https://css-tricks.com/specifics-on-css-specificity/), which is higher than **0, 0, 1, 1** (one class and one element).

    ````CSHTML
    <GridCheckboxColumn
        OnCellRender="@( (GridCellRenderEventArgs args) => args.Class = "center-cell" )" />

    <style>
        .k-grid .center-cell {
            text-align: center;
        }
    </style>
    ````

Here is an example that demonstrates all three options. The TreeList reuses Grid CSS classes, so the CSS code below will work for the TreeList with no need for any changes.

>caption Center the Grid/TreeList Checkbox Column

````CSHTML
<h1>Center the Checkbox Column</h1>

<h2>Use a Narrow Checkbox Column</h2>

<TelerikGrid Data="@GridData"
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedItems">
    <GridColumns>
        <GridCheckboxColumn SelectAll="true" Width="40px" />
        <GridColumn Field=@nameof(Product.Name) Title="Product Name" />
    </GridColumns>
</TelerikGrid>

<h2>Center the First Column</h2>

<TelerikGrid Data="@GridData" Class="center-first-column"
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedItems">
    <GridColumns>
        <GridCheckboxColumn SelectAll="true" />
        <GridColumn Field=@nameof(Product.Name) Title="Product Name" />
    </GridColumns>
</TelerikGrid>

<style>
    .center-first-column th:first-child,
    .center-first-column td:first-child {
        text-align: center;
    }
</style>

<h2>Use a Custom CSS Class for the Checkbox Column</h2>

<TelerikGrid Data="@GridData"
             SelectionMode="GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedItems">
    <GridColumns>
        <GridCheckboxColumn SelectAll="false"
                            OnCellRender="@( (GridCellRenderEventArgs args) => args.Class = "center-cell" )" />
        <GridColumn Field=@nameof(Product.Name) Title="Product Name" />
    </GridColumns>
</TelerikGrid>

<style>
    .k-grid .center-cell {
        text-align: center;
    }
</style>

@code {
    List<Product> GridData { get; set; } = new List<Product>();
    IEnumerable<Product> SelectedItems { get; set; } = new List<Product>();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new Product()
            {
                ID = i,
                Name = "Product " + i.ToString()
            });
        }
    }

    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
````