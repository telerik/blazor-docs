---
title: Paging
page_title: ListView for Blazor | Paging
description: Paging in the ListView for Blazor
slug: listview-paging
tags: telerik,blazor,listview,paging
published: True
position: 5
---

# ListView Paging

The ListView component can page the entire data source automatically. You can, alternatively, hook to an event and fetch each page of data yourself.

To enable paging set the `Pageable` parameter of the listview to `true`.

You can also control the number of items rendered at once through the `PageSize` parameter (defaults to 10).

The listview exposes two relevant events:
* `PageChanged` - you can use this to react to the user changing the page. You can find an example in the [Events]({%slug listview-events%}) article.
* `OnRead` - you can use this to perform the read operation yourself on demand, instead of providing the entire data source at once. You can read more about this in the [Manual Data Source Operations]({%slug listview-manual-operations%}) article.

>caption Enable Paging in the ListView component and set a custom page size

````CSHTML
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

>tip You can optimize database queries in two ways:
>
> * Use an `IQueryable<MyModel>` collection for the listview `Data`. The listview will build a LINQ expression internally that will be resolved only when needed. This can be useful when the `Data` comes from something like an EntityFramework context.
> * Implement [manual data source operations]({%slug listview-manual-operations%}) and implement the desired query yourself. In a future version, the `DataSourceRequest` object will become serializable so you can send it directly over HTTP to a controller and use the LINQ queries it will build for you.


## See Also

  * [ListView Overview]({%slug listview-overview%})
  * [Manual Data Source Operations]({%slug listview-manual-operations%})
  * [Events]({%slug listview-events%})
  * [Live Demo: ListView](https://demos.telerik.com/blazor-ui/listview/overview)
