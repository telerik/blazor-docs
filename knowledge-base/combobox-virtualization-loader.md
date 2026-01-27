---
title: Display Loading Indicator in ComboBox with Remote Data and Virtualization
description: Learn how to add a loading indicator in the TelerikComboBox component when using remote data and virtualization functionality in UI for Blazor.
type: how-to
page_title: Adding Loader to ComboBox During Remote Data Fetch and Virtualization
slug: combobox-kb-virtualization-loader
position:
tags: blazor, combobox, loader, templates, nodatatemplate, headertemplate
res_type: kb
ticketid: 1693304
components: ["combobox"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ComboBox for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When using the [ComboBox](slug:components/combobox/overview) component in UI for Blazor with remote data loading and virtualization, the dropdown briefly displays the "No data" message while waiting for the response. This behavior can confuse users who may assume there is no data available when it is still loading. Additionally, during virtual scrolling or filtering, the absence of a loading indicator can lead to user frustration as they cannot perceive ongoing data fetch operations.

## Solution

1. Display a Loading Indicator During Remote Data Fetch
Use the `HeaderTemplate` property of the ComboBox component to show a loading indicator. Add a boolean flag to track the loading state and update it dynamically during data fetch operations. Use a CSS rule to disable the default "No Data" message.

2. Clear Old Items During Filtering/Search
Modify the visibility of old items using CSS rules and conditionally toggle their appearance based on the loading state.

>caption Display a Loading Indicator When Using a Virtualized ComboBox

```razor
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>@SelectedValue</p>

@if (IsLoading) {
    <style>
        .example-cb .k-list-item {
            visibility: hidden;
            pointer-events: none;
        }

        .example-cb .k-nodata {
            display: none;
        }
    </style>
}
<TelerikComboBox @ref="ComboBoxRef" TItem="@Person" TValue="@int"
                 ScrollMode="@DropDownScrollMode.Virtual"
                 OnRead="@GetRemoteData"
                 ValueMapper="@GetModelFromValue"
                 ItemHeight="30"
                 PageSize="20"
                 TextField="@nameof(Person.Name)"
                 ValueField="@nameof(Person.Id)"
                 @bind-Value="@SelectedValue"
                 Filterable="true" FilterOperator="@StringFilterOperator.Contains">
    <ComboBoxSettings>
        <ComboBoxPopupSettings Class="example-cb" Height="200px" />
    </ComboBoxSettings>
    <NoDataTemplate>
    </NoDataTemplate>
    <HeaderTemplate>
        <TelerikLoader Visible="@IsLoading" />
    </HeaderTemplate>
</TelerikComboBox>

@code{
    private TelerikComboBox<Person, int>? ComboBoxRef { get; set; }
    private int SelectedValue { get; set; } = 1234; // pre-select an item to showcase the value mapper
    private List<Person> AllData { get; set; }

    private bool IsLoading { get; set; }

    private async Task GetRemoteData(ComboBoxReadEventArgs args)
    {
        IsLoading = true;
        ComboBoxRef?.Refresh();
        await LoadData();
        
        var result = AllData.ToDataSourceResult(args.Request);

        // set the Data and the TotalItems to the current page of data and total number of items
        args.Data = result.Data;
        args.Total = result.Total;
        IsLoading = false;
        ComboBoxRef?.Refresh();
    }

    private async Task<Person?> GetModelFromValue(int selectedValue)
    {
        await Task.Delay(400); // simulate real network and database delays. Remove in a real app

        return AllData.FirstOrDefault(x => selectedValue == x.Id);
    }

    private async Task LoadData() 
    {
        await Task.Delay(1500);
        if (AllData == null)
        {
            AllData = Enumerable.Range(1, 12345).Select(x => new Person { Id = x, Name = $"Name {x}" }).ToList();
        }
    }

    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
```

### Key Points
- Use the `HeaderTemplate` for displaying a loading indicator during scrolling or filtering.
- Call the `Refresh` method on the ComboBox reference to update the UI dynamically during data load operations.
- Toggle visibility of old items using CSS to enhance user experience.

## See Also
- [ComboBox HeaderTemplate Documentation](slug:components/combobox/templates#header-template)
- [ComboBox Reference and Methods](slug:components/combobox/overview#combobox-reference-and-methods)
- [ComboBox Virtualization Documentation](slug:combobox-virtualization#remote-data-example)