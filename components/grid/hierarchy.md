---
title: Hierarchy
page_title: Grid - Hierarchy
description: Enable and configure hierarchy and detail records in Grid for Blazor.
slug: components/grid/features/hierarchy
tags: telerik,blazor,grid,hierarchy,detail,detail template
published: True
position: 40
---

# Grid Hierarchy

The Grid component provides options for visualizing the relations between parent and child records by displaying data in a hierarchical manner through a detail template.

In this article:

* [Basics](#basics)
* [Expand Rows From Code](#expand-rows-from-code)
* [More Examples](#more-examples)

## Basics

To implement hierarchy in the Grid, define a `DetailTemplate` under the main tag of the grid. In this template, you can access the model for the concrete row through the `context`, and use other components to show detailed data from it (for example, another grid, or any other set of components and HTML).

When a detail template is defined, an expand/collapse button is rendered at the beginning of the row that the user can click to show and hide the detailed data.

>caption Define a detail template to show hierarchical data from the model in a nested grid

````RAZOR
Click the + icon to expand the row details

<TelerikGrid Data="salesTeamMembers">
    <DetailTemplate>
        @{
            var employee = context as MainModel;
            <TelerikGrid Data="employee.Orders" Pageable="true" PageSize="5">
                <GridColumns>
                    <GridColumn Field="OrderId"></GridColumn>
                    <GridColumn Field="DealSize"></GridColumn>
                </GridColumns>
            </TelerikGrid>
        }
    </DetailTemplate>
    <GridColumns>
        <GridColumn Field="Id"></GridColumn>
        <GridColumn Field="Name"></GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    List<MainModel> salesTeamMembers { get; set; }

    protected override void OnInitialized()
    {
        salesTeamMembers = GenerateData();
    }

    private List<MainModel> GenerateData()
    {
        List<MainModel> data = new List<MainModel>();
        for (int i = 0; i < 5; i++)
        {
            MainModel mdl = new MainModel { Id = i, Name = $"Name {i}" };
            mdl.Orders = Enumerable.Range(1, 15).Select(x => new DetailsModel { OrderId = x, DealSize = x^i }).ToList();
            data.Add(mdl);
        }
        return data;
    }

    public class MainModel
    {
        public int Id { get; set; }
        public string Name { get;set; }
        public List<DetailsModel> Orders { get; set; }
    }

    public class DetailsModel
    {
        public int OrderId { get; set; }
        public double DealSize { get; set; }
    }
}
````

>caption The result of the code snippet above, after expanding the second row

![Blazor Hierarchy Grid In Grid](images/hierarchy-grid-in-grid.png)

>tip To have more levels, simply nest more grids and name the `context` variables. You can find an example in the [Multi-Level Hierarchy](slug:grid-three-level-hierarchy) KB article.


## Expand Rows From Code

You can choose which detail templates will be expanded from your code through the grid [state](slug:grid-state). Its `ExpandedItems` field contains a collection of the expanded Grid items (all detail templates are collapsed by default).

The `ExpandedItems` collection is compared against the Grid Data collection in order to determine which rows will be expanded. The default behavior of the framework is to compare objects by their reference.

When the `ExpandedItems` are obtained from a different data source to the Grid (e.g., from a separate service method and not from the view-model), the references may not match and so there will be no expanded items. In such cases, you have to override the [`Equals`](https://docs.microsoft.com/en-us/dotnet/api/system.object.equals) method of the underlying model class so that it matches them, for example, by a unique identifier rather than by reference so that two objects can be equal regardless of their origin, but according to their contents. When you are overriding the `Equals` method, it is also recommended to override the [`GetHashCode`](https://docs.microsoft.com/en-us/dotnet/api/system.object.gethashcode) method as well. A similar example is available at [Save and Load Grid State from Browser LocalStorage](slug:grid-kb-save-load-state-localstorage).

@[template](/_contentTemplates/grid/state.md#initial-state)

>caption Expand DetailTemplate hierarchy from code

````RAZOR
@[template](/_contentTemplates/grid/state.md#expand-hierarchy-from-code)
````

## More Examples

The following articles and sample projects can be helpful when implementing hierarchy:

* [Editing in Hierarchy](slug:grid-kb-editing-in-hierarchy)

* [Load Hierarchical Data On Demand](https://github.com/telerik/blazor-ui/tree/master/grid/load-on-demand-hierarchy)

* [Multi-Level Hierarchy](slug:grid-three-level-hierarchy)

* [Align Columns in Nested Grids](slug:grid-kb-align-columns-hierarchy)

* [Custom Excel Export that Includes Hierarchy](https://github.com/telerik/blazor-ui/tree/master/grid/export-to-xlsx-hierarchy)

## Using Components in Grid Detail Templates

@[template](/_contentTemplates/grid/common-link.md#using-components-in-templates)

## See Also

* [Live Demo: Grid Hierarchy](https://demos.telerik.com/blazor-ui/grid/hierarchy)
* [Customize Hierarchy Expand Column in Blazor Grid](slug:grid-kb-customize-hierarchy-expand-column-blazor-grid)
* [Drag and Drop Rows in Grid Hierarchy](slug:grid-kb-drag-drop-rows-hierarchy)
* [Blazor Grid](slug:grid-overview)
