---
title: Paging
page_title: ListView - Paging
description: Paging in the ListView for Blazor.
slug: listview-paging
tags: telerik,blazor,listview,paging
published: True
position: 4
---

# ListView Paging

The ListView component can page the entire data source automatically. Alternatively, you can hook to an event and fetch each page of data yourself.

>caption In this article:

* [Basics](#basics)
* [Events](#events)
* [Pager Settings](#pager-settings)

## Basics

* To enable paging, set the ListView `Pageable` parameter to `true`.
* Set the number of items rendered at once with the `PageSize` parameter (defaults to 10).
* If needed, set the current page of the ListView through its integer `Page` property.
* You can further customize the pager interface via additional [pager settings](#pager-settings).

>caption Enable Paging in the ListView component and set a custom page size

````RAZOR
@* The Listview can page the entire data source your provide to it so only certain items are rendered at once *@

<TelerikListView Data="@ListViewData" Pageable="true" PageSize="15">
    <Template>
        <div class="listview-item">
            <strong>@context.Name</strong>
        </div>
    </Template>
</TelerikListView>

@code{
    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 250).Select(x => new SampleData
    {
        Id = x,
        Name = $"Name {x}"
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## Events

The ListView exposes three relevant events. You can find related examples in the [Events](slug:listview-events) article.

* `PageChanged` - you can use this to react to the user changing the page.
* `PageSizeChanged` - fires when the user changes the page size via the pager DropDownList.
* `OnRead` - you can use this to perform the read operation yourself on demand, instead of providing the entire data source at once. You can read more about this in the [Manual Data Source Operations](slug:listview-manual-operations) article.

>tip You can optimize database queries in two ways:
>
> * Use an `IQueryable<MyModel>` collection for the listview `Data`. The listview will build a LINQ expression internally that will be resolved only when needed. This can be useful when the `Data` comes from something like an EntityFramework context.
> * Bind the ListView with an [`OnRead` handler](slug:common-features-data-binding-onread) and implement [manual data source operations](slug:listview-manual-operations).

## Pager Settings

In addition to `Page` and `PageSize`, the ListView provides advanced pager configuration options via the `ListViewPagerSettings` tag, which is nested inside `ListViewSettings`. These configuration attributes include:

@[template](/_contentTemplates/common/pager-settings.md#pager-settings)

>caption ListView Pager Settings

````RAZOR
@*Configure the Pager Settings*@

<TelerikListView Data="@ListViewData"
                 Pageable="true"
                 @bind-PageSize="@PageSize"
                 @bind-Page="@CurrentPage">
    <ListViewSettings>
        <ListViewPagerSettings InputType="PagerInputType.Input"
                               PageSizes="@PageSizes"
                               ButtonCount="5"
                               Adaptive="true"
                               Position="PagerPosition.Top">
        </ListViewPagerSettings>
    </ListViewSettings>
    <Template>
        <div class="listview-item">
            <strong>@context.Name</strong>
        </div>
    </Template>
</TelerikListView>

@code {
    int PageSize { get; set; } = 15;
    int CurrentPage { get; set; } = 3;
    protected List<int?> PageSizes { get; set; } = new List<int?> { 15, 30, null };

    List<SampleData> ListViewData { get; set; } = Enumerable.Range(1, 250).Select(x => new SampleData
        {
            Id = x,
            Name = $"Name {x}"
        }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

* [ListView Overview](slug:listview-overview)
* [Manual Data Source Operations](slug:listview-manual-operations)
* [Events](slug:listview-events)
* [How to increase the pager dropdownlist width](slug:pager-kb-dropdown-width)
* [Live Demo: ListView](https://demos.telerik.com/blazor-ui/listview/overview)
