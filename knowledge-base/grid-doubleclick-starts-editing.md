---
title: DoubleClick starts edit mode
description: Set a row in edit mode by double click on it.
type: how-to
page_title: OnRowDoubleClick starts edit mode
slug: 
position: 
tags: gird, double click, edit
ticketid: 1501079
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
Is there a way to start the edit command with a double click on a specific cell or row?

## Solution
The Grid currently supports an [OnRowDoubleClick event]({%slug grid-events%}#onrowdoubleclick) which can be used to programmatically set a row in edit mode through the Grid [state]({%slug grid-state%}). 

See the following example for reference:

````CSHTML
@*Use the OnRowDoubleClick event to set a row in edit mode*@ 

<TelerikGrid Data="@MyData"
             Height="400px"
             Pageable="true"
             OnRowDoubleClick="@OnRowDoubleClickHandler"
             EditMode="@GridEditMode.Inline"
             OnUpdate="@UpdateHandler"
             @ref="@GridRef">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Editable="false" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>


@code {
    public TelerikGrid<SampleData> GridRef { get; set; }

    void OnRowDoubleClickHandler(GridRowClickEventArgs args)
    {
        var updatedItem = args.Item as SampleData;
        EditItem(updatedItem);
    }

    void EditItem(SampleData item)
    {
        var currState = GridRef.GetState();
        currState.InsertedItem = null;
        currState.EditItem = null;
        currState.OriginalEditItem = null;

        SampleData itemToEdit = SampleData.GetClonedInstance(MyData.FirstOrDefault(x => x.Id == item.Id));

        currState.EditItem = itemToEdit;
        currState.OriginalEditItem = item;
        GridRef.SetState(currState);
    }

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData itemToUpdate = args.Item as SampleData;
        int itemIndex = MyData.IndexOf(itemToUpdate);
        if (itemIndex > -1)
        {
            MyData[itemIndex] = itemToUpdate;
        }
    }

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }

        // The new object we create for the state must be able to match an object from the current data
        public override bool Equals(object obj)
        {
            if (obj is SampleData)
            {
                return this.Id == (obj as SampleData).Id;
            }
            return false;
        }

        public SampleData()
        {

        }

        public SampleData(SampleData itmToClone)
        {
            this.Id = itmToClone.Id;
            this.Name = itmToClone.Name;
            Team = itmToClone.Team;
        }

        public static SampleData GetClonedInstance(SampleData itmToClone)
        {
            return new SampleData(itmToClone);
        }
    }
}
````


## Notes
When changing the grid state in its row click event, you need the event handler to be synchronous. At the time of writing, asynchronous calls in Grid events prevent you from updating the Grid state. It is a known issue, and we have it logged for improvement at the following [link](https://feedback.telerik.com/blazor/1486285-async-calls-in-grid-events-prevent-you-from-updating-the-grid-state) so you can Follow and Vote for it.
