---
title: Autofit All Grid Columns on Initial Load
description: How to auto fit all Grid columns on initial page load, so that their widths match their content. 
type: how-to
page_title: Autofit all Grid columns on initial page load
slug: grid-autofit-columns-on-initial-load
position: 
tags: grid, autofit, columns
ticketid: 1568815
res_type: kb
---


## Description

I would like to autofit the Grid columns on initial page load using the [AutoFitAllColumns]({%slug components/grid/columns/resize%}#autofit-columns) method of the Grid. The goal is for all column widths to match the column content.

## Background

In the 2.28.0 release of Telerik UI for Blazor, the Grid introduced [methods to autofit columns programmatically]({%slug components/grid/columns/resize%}#autofit-columns). I would like to achieve that behavior on initial load of the component, but can not find a suitable event to call the methods.

## Solution

There are two possible implementations to autofit Grid columns by default. They depend on whether the Grid is data-bound via [`Data` parameter](#data-parameter) or [`OnRead` event](#onread-event).

### Data Parameter

To AutoFit the Grid columns on initial load of the component you have to use a provision like the `MutationObserver`. This JavaScript tool notifies about DOM changes. The code snippet below uses the MutationObserver to trigger the `AutoFitAllColumns` method when the nodes in the content of Grid have mutated (rendered in this case). 

Make sure to replace `<YOUR PROJECT NAMESPACE>` in the JavaScript code. 

>note There will be a flicker when you use the solution below to autofit the columns on the initial load. 

<div class="skip-repl"></div>
````C#
@inject IJSRuntime js

<TelerikGrid @ref="@Grid"
             Data="@GridData"
             Resizable="true"
             Pageable="true" 
             PageSize="10" 
             Sortable="true" 
             Height="300px"
             Class="@GridClass">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Id) Title="ID" Id="IDColumn" />
        <GridColumn Field=@nameof(SampleData.Name) Title="First Name" Id="NameColumn1" />
        <GridColumn Field=@nameof(SampleData.LastName) Title="Last Name" Id="NameColumn2" />
        <GridCommandColumn Width="100px" Resizable="false">
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    [JSInvokable]
    public static Task AutoFitAllColumns()
    {
        return Task.Run(() => Grid.AutoFitAllColumns());
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await js.InvokeVoidAsync("observeTarget", GridClass);

        await base.OnAfterRenderAsync(firstRender);
    }

    private const string GridClass = "autofitter-columns";

    public static TelerikGrid<SampleData> Grid { get; set; }
    public List<SampleData> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = GetData();
    }

    private List<SampleData> GetData()
    {
        return Enumerable.Range(1, 50).Select(x => new SampleData
        {
            Id = x,
            Name = $"name {x}",
            LastName = $"Surname {x}"
        }).ToList();
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
    }
}
````
````JavaScript
let result;

let observer = new MutationObserver(function () {
    return window.DotNet.invokeMethodAsync('<YOUR PROJECT NAMESPACE>', 'AutoFitAllColumns');
});

let options = {
    childList: true,
    subtree: true
};

function observeTarget(gridClass) {
    result = document.querySelector(`.${gridClass} .k-grid-table:first-of-type`);

    if (!result || !window.DotNet) {
        window.setTimeout(observeTarget, 500);
        return;
    }
    observer.observe(result, options);

    if (window.DotNet) {
        window.DotNet.invokeMethodAsync('<YOUR PROJECT NAMESPACE>', 'AutoFitAllColumns');
        observer.disconnect();
    }
}
````

### OnRead Event

Raise a boolean flag inside the `OnRead` handler, and then use it inside `OnAfterRenderAsync` to trigger column autofit. Note that you may need a small `Task.Delay()` inside `OnAfterRenderAsync`.

This approach is simpler than the above, because it doesn't require JavaScript and there is somewhat greater predictability when the Grid will render its rows.

>caption Autofit Grid columns when using OnRead data binding

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikButton OnClick="@AutoFit">AutoFit All Columns Manually</TelerikButton>

<TelerikGrid @ref="@Grid"
             OnRead="@OnGridRead"
             TItem="@Product"
             Pageable="true"
             Sortable="true"
             Resizable="true"
             FilterMode="GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.Price)" />
        <GridColumn Field="@nameof(Product.ReleaseDate)" Title="Release Date" />
        <GridColumn Field="@nameof(Product.Active)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<Product> Grid { get; set; }

    private List<Product> GridData { get; set; }

    private bool AutoFitFlag { get; set; }

    private bool FirstGridBindFlag { get; set; } = true;

    private async Task AutoFit()
    {
        Grid.AutoFitAllColumns();
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        DataSourceResult result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;

        if (FirstGridBindFlag)
        {
            // it is also possible to auto fit Grid columns on every rebind
            FirstGridBindFlag = false;
            AutoFitFlag = true;
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (AutoFitFlag)
        {
            AutoFitFlag = false;
            await Task.Delay(200);
            Grid.AutoFitAllColumns();
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();
        var rnd = new Random();

        for (int i = 1; i <= 70; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = "Product " + i.ToString(),
                Price = (decimal)rnd.Next(1, 100),
                ReleaseDate = DateTime.Now.AddDays(-rnd.Next(60, 1000)),
                Active = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool Active { get; set; }
    }
}
````
