---
title: Events
page_title: ButtonGroup - Events
description: Events of the ButtonGroup for Blazor.
slug: buttongroup-events
tags: telerik,blazor,Toggle,button,group
published: True
position: 20
---

# ButtonGroup Events

This article describes the events of the Telerik ButtonGroup component for Blazor.

* [OnClick](#onclick)
* [SelectedChanged](#selectedchanged)

## OnClick 

The `OnClick` event fires when the user clicks or taps a button. You can use it to invoke async logic such as fetching data or calling a service.

The `OnClick` event argument is of type [MouseEventArgs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs).

`OnClick` always fires *before* the `Selected` values of related buttons change.

>caption Handle the Button OnClick event in a ButtonGroup

````RAZOR
@* This example shows how to handle button clicks individually or with a shared event handler. *@

<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
    <ButtonGroupButton OnClick="@FirstClickHandler">Button 1</ButtonGroupButton>
    <ButtonGroupButton OnClick="@( (MouseEventArgs args) => SharedClickHandler("Button 2", args) )">Button 2</ButtonGroupButton>
    <ButtonGroupToggleButton OnClick="@( (MouseEventArgs args) => SharedClickHandler("Toggle Button 3", args) )">Toggle Button 3</ButtonGroupToggleButton>
    <ButtonGroupToggleButton OnClick="@ToggleButtonClickHandler">Toggle Button 4</ButtonGroupToggleButton>
</TelerikButtonGroup>

<p>@EventLogger</p>

@code{
    private string EventLogger { get; set; }

    private async Task FirstClickHandler(MouseEventArgs args)
    {
        EventLogger = $"Button 1 click at {DateTime.Now.Millisecond} ms. Ctrl or Cmd pressed: {args.CtrlKey || args.MetaKey}";
    }

    private async Task ToggleButtonClickHandler(MouseEventArgs args)
    {
        EventLogger = $"Toggle Button 4 click at {DateTime.Now.Millisecond} ms. Alt pressed: {args.AltKey}";
    }

    private async Task SharedClickHandler(string sender, MouseEventArgs args)
    {
        EventLogger = $"Shared handler: {sender} click at {DateTime.Now.Millisecond} ms. Shift pressed: {args.ShiftKey}";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## SelectedChanged

The `SelectedChanged` fires when the user changes the selected state of a button via click, tap, Space key or Enter key. You can use it to call local view-model logic. To fetch data or perform async operations, use the [OnClick](#onclick) event.

This event is available only for `ButtonGroupToggleButton` instances.

When the `SelectionMode` is `Single`, then `SelectedChanged` fires *first* for the previously selected button, and *then* for the newly selected button.

Normally, the `SelectedChanged` handler should update the `Selected` value of the respective button. If you choose not to do that, this will effectively cancel the event.

>caption Handle the SelectedChanged event

````RAZOR
<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
    <ButtonGroupToggleButton Selected="@FirstSelected"
                             SelectedChanged="@FirstSelectedChanged">Button 1</ButtonGroupToggleButton>
    <ButtonGroupToggleButton Selected="@SecondSelected"
                             SelectedChanged="@SecondSelectedChanged">Button 2</ButtonGroupToggleButton>
</TelerikButtonGroup>

<p><label><TelerikCheckBox @bind-Value="@HandleEvents" /> Handle SelectedChanged</label></p>

@code{
    private bool FirstSelected { get; set; }
    private bool SecondSelected { get; set; } = true;
    private bool HandleEvents { get; set; } = true;

    private void FirstSelectedChanged(bool newState)
    {
        if (HandleEvents)
        {
            FirstSelected = newState;
            Console.WriteLine($"Button 1 Selected: {FirstSelected}");
        }
        else
        {
            Console.WriteLine($"Button 1 SelectedChanged cancelled.");
        }
    }

    private void SecondSelectedChanged(bool newState)
    {
        if (HandleEvents)
        {
            SecondSelected = newState;
            Console.WriteLine($"Button 2 Selected: {SecondSelected}");
        }
        else
        {
            Console.WriteLine($"Button 2 SelectedChanged cancelled.");
        }
    }
}
````

## See Also

* [ButtonGroup Overview](slug://buttongroup-overview)
* [ButtonGroup Selection](slug://buttongroup-selection)
