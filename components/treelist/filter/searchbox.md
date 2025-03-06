---
title: Toolbar Searchbox
page_title: TreeList - Filtering Searchbox
description: Enable and configure filtering Searchbox in TreeList for Blazor.
slug: treelist-searchbox
tags: telerik,blazor,treeList,filtering,filter,searchbox,search
published: True
position: 20
---

# TreeList Toolbar Searchbox

In addition to [TreeList filtering](slug:treelist-filtering), you can also add a `SearchBox` in the [TreeList Toolbar](slug:treelist-toolbar). The search box can filter in multiple TreeList columns at he same time.

>caption In this Article:

* [Basics](#basics)
* [Search From Code](#search-from-code)
* [Customize the SearchBox](#customize-the-searchbox)


## Basics

The SearchBox lets the user type their query and the TreeList will look up all visible `string` columns with a case-insensitive `Contains` operator, and filter them accordingly. To change the filter delay and the fields the TreeList will use, see the [Customize the SearchBox](#customize-the-searchbox) section below.

The SearchBox is independent from the TreeList filtering. If the TreeList has applied filters, the SearchBox will respect them and add additional filtering criteria. Thus, you can also apply filtering to search results.

To enable the SearchBox, add the `<TreeListSearchBox>` tag in the [`<TreeListToolBarTemplate>`](slug:treelist-toolbar).

>caption TreeList SearchBox

````RAZOR
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(SampleModel.Id)"
                 ParentIdField="@nameof(SampleModel.ParentId)"
                 Pageable="true"
                 Sortable="true">
    <TreeListToolBarTemplate>
        <TreeListSearchBox />
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(SampleModel.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(SampleModel.Description)" />
    </TreeListColumns>
</TelerikTreeList>

@code {
    private List<SampleModel> TreeListData { get; set; } = new();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 50; i++)
        {
            TreeListData.Add(new SampleModel()
            {
                Id = i,
                ParentId = i <= 5 ? null : Random.Shared.Next(1, 6),
                Name = $"{(char)(64 + i % 26 + 1)}{(char)(64 + i % 26 + 1)} {i}",
                Description = $"{(char)(123 - i % 26 - 1)}{(char)(123 - i % 26 - 1)} {i}"
            });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
````


## Search From Code

You can set or remove the search filters programmatically through the `SearchFilter` property of the [TreeList state](slug:treelist-state).

>caption Set and clear the TreeList SearchBox filter programmatically

````RAZOR
@[template](/_contentTemplates/treelist/state.md#search-from-code)
````

@[template](/_contentTemplates/treelist/state.md#initial-state)


## Customize the SearchBox

The `TreeListSearchBox` component offers the following parameters to customize its behavior:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string`| The custom CSS class that renders on the SearchBox wrapper (`<span class="k-searchbox">`). |
| `DebounceDelay` | `int` <br /> (`300`) | The time in milliseconds between the user typing ends and the search starts. Filtering does not occur on every keystroke during fast typing, unless `DebounceDelay` is set to `0`. |
| `Fields` | `List<string>` | The collection of model properties to search in. By default, the TreeList searches in all visible columns that are bound to `string` fields. You can only define a subset of those fields. It is also possible to programmatically [search in `string` fields, which are not displayed in the TreeList](slug:grid-kb-search-in-hidden-fields). |
| `Placeholder` | `string` <br /> (`"Search..."`) | The textbox placeholder that hints the user what the SearchBox does. The built-in default value is [localized](slug:globalization-localization). |
| `Width` | `string` | Specifies the width of the SearchBox component. |

The example below demonstrates all SearchBox settings in action, and also how to move the SearchBox on the opposite side of the TreeList toolbar.

>caption TreeList SearchBox customizaton

````RAZOR
<TelerikTreeList Data="@TreeListData"
                 IdField="@nameof(SampleModel.Id)"
                 ParentIdField="@nameof(SampleModel.ParentId)"
                 Pageable="true"
                 Sortable="true">
    <TreeListToolBarTemplate>
        <span class="k-toolbar-spacer"></span>
        <TreeListSearchBox Class="primary-searchbox"
                           DebounceDelay="300"
                           Fields="@SearchableFields"
                           Placeholder="Search Name Column..."
                           Width="240px" />
    </TreeListToolBarTemplate>
    <TreeListColumns>
        <TreeListColumn Field="@nameof(SampleModel.Name)" Expandable="true" />
        <TreeListColumn Field="@nameof(SampleModel.Description)" />
    </TreeListColumns>
</TelerikTreeList>

<style>
    .primary-searchbox {
        color: var(--kendo-color-primary);
    }
</style>

@code {
    private List<SampleModel> TreeListData { get; set; } = new();

    private List<string> SearchableFields = new List<string> { nameof(SampleModel.Name) };

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 50; i++)
        {
            TreeListData.Add(new SampleModel()
            {
                Id = i,
                ParentId = i <= 5 ? null : Random.Shared.Next(1, 6),
                Name = $"{(char)(64 + i % 26 + 1)}{(char)(64 + i % 26 + 1)} {i}",
                Description = $"{(char)(123 - i % 26 - 1)}{(char)(123 - i % 26 - 1)} {i}"
            });
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
````

## See Also

* [Live Demo: TreeList SearchBox](https://demos.telerik.com/blazor-ui/treelist/searchbox)
* [Format or Bold Search Results in the TreeList](slug:grid-kb-search-highlight-results)
* [Search the TreeList in Numeric and Date Model Fields](slug:grid-kb-search-numeric-fields)
* [Search the TreeList with a `StartsWith` operator](slug:grid-kb-search-startswith)
* [Search the TreeList on Button Click](slug:grid-kb-search-button-click)
* [Treelist Filtering Overview](slug:treelist-filtering)
