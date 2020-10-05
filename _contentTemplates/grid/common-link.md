#async-events-link
>tip The grid events can be async. The example below shows synchronous versions for brevity. You can find the async signatures in the [CRUD Operations Overview](overview) article.
#end


#rowclick-args

The `GridRowClickEventArgs` class exposes an `EventArgs` property. It maps to `MouseEventArgs` or `KeyboardEventArgs` depending on the user's action (clicking the row with the mouse/tapping it on a touch device, or pressing `Enter` when the row is focused). You can use the event arguments to determine the keyboard key or the position of the mouse cursor when the user took an action.

#end

#rowclick-args-example

        if (args.EventArgs is KeyboardEventArgs keyboardEventArgs)
        {
            Console.WriteLine($"The user clicked {keyboardEventArgs.Key} on row {model.Name}");
        }
        else if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            Console.WriteLine($"The user clicked {mouseEventArgs.ClientX} {mouseEventArgs.ClientY} on row {model.Name}");
        }

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
#end


