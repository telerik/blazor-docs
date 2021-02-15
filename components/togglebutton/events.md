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

It receives argument of type [MouseEventArgs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs?view=aspnetcore-5.0).

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
