#set-sort-from-code
@using Telerik.DataSource;

<TelerikButton Primary="true" OnClick="@SetGridSort">set sort from code</TelerikButton>

<TelerikGrid Data="@MyData" Height="400px" @ref="@Grid"
             Pageable="true" Sortable="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

@code {
    public TelerikGridBase<SampleData> Grid { get; set; }

    async Task SetGridSort()
    {
        GridState<SampleData> desiredState = new GridState<SampleData>()
        {
            SortDescriptors = new List<SortDescriptor>()
            {
                new SortDescriptor { Member = "Id", SortDirection = ListSortDirection.Descending }
            }
        };

        await Grid.SetState(desiredState);
    }

    public IEnumerable<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
#end



