---
title: ListView SearchBox 
description: How to implement a ListView search box that filters by multiple data fields.
type: how-to
page_title: ListView Search Box
slug: listview-searchbox
position:
tags: listview,search,searchbox,filter,filtering
ticketid: 1536554
res_type: kb
---

## Description

How to implement a ListView seach box, similar to the [SearchBox in the Blazor Grid](https://demos.telerik.com/blazor-ui/grid/searchbox)? I would like to use a single input to search and filter in all data fields of the ListView data.

## Solution

It is possible to search and filter the ListView programmatically. The example below is a modified version of the [ListView filtering demo](https://demos.telerik.com/blazor-ui/listview/filtering).

* Notice the usage of a [`CompositeFilterDescriptor`](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.CompositeFilterDescriptor), instead of a [`FilterDescriptor`](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.FilterDescriptor). This is because we are searching in multiple fields with an `OR` logical operator. The [Grid Filtering documentation]({%slug components/grid/filtering%}#filter-descriptors) explains the difference between the two descriptor types.
* Populate the `FilterDescriptors` collection of the `CompositeFilterDescriptor` object with one `FilterDescriptor` for each field that you want to search in.

>caption ListView Search Textbox

````CSHTML
@* ListView SearchBox *@

@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<TelerikListView Data="@ListViewData"
                 Pageable="true"
                 PageSize="10"
                 Width="600px">
    <HeaderTemplate>
        <div style="padding: 1em">
            <label for="searchbox">Search in both Name and Descriprtion:</label>
            <TelerikTextBox Value="@SearchString" ValueChanged="@LoadListViewData"></TelerikTextBox>
            <TelerikButton OnClick="@ClearSearch">Clear</TelerikButton>
        </div>
    </HeaderTemplate>
    <Template>
        <div class="listview-box">
            <strong>@context.Name:</strong>
            <br />
            @context.Description
        </div>
    </Template>
</TelerikListView>

<style>
    .listview-box {
        display: inline-block;
        margin: 1em;
        padding: 1em;
        border: 1px solid #424242;
        background: #fafafa;
    }
</style>

@code {
    List<Product> ListViewData;
    List<Product> SourceData;
    string SearchString = "22";

    async Task LoadListViewData(string newSearchString)
    {
        SearchString = newSearchString;

        if (String.IsNullOrWhiteSpace(SearchString))
        {
            ListViewData = SourceData;
        }
        else
        {
            var request = new DataSourceRequest()
            {
                Filters = new List<IFilterDescriptor>()
            };

            var cfd = new CompositeFilterDescriptor();

            cfd.LogicalOperator = FilterCompositionLogicalOperator.Or;
            cfd.FilterDescriptors.Add(new FilterDescriptor("Name", FilterOperator.Contains, SearchString));
            cfd.FilterDescriptors.Add(new FilterDescriptor("Description", FilterOperator.Contains, SearchString));

            request.Filters.Add(cfd);

            ListViewData = (SourceData.ToDataSourceResult(request).Data as IEnumerable<Product>).ToList();
        }
    }

    async Task ClearSearch()
    {
        SearchString = "";
        await LoadListViewData(SearchString);
    }

    protected override async Task OnInitializedAsync()
    {
        SourceData = new List<Product>();

        for (int i = 1; i <= 50; i++)
        {

            SourceData.Add(new Product()
            {
                ID = i,
                Name = "Product " + (i * 11).ToString(),
                Description = "Description " + (i * 22).ToString()
            });
        }

        await LoadListViewData(SearchString);
    }

    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
````
