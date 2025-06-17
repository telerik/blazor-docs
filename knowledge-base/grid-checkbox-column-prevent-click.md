---
title: Grid CheckBox column prevent accidental click
description: How to prevent an accidental click in the CheckBox column of the Grid
type: how-to
page_title: Grid CheckBox column prevent accidental click
slug: grid-kb-checkbox-column-prevent-click
position: 
tags: grid, checkbox, prevent, click, deselection 
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

An accidental click outside the checkbox in the Grid's CheckBox column deselects the currently selected rows. How to prevent that from happening and ensure that only a click on the checkbox deselects the respective row?

## Solution

You can prevent the click event of the cells in the CheckBox column of the Grid with JavaScript. 

1. Call a JavaScript function in the `OnAfterRenderAsync` method and in the `OnRead` event handler of the Grid.
2. In the function, attach a `click` event handler to the `td` Html elements in the CheckBox column and prevent the event conditionally

```razor
@using Telerik.DataSource.Extensions;
@inject IJSRuntime JS;

<TelerikGrid TItem="@SampleModel"
             OnRead="@OnGridRead"
             AutoGenerateColumns="true"
             Sortable="true"
             Pageable="true"
             FilterMode="@GridFilterMode.FilterRow"
             Height="400px"
             SelectionMode="@GridSelectionMode.Multiple"
             SelectedItems="@SelectedRows">
    <GridColumns>
        <GridCheckboxColumn SelectAll="true" CheckBoxOnlySelection="false" />
    </GridColumns>
</TelerikGrid>

<script suppress-error="BL9992">
    function handleDeselection() {
        setTimeout(function() {
            preventDeselection()
        }, 300)
    }

    function preventClickHandler(event) {
        if (event.target === event.currentTarget) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    function preventDeselection() {
        document.querySelectorAll('.k-grid-content .k-table-row td:first-child').forEach(function(td) {
            td.addEventListener('click', preventClickHandler, true);
        });
    }
</script>

@code {
    private List<SampleModel> GridData { get; set; }

    private IEnumerable<SampleModel> SelectedRows { get; set; } = Enumerable.Empty<SampleModel>();

    private string LastOnRead { get; set; }

    protected override void OnInitialized()
    {
        GenerateData();
        SelectedRows = new List<SampleModel>() { GridData.ElementAt(2) };

        base.OnInitialized();
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(1);
            await JS.InvokeVoidAsync("handleDeselection");
        }
        await base.OnAfterRenderAsync(firstRender);
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        var result = GridData.ToDataSourceResult(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;

        var now = DateTime.Now;
        LastOnRead = now.ToLongTimeString() + "." + now.Millisecond;

        await Task.Delay(1);
        await JS.InvokeVoidAsync("handleDeselection");
    }

    private void GenerateData()
    {
        GridData = new List<SampleModel>();

        for (int i = 1; i <= 100; i++)
        {
            GridData.Add(new SampleModel() { Id = i, Text = $"Item{i}" });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
```
