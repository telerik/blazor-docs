---
title: Window Inside EditContext
description: Using an EditContext for a form holding a window requires updating the EditContext
type: troubleshooting
page_title: Propagating changes from inside a Window to the EditContext of its parent form
slug: window-in-form-edit-context
position: 
tags: 
ticketid: 1443151
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Window for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
The Window renders at the root of the app, which can put it out of the current context.

For example, when an `EditForm` uses an explicit `EditContext`, the data updates to the model that come from the `Window` will not update the `EditContext`.

A symptom is that `IsModified()` of the `EditContext` is not correct after changes happen in the Window.

## Solution
Call the `NotifyFieldChanged()` method of the `EditContext` to let it know it needs to update.

````CSHTML
@* The CascadingValue is just one sample way of passing the data around *@

<CascadingValue Value="@CurrentModel">
    <EditForm EditContext="@MyEditContext">

        <TelerikButton OnClick="@SaveData" Enabled="@SaveEnabled" Primary="true">Save</TelerikButton>
        <div>Edit Context Info:</div>
        <div>
            Modified: @MyEditContext.IsModified().ToString()
        </div>

        <div>MAIN FORM:</div>
        <div>
            Field 1: <InputText @bind-Value="@CurrentModel.Field1"></InputText>
            Field 2: <InputText @bind-Value="@CurrentModel.Field2"></InputText>
        </div>

        <TelerikButton OnClick="@OpenWin">Open Window</TelerikButton>

        <TelerikWindow Top="50px" Left="100px" Visible="@IsVisible">
            <WindowTitle>
                <strong>The Title</strong>
            </WindowTitle>
            <WindowActions>
                <WindowAction Name="Minimize" />
                <WindowAction Name="Maximize" />
                <WindowAction Name="Close" />
            </WindowActions>
            <WindowContent>
                <div>
                    <input @bind-value="@CurrentModel.Field1" />
                </div>
                <div>
                    <input @bind-value="@CurrentModel.Field2" />
                </div>
                <TelerikButton OnClick="@CloseWin">Close Window</TelerikButton>
            </WindowContent>
        </TelerikWindow>

    </EditForm>

    <div>
        <div>Log of changes to form context:</div>
        <textarea @bind="@Log" cols="100" rows="10"></textarea>
    </div>
</CascadingValue>

@code
{
    public class MyViewModel
    {
        public string Field1 { get; set; }
        public string Field2 { get; set; }
    }

    protected EditContext MyEditContext { get; set; }
    public MyViewModel CurrentModel = new MyViewModel() { Field1 = "foo", Field2 = "bar" };

    public string Log { get; set; }
    bool SaveEnabled { get; set; } = false;

    protected override void OnInitialized()
    {
        MyEditContext = new EditContext(CurrentModel);
        MyEditContext.OnFieldChanged += EditContext_OnFieldChanged;
    }

    private void EditContext_OnFieldChanged(object sender, FieldChangedEventArgs e)
    {
        // in this case, editing in the window will always log the same field name
        // regardless of what was actually changed. Te change that you will need to handle
        // individual events and maintain a list of changed fields yourself
        var x = e.FieldIdentifier.FieldName;
        Log += x + " changed." + "\n";

        // sample feature to warrant usage of EditContext in the first place
        // enabling a save button when the form is dirty
        SaveEnabled = MyEditContext.IsModified();

        StateHasChanged();
    }

    public bool IsVisible { get; set; } = false;

    public string SomeStuff1Local { get; set; }

    protected void OpenWin()
    {
        IsVisible = true;
    }

    protected void CloseWin()
    {
        IsVisible = false;
        var fieldid = MyEditContext.Field("Something");
        MyEditContext.NotifyFieldChanged(fieldid);
        // does not matter which field, any will do to update the EditContext

        // update the rest of the UI
        StateHasChanged();
    }

    protected void SaveData()
    {
        Log += "form saved." + "\n";
    }
}
````

## Notes

If the model has validation attached, updating the `EditContext` does not update the validation. At the time of writing, there does not seem to be API that can achieve this and calling `NotifyValidationStateChanged()` does not seem to have an effect, even though it might in future framework versions.

## See Also

[Changing data in a component with a window does not change the parent]({%slug window-does-not-update-parent%})
