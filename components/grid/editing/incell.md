---
title: InCell Editing
page_title: Grid - InCell Editing
description: In-cell editing of data in Grid for Blazor.
slug: components/grid/editing/incell
tags: telerik,blazor,grid,in cell,editing
published: True
position: 4
---

# Grid InCell Editing

In Cell editing allows the user to click the cell and type the new value. When they remove focus from the input, the `OnUpdate` event fires, where the data-access logic can move it to the actual data source.

Sections in this article:
* [Basics](#basics)
* [Notes](#notes)

## Basics

You can handle the `OnUpdate`, `OnCreate` and `OnDelete` events to perform the CUD operations, as shown in the example below. To add a new item, you must also add a [command column]({%slug components/grid/columns/command%}) with a `Save` command and a [toolbar]({%slug components/grid/features/toolbar%}) with an `Add` command. `OnCreate` will fire immediately when you click the `Add` button, see the [Notes](#notes) below.



To enable InCell editing mode, set the `EditMode` property of the grid to `Telerik.Blazor.GridEditMode.Incell`, then handle the CRUD events as shown in the example below.


>caption Values are set in the model as soon as the user finishes editing a field, and you can receive them through the grid events (see the code comments for details)

````CSHTML
Click a cell, edit it and click outside of the cell to see the change.
<br />
<strong>Editing is prevented for the first two items.</strong>

<TelerikGrid Data=@MyData EditMode="@GridEditMode.Incell" Pageable="true" Height="500px"
             OnUpdate="@UpdateHandler" OnEdit="@EditHandler" OnDelete="@DeleteHandler" OnCreate="@CreateHandler">
    <GridToolBar>
        <GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
    </GridToolBar>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="delete">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    void EditHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // prevent opening for edit based on condition
        if (item.ID < 3)
        {
            args.IsCancelled = true;// the general approach for cancelling an event
        }

        Console.WriteLine("Edit event is fired for column " + args.Field);
    }

    async Task UpdateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operations here through your service
        SampleData updatedItem = await ServiceMimicUpdate(item);

        // update the local view-model data
        var index = MyData.FindIndex(i => i.ID == updatedItem.ID);
        if (index != -1)
        {
            MyData[index] = updatedItem;
        }

        Console.WriteLine("Update event is fired.");
    }

    async Task DeleteHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        bool isDeleted = await ServiceMimicDelete(item);

        if (isDeleted)
        {
            // update the local view-model data
            MyData.Remove(item);
        }

        Console.WriteLine("Delete event is fired.");
    }

    async Task CreateHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        // perform actual data source operation here through your service
        SampleData insertedItem = await ServiceMimicInsert(item);

        // update the local view-model data
        MyData.Insert(0, insertedItem);

        Console.WriteLine("Create event is fired.");
    }


    // the following three methods mimic an actual data service that handles the actual data source
    // you can see about implement error and exception handling, determining suitable return types as per your needs
    // an example is available here: https://github.com/telerik/blazor-ui/tree/master/grid/remote-validation

    async Task<SampleData> ServiceMimicInsert(SampleData itemToInsert)
    {
        // in this example, we just populate the fields, you project may use
        // something else or generate the updated item differently
        SampleData updatedItem = new SampleData()
        {
            // the service assigns an ID, in this sample we use only the view-model data for simplicity,
            // you should use the actual data and set the properties as necessary (e.g., generate nested fields data and so on)
            ID = MyData.Count + 1,
            Name = itemToInsert.Name
        };
        return await Task.FromResult(updatedItem);
    }

    async Task<SampleData> ServiceMimicUpdate(SampleData itemToUpdate)
    {
        // in this example, we just populate the fields, you project may use
        // something else or generate the updated item differently
        SampleData updatedItem = new SampleData()
        {
            ID = itemToUpdate.ID,
            Name = itemToUpdate.Name
        };
        return await Task.FromResult(updatedItem);
    }

    async Task<bool> ServiceMimicDelete(SampleData itemToDelete)
    {
        return await Task.FromResult(true);//always successful
    }


    // in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public List<SampleData> MyData { get; set; }

    protected override void OnInitialized()
    {
        MyData = new List<SampleData>();

        for (int i = 1; i < 50; i++)
        {
            MyData.Add(new SampleData()
            {
                ID = i,
                Name = "Name " + i.ToString()
            });
        }
    }
}
````

>caption The result from the code snippet above, after the user clicks in the Name column of the fifth row

![](images/incell-editing.png)



## Notes

* The `OnCreate` event will fire as soon as you click the `Add` button so you can add the new row to the grid `Data` - this will let it show up in the grid, and then enter edit mode for the first editable column (to fire `OnEdit` and let the user alter the column). This means you should have [default values]({%slug grid-kb-default-value-for-new-row%}) that satisfy any initial validation and requirements your models may have.

    * This means that there is no actual inserted item, an item in InCell editing is always in Edit mode, never in Insert mode. Thus, you cannot use the `InsertedItem` field of the grid State. If you want to insert items programmatically in the grid, alter the `Data` collection, and use the `OriginalEditItem` feature of the state (see the [Initiate Editing or Inserting of an Item]({%slug grid-state%}#initiate-editing-or-inserting-of-an-item) example - it can put the InLine and PopUp edit modes in Insert mode, but this cannot work for InCell editing).

* When the InCell Edit Mode is enabled and you want to enable item selection a `<GridCheckboxColumn />` must be added to the `<Columns>` collection. More information on that can be read in the [Selection]({%slug components/grid/selection/overview%}#notes) article.

    * To see how to select the row that is being edited in InCell edit mode without using a `<GridCheckboxColumn />` check out the [Row Selection in Edit with InCell EditMode]({%slug grid-kb-row-select-incell-edit%}) Knowledge Base article.

* It is up to the data access logic to save the data once it is changed in the data collection. The example above showcases when that happens and adds some code to provide a visual indication of the change. In a real application, the code for handling data updates may be entirely different.

* The `OnCancel` event and the `Cancel` command button are not supported in InCell editing mode. Clicking outside the currently edited cell will trigger the `OnUpdate` event and thus, clicking on the `Cancel` command button will not fire the `OnCancel` event.

* When using an [editor template]({%slug components/grid/features/templates%}#edit-template), the grid cannot always know what the custom editor needs to do, and when it needs to close the cell and update the data, because this is up to the editor. Thus, you can use the grid [state]({%slug grid-state%}) to close the cell and invoke the desired operations on the data according to your business logic. For example, a suitable event the Telerik input components provide is `OnChange`.
    * When keyboard navigation is enabled in the grid (`Navigable=true`), the grid will capture `Enter` keypresses when the cell is focused, and will close the cell with the corresponding update. You can either use that (e.g., a simple input will let the keypress event propagate to the grid cell), or you can prevent the event propagation and use only your business logic.
    
    The example below shows how you can use both a navigable grid and events on the custom editor templates to close the cells when Enter is pressed or when they lose focus, much like an Excel spreadsheet behaves.
    
    **.razor**
    
        @* The Telerik-specific OnChange event is used to achieve this in this example.
        You can implement a similar event in your components/editors, or use a completely different event and logic to instruct the grid to update a cell. In this example, the two-way binding
        provides the editor value to the model immediately, so it becomes avaialable in the OnChange
        handler. In your case you might need to handle this differently, depending on the logic you need.
        *@
        
        <TelerikGrid @ref="@Grid"
                     Data=@MyData
                     EditMode="@GridEditMode.Incell"
                     Pageable="true"
                     Height="500px"
                     OnUpdate="@UpdateHandler" OnCreate="@CreateHandler">
            <GridColumns>
                <GridColumn Field=@nameof(SampleData.ID) Editable="false" Title="ID" />
                <GridColumn Field=@nameof(SampleData.Name) Title="Name">
                    <EditorTemplate>
                        @{
                            currentItem = context as SampleData;
                            <TelerikTextBox @bind-Value=@currentItem.Name OnChange="@CloseEditor" Width="100%" />
                        }
                    </EditorTemplate>
                </GridColumn>
                <GridColumn Field=@nameof(SampleData.Ranking) Title="Ranking" Width="120px">
                    <EditorTemplate>
                        @{
                            currentItem = context as SampleData;
                            <TelerikNumericTextBox @bind-Value=@currentItem.Ranking OnChange="@CloseEditor"
                                                   Width="100%" Max="10" Min="0" Step="1">
                            </TelerikNumericTextBox>
                        }
                    </EditorTemplate>
                </GridColumn>
                <GridColumn Field=@nameof(SampleData.Role) Title="Position" Width="200px">
                    <EditorTemplate>
                        @{
                            currentItem = context as SampleData;
                            <TelerikDropDownList Data="@Roles" @bind-Value="@currentItem.Role" OnChange="@CloseEditor"
                                                 Width="120px" PopupHeight="auto">
                            </TelerikDropDownList>
                        }
                    </EditorTemplate>
                </GridColumn>
                <GridCommandColumn>
                    <GridCommandButton Command="Save" Icon="save" ShowInEdit="true">Save</GridCommandButton>
                </GridCommandColumn>
            </GridColumns>
            <GridToolBar>
                <GridCommandButton Command="Add" Icon="add">Add Employee</GridCommandButton>
            </GridToolBar>
        </TelerikGrid>
        
        @code {
            // handling the custom editor template for InCell editing
            public TelerikGrid<SampleData> Grid { get; set; }
            public SampleData currentItem { get; set; }
        
            async Task CloseEditor()
            {
                var state = Grid?.GetState();
        
                if (currentItem.ID == 0 && state.InsertedItem != null)
                {
                    // insert operation - the item is new
                    await CreateHandler(new GridCommandEventArgs()
                    {
                        Item = state.InsertedItem
                    });
                }
                else
                if (currentItem.ID > 0 && state.EditItem != null)
                {
                    // edit operation on an existing item
                    await UpdateHandler(new GridCommandEventArgs()
                    {
                        Item = state.EditItem,
                        Field = state.EditField
                    });
                }
        
                state.InsertedItem = state.OriginalEditItem = state.EditItem = default;
        
                await Task.Delay(20); // let the grid re-render and close the cell if keyboard navigation is enabled
        
                await Grid?.SetState(state);
            }
        
            //Create and Update operations
        
            async Task UpdateHandler(GridCommandEventArgs args)
            {
                SampleData item = (SampleData)args.Item;
        
                var index = MyData.FindIndex(i => i.ID == item.ID);
                if (index != -1)
                {
                    // with keyboard navigation and Enter key press in the component
                    // both the grid, and the OnChange handler will raise the update event
                    // you may want to add an equality comparison for the item to only call the database once
                    // when the item has changed, not both times
                    if (!MyData[index].Equals(item))
                    {
                        MyData[index] = item;
                        Console.WriteLine("update");
                        //perform actual data source operations here
                    }
                }
            }
        
            async Task CreateHandler(GridCommandEventArgs args)
            {
                SampleData item = (SampleData)args.Item;
        
                item.ID = MyData.Count + 1;
                MyData.Insert(0, item);
        
                Console.WriteLine("create");
                // perform actual data source operation here through your service
            }
        
            // data sources
        
            protected override void OnInitialized()
            {
                MyData = new List<SampleData>();
        
                for (int i = 1; i < 50; i++)
                {
                    MyData.Add(new SampleData()
                    {
                        ID = i,
                        Name = "name " + i,
                        Ranking = i % 10
                    });
                }
            }
        
            public class SampleData
            {
                public int ID { get; set; }
                public string Name { get; set; }
                public string Role { get; set; }
                public int Ranking { get; set; }
        
                public override bool Equals(object obj)
                {
                    if (obj != null && obj is SampleData)
                    {
                        SampleData curr = obj as SampleData;
                        return (ID == curr.ID) && (Name == curr.Name) && (Role == curr.Role) && (Ranking == curr.Ranking);
                    }
                    return false;
                }
            }
        
            List<SampleData> MyData { get; set; }
            static List<string> Roles = new List<string> { "Manager", "Employee", "Contractor" };
        }


## See Also

  * [Live Demo: Grid InCell Editing](https://demos.telerik.com/blazor-ui/grid/editing-incell)
  * [Grid Selection Documentation]({%slug components/grid/selection/overview%})
