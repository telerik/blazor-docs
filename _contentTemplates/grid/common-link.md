#async-events-link
>tip The grid events can be async. The example below shows synchronous versions for brevity. You can find the async signatures in the [CRUD Operations Overview](overview) article.
#end


#conditional-style-row-and-cell-render
````CSHTML
@* Conditional styling/formatting for a cell and row *@

<style>
    .highlightCellBackGroud {
        background-color: lightyellow;
    }

    .negativeValuesRowFormatting {
        color: red;
    }

    .positiveValuesRowFormatting {
        color: green;
    }
</style>

<TelerikGrid Data="@GridData"
             Height="400px"
             Pageable="true"
             Sortable="true"
             FilterMode="Telerik.Blazor.GridFilterMode.FilterRow"
             Resizable="true"
             Reorderable="true"
             OnRowRender="@OnRowRenderHandler">
    <GridColumns>
        <GridColumn Field="@(nameof(AccountingData.ClientId))" Width="120px" />
        <GridColumn Field="@(nameof(AccountingData.ClientName))" Title="Client Name" Groupable="false" />
        <GridColumn Field="@(nameof(AccountingData.DateOfLastReport))" Title="Date Of Last Report" />
        <GridColumn Field="@(nameof(AccountingData.NetBalance))"
                    Title="Net Balance"
                    OnCellRender="@OnCellRenderHandler" />
    </GridColumns>
</TelerikGrid>

@code {
    void OnCellRenderHandler(GridCellRenderEventArgs args)
    {
        args.Class = "highlightCellBackGroud";
    }
    
    void OnRowRenderHandler(GridRowRenderEventArgs args)
    {
        AccountingData item = args.Item as AccountingData;

        args.Class = item.NetBalance > 0 ? "positiveValuesRowFormatting" : "negativeValuesRowFormatting";
    }

    public List<AccountingData> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<AccountingData>();
        GenerateAccountingData();
        base.OnInitialized();
    }

    public void GenerateAccountingData()
    {
        Random rand = new Random();
        for (int i = 0; i < 50; i++)
        {
            GridData.Add(new AccountingData()
            {
                ClientId = i,
                ClientName = $"Client {i}",
                DateOfLastReport = DateTime.Today.AddDays(-i),
                NetBalance = rand.Next(-15000, 25000)
            });
        }
    }

    public class AccountingData
    {
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public DateTime DateOfLastReport { get; set; }
        public int NetBalance { get; set; }
    }
}
````

#end


#display-format-basics
You can set a C# format string to the column so that it renders the values with the corresponding styling according to the current culture of the thread.

## Basics

To set the desired format string, use the `DisplayFormat` parameter of the column.

If the model field has the `DataFormatString` set through the `DisplayFormat` DataAnnotation attribute, the grid will honor that without an explicit setting in the markup of the column.

You can use the standard C# formatting options, because the grid uses a `string.Format` call: <a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/formatting-types" target="_blank">MSDN: Format types in .NET</a>.
#end


#display-format-notes
## Notes

* Numeric, DateTime and Enum types can use such formats. String and Boolean types are displayed without such a format, however.

* The `CurrentInfo.CurrentCulture` is used when rendering the formats, so if you need specific formats for specific users, you must set the culture of the app accordingly.


* The `DisplayFormat` parameter defines the format that is used to render Numeric or DateTime values when the component initializes. As it is not applied in edit mode, the editor will display the default format of the field depending on the culture. In order to customize the format when editing, together with setting the `DisplayFormat` parameter, you can use Editor Template for [Grid]({%slug grid-templates-editor%}) or [TreeList]({%slug treelist-templates-editor%}).
#end


#multi-column-headers-feature-integration
This section explains how using multi column headers changes behaviors of other component functionalities or how certain features behave with multi-column headers. If a feature is not listed, it is not affected.

* [Width](#width)
* [Sorting, Filtering, Grouping, Editing](#sorting-filtering-grouping-editing)
* [Resizing](#resizing)
* [Reordering](#reordering)
* [Column Menu](#column-menu)
* [State Management](#state-management)
* [Locked columns](#locked-columns)
* [Keyboard navigation](#keyboard-navigation)


### Width

The `Width` paramter of a multi-column header is ignored, its width depends on the sum of the widths for its child columns.


### Sorting, Filtering, Grouping, Editing

These functionalities do not work on a multi-column header column, but only on the actual child columns.

The column used for the multiple column header serves for presentation purposes only. It does not use the `Field` parameter and cannot perform data source operations such as filtering, sorting, grouping, editing, because they would span several fields and that is not possible.

Individual columns under a shared group header can be sorted, filtered, grouped and edited as usual.


### Resizing

Multi-column headers can be resized and resizing is similar to standard columns.

Individual columns under a shared group header can be resized as well.

The `Resizable` parameter is honored for both individual columns and column group headers.


### Reordering

Column reordering works according to the following rules:

* Root multi-header columns can be reordered with other root multi-header columns.
    * Reordering a group of columns moves all its child columns as well.
* Individual columns can be reordered within their parent group only.
    * Child columns of different parent columns (and/or on different levels) cannot be reordered.

The `Reordable` parameter is honored for both individual columns and column group headers.


### Column Menu

A multi-header column does not show up in the list of columns in the column chooser of individual columns from the last level. If you hide all child columns, the parent column will also hide.


### State Management

The state of a multi-header column is handled in the same way as a standard column. The columns in the state are listed in a flat list in the order of definition. For example, for the following setup:

````CSHTML
<TelerikGrid>
    <GridColumns>
        <GridColumn Title="column 1">
            <Columns>
                <GridColumn Title="column 1.1" />
                <GridColumn Title="column 1.2" />
            </Columns>
        </GridColumn>

        <GridColumn Title="column 2"></GridColumn>
    </GridColumns>
</TelerikGrid>
````

The State will be:

| Column state index | Column     |
|--------------------|------------|
| 0                  | column 1   |
| 1                  | column 1.1 |
| 2                  | column 1.2 |
| 3                  | column 2   |

Note that this order is different than the order in which the blazor framework initializes the column components, its goal is to be similar to a human-readable order that matches the column definition.


### Locked columns

You can lock an entire multi-column header through its `Locked` parameter. Doing so will lock all its child columns.

Therefore, we advise that you do not set `Locked=false` for child columns of locked parent columns, and you can consider setting `Lockable=false` on them to prevent the user from unpinning them and getting sub-optimal layout. Setting `Locked=true` for a child column is not supported.


### Keyboard navigation

The keyboard navigation in the multi-column headers follows the functionality of Excel.

#end
