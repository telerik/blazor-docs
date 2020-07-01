---
title: Events
page_title: TabStrip - Events
description: Events of the Tab Strip for Blazor.
slug: tabstrip-events
tags: telerik,blazor,tab strip,events
published: True
position: 20
---

# Tab Strip Events

This article explains the events available in the Telerik TabStrip for Blazor:

* [ActiveTabIndexChanged](#activetabindexchanged)

## ActiveTabIndexChanged 

The `ActiveTabIndexChanged` event fires when the user changes the tab that is currently shown. The event handler receives the new index as an argument.

>caption Handle the tab selection changed event

````CSHTL
@result

<TelerikTabStrip ActiveTabIndexChanged="@TabChangedHandler">
	<TabStripTab Title="First">
		First tab content. Click through the tabs.
	</TabStripTab>
	<TabStripTab Title="Second">
		Second tab content.
	</TabStripTab>
	<TabStripTab Title="Third">
		Third tab content.
	</TabStripTab>
</TelerikTabStrip>

@code {
    string result {get;set;}
    void TabChangedHandler(int newIndex)
    {
        result = $"current tab {newIndex} selected on {DateTime.Now}";
    }
}
````

## See Also

  * [TabStrip Overview]({%slug components/tabstrip/overview%})
