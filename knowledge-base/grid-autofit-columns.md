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
components: ["grid"]
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

I would like to autofit the Grid columns on initial page load using the [AutoFitAllColumns](slug:components/grid/columns/resize#autofit-columns) method of the Grid. The goal is for all column widths to match the column content.

## Background

The Grid has [methods to autofit columns programmatically](slug:components/grid/columns/resize#autofit-columns). I would like to achieve that behavior on initial load of the component, but can not find a suitable event to call the methods.

If I call the autofit methods too early (e.g. on component initialization), I get a `NullReferenceException`.

## Solution

Autofitting columns on initial load is a current limitation of the built-in autofit functionality. At the time of writing, the framework does not provide an option to know when the Grid rows are rendered. 

While the autofitting feature includes fitting the headers, it also targets the data cells and the footers, so it needs all the rows in the process.

There are two possible implementations to work this around and autofit the Grid columns as the component initializes. They depend on whether the Grid is data-bound with the [`Data` parameter](#data-parameter) or the [`OnRead` event](#onread-event). In both cases, the Grid [`Resizable` parameter](slug:components/grid/columns/resize) must be set to `true`.

### Data Parameter

To autofit the Grid columns on the initial load of the component:

* Use the Grid [`Class` parameter](slug:grid-overview#grid-parameters) to identify the Grid that you want to autofit.
* When the Grid is rendered for the first time, call a JavaScript function in `OnAfterRenderAsync` to observe the Grid.
* Listen for DOM changes using JavaScript and invoke the `AutoFitAllColumns` method after the table rows in the Grid have rendered.

The **JavaScript** tab in the following example implements a JS function and sets up the `MutationObserver` tool to listen for DOM changes.

> Replace the `Index` type of the `DotNetObjectReference` with the type of the component that hosts this code.

<div class="skip-repl"></div>
````C#
@implements IDisposable
@inject IJSRuntime js

<TelerikGrid @ref="@Grid"
             Data="@GridData"
             Resizable="true"
             Pageable="true"
             PageSize="10"
             Sortable="true"
             Height="300px"
             Width="900px"
             Class="@GridClass">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Id) Title="ID" Id="IDColumn" />
        <GridColumn Field=@nameof(SampleData.Name) Title="First Name" Id="NameColumn1" />
        <GridColumn Field=@nameof(SampleData.LastName) Title="Last Name" Id="NameColumn2" />
    </GridColumns>
</TelerikGrid>

@code {
    [JSInvokable]
    public async Task AutoFitAllColumns()
    {
        await Grid.AutoFitAllColumnsAsync();

        //from this point to the end of the method the logic is dedicated to
        //stretching the last grid column to the available horizontal space
        //this code also works even if there is no available horizontal space

        bool hasWhiteSpace = await js.InvokeAsync<bool>("hasWhiteSpace");

        if (hasWhiteSpace)
        {
            var state = Grid.GetState();

            state.ColumnStates.LastOrDefault().Width = "";
            state.TableWidth = null;

            await Grid.SetStateAsync(state);
        }
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            IndexDotNetInstance = DotNetObjectReference.Create(this);

            await js.InvokeVoidAsync("observeTarget", IndexDotNetInstance, GridClass);
        }

        await base.OnAfterRenderAsync(firstRender);
    }

    private const string GridClass = "autofitter-columns";

    private TelerikGrid<SampleData> Grid { get; set; }

    //Replace the Index type with the type of the component that hosts this code
    public DotNetObjectReference<Index> IndexDotNetInstance { get; set; }

    private List<SampleData> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = GetData();
    }

    public void Dispose()
    {
        if (IndexDotNetInstance != null)
        {
            IndexDotNetInstance.Dispose();
            IndexDotNetInstance = null;
        }
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
let dotNetInstance;
 
let observer = new MutationObserver(function () {
    return dotNetInstance.invokeMethodAsync('AutoFitAllColumns');
});
 
let options = {
    childList: true,
    subtree: true
};
 
function observeTarget(dotNetObj, gridClass) {
    result = document.querySelector(`.${gridClass} .k-grid-table:first-of-type`);
    dotNetInstance = dotNetObj;
 
    if (!result || !window.DotNet) {
        window.setTimeout(observeTarget, 500, dotNetObj, gridClass);
        return;
    }
    observer.observe(result, options);
 
    if (window.DotNet) {
        dotNetInstance.invokeMethodAsync('AutoFitAllColumns');
        observer.disconnect();
    }
}
 
function hasWhiteSpace() {
    const grid = document.querySelector(".k-grid");
    const gridTable = document.querySelector(".k-grid-table");
 
    return grid.offsetWidth > gridTable.offsetWidth;
}
````

### OnRead Event

Raise a boolean flag inside the `OnRead` handler, and then use it inside `OnAfterRenderAsync` to trigger column autofit. Note that you may need a small `Task.Delay()` inside `OnAfterRenderAsync`.

This approach is simpler than the above, because it doesn't require JavaScript and there is somewhat greater predictability when the Grid will render its rows.

>caption Autofit Grid columns when using OnRead data binding

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikButton OnClick="@AutoFit">AutoFit All Columns Manually</TelerikButton>

<TelerikGrid @ref="@GridRef"
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
    private TelerikGrid<Product>? GridRef { get; set; }

    private List<Product> GridData { get; set; } = new();

    private bool AutoFitFlag { get; set; }

    private bool FirstGridBindFlag { get; set; } = true;

    private async Task AutoFit()
    {
        if (GridRef != null)
        {
            await GridRef.AutoFitAllColumnsAsync();
        }
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        await Task.Delay(100); // simulate async operation
        DataSourceResult result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;

        if (FirstGridBindFlag && result.Total > 0)
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
            await Task.Delay(1);
            if (GridRef != null)
            {
                await GridRef.AutoFitAllColumnsAsync();
            }
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
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public DateTime ReleaseDate { get; set; }
        public bool Active { get; set; }
    }
}
````
