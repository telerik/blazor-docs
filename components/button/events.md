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

It receives argument of type [MouseEventArgs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.mouseeventargs?view=aspnetcore-5.0).

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
