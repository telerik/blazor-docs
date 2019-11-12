---
title: Events
page_title: Button for Blazor | Events
description: Events of the Button for Blazor
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

>caption Handle the button click

````CSHTML
@someVariable

<TelerikButton OnClick="@myHandler">Click me!</TelerikButton>

@code {
	MarkupString someVariable;

	void myHandler()
	{
		someVariable = new MarkupString(DateTime.Now.ToString());
	}
}
````

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)


## See Also

  * [Button Overview]({%slug components/button/overview%})
