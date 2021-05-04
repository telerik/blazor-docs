---
title: Virtualization
page_title: ComboBox - Virtualization
description: UI virtualization to allow large data sources in the ComboBox for Blazor.
slug: combobox-virtualization
tags: telerik,blazor,combo,combobox,virtualization
published: True
position: 5
---

# ComboBox Virtualization

The ComboBox component can virtualize the elements in its dropdown so you can use huge data source without UI performance issues.

Enabling the UI virtualization feature makes the component reuse a set number of items in the dropdown as you scroll, instead of rendering out the entire data source. It can work both with local data that the view-model already has, or you can fetch remote data every time the user scrolls through an event the component provides.

#### In This Article

* [Basics](#basics)
* [Local Data Example](#local-data-example)
* [Remote Data Example](#remote-data-example)

## Basics

This section will explain the parameters and behaviors that are related to the virtualization feature so you can set it up.

>caption To enable UI virtualization, you need to set the following parameters of the component:

* `ScrollMode` - `Telerik.Blazor.DropDownScrollMode` - set it to `DropDownScrollMode.Virtual`. It defaults to the "regular" scrolling.

* `PopupHeight` - `string` - set the height of the popup element to a valid CSS unit. It must **not** be a `null/empty` string.

* `ItemHeight` - `decimal` - set it to the height each individual item will have in the dropdown. Make sure to accommodate the content your items will have and any item template.

* `PageSize` - `int` - defines how many items will actually be rendered and reused. The value determines how many items are loaded on each scroll. The number of items must be large enough according to the `ItemHeight` and `PopupHeight` so that there are more items than the dropdown so there is a scrollbar.

You can find a basic example in the [Local Data](#local-data-example) section below.

>caption For working with [remote data](#remote-data-example), you also need:

* `ValueMapper` - `Func<List<TValue, Task<TItem>>` - the component will call this method to request the model that matches the `Value` it has set. This is required because with remote data the `Value` may not be in the initial collection of `Data` that the component has, and so there would otherwise be no way to extract the `DataTextField` from it to render it. Usually, this method will be called on the initial render only to fetch the data item for the current selection.

* `OnRead` - `EventCallback` - the component will call this event when the user scrolls with the corresponding offset (`Skip`), `PageSize` and any filters. This lets you optimize the data queries and return only what is needed at the moment, when it is needed.

* `TotalCount` - `int` - the total number of items that the dropdown can have. Needs to take into account any current filtering.

### Limitations

* When the initially selected item/items are on a page different than the first one, opening the dropdown list will NOT scroll the list to the selected item.

## Local Data Example

The example below shows how you can display, scroll and filter over 10k records in the combobox without delays and performance issues.

![Virtual Scrolling of large local data](images/combobox-virtual-scrolling-local.gif)

````CSHTML
@SelectedValue
<br />
<TelerikComboBox Data="@Data"

                 ScrollMode="@DropDownScrollMode.Virtual"
                 PopupHeight="200px"
                 ItemHeight="30"
                 PageSize="20"

                 TextField="@nameof(Person.Name)"
                 ValueField="@nameof(Person.Id)"
                 @bind-Value="@SelectedValue"
                 Filterable="true" FilterOperator="@StringFilterOperator.Contains">
</TelerikComboBox>

@code {
    int SelectedValue { get; set; }
    List<Person> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = Enumerable.Range(1, 12345).Select(x => new Person { Id = x, Name = $"Name {x}" }).ToList();

        base.OnInitialized();
    }

    public class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## Remote Data Example

This example showcases sample implementations of:

* A remote services that returns the data. It is mocked by a static class for this example, you can refactor as needed, and you can find examples of serializing it over the wire in <a href="https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server" target="_blank">this collection of sample projects</a> for the grid component - the approach is identical.

* An `OnRead` event handler that calls that service.

* A `ValueMapper` that also calls the service.

Run this and see how you can display, scroll and filter over 10k records in the combobox without delays and performance issues from a remote endpoint. There is artificial delay in these operations for the sake of the demonstration.

````CSHTML
@using Telerik.DataSource.Extensions

@SelectedValue
<br />
<TelerikComboBox Data="@CurentPageOfData"
                 ScrollMode="@DropDownScrollMode.Virtual"
                 OnRead="@GetRemoteData"
                 TotalCount="@TotalItems"
                 ValueMapper="@GetModelFromValue"
                 PopupHeight="200px"
                 ItemHeight="30"
                 PageSize="20"

                 TextField="@nameof(Person.Name)"
                 ValueField="@nameof(Person.Id)"
                 @bind-Value="@SelectedValue"
                 Filterable="true" FilterOperator="@StringFilterOperator.Contains">
</TelerikComboBox>

@code{
    int SelectedValue { get; set; } = 1234; // pre-select an item to showcase the value mapper
    List<Person> CurentPageOfData { get; set; }
    int TotalItems { get; set; }

    async Task GetRemoteData(ComboBoxReadEventArgs e)
    {
        DataEnvelope<Person> result = await MyService.GetItems(e.Request);

        // set the Data and the TotalItems to the current page of data and total number of items
        CurentPageOfData = result.Data;
        TotalItems = result.Total;
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
````


## See Also

  * [Live Demo: ComboBox Virtualization](https://demos.telerik.com/blazor-ui/combobox/virtualization)
   
  
