---
title: Edit All Grid Rows and Cells
description: How to put all Grid rows and cells in edit mode at the same time.
type: how-to
page_title: How to Edit All Grid Rows and Cells
slug: grid-kb-edit-all-rows-cells
position: 
tags: blazor, grid, editing
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                TreeList for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to put the entire Grid component into edit mode?
* How to edit multiple Grid rows at the same time?
* How to edit all Grid rows and cells at once?
* How to edit several Grid data items simultaneously?

## Solution

1. Define [column `<Template>`s](slug:grid-templates-column) for all editable columns. Place the appropriate input component inside, depending on the column data type.
1. If the updated cell values require real-time synchronization with a remote data source, then use the `OnChange` or `ValueChanged` event of the respective input component. Note that in most components `ValueChanged` fires more frequently (on each key press), while `OnChange` fires on **Enter**, blur, or dropdown item selection.

The discussed mechanism can be beneficial in some scenarios, but has the following downsides:

* It renders a lot of child components in the Grid, depending on the `PageSize` and number of columns. This can have a significant impact on the application performance, especially in WebAssembly apps.
* It doesn't use the built-in Grid editing mechanism and events.
* It doesn't use `DataAnnotations` validation. Any validation must be implemented through the input component configurations, including the `OnChange` or `ValueChanged` handlers.

>caption Editing all Grid rows and cells at the same time

````RAZOR
<TelerikGrid @ref="@GridRef1"
             Data="@GridData"
             Height="300px">
    <GridToolBar>
        <GridToolBarCustomTool>
            <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Warning"
                           OnClick="@OnGridCustomCreate">Custom Add</TelerikButton>
        </GridToolBarCustomTool>
    </GridToolBar>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Id)" Width="60px" />
        <GridColumn Field="@nameof(Product.Name)">
            <Template>
                @{ var dataItem = (Product)context; }
                <TelerikTextBox @bind-Value="@dataItem.Name"
                                OnChange="@( (object newValue) => OnDataItemValueChanged(newValue, dataItem, nameof(Product.Name)) )" />
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Description)">
            <Template>
                @{ var dataItem = (Product)context; }
                <TelerikTextArea @bind-Value="@dataItem.Description"
                                 OnChange="@( (object newValue) => OnDataItemValueChanged(newValue, dataItem, nameof(Product.Description)) )" />
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Price)">
            <Template>
                @{ var dataItem = (Product)context; }
                <TelerikNumericTextBox @bind-Value="@dataItem.Price"
                                       Format="C2"
                                       OnChange="@( (object newValue) => OnDataItemValueChanged(newValue, dataItem, nameof(Product.Price)) )" />

            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Quantity)">
            <Template>
                @{ var dataItem = (Product)context; }
                <TelerikNumericTextBox @bind-Value="@dataItem.Quantity"
                                       Format="N0"
                                       OnChange="@( (object newValue) => OnDataItemValueChanged(newValue, dataItem, nameof(Product.Quantity)) )" />

            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(Product.ReleaseDate)">
            <Template>
                @{ var dataItem = (Product)context; }
                <TelerikDatePicker @bind-Value="@dataItem.ReleaseDate"
                                   OnChange="@( (object newValue) => OnDataItemValueChanged(newValue, dataItem, nameof(Product.ReleaseDate)) )" />
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Discontinued)">
            <Template>
                @{ var dataItem = (Product)context; }
                <TelerikCheckBox @bind-Value="@dataItem.Discontinued"
                                 OnChange="@( (object newValue) => OnDataItemValueChanged(newValue, dataItem, nameof(Product.Discontinued)) )" />
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<p>The Grid below shows how the above <code>Data</code> collection changes.</p>

<TelerikGrid @ref="@GridRef2"
             Data="@GridData"
             Height="300px">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Id)" Width="60px" />
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Description)">
            <Template>
                @{ var dataItem = (Product)context; }
                <div style="white-space:pre">@dataItem.Description</div>
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:N0}" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Product>? GridRef1 { get; set; }
    private TelerikGrid<Product>? GridRef2 { get; set; }

    private List<Product> GridData { get; set; } = new();

    private int LastId { get; set; }

    private void OnGridCustomCreate()
    {
        var createdItem = new Product() { Id = ++LastId, Name = "New Default Name", ReleaseDate = DateTime.Today };

        GridData.Insert(0, createdItem);

        GridRef1?.Rebind();
        GridRef2?.Rebind();
    }

    private void OnDataItemValueChanged(object newValue, Product product, string propertyName)
    {
        // Using a single OnChange handler for example simplicity.
        // This approach may require reflection.
        // You can also use a separate OnChange handler for each column.

        // Update the database...

        // Call only in scenarios when the UI doesn't update automatically.
        //GridRef2?.Rebind();
    }

    protected override void OnInitialized()
    {
        Random rnd = Random.Shared;

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product()
            {
                Id = ++LastId,
                Name = $"Product {LastId}",
                Description = $"Multi-line\ndescription {LastId}",
                Price = LastId % 2 == 0 ? null : rnd.Next(0, 100) * 1.23m,
                Quantity = LastId % 2 == 0 ? 0 : rnd.Next(0, 3000),
                ReleaseDate = DateTime.Today.AddDays(-rnd.Next(365, 3650)),
                Discontinued = LastId % 2 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal? Price { get; set; }
        public int Quantity { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Grid Editing Overview](slug:grid-editing-overview)
* [Grid Column Cell Template](slug:grid-templates-column)
