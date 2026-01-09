---
title: Toolbar SearchBox
page_title: Grid - Filtering SearchBox
description: Enable and configure filtering SearchBox in Grid for Blazor.
slug: grid-searchbox
tags: telerik,blazor,grid,filtering,filter,searchbox,search
published: True
position: 20
---

# Toolbar SearchBox

In addition to [Grid filtering](slug:components/grid/filtering), you can enhance functionality by adding a SearchBox to the [Grid Toolbar](slug:components/grid/features/toolbar). This search box filters multiple Grid columns simultaneously.

Users type their query, and the Grid performs a case-insensitive Contains search on all visible string columns. To customize the filter delay and searchable columns, see the [Customize the SearchBox section](#customize-the-searchbox).

The SearchBox operates independently of Grid filtering, respecting existing filters and adding extra criteria to refine search results.

## Basic Usage

To enable the built-in Grid SearchBox, use one of the following options:

* Add a `<GridToolBarSearchBoxTool>` tag to the [Grid ToolBar](slug:components/grid/features/toolbar). This approach is suitable if you are not using a Grid ToolBar yet, or if you are using only built-in ToolBar tools.
    ````RAZOR.skip-repl
    <TelerikGrid>
        <GridToolBar>
            <GridToolBarSearchBoxTool />
        </GridToolBar>
    </TelerikGrid>
    ````

* Add a `<GridSearchBox>` tag to the [Grid ToolBar Template](slug:components/grid/features/toolbar#custom-toolbar-configuration). This approach is suitable if you have or need custom Grid ToolBar content.
    ````RAZOR.skip-repl
    <TelerikGrid>
        <GridToolBarTemplate>
            <GridSearchBox />
        </GridToolBarTemplate>
    </TelerikGrid>
    ````

The following example shows the first option in action, while the [customization demo](#customize-the-searchbox) below uses a `GridToolBarTemplate`.

>caption Grid SearchBox

````RAZOR
<TelerikGrid Data="@GridData"
             Height="90vh"
             Pageable="true">
    <GridToolBar>
        <GridToolBarSearchBoxTool Placeholder="Type a letter or digit..." Width="180px" />
    </GridToolBar>
    <GridColumns>
        <GridColumn Field="@nameof(GridModel.Id)" />
        <GridColumn Field="@nameof(GridModel.Name)" />
        <GridColumn Field="@nameof(GridModel.Description)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<GridModel> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        Random rnd = Random.Shared;
        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new GridModel()
            {
                Id = i,
                Name = $"{(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)} {rnd.Next(10, 100)}",
                Description = $"{(char)rnd.Next(97, 123)}{(char)rnd.Next(97, 123)} {rnd.Next(10, 100)}"
            });
        }
    }

    public class GridModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
````

## Search From Code

You can set or remove the search filters programmatically through the `SearchFilter` property of the [Grid state](slug:grid-state).

>caption Set and clear the Grid SearchBox filter programmatically

````RAZOR
@[template](/_contentTemplates/grid/state.md#search-from-code)
````

@[template](/_contentTemplates/grid/state.md#initial-state)

## Customize the SearchBox

The [`GridToolBarSearchBoxTool`](slug:telerik.blazor.components.gridtoolbarsearchboxtool) and [`GridSearchBox`](slug:telerik.blazor.components.gridsearchbox) components offer the same variety of parameters to customize its behavior.

`DebounceDelay` sets the time in milliseconds between the user typing ends and the search starts. This provides a performance optimization when using the [`OnRead` event](slug:common-features-data-binding-onread). Filtering does not occur on every keystroke during fast typing, unless `DebounceDelay` is set to `0`.

The Grid searches in all visible string columns or a subset of theirs. It is also possible to programmatically [search in `string` fields, which are not displayed in the Grid](slug:grid-kb-search-in-hidden-fields).

The example below demonstrates all SearchBox settings in action, and also how to move the SearchBox on the opposite side of the Grid ToolBar when using `GridToolBarTemplate`.

>caption Grid SearchBox customizaton

````RAZOR
<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="20"
             Sortable="true"
             Height="90vh">
    <GridToolBarTemplate>
        <span class="k-toolbar-spacer"></span>
        <GridSearchBox Class="primary-searchbox"
                       DebounceDelay="300"
                       Fields="@SearchableFields"
                       FillMode="@ThemeConstants.SearchBox.FillMode.Outline"
                       Placeholder="Search Name Column..."
                       Rounded="@ThemeConstants.SearchBox.Rounded.Large"
                       Size="@ThemeConstants.SearchBox.Size.Small"
                       Width="240px" />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(GridModel.Name)" />
        <GridColumn Field="@nameof(GridModel.Description)" />
    </GridColumns>
</TelerikGrid>

<style>
    .primary-searchbox {
        color: var(--kendo-color-primary);
    }
</style>

@code {
    private List<GridModel> GridData { get; set; } = new();

    private List<string> SearchableFields = new List<string> { nameof(GridModel.Name) };

    protected override void OnInitialized()
    {
        Random rnd = Random.Shared;
        for (int i = 1; i <= 1000; i++)
        {
            GridData.Add(new GridModel()
            {
                Id = i,
                Name = $"{(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)} {rnd.Next(10, 100)}",
                Description = $"{(char)rnd.Next(97, 123)}{(char)rnd.Next(97, 123)} {rnd.Next(10, 100)}"
            });
        }
    }

    public class GridModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
````

## See Also

* [Live Demo: Grid Filter Searchbox](https://demos.telerik.com/blazor-ui/grid/searchbox)
* [Highlight or Bold Search Results in the Grid](slug:grid-kb-search-highlight-results)
* [Search the Grid in Numeric and Date Model Fields](slug:grid-kb-search-numeric-fields)
* [Search the Grid in Hidden Fields](slug:grid-kb-search-in-hidden-fields)
* [Change Grid Search Results on Column Hide or Show](slug:grid-kb-search-match-visible-columns)
* [Search the Grid with a `StartsWith` Operator](slug:grid-kb-search-startswith)
* [Search the Grid on Button Click](slug:grid-kb-search-button-click)
* [Grid Filtering Overview](slug:components/grid/filtering)
* [Blazor Grid](slug:grid-overview)
