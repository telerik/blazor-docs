---
title: Returning data from window does not update parent
description: how to ensure updating a model from within a window updates the parent
type: troubleshooting
page_title: Changing data in a component with a window does not change the parent
slug: window-does-not-update-parent
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
If you have a form and a component that hosts a Telerik Window, you may want to update the main form with data from the window. It may appear, however, that the date (or EditContext) on the main page does not get updated.

## Cause\Possible Cause(s)
The issue arises from the way UI re-rendering works. When the Window is in a separate component, UI updates only happen in that render tree, and not on the main component. 

The Window renders at the TelerikRootComponent to ensure proper positioning, and does not render in the place of declaration. Thus, its parent is not what you see as a markup structure.

## Solution
You need to invoke StateHasChanged() on the parent component in order to have the UI update. This is easily done by exposing an EventCallback from the component that hosts the Window, and handling that event in the parent component.

### Example

In this example we will have a model, a main component with a form, a second component that holds a Window. The data from the Window will travel to the main form.

>caption Model

````CS
public class MyViewModel
{
    public string Field1 { get; set; }
    public string Field2 { get; set; }
}
````

>caption Main form

````CSHTML
@* This does not have to be a form at all. The CascadingValue is just one way to pass data to child components *@

<EditForm Model="@MyModelInstance">
    <div>MAIN FORM, needs a StateHasChanged() or at least an EventCallback to trigger in its rendering tree:</div>
    <div>
        Field 1: <InputText @bind-Value="@MyModelInstance.Field1"></InputText>
        Field 2: <InputText @bind-Value="@MyModelInstance.Field2"></InputText>
    </div>

    <div>Component Containing Window:</div>
    <CascadingValue Value="@MyModelInstance">
        <SomeComponentWithWindow OnChanged="@UpdateThisComponent"></SomeComponentWithWindow>
    </CascadingValue>
</EditForm>


@code {
    public MyViewModel MyModelInstance = new MyViewModel() { Field1 = "foo", Field2 = "bar" };

    protected void UpdateThisComponent()
    {
        // this handler does not even have to do anything, but it must be called so it re-renders this component
    }
}
````

>caption Nested Component with Window

````CSHTML
@* simple markup to showcase when and how the UI updates in the different components *@

<div>
    <div>
        <TelerikButton OnClick="@OpenWin">Open Window</TelerikButton>
    </div>
    <div>
        <div>In component with the window, outside of window, changes immediately after you blur the inputs in the window:</div>
        Field 1:<InputText @bind-Value="@TheParentModel.Field1" />
        Field 2:<InputText @bind-Value="@TheParentModel.Field2" />
    </div>
</div>

<TelerikWindow @bind-Visible="@IsVisible">
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
            <input @bind-value="@TheParentModel.Field1" />
        </div>
        <div>
            <input @bind-value="@TheParentModel.Field2" />
        </div>
        <TelerikButton OnClick="@CloseWin">Close Window and update parent</TelerikButton>
    </WindowContent>
</TelerikWindow>

@code {
    [CascadingParameter] public MyViewModel TheParentModel { get; set; }

    [Parameter] public EventCallback<string> OnChanged { get; set; }

    public bool IsVisible { get; set; } = false;

    protected void OpenWin()
    {
        IsVisible = true;
    }

    protected void CloseWin()
    {
        IsVisible = false;

        // invoke an event so the changes can propagate to the parent UI
        // can also be void, does not have to return anything
        OnChanged.InvokeAsync("someInfo");
    }
}
````

## Notes

Fore more details, examples, and a more complex scenario, see this thread: [https://www.telerik.com/forums/how-to-use-window-and-editcontext-together](https://www.telerik.com/forums/how-to-use-window-and-editcontext-together).

## See Also

[Window Inside EditContext]({%slug window-in-form-edit-context%})