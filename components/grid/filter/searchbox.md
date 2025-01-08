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

In addition to [Grid filtering](slug://components/grid/filtering), you can enhance functionality by adding a SearchBox to the [Grid Toolbar](slug://components/grid/features/toolbar). This search box filters multiple Grid columns simultaneously.

Users type their query, and the Grid performs a case-insensitive Contains search on all visible string columns, adjusting the filters accordingly. To customize the filter delay and selected fields, see the [Customize the SearchBox section](#customize-the-searchbox).

The SearchBox operates independently of Grid filtering, respecting existing filters and adding extra criteria to refine search results. To enable the SearchBox, include the `<GridSearchBox>` tag in the [`<GridToolBarTemplate>`](slug://components/grid/features/toolbar).

To enable the SearchBox, add the `<GridSearchBox>` tag in the [`<GridToolBarTemplate>`](slug://components/grid/features/toolbar).

>caption Grid SearchBox

````RAZOR
<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true">
    <GridToolBarTemplate>
        <GridSearchBox />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)" />
        <GridColumn Field="@nameof(SampleModel.Description)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleModel> GridData { get; set; } = new();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 50; i++)
        {
            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"{(char)(64 + i % 26 + 1)}{(char)(64 + i % 26 + 1)} {i}",
                Description = $"{(char)(123 - i % 26 - 1)}{(char)(123 - i % 26 - 1)} {i}"
            });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
````


## Search From Code

You can set or remove the search filters programmatically through the `SearchFilter` property of the [Grid state](slug://grid-state).

>caption Set and clear the Grid SearchBox filter programmatically

````RAZOR
@[template](/_contentTemplates/grid/state.md#search-from-code)
````

@[template](/_contentTemplates/grid/state.md#initial-state)

## Customize the SearchBox

The `GridSearchBox` component offers the following parameters to customize its behavior:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string`| The custom CSS class that renders on the SearchBox wrapper (`<span class="k-searchbox">`). |
| `DebounceDelay` | `int` <br /> (`300`) | The time in milliseconds between the user typing ends and the search starts. This provides a performance optimization when using the [`OnRead` event](slug://common-features-data-binding-onread). Filtering does not occur on every keystroke during fast typing, unless `DebounceDelay` is set to `0`. |
| `Fields` | `List<string>` | The collection of model properties to search in. By default, the Grid searches in all visible columns that are bound to `string` fields. You can only define a subset of those fields. It is also possible to programmatically [search in `string` fields, which are not displayed in the Grid](slug://grid-kb-search-in-hidden-fields). |
| `Placeholder` | `string` <br /> (`"Search..."`) | The textbox placeholder that hints the user what the SearchBox does. The built-in default value is [localized](slug://globalization-localization). |
| `Width` | `string` | Specifies the width of the SearchBox component. |

The example below demonstrates all SearchBox settings in action, and also how to move the SearchBox on the opposite side of the Grid toolbar.

>caption Grid SearchBox customizaton

````RAZOR
<TelerikGrid Data="@GridData"
             Pageable="true"
             Sortable="true">
    <GridToolBarTemplate>
        <span class="k-toolbar-spacer"></span>
        <GridSearchBox Class="primary-searchbox"
                       DebounceDelay="300"
                       Fields="@SearchableFields"
                       Placeholder="Search Name Column..."
                       Width="240px" />
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)" />
        <GridColumn Field="@nameof(SampleModel.Description)" />
    </GridColumns>
</TelerikGrid>

<style>
    .primary-searchbox {
        color: var(--kendo-color-primary);
    }
</style>

@code {
    private List<SampleModel> GridData { get; set; } = new();

    private List<string> SearchableFields = new List<string> { nameof(SampleModel.Name) };

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 50; i++)
        {
            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"{(char)(64 + i % 26 + 1)}{(char)(64 + i % 26 + 1)} {i}",
                Description = $"{(char)(123 - i % 26 - 1)}{(char)(123 - i % 26 - 1)} {i}"
            });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
````

## See Also

* [Live Demo: Grid Filter Searchbox](https://demos.telerik.com/blazor-ui/grid/searchbox)
* [Highlight or Bold Search Results in the Grid](slug://grid-kb-search-highlight-results)
* [Search the Grid in Numeric and Date Model Fields](slug://grid-kb-search-numeric-fields)
* [Search the Grid in Hidden Fields](slug://grid-kb-search-in-hidden-fields)
* [Change Grid Search Results on Column Hide or Show](slug://grid-kb-search-match-visible-columns)
* [Search the Grid with a `StartsWith` Operator](slug://grid-kb-search-startswith)
* [Search the Grid on Button Click](slug://grid-kb-search-button-click)
* [Grid Filtering Overview](slug://components/grid/filtering)
* [Blazor Grid](slug://grid-overview)
