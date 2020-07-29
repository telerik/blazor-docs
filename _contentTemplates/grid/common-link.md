#async-events-link
>tip The grid events can be async. The example below shows synchronous versions for brevity. You can find the async signatures in the [CRUD Operations Overview](overview) article.
#end


#rowclick-args
The `GridRowClickEventArgs` class exposes an `EventArgs` property. It maps to `MouseEventArgs` or `KeyboardEventArgs` depending on the user's action (clicking the row with the mouse/tapping it on a touch device, or pressing `Enter` when the row is focused). You can use the event arguments to determine the keyboard key or the position of the mouse cursor when the user took an action.

>caption Use the EventArgs to determine if the user clicked from the mouse/tapped on a touch device or the keyboard

````CSHTML

<TelerikGrid Data="@MyData"
             Pageable="true"
             PageSize="6"
             OnRowClick="@OnRowClickHandler"
             Navigable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

<br />

@logger

@code {
    void OnRowClickHandler(GridRowClickEventArgs args)
    {
        SampleData model = args.Item as SampleData;

        if (args.EventArgs is KeyboardEventArgs keyboardEventArgs)
        {
            logger = $"The user clicked {keyboardEventArgs.Key} on row {model.Name}";
        }
        else if(args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            logger = $"The user clicked {mouseEventArgs.ClientX} {mouseEventArgs.ClientY} on row {model.Name}";
        }
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public string logger { get; set; } = String.Empty;


    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

#end

