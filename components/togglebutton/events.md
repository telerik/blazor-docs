---
title: Events
page_title: ToggleButton | Events
description: Events of the ToggleButton for Blazor.
slug: togglebutton-events
tags: telerik,blazor,Toggle,button,events
published: True
position: 20
---

# ToggleButton Events

This article explains the events available in the Telerik ToggleButton for Blazor:

* [SelectedChanged](#selectedchanged)
* [OnClick](#onclick)
 

## SelectedChanged

The `SelectedChanged` fires when the user changes the state of the button by clicking it (or by using `Space` or `Enter`). You can use it to call local view-model logic. To fetch data or perform async operations, use the [OnClick](#onclick) event.

>caption Handle the SelectedChanged event

````CSHTML
@* If you do not update the view-model in the handler, you can effectively cancel the event *@

<TelerikToggleButton Selected="@IsSelected" SelectedChanged="@MySelectedChangedHandler">
    Selected: @IsSelected
</TelerikToggleButton>

@code {
    bool IsSelected { get; set; }

    void MySelectedChangeHandler(bool currSelectedState)
    {
        IsSelected = currSelectedState;
        //you have to update the model manually because handling the SelectedChanged event does not let you use @bind-Selected

        Console.WriteLine($"Current state is {IsSelected}");
    }
}
````


## OnClick 

The `OnClick` event fires when the user clicks or taps the button. You can use it to invoke async logic such as fetching data or calling a service.

>caption Handle the Toggle Button OnClick event

````CSHTML
@result
<br />

<TelerikToggleButton @bind-Selected="@IsSelected" OnClick="@ToggleButtonClickHandler">
    Selected: &nbsp; <strong>@IsSelected</strong>
</TelerikToggleButton>

@code {
    bool IsSelected { get; set; } = true;

    string result { get; set; }

    async Task ToggleButtonClickHandler()
    {
        await Task.Delay(500); // simulate a service call
        string currState = IsSelected ? "ON" : "OFF";
        result = $"The user clicked the {currState} state.";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

  * [ToggleButton Overview]({%slug togglebutton-overview%})
