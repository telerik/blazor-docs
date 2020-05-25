---
title: Events
page_title: ToggleButton for Blazor | Events
description: Events of the ToggleButton for Blazor
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
