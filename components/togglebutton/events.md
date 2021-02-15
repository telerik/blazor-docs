---
title: Events
page_title: ToggleButton - Events
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

    void MySelectedChangedHandler(bool currSelectedState)
    {
        IsSelected = currSelectedState;
        //you have to update the model manually because handling the SelectedChanged event does not let you use @bind-Selected

        Console.WriteLine($"Current state is {IsSelected}");
    }
}
````


## OnClick 

The `OnClick` event fires when the user clicks or taps the button. You can use it to invoke async logic such as fetching data or calling a service.

It receives argument of type `MouseEventArgs`  which exposes the following fields:
* `Detail` - A count of consecutive clicks that happened in a short amount of time, incremented by one.
* `ScreenX` - The X coordinate of the mouse pointer in global (screen) coordinates.
* `ScreenY` - The Y coordinate of the mouse pointer in global (screen) coordinates.
* `ClientX` - The X coordinate of the mouse pointer in local (DOM content) coordinates.
* `ClientY` - The Y coordinate of the mouse pointer in local (DOM content) coordinates.
* `OffsetX` - The X coordinate of the mouse pointer in relative (Target Element) coordinates.
* `OffsetY` - The Y coordinate of the mouse pointer in relative (Target Element) coordinates.
* `Button` - The button number that was pressed when the mouse event was fired: Left button=0, middle button=1 (if present), right button=2. For mice configured for left handed use in which the button actions are reversed the values are instead read from right to left.
* `Buttons` -  The buttons being pressed when the mouse event was fired: Left button=1, Right button=2, Middle (wheel) button=4, 4th button (typically, "Browser Back" button)=8, 5th button (typically, "Browser Forward" button)=16. If two or more buttons are pressed, returns the logical sum of the values. E.g., if Left button and Right button are pressed, returns 3 (=1 | 2).
* `CtrlKey` - True if the control key was down when the event was fired. false otherwise.
* `ShiftKey` - True if the shift key was down when the event was fired. false otherwise.
* `AltKey` - True if the alt key was down when the event was fired. false otherwise.
* `MetaKey` - True if the meta key was down when the event was fired. false otherwise.
* `Type` - Gets or sets the type of the event.

>caption Handle the Toggle Button OnClick event

````CSHTML
@result
<br />
@moreInfo
<br />

<TelerikToggleButton @bind-Selected="@IsSelected" OnClick="@ToggleButtonClickHandler">
    Selected: &nbsp; <strong>@IsSelected</strong>
</TelerikToggleButton>

@code {
    bool IsSelected { get; set; } = true;

    string result { get; set; }

    string moreInfo { get; set; }

    async Task ToggleButtonClickHandler(MouseEventArgs args)
    {
        await Task.Delay(500); // simulate a service call
        string currState = IsSelected ? "ON" : "OFF";
        result = $"The user clicked the {currState} state.";
        moreInfo = "The user pressed Ctrl: " + args.CtrlKey;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

  * [ToggleButton Overview]({%slug togglebutton-overview%})
