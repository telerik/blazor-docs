---
title: No Data Template
page_title: Grid - No Data Template
description: Use custom no data templates in the Telerik Grid for Blazor when the component has no items to display.
slug: grid-templates-no-data
tags: telerik, blazor, grid, templates
published: True
position: 38
---


# No Data Template

The `NoDataTemplate` allows you to define custom content when the Grid has no data to show. It lets you change the default **No records available** localizable text.

The Grid will also show its default or custom `NoDataTemplate` while loading its initial data. To help users distinguish between the "no data" and "still loading" states, [display a LoaderContainer over the Grid on initial load](slug:grid-loading#example).

>caption Using NoDataTemplate

````RAZOR
<TelerikGrid Data="@GridData"
             FilterMode="@GridFilterMode.FilterRow"
             Height="400px"
             Pageable="true">
    <GridToolBarTemplate>
        <GridCommandButton OnClick="@LoadData">Load Data</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" DisplayFormat="{0:d}" />
    </GridColumns>
    <NoDataTemplate>
        <p><strong style="color: var(--kendo-color-primary);">No Data Available.</strong></p>
    </NoDataTemplate>
</TelerikGrid>

@code {
    private IEnumerable<SampleData>? GridData { get; set; }

    private void LoadData()
    {
        GridData = Enumerable.Range(1, 30).Select(x => new SampleData
        {
            Id = x,
            Name = $"Name {x}",
            Team = $"Team {x % 3 + 1}",
            HireDate = DateTime.Today.AddMonths(-x)
        });
    }

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Team { get; set; } = string.Empty;
        public DateTime HireDate { get; set; } = DateTime.Today;
    }
}
````

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid - No Data Template](https://demos.telerik.com/blazor-ui/grid/no-data-template)
* [Blazor Grid](slug:grid-overview)
