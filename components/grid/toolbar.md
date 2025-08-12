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

The [Blazor Grid](https://demos.telerik.com/blazor-ui/grid/overview) toolbar can render built-in and custom tools. This article describes the built-in tools and shows how to add [custom tools](#custom-tools) or create a [custom toolbar](#custom-toolbar-configuration).

## Built-In Tools

The [Blazor Grid](https://demos.telerik.com/blazor-ui/grid/overview) provides several built-in tools that can be added to the component toolbar. To include a specific tool in the [toolbar configuration](#toolbar-tools-configuration), use the respective tool tags below.

### Command Tools

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Add | `GridToolBarAddTool` | An `Add` command button that fires the [`OnAdd` event](slug:grid-editing-overview#events). |
| AI Assistant | `GridToolBarAIAssistantTool` | A tool that shows an [AI Prompt component](slug:aiprompt-overview) for AI-enabled data operations on the Grid data. See [Grid AI Features](slug:grid-ai-overview) for details and examples. |
| Cancel | `GridToolBarCancelEditTool` | A `Cancel` command button that applies to the row in edit mode and fires [`OnCancel`](slug:grid-editing-overview#events). [`Inline`](slug:grid-editing-inline) or [`Popup`](slug:grid-editing-popup) editing mode is required. |
| CsvExport | `GridToolBarCsvExportTool` | A `CsvExport` command for CSV files that fires the [`OnBeforeExport` event](slug:grid-export-events#onbeforeexport). |
| Delete | `GridToolBarDeleteTool` | A `Delete` command for the selected row that fires [`OnDelete`](slug:grid-editing-overview#events). Row selection and editing are required. |
| Edit | `GridToolBarEditTool` | An `Edit` command button for the selected row that fires [`OnEdit`](slug:grid-editing-overview#events). Row selection and `Inline` or `Popup` editing mode are required. |
| ExcelExport | `GridToolBarExcelExportTool` | An `ExcelExport` command for Excel files that fires the [`OnBeforeExport` event](slug:grid-export-events#onbeforeexport). |
| Filter | `GridToolBarFilterTool` | A toggle button that opens UI for filtering. On desktop screens, it displays a popup with a filter menu; on mobile devices, it renders an `ActionSheet`. The filter component has two views: one for selecting the column to filter, and another for applying the filter to the selected column. The tool also exposes an `Icon` parameter that allows you to override the default icon.  |
| Group | `GridToolBarGroupTool` | A toggle button that opens a list of the groupable columns. Click a column to group by it. On mobile devices, the popup renders as an `ActionSheet`. The tool also exposes an `Icon` parameter that allows you to override the default icon. |
| Save | `GridToolBarSaveEditTool` | A `Save` command button for the row in edit mode that fires [`OnUpdate` or `OnCreate`](slug:grid-editing-overview#events). [`Inline`](slug:grid-editing-inline) or [`Popup`](slug:grid-editing-popup) editing mode is required. |
| Select All | `GridToolBarSelectAllTool` | A checkbox that selects all rows, according to the [Grid Checkbox column](slug:components/grid/columns/checkbox) configuration. |
| Sort | `GridToolBarSortTool` | A toggle button that opens a list of the sortable columns. Click a column to sort by it. On mobile devices, the popup renders as an `ActionSheet`. The tool also exposes an `Icon` parameter that allows you to override the default icon. |
| SearchBox | `GridToolBarSearchBoxTool` | A [searchbox that filters multiple string columns](slug:grid-searchbox) simultaneously. |

### Layout Tools

| Tool Name | Tool Tag | Description |
| --- | --- | --- |
| Spacer | `GridToolBarSpacerTool` | Consumes the available empty space and pushes the rest of the tools next to one another. |

## Custom Tools

In addition to the built-in tools, the Grid also supports custom tools. Use the `<GridToolBarCustomTool>` tag, which is a standard Blazor `RenderFragment`. See the example below.

## Toolbar Tools Configuration

Add a `<GridToolBar>` tag inside `<TelerikGrid>` to configure a toolbar, for example:

* Arrange the Grid tools in a specific order;
* Remove some of the built-in tools;
* Add custom tools.

>important `<GridToolBar>` and `<GridToolBarTemplate>` cannot be used together in the same Grid instance.

>caption Grid Toolbar Tools

````RAZOR
<TelerikGrid Data=@GridData
             EditMode="@GridEditMode.Inline"
             FilterMode="GridFilterMode.FilterMenu"
             Groupable="true"
             Sortable="true"
             Pageable="true"
             SelectionMode="@GridSelectionMode.Multiple"
             @bind-SelectedItems="@SelectedPeople"
             AdaptiveMode="AdaptiveMode.Auto"
             OnUpdate=@UpdateItem
             OnCreate=@CreateItem
             OnDelete="@DeleteItem">
    <GridSettings>
        <GridToolBarSettings OverflowMode="GridToolBarOverflowMode.Scroll"
                             ScrollButtonsPosition="GridToolBarScrollButtonsPosition.Start"
                             ScrollButtonsVisibility="GridToolBarScrollButtonsVisibility.Visible"
                             ShowIconOnlyTools="true"
                             ShowInactiveTools="true">
        </GridToolBarSettings>
    </GridSettings>
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

        <GridToolBarFilterTool>
            Filter
        </GridToolBarFilterTool>

        <GridToolBarSortTool>
            Sort
        </GridToolBarSortTool>

        <GridToolBarGroupTool>
            Group
        </GridToolBarGroupTool>

        <GridToolBarEditTool>
            Edit
        </GridToolBarEditTool>

        <GridToolBarSaveEditTool>
            Save
        </GridToolBarSaveEditTool>

        <GridToolBarCancelEditTool>
            Cancel
        </GridToolBarCancelEditTool>

        <GridToolBarDeleteTool>
            Delete
        </GridToolBarDeleteTool>

        <GridToolBarSpacerTool />

        <GridToolBarSearchBoxTool />
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(Person.EmployeeId) Editable="false" Visible="true" Width="200px" />
        <GridColumn Field=@nameof(Person.Name) Width="200px" />
        <GridColumn Field=@nameof(Person.AgeInYears) Title="Age" Visible="false" Width="240px" />
        <GridColumn Field=@nameof(Person.HireDate) Title="Hire Date" Width="230px" />
        <GridCommandColumn Width="200px">
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil"></GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true"></GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Person> GridData { get; set; }
    private IEnumerable<Person> SelectedPeople { get; set; } = Enumerable.Empty<Person>();

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
                AgeInYears = 20
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

    private void UpdateItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as Person;
        var itemForEdit = GridData.FirstOrDefault(i => i.EmployeeId == argsItem.EmployeeId);

        if (itemForEdit != null)
        {
            itemForEdit.AgeInYears = argsItem.AgeInYears;
            itemForEdit.HireDate = argsItem.HireDate;
            itemForEdit.Name = argsItem.Name;
        }
    }
    
    private void DeleteItem(GridCommandEventArgs args)
    {
        var argsItem = args.Item as Person;

        if (GridData.Contains(argsItem))
        {
            GridData.Remove(argsItem);
        }
    }

    public class Person
    {
        public int? EmployeeId { get; set; }

        public string Name { get; set; }

        public int? AgeInYears { get; set; }

        public DateTime HireDate { get; set; }
    }
}
````

## Custom Toolbar Configuration

Add a `<GridToolBarTemplate>` tag inside `<TelerikGrid>` to configure a custom toolbar. You can add your own HTML and components to create a more complex layout in the Grid header to match your business needs and also `GridCommandButton` instances (read more about the features available in those buttons in the [Command Column](slug:components/grid/columns/command) article).

When using a `<GridToolBarTemplate>`, you need to use the `Tab` key to navigate between the focusable items. This is because the `<GridToolBarTemplate>` allows rendering of custom elements. On the other hand, the `<GridToolBar>` uses the [built-in keyboard navigation](slug:accessibility-overview#keyboard-navigation) through arrow keys.

>caption Custom Grid Toolbar

````RAZOR
@result

<TelerikGrid Data=@MyData Pageable="true" PageSize="15" EditMode="@GridEditMode.Inline" Height="500px" OnCreate="@CreateHandler">

    <GridToolBarTemplate>
        <div style="display: flex; width: 100%; justify-content: space-between;">
            <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>

            <div>
                <GridCommandButton Command="CsvExport" Icon="@SvgIcon.FileCsv">Export to CSV</GridCommandButton>
                <GridCommandButton Command="ExcelExport" Icon="@SvgIcon.FileExcel">Export to Excel</GridCommandButton>
                <GridCommandButton Command="PdfExport" Icon="@SvgIcon.FilePdf">Export to Pdf</GridCommandButton>
                <label class="k-checkbox-label"><TelerikCheckBox @bind-Value="@ExportAllPages" />Export All Pages</label>
            </div>

            <button @onclick="@( () => result = $"Custom button click on {DateTime.Now}" )">
                Click Me
            </button>
        </div>
    </GridToolBarTemplate>

    <GridExport>
        <GridCsvExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
        <GridExcelExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
        <GridPdfExport FileName="telerik-grid-export" AllPages="@ExportAllPages" />
    </GridExport>

    <GridColumns>
        <GridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
        <GridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private string result;

    private bool ExportAllPages { get; set; }

    private void CreateHandler(GridCommandEventArgs args)
    {
        SampleData newItem = args.Item as SampleData;
        MyData.Insert(0, newItem); // actual CRUD operations are not implemented, for brevity

        result = string.Format("On {2} you added the employee {0} who was hired on {1}.", newItem.Name, newItem.HireDate, DateTime.Now);
        StateHasChanged();
    }
   
    private List<SampleData> MyData = Enumerable.Range(1, 50).Select(
        x => new SampleData
            {
                ID = x,
                Name = "name " + x,
                HireDate = DateTime.Now.AddDays(-x)
            }).ToList();

    //in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

}
````

## Next Steps

* [Handle Grid events](slug:grid-events)

## See Also

* [Grid Live Demo](https://demos.telerik.com/blazor-ui/grid/overview)
* [Grid API](slug:Telerik.Blazor.Components.TelerikGrid-1)
