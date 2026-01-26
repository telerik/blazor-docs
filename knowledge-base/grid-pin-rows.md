---
title: Pin Rows at the Top of the Grid 
description: Learn how to pin (freeze, lock) one or more rows at the top of the Grid, so that they don't scroll together with the other table rows.
type: how-to
page_title: How to Pin Rows on top of the Grid 
slug: grid-kb-pin-rows
position: 
tags: blazor, grid, pin, sticky, freeze, lock
ticketid: 1676279
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

This KB article answers the following questions:

* How to pin one or more rows on top of the Grid so that they are always visible to the users.
* How to lock Grid rows, so that they don't scroll with the other table rows?
* How to implement frozen rows at the top of the Grid?
* How to make some Grid rows stick to the top of the component's data area during scrolling?

## Solution

To freeze Grid rows you can:

* Use the [`OnRead event`](slug:components/grid/manual-operations) to place the row/rows on top of the data collection for the Grid. 
* Use the [`OnRowRender event`](slug:grid-events#onrowrender) to add a custom CSS class to the rows you want to pin.
* Dynamically calculate the `top` CSS rule with JavaScript.
* Register the JavaScript file. 

<div class="skip-repl"></div>
````C#
@* Pin rows to the Grid *@

@using Telerik.DataSource
@using Telerik.DataSource.Extensions

@inject IJSRuntime js

<style>
    .k-grid-row-sticky {
        top: 0;
        z-index: auto;
        border: 0;
        position: static;
    }

        .k-grid-row-sticky td {
            border-bottom-width: 1px;
            border-top-width: 1px;
            position: sticky;
            top: inherit;
            bottom: inherit;
            z-index: 2;
            background-color: #f6f6f6;
            border-top-color: rgba(0, 0, 0, 0.3);
            border-bottom-color: rgba(0, 0, 0, 0.3);
        }
</style>

<TelerikGrid TItem="@Employee"
             OnRead="@ReadItems"
             Sortable="true"
             ScrollMode="@GridScrollMode.Scrollable"
             Height="600px"
             RowHeight="40"
             OnRowRender="@RowRenderHandler">
    <GridColumns>
        <GridColumn Field=@nameof(Employee.ID) />
        <GridColumn Field=@nameof(Employee.Name) Title="Name" />
        <GridColumn Field=@nameof(Employee.HireDate) Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    private void RowRenderHandler(GridRowRenderEventArgs args)
    {
        var gridRow = args.Item as Employee;

        foreach (var pinnedRowIndex in pinnedGridRows)
        {
            if (gridRow.ID == pinnedRowIndex)
            {
                args.Class = "k-grid-row-sticky";
            }
        }
    }

    public List<int> pinnedGridRows { get; set; } = new List<int>()
    {
        5, 12, 21
    };

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await js.InvokeVoidAsync("pinElements", ".k-grid-row-sticky", 40);
    }

    public int pinnedRowIndex { get; set; } = 20;

    public List<Employee> SourceData { get; set; }

    private List<Employee> PinnedTopRow(DataSourceResult result)
    {
        List<Employee> _data = result.Data.Cast<Employee>().ToList();
        var indexToInsert = 0;

        foreach (var pinnedRow in pinnedGridRows)
        {
            var rowToBePinned = _data.FirstOrDefault(x => x.ID == pinnedRow);
            _data.Remove(rowToBePinned);

            _data.Insert(indexToInsert, rowToBePinned);
            indexToInsert++;
        }

        return _data;
    }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        await Task.Delay(1000);

        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        args.Data = PinnedTopRow(datasourceResult);
        args.Total = datasourceResult.Total;
    }

    protected override void OnInitialized()
    {
        SourceData = GenerateData();
    }

    private List<Employee> GenerateData()
    {
        var result = new List<Employee>();
        var rand = new Random();
        for (int i = 0; i < 100; i++)
        {
            result.Add(new Employee()
            {
                ID = i,
                Name = "Name " + i,
                HireDate = DateTime.Now.Date.AddDays(rand.Next(-20, 20))
            });
        }

        return result;
    }

    public class Employee
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````
````JavaScript
@* Calculate the top CSS rule *@

function pinElements(pinCSSClass, rowHeight) {
    let elements = document.querySelectorAll(pinCSSClass);

    elements.forEach((element, index) => {
        element.style.top = index * rowHeight + "px"
    });
}
````
