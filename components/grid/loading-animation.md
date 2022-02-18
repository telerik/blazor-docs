---
title: Loading Animation
page_title: Grid Loading Animation
description: The Blazor Data Grid by Telerik UI provides a built-in loading animation that appears automatically when the grid detects a long data operation.
slug: grid-loading
tags: telerik,blazor,grid,loading,animation,indicator
published: True
position: 90
---

# Loading Animation

The loading animation indicates a data operation that requires more than 600ms to complete. The indicator appears as a loading sign over the Blazor Data Grid. The loading animation improves user experience with a visual hint that the requested action is still executing. The feature can prevent repetitive user actions.

The data operations that trigger the loading animation include:

* [Paging]({%slug components/grid/features/paging%})
* [Filtering]({%slug components/grid/filtering%})
* [Sorting]({%slug components/grid/features/sorting%})
* [Grouping]({%slug components/grid/features/grouping%}) 
* [Expanding groups with load-on-demand]({%slug grid-group-lod%})
* [Editing]({%slug components/grid/editing/overview%})
* [Inserting]({%slug components/grid/editing/overview%})
* [Deleting records]({%slug components/grid/editing/overview%})

The Grid will not display a loading animation during its initial rendering. The component cannot know when or even if data will be provided to it. Initial automatic loading sign can either show indefinitely, or it could prevent the user from altering any saved Grid state (such as changing filters). If you want a loading animation on the initial load, you can use a [LoaderContainer component]({%slug loadercontainer-overview%}#basic-loadercontainer). See the [Grid Loading Animation Live Demo](https://demos.telerik.com/blazor-ui/grid/loading-animation).

>caption Grid Loading Animation

````CSHTML
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p><label><TelerikCheckBox @bind-Value="@ShowLoading" /> Show Loading</label></p>

<TelerikGrid TItem="@GridModel"
             OnRead="@GetData"
             EnableLoaderContainer="@ShowLoading"
             Pageable="true"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="Text" />
    </GridColumns>
</TelerikGrid>

@code {
    List<GridModel> AllData { get; set; }
    bool ShowLoading { get; set; } = true;

    async Task GetData(GridReadEventArgs args)
    {
        await Task.Delay(2000);
        DataSourceResult result = AllData.ToDataSourceResult(args.Request);
        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override void OnInitialized()
    {
        AllData = Enumerable.Range(1, 30).Select(x => new GridModel
        {
            Id = x,
            Text = "Text " + x
        }).ToList();

        base.OnInitialized();
    }

    public class GridModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## See Also

* [Grid Data Binding]({%slug grid-data-binding%})
* [Live Demo: Grid Loading Animation](https://demos.telerik.com/blazor-ui/grid/loading-animation)
