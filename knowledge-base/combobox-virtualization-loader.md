---
title: Displaying Loading Indicator in ComboBox with Remote Data and Virtualization
description: Learn how to add a loading indicator in the TelerikComboBox component when using remote data and virtualization functionality in UI for Blazor.
type: how-to
page_title: Adding Loader to ComboBox During Remote Data Fetch and Virtualization
meta_title: Adding Loader to ComboBox During Remote Data Fetch and Virtualization
slug: adding-loader-combobox-remote-data-virtualization
tags: combobox, ui-for-blazor, templates, nodatatemplate, header-template, loader
res_type: kb
ticketid: 1693304
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>ComboBox for UI for Blazor</td>
</tr>
<tr>
<td>Version</td>
<td>Current</td>
</tr>
</tbody>
</table>

## Description

When using the [ComboBox](https://www.telerik.com/blazor-ui/documentation/components/combobox/overview) component in UI for Blazor with remote data loading and virtualization, the dropdown briefly displays the "No data" message while waiting for the response. This behavior can confuse users who may assume there is no data available when it is still loading. Additionally, during virtual scrolling or filtering, the absence of a loading indicator can lead to user frustration as they cannot perceive ongoing data fetch operations.

## Solution

To address the missing loading indicator issue in the TelerikComboBox component, follow these steps:

### 1. Display a Loading Indicator During Remote Data Fetch
Use the `HeaderTemplate` property of the ComboBox component to show a loading indicator. Add a boolean flag to track the loading state and update it dynamically during data fetch operations. Use a CSS rule to disable the default "No Data" message.

### 2. Clear Old Items During Filtering/Search
Modify the visibility of old items using CSS rules and conditionally toggle their appearance based on the loading state.

### Implementation

Below is an example implementation that solves both issues:

```razor
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p>@SelectedValue</p>

@if (IsLoading == true) {
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
    bool IsLoading {get;set;} = false;
    int SelectedValue { get; set; } = 1234; // pre-select an item to showcase the value mapper
    private TelerikComboBox<Person, int>? ComboBoxRef { get; set; }
    async Task GetRemoteData(ComboBoxReadEventArgs args)
    {
        IsLoading = true;
        ComboBoxRef?.Refresh();
        DataEnvelope<Person> result = await MyService.GetItems(args.Request);

        // set the Data and the TotalItems to the current page of data and total number of items
        args.Data = result.Data;
        args.Total = result.Total;
        IsLoading = false;
        ComboBoxRef?.Refresh();
    }

    async Task<Person> GetModelFromValue(int selectedValue)
    {
        // return a model that matches the selected value so the component can get its text
        return await MyService.GetItemFromValue(selectedValue);
    }

    // mimics a real service in terms of API appearance, refactor as necessary for your app
    public static class MyService
    {
        static List<Person> AllData { get; set; }

        public static async Task<DataEnvelope<Person>> GetItems(DataSourceRequest request)
        {
            await Task.Delay(3000);
            if (AllData == null)
            {
                AllData = Enumerable.Range(1, 12345).Select(x => new Person { Id = x, Name = $"Name {x}" }).ToList();
            }

            await Task.Delay(400); // simulate real network and database delays. Remove in a real app

            var result = await AllData.ToDataSourceResultAsync(request);
            DataEnvelope<Person> dataToReturn = new DataEnvelope<Person>
            {
                Data = result.Data.Cast<Person>().ToList(),
                Total = result.Total
            };

            return await Task.FromResult(dataToReturn);
        }

        public static async Task<Person> GetItemFromValue(int selectedValue)
        {
            await Task.Delay(400); // simulate real network and database delays. Remove in a real app

            return await Task.FromResult(AllData.FirstOrDefault(x => selectedValue == x.Id));
        }
    }

    // used to showcase how you could simplify the return of more than one value from the service
    public class DataEnvelope<T>
    {
        public int Total { get; set; }
        public List<T> Data { get; set; }
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
- [ComboBox HeaderTemplate Documentation](https://www.telerik.com/blazor-ui/documentation/components/combobox/templates#header-template)
- [ComboBox Reference and Methods](https://www.telerik.com/blazor-ui/documentation/components/combobox/overview#combobox-reference-and-methods)
- [ComboBox Virtualization Documentation](https://www.telerik.com/blazor-ui/documentation/components/combobox/virtualization#remote-data-example)