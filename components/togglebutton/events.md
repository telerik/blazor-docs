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

This article describes the events of the Telerik ToggleButton for Blazor:

* [OnClick](#onclick)
* [SelectedChanged](#selectedchanged)

The `OnClick` event fires before `SelectedChanged`.

## OnClick 

The `OnClick` event fires when the user clicks or taps the button, or presses `Enter` or `Space` while the button is focused. You can use the event to invoke `async` logic such as fetching data or calling a service.

The event handler receives argument of type [MouseEventArgs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs).

The `OnClick` event fires before `SelectedChanged`.

>caption Handle the Toggle Button OnClick event

````RAZOR
<TelerikToggleButton @bind-Selected="@IsSelected"
                     OnClick="@OnToggleButtonClick">
    Toggle Button
</TelerikToggleButton>

<p> @result </p>

@code {
    bool IsSelected { get; set; } = true;

    string result { get; set; }

    async Task OnToggleButtonClick(MouseEventArgs args)
    {
        await Task.Delay(300); // simulate async operation
        result = $"The user clicked at {DateTime.Now.ToLongTimeString()}.{DateTime.Now.Millisecond}";
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

## SelectedChanged

The `SelectedChanged` event fires when the user changes the button state by clicking, tapping, hitting `Space` or `Enter`. Use it to call local view-model logic. To fetch data or perform async operations, use the [OnClick](#onclick) event.

The event handler receives a `bool` argument. Use it to update the `Selected` parameter value. If you don't do this, you will effectively cancel the event.

The `SelectedChanged` event fires after `OnClick`.

>caption Handle the SelectedChanged event

````RAZOR
<TelerikToggleButton Selected="@IsSelected"
                     SelectedChanged="@MySelectedChangedHandler">
    Toggle Button
</TelerikToggleButton>

@code {
    bool IsSelected { get; set; }

    void MySelectedChangedHandler(bool newSelected)
    {
        IsSelected = newSelected;
    }
}
````

## See Also

* [ToggleButton Overview](slug:togglebutton-overview)
