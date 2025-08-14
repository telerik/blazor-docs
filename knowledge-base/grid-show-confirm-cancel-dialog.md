---
title: Show Cancel Confirmation Dialog before proceeding with other data operations
description: How to prompt the user to confirm canceling the edit before proceeding with other data operations?
type: how-to
page_title: Show Cancel Confirmation Dialog before proceeding with other data operations
slug: grid-kb-show-confirm-cancel-dialog
position: 
tags: grid, edit, cancel, confirm, dialog
ticketid: 1552190
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor <br/> TreeList for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

Is there any way to show a cancel confirmation dialog when edit or insert operation is in progress and sorting/filtering/grouping option is initiated? For example, display a dialog with "Are you sure you want to cancel editing?" question and a confirmation button.

How to prompt the user to confirm canceling the edit/create before proceeding with other data operations(sort, filter, group etc.)?

## Solution

If the user performs another operation (such as sorting or filtering) while the Grid is in edit mode, then editing will be canceled. Check the last bullet in the [Editing Notes section](slug:grid-editing-overview#item-instances) for more details. The Grid `OnCancel` event will fire and you can handle it to display a Dialog to allow the user to choose whether they want to cancel the editing or not.

Telerik UI for Blazor provides predefined and custom Dialogs:

* [Predefined Confirm Dialog](#predefined-confirm-dialog) - this option is useful if you want to have a simple dialog with plain text a single confirmation button.

* [Dialog Component](#dialog-component) - this solution allows full control over the dialog content. You can add any custom text, HTML elements or other components.

This article lists samples for the Grid component. The suggested solutions, however, are applicable for the [TreeList](slug:treelist-overview), too.

### Predefined Confirm Dialog

Use [Predefined Confirm Dialog](slug:dialog-predefined#confirm) with the desired custom text. Additionally, you may get the details for the current item and add them to the text:

* Handle the [`OnCancel`](slug:grid-events#cud-events) event of the Grid
* Display the Predefined Dialog in the `OnCancel` handler
* Prevent the `OnCancel` event to keep the Grid in edit mode. This will cancel the other user action.

````RAZOR
@*Only OnCancel event is handled for brevity*@

@using System.ComponentModel.DataAnnotations @* for the validation attributes *@

<TelerikGrid Data=@GridData
             EditMode="@GridEditMode.Inline"
             Pageable="true"
             Sortable="true"
             Height="500px"
             OnCancel="@CancelHandler"
             ShowColumnMenu="true">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleData> GridData { get; set; }

    private bool CancelEdit { get; set; }

    private string Title { get; set; } = "Please confirm";

    [CascadingParameter]
    public DialogFactory Dialogs { get; set; }

    private async Task CancelHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        CancelEdit = await Dialogs.ConfirmAsync("Are you sure you want to cancel editing?", "Please confirm!");

        if (!CancelEdit)
        {
            //stop the Cancel event to allow the user continue editing
            args.IsCancelled = true;
        }
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = new List<SampleData>();

        for (int i = 1; i <= 50; i++)
        {
            GridData.Add(new SampleData()
                {
                    ID = i,
                    Name = "Name " + i.ToString()
                });
        }
    }

    // in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
````

### Dialog Component

Using the [Dialog component](slug:dialog-overview) will let you have fully customized confirmation Dialog. To handle the scenario:

* Declare a Dialog instance and add the desired content and buttons there. Normally, you would need at least one button - for confirmation of the cancel operation.
* Handle the [`OnCancel`](slug:grid-events#cud-events) event of the Grid to show the custom Dialog.
* Wait for the user choice to prevent or proceed with the cancel operation.
* Hide the Dialog.

````RAZOR
@*Only OnCancel event is handled for brevity*@

@using System.ComponentModel.DataAnnotations @* for the validation attributes *@

<TelerikGrid Data=@GridData
             EditMode="@GridEditMode.Inline"
             Pageable="true"
             Sortable="true"
             Height="500px"
             OnCancel="@CancelHandler"
             ShowColumnMenu="true">
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus">Add Employee</GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<TelerikDialog @bind-Visible="@DialogVisible"
               Title="@Title">
    <DialogContent>
        Are you sure you want to cancel the editing?
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@(() => CancelConfirmation(false))">No, continue edit</TelerikButton>
        <TelerikButton OnClick="@(() => CancelConfirmation(true))">Yes, cancel edit</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private List<SampleData> GridData { get; set; }

    private bool DialogVisible { get; set; }

    private string Title { get; set; } = "Please confirm";

    private bool? ContinueEdit { get; set; }

    private async Task CancelHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        //clean the value, so you can always get the updated one
        ContinueEdit = null;

        //show dialog
        DialogVisible = true;

        //wait for the user choice from the dialog handled in CancelConfirmation()
        while (!ContinueEdit.HasValue)
        {
            await Task.Delay(50);
        }

        //cancel the event if the user wants to continue editing
        args.IsCancelled = ContinueEdit.Value;
    }

    private async Task CancelConfirmation(bool CancelConfirmed)
    {
        if (CancelConfirmed)
        {
            //exit edit mode
            ContinueEdit = false;
        }
        else
        {
            //stop the cancel event and continue edit
            ContinueEdit = true;
        }

        //hide the dialog
        DialogVisible = false;
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = new List<SampleData>();

        for (int i = 1; i <= 50; i++)
        {
            GridData.Add(new SampleData()
                {
                    ID = i,
                    Name = "Name " + i.ToString()
                });
        }
    }

    // in a real case, keep the models in dedicated locations, this is just an easy to copy and see example
    public class SampleData
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
````

