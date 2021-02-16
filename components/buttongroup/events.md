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

This article explains the events available in the Telerik buttons in a ButtonGroup for Blazor:

* [SelectedChanged](#selectedchanged)
* [OnClick](#onclick)
 

## SelectedChanged

The `SelectedChanged` fires when the user changes the state of the button by clicking it (or by using `Space` or `Enter`). You can use it to call local view-model logic. To fetch data or perform async operations, use the [OnClick](#onclick) event.

This event is available only for `ButtonGroupToggleButton` instances, as they are the only selecteble buttons.

>caption Handle the SelectedChanged event

````CSHTML
@* If you do not update the view-model in the handler, you can effectively cancel the event *@

<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
    <ButtonGroupToggleButton Selected="@FirstSelected" SelectedChanged="@FirstSelectedChangedHandler">First</ButtonGroupToggleButton>
    <ButtonGroupToggleButton Selected="@SecondSelected" SelectedChanged="@SecondSelectedChangedHandler">Second</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code{
    bool FirstSelected { get; set; }
    bool SecondSelected { get; set; } = true; // you can pre-select buttons

    void FirstSelectedChangedHandler(bool currState)
    {
        FirstSelected = currState;
        // you have to update the model manually because handling the SelectedChanged event does not let you use @bind-Selected
        // if you don't update the View-Model, you will effectively cancel the event

        Console.WriteLine($"The first button is selected: {FirstSelected}");
    }

    void SecondSelectedChangedHandler(bool currState)
    {
        SecondSelected = currState;
        // you have to update the model manually because handling the SelectedChanged event does not let you use @bind-Selected
        // if you don't update the View-Model, you will effectively cancel the event

        Console.WriteLine($"The Second button is now selected: {SecondSelected}");
    }
}
````


## OnClick 

The `OnClick` event fires when the user clicks or taps the button. You can use it to invoke async logic such as fetching data or calling a service.

The `OnClick` event receives argument of type [MouseEventArgs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs?view=aspnetcore-5.0).

>caption Handle the Button OnClick event in a ButtonGroup

````CSHTML
@* This example shows how to handle each click individually, and also a way to use the same async handler from several instances, and pass arguments to it *@

@result

<br />

<TelerikButtonGroup SelectionMode="@ButtonGroupSelectionMode.Single">
    <ButtonGroupButton OnClick="@FirstClickHandler">First</ButtonGroupButton>
    <ButtonGroupButton OnClick="@( async() => await SharedClickHandler("Second button, shared handler") )">Second</ButtonGroupButton>
    <ButtonGroupToggleButton OnClick="@( async() => await SharedClickHandler("Shared Toggle Button") )">Toggle Button</ButtonGroupToggleButton>
    <ButtonGroupToggleButton OnClick="@ToggleButtonClickHandler">Toggle Button Two</ButtonGroupToggleButton>
</TelerikButtonGroup>

@code{
    string result { get; set; }

    async Task FirstClickHandler(MouseEventArgs args)
    {
        await Task.Delay(500);//simulate network delay from real data retrieval. Remove from a real app

        result = "First button: " + DateTime.Now.Millisecond + ". Ctrl pressed: " + args.CtrlKey;
    }

    async Task ToggleButtonClickHandler(MouseEventArgs args)
    {
        await Task.Delay(500);//simulate network delay from real data retrieval. Remove from a real app

        result = "Standalone Toggle Button: " + DateTime.Now.Millisecond + ". Alt pressed: " + args.AltKey;
    }

    async Task SharedClickHandler(string sender)
    {
        await Task.Delay(500);//simulate network delay from real data retrieval. Remove from a real app

        result = sender + DateTime.Now.Millisecond;
    }
}

````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

  * [ButtonGroup Overview]({%slug buttongroup-overview%})
