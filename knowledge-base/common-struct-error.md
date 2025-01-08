---
title: Databound Telerik Blazor Components Do Not Work and Get a Null Exception
description: Using struct objects for the Data of the component causes error
type: troubleshooting
page_title: Struct Data Source Causes Exception
slug: common-kb-struct-error
tags: telerik, blazor, autocomplete, breadcrumb, chart, chiplist, combobox, contextmenu, drawer, dropdownlist, filemanager, gantt, grid, listbox, listview, menu, multicolumncombobox, multiselect, panelbar, pivotgrid, radiogroup, sankey, scheduler, stock chart, treelist, treeview, struct, null exception
ticketid: 1657421
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Autocomplete for Blazor, Breadcrumb for Blazor, Chart for Blazor, ChipList for Blazor, ComboBox for Blazor, ContextMenu for Blazor, Drawer for Blazor, DropDownList for Blazor, FileManager for Blazor, Gantt for Blazor, Grid for Blazor, ListBox for Blazor, ListView for Blazor, Menu for Blazor, MultiColumnComboBox for Blazor, MultiSelect for Blazor, PanelBar for Blazor, PivotGrid for Blazor, RadioGroup for Blazor, Sankey for Blazor, Scheduler for Blazor, Stock Chart for Blazor, TreeList for Blazor, TreeView for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

When using a data-bound component, the application gets a null exception, and the component does not work. When running the Telerik Blazor application the application gets an error similar to the following:

````C#.skip-repl
ArgumentNullException: Value cannot be null. (Parameter 'source')
System.Linq.ThrowHelper.ThrowArgumentNullException(ExceptionArgument argument)
````

To reproduce the problem, you can use the following code sample:
````RAZOR
<TelerikGrid Data="@GridData">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.Released)" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        var rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product
                {
                    Id = i,
                    Name = "Product name " + i,
                    Price = (decimal)(rnd.Next(1, 50) * 3.14),
                    Released = DateTime.Now.AddDays(-rnd.Next(1, 365)).AddYears(-rnd.Next(1, 10)).Date,
                    Discontinued = i % 5 == 0
                });

        }

        base.OnInitialized();
    }

    public struct Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## Cause
The cause for this null exception is the binding of Telerik UI for Blazor components to a `struct` component model.

## Solution
The solution is to always bind the component to a `class` model, not a `struct`. For more information, see [Data Binding Overview](slug://common-features-data-binding-overview#how-to-provide-data).

<div class="skip-repl"></div>

````CS
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public DateTime Released { get; set; }
    public bool Discontinued { get; set; }
}
````

## See Also

- [Data Binding Overview](slug://common-features-data-binding-overview)