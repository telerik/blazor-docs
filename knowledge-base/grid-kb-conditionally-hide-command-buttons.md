---
title: Conditionally Hiding Command Buttons in Grid for Blazor
description: Learn how to conditionally show or hide command buttons in a Blazor Grid based on row data values.
type: how-to
page_title: Dynamically Hiding Command Buttons in Blazor Grid Based on Row Values
slug: grid-kb-conditionally-hide-command-buttons
tags: grid,blazor,commandbutton,conditional,visibility,row
res_type: kb
ticketid: 1675338
---

## Description
In some scenarios, you might want to conditionally show or hide command buttons in a [Grid for Blazor](https://docs.telerik.com/blazor-ui/components/grid/overview) based on the data of the current row. For instance, you may want to display a delete button only for items that meet certain criteria. This article demonstrates how to achieve this behavior by using the context of the command column.

This knowledge base article also answers the following questions:
- How can I hide a GridCommandButton based on a row value in Blazor?
- What is the way to conditionally display command buttons in a Telerik Blazor Grid?
- Can I dynamically control the visibility of command buttons in a Grid for Blazor?

## Solution
To conditionally show or hide command buttons in a Grid for Blazor, use the context parameter of the `GridCommandColumn` to access the current row's data. Based on this data, you can conditionally render the command button.

````RAZOR
@CustomCommandResult

<TelerikGrid Data=@GridData EditMode="@GridEditMode.Inline" OnUpdate="@MyOnUpdateHandler"
             Pageable="true" PageSize="15" Height="500px">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Editable="false" Title="Employee ID" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
        <GridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
        <GridCommandColumn Context="dataItem">
            @{
                var item = (SampleData)dataItem;
            }
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true" OnClick="@CustomSaveOnClickHandler">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
            @if (item.ID % 2 == 0)
            {
                <GridCommandButton Command="MyOwnCommand" Icon="@SvgIcon.InfoCircle" ShowInEdit="false" OnClick="@MyCustomCommandOnClickHandler">My Command</GridCommandButton>
            }
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleData> GridData { get; set; }
    private MarkupString CustomCommandResult;
    
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

    private async Task CustomSaveOnClickHandler(GridCommandEventArgs args)
    {
        SampleData theUpdatedItem = args.Item as SampleData;
    }

    private async Task MyCustomCommandOnClickHandler(GridCommandEventArgs args)
    {
        CustomCommandResult = new MarkupString(CustomCommandResult + string.Format("<br />Custom command triggered for item {0}", (args.Item as SampleData).ID));
    }

    private async Task MyOnUpdateHandler(GridCommandEventArgs args)
    {
        SampleData theUpdatedItem = args.Item as SampleData;

        await MyService.Update(theUpdatedItem);

        await GetGridData();
    }

    private async Task GetGridData()
    {
        GridData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new SampleData()
                        {
                            ID = i,
                            Name = "name " + i,
                            HireDate = DateTime.Now.AddDays(-i)
                        });
                }
            }

            return await Task.FromResult(_data);
        }

        public static async Task Update(SampleData itemToUpdate)
        {
            var index = _data.FindIndex(i => i.ID == itemToUpdate.ID);
            if (index != -1)
            {
                _data[index] = itemToUpdate;
            }
        }
    }
}
````

### Note
If you prefer not to remove the button from the DOM but simply hide it, you can conditionally set the `Class` parameter of the `GridCommandButton` tag and utilize CSS to hide the button.

## See Also
- [Blazor Grid Overview](https://docs.telerik.com/blazor-ui/components/grid/overview)
- [Blazor Grid Command Column](https://docs.telerik.com/blazor-ui/components/grid/columns/command)
