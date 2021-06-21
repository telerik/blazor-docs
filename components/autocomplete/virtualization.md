---
title: Virtualization
page_title: AutoComplete - Virtualization
description: UI virtualization to allow large data sources in the AutoComplete for Blazor.
slug: autocomplete-virtualization
tags: telerik,blazor,AutoComplete,virtualization
published: True
position: 25
---

# AutoComplete Virtualization

The AutoComplete @[template](/_contentTemplates/common/dropdowns-virtualization.md#value-proposition)

#### In This Article

* [Basics](#basics)
* [Local Data Example](#local-data-example)
* [Remote Data Example](#remote-data-example)


>caption Display, scroll and filter over 10k records in the AutoComplete without delays and performance issues.

![Virtual Scrolling of large local data](images/autocomplete-virtual-scrolling-local.gif)



## Basics

@[template](/_contentTemplates/common/dropdowns-virtualization.md#basics-core)


@[template](/_contentTemplates/common/dropdowns-virtualization.md#remote-data-specifics)

### Limitations

@[template](/_contentTemplates/common/dropdowns-virtualization.md#limitations)



## Local Data Example


````CSHTML
@SelectedValue
<br />
<TelerikAutoComplete Data="@Data"
                     ScrollMode="@DropDownScrollMode.Virtual"
                     PopupHeight="200px"
                     ItemHeight="30"
                     PageSize="20"

                     @bind-Value="@SelectedValue"
                     Filterable="true" FilterOperator="@StringFilterOperator.Contains">
</TelerikAutoComplete>

@code {
    string SelectedValue { get; set; }
    List<string> Data { get; set; }

    protected override void OnInitialized()
    {
        Data = Enumerable.Range(1, 12345).Select(x => $"Name {x}").ToList();

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

Run this and see how you can display, scroll and filter over 10k records in the AutoComplete without delays and performance issues from a remote endpoint. There is artificial delay in these operations for the sake of the demonstration.

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

@SelectedValue
<br />
<TelerikAutoComplete Data="@CurentPageOfData"
                     ScrollMode="@DropDownScrollMode.Virtual"
                     OnRead="@GetRemoteData"
                     TotalCount="@TotalItems"
                     PopupHeight="200px"
                     ItemHeight="30"
                     PageSize="20"

                     @bind-Value="@SelectedValue"
                     Filterable="true" FilterOperator="@StringFilterOperator.Contains">
</TelerikAutoComplete>

@code{
    string SelectedValue { get; set; } = "Name 1234"; // pre-select an item to showcase it works like in a regular textbox
    List<string> CurentPageOfData { get; set; }
    int TotalItems { get; set; }

    async Task GetRemoteData(AutoCompleteReadEventArgs e)
    {
        DataEnvelope<string> result = await MyService.GetItems(e.Request);

        CurentPageOfData = result.Data;
        TotalItems = result.Total;
    }

    // mimics a real service in terms of API appearance, refactor as necessary for your app
    public static class MyService
    {
        static List<string> AllData { get; set; }

        public static async Task<DataEnvelope<string>> GetItems(DataSourceRequest request)
        {
            if (AllData == null)
            {
                AllData = Enumerable.Range(1, 12345).Select(x => $"Name {x}").ToList();
            }

            await Task.Delay(400); // simulate real network and database delays. Remove in a real app

            var result = await AllData.ToDataSourceResultAsync(request);
            DataEnvelope<string> dataToReturn = new DataEnvelope<string>
            {
                Data = result.Data.Cast<string>().ToList(),
                Total = result.Total
            };

            return await Task.FromResult(dataToReturn);
        }
    }

    // used to showcase how you could simplify the return of more than one value from the service
    public class DataEnvelope<T>
    {
        public int Total { get; set; }
        public List<T> Data { get; set; }
    }
}
````


## See Also

  * [Live Demo: AutoComplete Virtualization](https://demos.telerik.com/blazor-ui/autocomplete/virtualization)
   
  
