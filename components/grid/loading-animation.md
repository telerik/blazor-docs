---
title: Loading Animation
page_title: Grid Loading Animation
description: The Blazor Data Grid by Telerik UI provides a built-in loading animation that appears automatically when the grid detects a long data operation.
slug: grid-loading
tags: telerik,blazor,grid,loading,animation,indicator
published: True
position: 90
components: ["grid"]
---
# Loading Animation

The Grid can show a loading animation during data operations that take more than 600ms to complete. This improves the user experience with a visual hint that the requested action is still running and prevents repetitive user actions.

The animation appears as a loading indicator over the Blazor Data Grid.

## Basics

The Grid `EnableLoaderContainer` parameter determines if the component will show a built-in LoaderContainer for long-running operations. The loading animation is enabled by default. The data operations that trigger the loading animation include:

* [Paging](slug:components/grid/features/paging)
* [Filtering](slug:components/grid/filtering)
* [Sorting](slug:components/grid/features/sorting)
* [Grouping](slug:components/grid/features/grouping) 
* [Expanding groups with load-on-demand](slug:grid-group-lod)
* [Creating, deleting, or editing records](slug:grid-editing-overview)

## Show LoaderContainer on Initial Load

The Grid does not display a loading animation during its initial rendering and data load. The component cannot know when or even if data will be provided to it, especially when using the Grid `Data` parameter. An initial automatic loading sign can either show indefinitely, or it could prevent the user from altering any saved Grid state (such as changing filters).

If you want to display a loading animation on initial load, you can use a [LoaderContainer component](slug:loadercontainer-overview). See the example below or the [Grid Loading Animation Live Demo](https://demos.telerik.com/blazor-ui/grid/loading-animation).

## Example

The following example binds the Grid with an [`OnRead` event handler](slug:common-features-data-binding-onread). To show an external initial [LoaderContainer over the Grid](slug:loadercontainer-overview#fill-a-parent-container) when using the `Data` parameter, you can control the LoaderContainer's rendering or visibility, depending on whether the data collection is null.

>caption Using an external and the built-in Grid loading animation

````RAZOR
@using Telerik.DataSource
@using Telerik.DataSource.Extensions

<p><label><TelerikCheckBox @bind-Value="@EnableGridLoaderContainer" /> Enable Built-in Grid LoaderContainer</label></p>

<div style="position:relative">
    @*
        This LoaderContainer is used only during initial data load.
        The position:relative style on the parent DIV makes the LoaderContainer cover only the Grid.
        The LoaderContainer configuration and Template matches the built-in Grid loading animation.
    *@
    <TelerikLoaderContainer OverlayThemeColor="@ThemeConstants.Loader.ThemeColor.Light"
                            Visible="@LoaderContainerVisible">
        <Template>
            <TelerikLoader Type="@LoaderType.InfiniteSpinner"
                           Size="@ThemeConstants.Loader.Size.Large" />
        </Template>
    </TelerikLoaderContainer>

    <TelerikGrid OnRead="@OnGridRead"
                 TItem="@Product"
                 EnableLoaderContainer="@EnableGridLoaderContainer"
                 Height="280px"
                 Pageable="true"
                 PageSize="5"
                 Sortable="true">
        <GridColumns>
            <GridColumn Field="@nameof(Product.Name)" />
            <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:C2}" />
            <GridColumn Field="@nameof(Product.Quantity)" />
        </GridColumns>
    </TelerikGrid>
</div>

@code {
    private List<Product> GridData { get; set; } = new();

    private bool EnableGridLoaderContainer { get; set; } = true;
    private bool LoaderContainerVisible { get; set; } = true;

    private async Task OnGridRead(GridReadEventArgs args)
    {
        // Simulate network delay.
        await Task.Delay(2000);

        DataSourceResult result = await GridData.ToDataSourceResultAsync(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
        args.AggregateResults = result.AggregateResults;

        // Hide the initial external LoaderContainer.
        LoaderContainerVisible = false;
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i}",
                Price = Random.Shared.Next(1, 100) * 1.23m,
                Quantity = Random.Shared.Next(0, 1000)
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
````

## See Also

* [Grid Data Binding](slug:grid-data-binding)
* [Live Demo: Grid Loading Animation](https://demos.telerik.com/blazor-ui/grid/loading-animation)
* [Blazor Grid](slug:grid-overview)
