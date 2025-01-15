---
title: Toolbar
page_title: Grid - Toolbar
description: Use toolbar and custom actions in Grid for Blazor.
slug: components/grid/features/toolbar
tags: telerik,blazor,grid,toolbar
published: True
position: 45
---

# Grid Toolbar

The [Blazor Grid](https://demos.telerik.com/blazor-ui/grid/overview) toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add custom tools or customize the toolbar.

## Built-in Tools

By default, the [Blazor Grid](https://demos.telerik.com/blazor-ui/grid/overview) displays all its built-in tools in the order below. Use the tool tag if you need to define a tool explicitly in a [custom toolbar configuration](#toolbar-configuration).

### Command Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Add | `GridToolBarAddTool` | An add command that fires the [`OnAdd` event](slug://components/grid/editing/overview#events). |
| CsvExport | `GridToolBarCsvExportTool` | An export command for CSV files that fires the [`OnBeforeExport` event](slug://grid-export-events#onbeforeexport). |
| ExcelExport | `GridToolBarExcelExportTool` | An export command for Excel files that fires the [`OnBeforeExport` event](slug://grid-export-events#onbeforeexport). |
| SearchBox | `GridToolBarSearchBoxTool` | A searchbox that filters multiple Grid columns simultaneously. |

### Layout Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Spacer | `GridToolBarSpacerTool` | Consumes the available empty space and pushes the rest of the tools next to one another. |

## Custom Tools

In addition to built-in tools, the Grid also supports custom tools. Use the `<GridToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example below.

## Toolbar Configuration

Add a `<GridToolBar>` tag inside `<TelerikGrid>` to configure a custom toolbar, for example:

* Arrange the Grid tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>caption Customize the Grid toolbar

````RAZOR
<TelerikGrid Data=@GridData
             EditMode="@GridEditMode.Inline"
             Pageable="true"
             OnUpdate=@UpdateItem
             OnDelete=@DeleteItem
             OnCreate=@CreateItem>
    <GridToolBar>
        <GridToolBarCustomTool>
            <TelerikButton OnClick="@OnToolbarCustomClick">Custom Grid Tool</TelerikButton>
        </GridToolBarCustomTool>
        
        <GridToolBarAddTool>
            Add a product
        </GridToolBarAddTool>
        
        <GridToolBarCsvExportTool>
            Export to CSV
        </GridToolBarCsvExportTool>
        
        <GridToolBarExcelExportTool>
            Export to Excel
        </GridToolBarExcelExportTool>

        <GridToolBarSpacerTool />
        <GridToolBarSearchBoxTool />
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(Person.EmployeeId) Editable="false" Visible="true" Width="200px" />
        <GridColumn Field=@nameof(Person.Name) Width="200px" />
        <GridColumn Field=@nameof(Person.AgeInYears) Title="Age" Visible="false" Width="240px" />
        <GridColumn Field=@nameof(Person.MeetingDate) Title="Meeting Date" Width="220px" />
        <GridColumn Field=@nameof(Person.HireDate) Title="Hire Date" Width="230px" />
        <GridColumn Field=@nameof(Person.GraduateGrade) Title="Graduate Grade" Width="200px" />
        <GridCommandColumn Width="200px">
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash"></GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil"></GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true"></GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Person> GridData { get; set; }

    private void OnToolbarCustomClick()
    {
        Console.WriteLine("Custom Grid Toolbar tool clicked!");
    }

    protected override void OnInitialized()
    {
        var data = new List<Person>();
        var rand = new Random();

        for (int i = 0; i < 50; i++)
        {
            data.Add(new Person()
                {
                    EmployeeId = i,
                    Name = "Employee " + i.ToString(),
                    HireDate = DateTime.Now.Date.AddDays(-(i * 2)),
                    AgeInYears = 20,
                    MeetingDate = DateTime.Now.Date.AddDays(i),
                    GraduateGrade = (i % 5) + 2
                });
        }
        GridData = new List<Person>(data);
    }

    private void CreateItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as Person;

        argsItem.EmployeeId = GridData.Count + 1;

        GridData.Insert(0, argsItem);
    }

    private void DeleteItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as Person;

        GridData.Remove(argsItem);
    }

    private void UpdateItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as Person;
        var itemForEdit = GridData.FirstOrDefault(i => i.EmployeeId == argsItem.EmployeeId);

        if (itemForEdit != null)
        {
            itemForEdit.AgeInYears = argsItem.AgeInYears;
            itemForEdit.GraduateGrade = argsItem.GraduateGrade;
            itemForEdit.HireDate = argsItem.HireDate;
            itemForEdit.MeetingDate = argsItem.MeetingDate;
            itemForEdit.Name = argsItem.Name;
        }
    }

    public class Person
    {
        public int? EmployeeId { get; set; }

        public string Name { get; set; }

        public int? AgeInYears { get; set; }

        public decimal? GraduateGrade { get; set; }

        public DateTime HireDate { get; set; }

        public DateTime MeetingDate { get; set; }

        public Person()
        {
            GraduateGrade = 1;
        }
    }
}
````


## Next Steps

* [Handle Grid events](slug://grid-events)


## See Also

* [Grid Live Demo](https://demos.telerik.com/blazor-ui/grid/overview)
* [Grid API](/blazor-ui/api/Telerik.Blazor.Components.TelerikGrid)
