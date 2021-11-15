---
title: Autofit all Grid columns on initial load. 
description: Autofit all Grid columns on initial page load, so that their widths match their content. 
type: how-to
page_title: Autofit all Grid columns on initial load. 
slug: grid-autofit-columns-on-initial-load
position: 
tags: grid, autofit, columns
res_type: kb
---


## Description

I would like to autofit the Grid columns on initial load of the Component using the [AutoFitAllColumns]({%slug components/grid/columns/resize%}#autofit-columns) method of the Grid reference. The goal is for all column widths to match the column content.

## Background

In the 2.28.0 release of Telerik UI for Blazor, the Grid introduced methods to autofit one or more columns via the Grid reference. I would like to achieve that behavior on initial load of the component, but can not find a suitable event to call the methods.

## Solution

To AutoFit the Grid's columns on the initial load of the component you have to use a provision like the `MutationObserver`. This JavaScript tool would allow you to be notified when there are DOM changes. The code snippet below uses the MutationObserver to trigger the `AutoFitAllColumns` method when the nodes in the content of Grid have mutated (rendered in this case). 

In the JavaScript portion of the code snippet you should replace the `<YOUR PROJECT NAMESPACE>` with the actual namespace of your project. 

>note There will be a flicker when you use the solution below to autofit the columns on the initial load. 

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