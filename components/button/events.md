---
title: Events
page_title: Button - Events
description: Events of the Button for Blazor.
slug: button-events
tags: telerik,blazor,button,events
published: True
position: 20
---

# Button Events

This article explains the events available in the Telerik Button for Blazor:

* [OnClick](#onclick)

## OnClick 

The `OnClick` event fires when the user clicks or taps the button.

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


>caption Handle the button click

````CSHTML
@result
<br />
@moreInfo

<br />
<TelerikButton OnClick="@OnClickHandler">Click me!</TelerikButton>

@code {
    string result;
    string moreInfo;

    async Task OnClickHandler(MouseEventArgs args)
    {
        result = "Button was clicked at: " + DateTime.Now.ToString();
        moreInfo = "Ctrl was pressed when clicked: " + args.CtrlKey;
    }
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

  * [Button Overview]({%slug components/button/overview%})
