---
title: Events
page_title: Window - Events
description: Events of the Window for Blazor.
slug: window-events
tags: telerik,blazor,window,events
published: True
position: 20
---

# Window Events

This article explains the events available in the Telerik Window for Blazor:


* [VisibleChanged](#visiblechanged)
* [StateChanged](#statechanged)
* [Action Click](#action-click)
* [LeftChanged and TopChanged](#leftchanged-and-topchanged)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async) 


## VisibleChanged

You can use the `VisibleChanged` event to get notifications when the user tries to close the window. You can effectively cancel the event by *not* propagating the new visibility state to the variable the `Visible` property is bound to. This is the way to cancel the event and keep the window open.

>caption React to the user closing the window

````CSHTML
@result

<TelerikButton OnClick="@ToggleWindow">Toggle the Window</TelerikButton>

<TelerikWindow Visible="@isVisible" VisibleChanged="@VisibleChangedHandler">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        This is my window <strong>popup</strong> content.
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

@code {
    bool isVisible { get; set; }
    string result { get; set; }

    void VisibleChangedHandler(bool currVisible)
    {
        isVisible = currVisible; // if you don't do this, the window won't close because of the user action

        result = $"the window is now visible: {isVisible}";

        Console.WriteLine("The user closed the window with the [x] button on its toolbar");
    }

    public void ToggleWindow()
    {
        isVisible = !isVisible;

        result = $"the window is now visible: {isVisible}";
    }
}
````

>caption Prevent the user from closing the window based on a condition

````CSHTML
@* Not propagating the visible value from the handler to the model can prevent the user from closing the window
    Using the application code to explicitly set the visibility of the window will still close it as it will not fire the event*@

<TelerikButton OnClick="@( _ => isVisible = !isVisible )">Toggle the Window</TelerikButton>

<TelerikWindow Visible="@isVisible" VisibleChanged="@VisibleChangedHandler">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        Try closing the window with the [x] button on its toolbar, then toggle the checkbox and try again.
        <br />
        <label>
            The user can close the window with the [x] button:
            <TelerikCheckBox @bind-Value="@isClosable" />
        </label>
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

@code {
    bool isVisible { get; set; } = true;
    bool isClosable { get; set; }

    void VisibleChangedHandler(bool currVisible)
    {
        if (isClosable)
        {
            isVisible = currVisible; // if you don't do this, the window won't close because of the user action
        }
        else
        {
            Console.WriteLine("The user tried to close the window but the code didn't let them");
        }

    }
}
````

## StateChanged

You can use the `StateChanged` event to get notifications when the user tries to minimize, maximize or restore the window. You can effectively cancel the event by *not* propagating the new state to the variable the `State` property is bound to.

>caption React to the user actions to minimize, restore or maximize the window

````CSHTML
@lastUserAction

<select @bind=@State>
    <option value=@WindowState.Default>Default</option>
    <option value=@WindowState.Minimized>Minimized</option>
    <option value=@WindowState.Maximized>Maximized</option>
</select>

<TelerikWindow State="@State" StateChanged="@StateChangedHandler" Width="500px" Height="300px" Visible="true"
               Top="500px" Left="600px">
    <WindowTitle>
        <strong>Lorem ipsum</strong>
    </WindowTitle>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
    <WindowContent>
        <select @bind=@State>
            <option value=@WindowState.Default>Default</option>
            <option value=@WindowState.Minimized>Minimized</option>
            <option value=@WindowState.Maximized>Maximized</option>
        </select>
    </WindowContent>
</TelerikWindow>

@code {
    public WindowState State { get; set; } = WindowState.Default;

    string lastUserAction;

    private void StateChangedHandler(WindowState windowState)
    {
        State = windowState; // if you don't do this, the window won't change because of the user action

        lastUserAction = $"last user action was: {windowState}";
    }
}
````

## Action Click

Actions expose the `OnClick` event. You can use it to implement custom buttons that invoke application logic from the Window's titlebar. See the [Window Actions]({%slug components/window/actions%}) article for examples.

If you use the `OnClick` event on a built-in action, it will act as a custom action and it will no longer perform the built-in feature (for example, close the window). If you want the invoke both a built-in action and custom logic from the same button, you have two options:

* Use the [VisibleChanged](#visiblechanged) and/or the [StateChanged](#statechanged) events to execute the custom logic on the user actions.
* Or, use two-way binding for the corresponding Window parameter (e.g., `@bind-Visible`, or `@bind-State`) and toggle its variable from the custom `OnClick` handler.


## LeftChanged and TopChanged

These two events fire when the user finishes [moving the window]({%slug window-draggable%}). If you set the `Top` and `Left` parameters of the window, you must update their values in these events - either by handling them yourself, or through using two-way binding.

The values will be in pixels, in a `string` format, rounded to one decimal place.

These events will also fire when the user maximizes the window because then its top and left coordinates become `0px`. You can capture this event through the [StateChanged](#statechanged) event that will fire afterwards.

The `LeftChanged` event fires second, so if you intend to store locations in an application state, and you want to do this only once, you can do that in `LeftChanged`.

>caption Handle LeftChanged and TopChanged

````CSHTML
@* If you need to react to the user dragging the window you can handle the events. Otherwise you can simply use two-way binding *@

<TelerikWindow Left="@TheLeft" Top="@TheTop" Draggable="true"
               LeftChanged="@LeftChangedHandler" TopChanged="@TopChangedHandler"
               Visible="true">
    <WindowTitle>Drag me!</WindowTitle>
    <WindowContent>When using Left and Top, make sure to update them in the view-model.</WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
    </WindowActions>
</TelerikWindow>

@code{
    string TheLeft { get; set; } = "50px";
    string TheTop { get; set; } = "50px";

    async Task LeftChangedHandler(string currLeft)
    {
        // if you don't do this, the event will be "cancelled" and the position will revert
        TheLeft = currLeft;

        Console.WriteLine("LEFT position changed to: " + TheLeft);

        if(TheLeft == "0px" || TheTop == "0px")
        {
            Console.WriteLine("Maximized. You should use the StateChanged event to capture this");
        }

        // you could store left and top in the application state here if you wish to preserve it for the user
    }

    async Task TopChangedHandler(string currTop)
    {
        // if you don't do this, the event will be "cancelled" and the position will revert
        TheTop = currTop;

        Console.WriteLine("TOP position changed to: " + TheTop);
    }
}
````

## See Also

  * [Window Overview]({%slug components/window/overview%})
  * [Window State]({%slug components/window/size%})
  * [Window Actions]({%slug components/window/actions%})
