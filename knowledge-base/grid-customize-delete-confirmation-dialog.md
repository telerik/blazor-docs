---
title: Customize the Delete Confirmation Dialog
description: How to customize the Delete Confirmation Dialog? 
type: how-to
page_title: Customize the Delete Confirmation Dialogs
slug: grid-kb-customize-delete-confirmation-dialog
position: 
tags: grid, customize, delete, confirmation, dialog, message
ticketid: 1553006
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor <br/> TreeList for Blazor <br/> Scheduler for Blazor </td>
		</tr>	
	</tbody>
</table>


## Description

How to customize the built-in Delete Confirmation Dialog of the Grid?

I want to add some item details to the text of the Delete Confirmation Dialog to notify the user for the item they are trying to delete. How to achieve that?

How to change the text of the buttons in the Delete Confirmation Dialog?

How to change the title and the content of the Delete Confirmation Dialog?

## Solution

The built-in Delete Confirmation Dialog requires minimum effort and code. It only needs the `ConfirmDelete` parameter of the Grid to be `true`. Thus, the dialog itself does not provide customization options. However, there are several ways to achieve a custom Delete Confirmation Dialog.

This article lists several samples for the Grid component. The suggested solutions, however, are applicable for the Treelist and Scheduler components, too.

You can use:

* [Localization](#localization) - this approach is useful if you just want to change the text of the built-in Delete Confirmation Dialog elements. It does not allow adding item details to the dialog text.
* [Predefined Dialog Component](#predefined-dialog-component) - this option is useful if you want to just change the dialog text and include some details for the item the user tries to delete (for example, record name).
* [Dialog Component](#dialog-component) - this solution allows you to fully customize the rendering and appearance of the dialog. You may add any desired content there, be that custom text, HTML elements or other components.


### Localization

You can enable [Localization]({%slug globalization-localization%}) in your application and provide the desired custom text for the corresponding element keys.

The keys for the elements of the built-in Delete Confirmation Dialog are:

| Element | Key |
| --- | --- |
| Title | `Grid_ConfirmDeleteTitle` |
| Text | `Grid_ConfirmDeleteText` |
| OK button | `Grid_ConfirmDeleteOk` |
| Cancel button | `Grid_ConfirmDeleteCancel` |

>tip The keys for the Treelist and Scheduler components are the same, just change the component name before the `_` symbol.

### Predefined Dialog Component

Use [Predefined Confirm Dialog]({%slug dialog-predefined%}#confirm) with the desired custom text. Additionally, you may get the details for the current item and add them to the text:

* Handle the [`OnDelete`]({%slug grid-events%}#cud-events) event of the Grid
* Display the Predefined Dialog in the `OnDelete` handler
* Cancel the event or proceed with the `OnDelete` logic depending on the user choice

````CSHTML
<TelerikGrid Data=@GridData
             EditMode="@GridEditMode.Inline"
             Pageable="true"
             OnDelete="@DeleteHandler">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>            
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleData> GridData { get; set; }

    [CascadingParameter]
    public DialogFactory Dialogs { get; set; }

    private bool confirmDelete { get; set; }

    private async Task DeleteHandler(GridCommandEventArgs args)
    {
        SampleData item = (SampleData)args.Item;

        //show dialog and use a bool to save its result
        confirmDelete = await Dialogs.ConfirmAsync($"Are you sure you want to delete {item.Name}?", "Please confirm!");

        //cancel the delete if the user did not confirm
        if (!confirmDelete)
        {
            args.IsCancelled = true;
        }
        //delete the item if the user confirms
        else
        {
            GridData.Remove(item);
        }
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = new List<SampleData>();

        for (int i = 0; i < 50; i++)
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

Using the [Dialog component]({%slug dialog-overview%}) will let you have fully customized Delete Confirmation Dialog. To handle the scenario:

* Declare a Dialog instance and add the desired content and buttons there. Normally, you would need at least two buttons - for confirmation and cancelling the delete operation.
* Handle the [`OnDelete`]({%slug grid-events%}#cud-events) event of the Grid to cancel the built-in delete, show the custom Dialog and get the current item (save the current item, so you can then use its details in the dialog if needed).
* Handle the Dialog button clicks: 
	* Proceed with the item deletion in the Confirm button click handler. 
	* Hide the Dialog on Cancel.

````CSHTML
<TelerikGrid @ref="@GridRef"
             Data=@GridData
             EditMode="@GridEditMode.Inline"
             Pageable="true"
             OnDelete="@DeleteHandler">
    <GridColumns>
        <GridColumn Field=@nameof(SampleData.ID) Title="ID" Editable="false" />
        <GridColumn Field=@nameof(SampleData.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<TelerikDialog @bind-Visible="@DialogVisible"
               Title="@Title">
    <DialogContent>
        Are you sure you want to delete item with name: @CurrentItem.Name?
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@DeleteItemFromDialog" ThemeColor="primary">Delete</TelerikButton>
        <TelerikButton OnClick="@(() => { DialogVisible = false; })">Cancel</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private List<SampleData> GridData { get; set; }

    private TelerikGrid<SampleData> GridRef;

    private bool DialogVisible { get; set; }

    private string Title { get; set; } = "Custom delete confirmation";

    private SampleData CurrentItem { get; set; }

    private async Task DeleteHandler(GridCommandEventArgs args)
    {
        //get the current item from the args
        CurrentItem = (SampleData)args.Item;

        //cancel the built-in delete as you will handle the deletion in the dialog button click handler
        args.IsCancelled = true;

        //show the dialog
        DialogVisible = true;

        //if needed, you can also customize the title to contain item details
        Title = "Custom title for " + CurrentItem.Name;
    }

    private async Task DeleteItemFromDialog()
    {
        //delete the item
        GridData.Remove(CurrentItem);

        //refresh the Grid data
        GridRef.Rebind();

        //hide the dialog
        DialogVisible = false;
    }

    protected override async Task OnInitializedAsync()
    {
        GridData = new List<SampleData>();

        for (int i = 0; i < 50; i++)
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
