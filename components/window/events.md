---
title: Events
page_title: Window - Events
description: Events of the Window for Blazor.
slug: window-events
tags: telerik,blazor,window,events
published: True
position: 20
components: ["window"]
---
# Window Events

This article explains the events available in the Telerik Window for Blazor:

* [HeightChanged and WidthChanged](#heightchanged-and-widthchanged)
* [LeftChanged and TopChanged](#leftchanged-and-topchanged)
* [Action OnClick](#action-onclick)
* [StateChanged](#statechanged)
* [VisibleChanged](#visiblechanged)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async) 

## HeightChanged and WidthChanged

You can use the `WidthChanged` and `HeightChanged` events to get notifications when the user tries to resize the window. The events require the `Resizable` parameter of the Window to be `true`, which is by default.

>caption Respond to the user actions when resizing the window

````RAZOR
<TelerikWindow Height="@WindowHeight"
               HeightChanged="@WindowHeightChanged"
               Width="@WindowWidth"
               WidthChanged="@WindowWidthChanged"
               Visible="true">
    <WindowTitle>Window Title</WindowTitle>
    <WindowContent>
        Window Content
    </WindowContent>
</TelerikWindow>

@WindowResizeLog

@code {
    private bool WindowVisible { get; set; } = true;

    private string WindowHeight { get; set; } = "200px";
    private string WindowWidth { get; set; } = "400px";

    private string WindowResizeLog { get; set; } = string.Empty;

    private void WindowWidthChanged(string newWidth)
    {
        WindowWidth = newWidth;
        WindowResizeLog = $"New Width {WindowWidth} and Height {WindowHeight} at {DateTime.Now.ToString("HH:mm:ss")}";
    }

    private void WindowHeightChanged(string newHeight)
    {
        WindowHeight = newHeight;
        WindowResizeLog = $"New Width {WindowWidth} and Height {WindowHeight} at {DateTime.Now.ToString("HH:mm:ss")}";
    }
}
````

## LeftChanged and TopChanged

These two events fire when the user finishes [moving the window](slug:window-draggable). If you set the `Top` and `Left` parameters of the window, you must update their values in these events - either by handling them yourself, or through using two-way binding.

The values will be in pixels, in a `string` format, rounded to one decimal place.

These events will also fire when the user maximizes the window because then its top and left coordinates become `0px`. You can capture this event through the [`StateChanged`](#statechanged) event that will fire afterwards.

The `LeftChanged` event fires second, so if you intend to store locations in an application state, and you want to do this only once, you can do that in `LeftChanged`.

>caption Handle LeftChanged and TopChanged

````RAZOR
<TelerikWindow Top="@WindowTop"
               TopChanged="@WindowTopChanged"
               Left="@WindowLeft"
               LeftChanged="@WindowLeftChanged"
               Visible="true">
    <WindowTitle>Window Title</WindowTitle>
    <WindowContent>
        Window Content
    </WindowContent>
</TelerikWindow>

@WindowDragLog

@code {
    private bool WindowVisible { get; set; } = true;

    private string WindowTop { get; set; } = string.Empty;
    private string WindowLeft { get; set; } = string.Empty;

    private string WindowDragLog { get; set; } = string.Empty;

    private void WindowLeftChanged(string newLeft)
    {
        WindowLeft = newLeft;
        WindowDragLog = $"New Left {WindowLeft} and Top {WindowTop} at {DateTime.Now.ToString("HH:mm:ss")}";
    }

    private void WindowTopChanged(string newTop)
    {
        WindowTop = newTop;
        WindowDragLog = $"New Left {WindowLeft} and Top {WindowTop} at {DateTime.Now.ToString("HH:mm:ss")}";
    }
}
````

## Action OnClick

Window actions expose the `OnClick` event. You can use it to implement custom buttons that invoke application logic from the Window's titlebar. See the [Window Actions](slug:components/window/actions) article for examples.

If you use the `OnClick` event on a built-in action, it will act as a custom action and it will no longer perform the built-in feature (for example, close the window). If you want the invoke both a built-in action and custom logic from the same button, you have two options:

* Use the [VisibleChanged](#visiblechanged) and/or the [StateChanged](#statechanged) events to execute the custom logic on the user actions.
* Or, use two-way binding for the corresponding Window parameter (e.g., `@bind-Visible`, or `@bind-State`) and toggle its variable from the custom `OnClick` handler.

## StateChanged

You can use the `StateChanged` event to get notifications when the user tries to minimize, maximize or restore the window. You can effectively cancel the event by *not* propagating the new state to the variable the `State` property is bound to.

>caption React to the user actions to minimize, restore or maximize the window

````RAZOR
<TelerikWindow State="@WindowState"
               StateChanged="@WindowStateChanged"
               Height="200px"
               Width="400px"
               Resizable="false"
               Visible="true">
    <WindowTitle>Window Title</WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
    </WindowActions>
    <WindowContent>
        Window State: <code>@WindowState</code>
    </WindowContent>
</TelerikWindow>

@code {
    private WindowState WindowState { get; set; } = WindowState.Default;

    private void WindowStateChanged(WindowState newState)
    {
        WindowState = newState;
    }
}
````

## VisibleChanged

You can use the `VisibleChanged` event to get notifications when the user tries to close the window. You can effectively cancel the event by *not* propagating the new visibility state to the variable the `Visible` property is bound to. This is the way to cancel the event and keep the window open.

>caption Handle the Window VisibleChanged event

````RAZOR
<TelerikWindow Visible="@WindowVisible"
               VisibleChanged="@WindowVisibleChanged">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowContent>
        <p>Window Content</p>
        <label>
            <TelerikCheckBox @bind-Value="@WindowIsClosable" />
            Users can close the Window with the [x] button:
        </label>

    </WindowContent>
</TelerikWindow>

<TelerikButton OnClick="@(() => WindowVisible = !WindowVisible)">Toggle Window</TelerikButton>

<p>Window Visible: @WindowVisible</p>

@code {
    private bool WindowVisible { get; set; }

    private bool WindowIsClosable { get; set; } = true;

    private void WindowVisibleChanged(bool newVisible)
    {
        if (WindowIsClosable)
        {
            WindowVisible = newVisible;
        }
    }
}
````

## See Also

* [Window Overview](slug:window-overview)
* [Window State](slug:components/window/size)
* [Window Actions](slug:components/window/actions)
* [Focus TextBox on Window Open](slug:window-kb-focus-button-textbox-on-open)
