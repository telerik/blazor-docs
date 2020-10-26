---
title: Command Column
page_title: Grid - Command Column
description: Command buttons per row in Grid for Blazor.
slug: components/grid/columns/command
tags: telerik,blazor,grid,column,command
published: True
position: 1
---

# Grid Command Column

The command column of a grid allows you to initiate [inline]({%slug components/grid/editing/inline%}) or [popup]({%slug components/grid/editing/popup%}) editing, or to execute your own commands.

To define it, add a `GridCommandColumn` in the `GridColumns` collection of a grid. The command column takes a collection of `GridCommandButton` instances that invoke the commands. It also offers the `Title` property so you can set its header text.

>tip The lists below showcase the available features and their use. After them you can find a code example that shows declarations and handling.

The `GridCommandButton` tag offers the following features:

* `Command` - the command that will be invoked. Can be one of the built-in commands (see below), or a custom command name.
* `OnClick` - the event handler that the button will fire. If used on a built-in command, this handler will fire before the [corresponding CRUD event]({%slug components/grid/editing/overview%}). Cancelling it will prevent the built-in CRUD event from firing.
* `ShowInEdit` - a boolean property indicating whether the button is only visible while the user is editing/inserting data.
* `ChildContent` - the text the button will render. You can also place it between the command button's opening and closing tags.
* Appearance properties like `Icon`, `Class`, `Enabled` that are come from the underlying [Button Component features]({%slug components/button/overview%}).

There are four built-in commands:

* `Add` - initiates the creation of a new item.
* `Edit` - initiates the inline or popup editing (depending on the GridEditMode configuration of the grid).
* `Save` - performs the actual update operation after the data has been changed. Triggers the `OnUpdate` or `OnCreate` event so you can perform the data source operation. Which event is triggered depends on whether the item was created or edited.
* `Cancel` - aborts the current operation (edit or insert).

The `OnClick` handler of the commands receives an argument of type `GridCommandEventArgs` that exposes the following properties:

* `IsCancelled` - set this to true to prevent the operation if the business logic requires it.
* `Item` - the model item the grid row is bound to. You can use it to access the model fields and methods in order to preform the actual data source operations. Applicable for buttons in a row, not in a toolbar.
* `IsNew` - a boolean field indicating whether the item was just added through the grid interface.

>tip For handling CRUD operations we recommend that you use the grid events (`OnEdit`, `OnUpdate`, `OnCancel`, `OnCreate`). The `OnClick` handler is available for the built-in commands to provide consistency of the API.

>tip The event handlers use `EventCallback` and can be synchronous or async. This example shows async versions, and the signature for the synchronous handlers is `void MyHandlerName(GridCommandEventArgs args)`.

>caption Example of handling custom commands in a grid column

````CSHTML
@* This sample showcases custom command handling for:
    - the built-in Save command that prevents it based on some condition (Name contains "3")
    - a custom command for a row
*@

@CustomCommandResult

<TelerikGrid Data=@GridData EditMode="@GridEditMode.Inline" OnUpdate="@MyUpdateHandler"
             Pageable="true" PageSize="15" Height="500px">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Editable="false" Title="Employee ID" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Employee Name" />
        <GridColumn Field=@nameof(SampleData.HireDate) Title="Hire Date" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
            <GridCommandButton Command="Save" Icon="save" ShowInEdit="true" OnClick="@CustomSaveClick">Update</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="cancel" ShowInEdit="true">Cancel</GridCommandButton>
            <GridCommandButton Command="MyOwnCommand" Icon="information" ShowInEdit="false" OnClick="@MyCustomCommandHandler">My Command</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    //in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime HireDate { get; set; }
    }

    List<SampleData> GridData = Enumerable.Range(1, 50).Select(x => new SampleData
    {
        ID = x,
        Name = "name " + x,
        HireDate = DateTime.Now.AddDays(-x)
    }).ToList();

    // sample custom commands handling

    async Task CustomSaveClick(GridCommandEventArgs e)
    {
        SampleData theUpdatedItem = e.Item as SampleData;
        // any custom logic
        if (theUpdatedItem.Name.Contains("3"))
        {
            // prevent the operation based on a condition. Will prevent the OnUpdate event from firing
            CustomCommandResult = new MarkupString(CustomCommandResult + "<br />Update Click fired. Custom logic prevent it from continuing.");
            e.IsCancelled = true;
        }
    }

    MarkupString CustomCommandResult;
    async Task MyCustomCommandHandler(GridCommandEventArgs args)
    {
        CustomCommandResult = new MarkupString(CustomCommandResult + string.Format("<br />Custom command triggered for item {0}", (args.Item as SampleData).ID));

        Console.WriteLine("The Custom command fired. Please wait for the long operation to finish");

    }

    // sample CUD operations

    private async Task MyUpdateHandler(GridCommandEventArgs args)
    {
        SampleData theUpdatedItem = args.Item as SampleData;
        SampleData updatedItem = await ServiceMimicUpdate(theUpdatedItem);

        // update the local view-model data
        var index = GridData.FindIndex(i => i.ID == updatedItem.ID);
        if (index != -1)
        {
            GridData[index] = updatedItem;
        }
    }

    // the following method mimics an actual data service that handles the actual data source
    // you can see about implement error and exception handling, determining suitable return types as per your needs
    // an example is available here: https://github.com/telerik/blazor-ui/tree/master/grid/remote-validation

    async Task<SampleData> ServiceMimicUpdate(SampleData itemToUpdate)
    {
        // in this example, we just populate the fields, you project may use
        // something else or generate the updated item differently
        SampleData updatedItem = new SampleData()
        {
            ID = itemToUpdate.ID,
            HireDate = itemToUpdate.HireDate,
            Name = itemToUpdate.Name
        };
        return await Task.FromResult(updatedItem);
    }
}
````

>caption The result from the code snippet above, after the custom command button was clicked on the first row, and after the user tried to edit the second row to put the number "3" in the Name column.

![](images/command-column-result.png)

## See Also

  * [Live Demo: Grid Command Column](https://demos.telerik.com/blazor-ui/grid/inlineediting)
