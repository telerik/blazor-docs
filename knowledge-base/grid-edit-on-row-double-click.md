---
title: Edit a row on click or double-click with a popup form
description: How to edit a row on click or double-click with a popup form
type: how-to
page_title: Edit a row on click or double-click with a popup form
slug: grid-edit-row-click
position: 
tags: 
ticketid: 1443681
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

I would like to edit a row in the Grid when the user clicks or double-clicks on it, instead of using the command buttons.

## Solution

The Grid exposes two events that allows you to respond to the user clicking on its rows - [OnRowClick]({%slug grid-events%}#onrowclick) and [OnRowDoubleClick]({%slug grid-events%}#onrowdoubleclick). You can use either one of them together with the [Window]({%slug components/window/overview%}) to create a custom popup form on a click of a row. 

>caption Use the OnRowDoubleClick event to put the Grid in Edit mode


````InlineMode
@* Click on a Grid row twice to place the Grid in edit mode *@ 

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Inline" Pageable="true" @ref="@GridRef"
             OnUpdate="@UpdateHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler"
             OnRowDoubleClick="@OnRowDoubleClickHandler">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    TelerikGrid<SampleData> GridRef { get; set; }

    private async void OnRowDoubleClickHandler(GridRowClickEventArgs args)
    {
        SampleData clickedItem = args.Item as SampleData;
        var currentState = GridRef.GetState();

        currentState.InsertedItem = null;

        SampleData itemToEdit = SampleData.GetClonedInstance(MyData.Where(x => x.ID == clickedItem.ID).FirstOrDefault());

        currentState.OriginalEditItem = itemToEdit;

        await GridRef.SetState(currentState);
    }


    // Sample CRUD operations and data follow

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service
        await MyService.Update(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Delete(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        await MyService.Create(item);

        // update the local view-model data with the service data
        await GetGridData();
    }

    // Sample class definition - note the constructors, overrides and comments

    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }

        // example of comparing stored items (from editing or selection)
        // with items from the current data source - IDs are used instead of the default references
        public override bool Equals(object obj)
        {
            if (obj is SampleData)
            {
                return this.ID == (obj as SampleData).ID;
            }
            return false;
        }


        // define constructors and a static method so we can deep clone instances
        // we use that to define the edited item - otherwise the references will point
        // to the item in the grid data sources and all changes will happen immediately on
        // the Data collection, and we don't want that - so we need a deep clone with its own reference
        // this is just one way to implement this, you can do it in a different way
        public SampleData()
        {

        }

        public SampleData(SampleData itmToClone)
        {
            this.ID = itmToClone.ID;
            this.Name = itmToClone.Name;
        }

        public static SampleData GetClonedInstance(SampleData itmToClone)
        {
            return new SampleData(itmToClone);
        }
    }

    public List<SampleData> MyData { get; set; }

    async Task GetGridData()
    {
        MyData = await MyService.Read();
    }

    protected override async Task OnInitializedAsync()
    {
        await GetGridData();
    }

    // the following static class mimics an actual data service that handles the actual data source
    // replace it with your actual service through the DI, this only mimics how the API can look like and works for this standalone page
    public static class MyService
    {
        private static List<SampleData> _data { get; set; } = new List<SampleData>();

        public static async Task Create(SampleData itemToInsert)
        {
            itemToInsert.ID = _data.Count + 1;
            _data.Insert(0, itemToInsert);
        }

        public static async Task<List<SampleData>> Read()
        {
            if (_data.Count < 1)
            {
                for (int i = 1; i < 50; i++)
                {
                    _data.Add(new SampleData()
                    {
                        ID = i,
                        Name = "Name " + i.ToString()
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

        public static async Task Delete(SampleData itemToDelete)
        {
            _data.Remove(itemToDelete);
        }
    }
}
````
````PopupMode
@* Click on a Grid row twice to see the custom popup edit form *@ 

<TelerikGrid Data="@MyData"
             Height="400px"
             Width="700px"
             Pageable="true"
             OnRowDoubleClick="@OnRowDoubleClickHandler">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="120px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

<TelerikWindow @bind-Visible="@isInEdit" Modal="true">
    <WindowTitle>
        Edit record
    </WindowTitle>
    <WindowContent>
        <TelerikForm Model="@EditedEmployee"
                     Columns="2"
                     ColumnSpacing="30px"
                     OnValidSubmit="@SaveEmployee">
            <FormButtons>
                <TelerikButton ButtonType="@ButtonType.Submit" Primary="true">Submit</TelerikButton>
                <TelerikButton ButtonType="ButtonType.Button" OnClick="@ClearButton">Clear</TelerikButton>
            </FormButtons>
        </TelerikForm>
    </WindowContent>
</TelerikWindow>

@code {
    private SampleData EditedEmployee = new SampleData();
    private SampleData OriginalEditedEmployee = new SampleData();

    private bool isInEdit { get; set; }

    void OnRowDoubleClickHandler(GridRowClickEventArgs args)
    {
        //open the edit window
        isInEdit = true;

        var model = args.Item as SampleData;

        OriginalEditedEmployee = model;

        EditedEmployee = new SampleData() 
        {
            Id = OriginalEditedEmployee.Id,
            Name = OriginalEditedEmployee.Name,
            Team = OriginalEditedEmployee.Team,
            HireDate = OriginalEditedEmployee.HireDate
        };
    }

    private void SaveEmployee()
    {
        //call the Update service here

        var foundEmployeeIndex = MyData.FindIndex(x => x.Id == EditedEmployee.Id);

        if (foundEmployeeIndex >= 0)
        {
            MyData[foundEmployeeIndex] = EditedEmployee;
        }

        MyData = new List<SampleData>(MyData);

        //Hide the editing window

        isInEdit = false;
    }

    private void ClearButton()
    {
        EditedEmployee = OriginalEditedEmployee = null;

        isInEdit = false;
    }

    public List<SampleData> MyData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````
