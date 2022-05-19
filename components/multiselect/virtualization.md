---
title: Virtualization
page_title: MultiSelect - Virtualization
description: UI virtualization to allow large data sources in the MultiSelect for Blazor.
slug: multiselect-virtualization
tags: telerik,blazor,MultiSelect,virtualization
published: True
position: 25
---

# MultiSelect Virtualization

The MultiSelect @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-proposition)

#### In This Article

* [Basics](#basics)
* [Local Data Example](#local-data-example)
* [Remote Data Example](#remote-data-example)


>caption Display, scroll and filter over 10k records in the MultiSelect without delays and performance issues.

![Virtual Scrolling of large local data](images/multiselect-virtual-scrolling-local.gif)


## Basics

@[template](/_contentTemplates/common/dropdowns-virtualization.md#basics-core)


* `ValueMapper` - `Func<List<TValue>, Task<List<TItem>>>` - @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-text)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-specifics)

### Limitations

@[template](/_contentTemplates/common/dropdowns-virtualization.md#limitations)


## Local Data Example

````CSHTML
Number of selected items: @SelectedValues?.Count
<br />
<TelerikMultiSelect Data="@Data"

                    ScrollMode="@DropDownScrollMode.Virtual"
                    ItemHeight="30"
                    PageSize="20"

                    AutoClose="false"
                    TextField="@nameof(Person.Name)"
                    ValueField="@nameof(Person.Id)"
                    @bind-Value="@SelectedValues"
                    Filterable="true" FilterOperator="@StringFilterOperator.Contains">
    <MultiSelectSettings>
        <MultiSelectPopupSettings Height="200px" />
    </MultiSelectSettings>
</TelerikMultiSelect>

@code {
    List<int> SelectedValues { get; set; }
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

@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-sample-intro)

@[template](/_contentTemplates/common/dropdowns-virtualization.md#value-mapper-in-remote-example)

Run this and see how you can display, scroll and filter over 10k records in the MultiSelect without delays and performance issues from a remote endpoint. There is artificial delay in these operations for the sake of the demonstration.

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

Number of selected items: @SelectedValues?.Count
<br />
<TelerikMultiSelect TItem="@Person" TValue="@int"
                    ScrollMode="@DropDownScrollMode.Virtual"
                    OnRead="@GetRemoteData"
                    ValueMapper="@GetModelFromValue"
                    ItemHeight="30"
                    
                    AutoClose="false"
                    PageSize="20"
                    TextField="@nameof(Person.Name)"
                    ValueField="@nameof(Person.Id)"
                    @bind-Value="@SelectedValues"
                    Filterable="true" FilterOperator="@StringFilterOperator.Contains">
    <MultiSelectSettings>
        <MultiSelectPopupSettings Height="200px" />
    </MultiSelectSettings>
</TelerikMultiSelect>

@code{
    List<int> SelectedValues { get; set; } = new List<int> { 4, 1234 }; // pre-select an item to showcase the value mapper

    async Task GetRemoteData(MultiSelectReadEventArgs args)
    {
        DataEnvelope<Person> result = await MyService.GetItems(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    async Task<List<Person>> GetModelFromValue(List<int> selectedValues)
    {
        // return a model that matches the selected value so the component can get its text
        return await MyService.GetItemsFromValue(selectedValues);
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

        public static async Task<List<Person>> GetItemsFromValue(List<int> selectedValues)
        {
            await Task.Delay(400); // simulate real network and database delays. Remove in a real app

            return await Task.FromResult(AllData.Where(x => selectedValues.Contains(x.Id)).ToList());
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

  * [Live Demo: MultiSelect Virtualization](https://demos.telerik.com/blazor-ui/multiselect/virtualization)

