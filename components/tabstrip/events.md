---
title: Events
page_title: TabStrip - Events
description: Events of the Tab Strip for Blazor.
slug: tabstrip-events
tags: telerik,blazor,tab strip,events
published: True
position: 20
---

# TabStrip Events

This article explains the events available in the Telerik TabStrip for Blazor:

* [ActiveTabIdChanged](#activetabidchanged)
* [ActiveTabIndexChanged](#activetabindexchanged)

## ActiveTabIdChanged

The `ActiveTabIdChanged` event fires when the user changes the active tab. The event handler receives the new tab ID of type `string` as an argument. This event is designed to work with the new [`ActiveTabId` parameter](slug:tabstrip-tabs-collection).

>caption Handle the tab ID selection changed event

````RAZOR
<TelerikTabStrip ActiveTabIdChanged="@HandleTabIdChange">
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

@Result

@code {
    private string Result { get; set; }
    private void HandleTabIdChange(string tabId)
    {
        Result = $"Current tab ID is {tabId}";
    }
}
````

## ActiveTabIndexChanged 

The `ActiveTabIndexChanged` event fires when the user changes the tab that is currently shown. The event handler receives the new index as an argument.

If you remove programmatically the currently active tab, when it disposes, the event will fire with index `-1` as there will be no selected tab anymore.

> The `ActiveTabIndexChanged` event and `ActiveTabIndex` parameter will be deprecated in a future releases. It is recommended to use the [`ActiveTabId`](slug:tabstrip-tabs-collection) parameter with [`ActiveTabIdChanged`](slug:tabstrip-events#activetabidchanged) event instead.

>caption Handle the tab selection changed event

````RAZOR
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

>caption Cancel the event

````RAZOR
@* If the tab strip is bound to a field in the view model, when you do not update that field in the event handler, you will effectively cancel the event *@

<TelerikTabStrip ActiveTabIndex="@ActiveTabIndex" ActiveTabIndexChanged="@TabChangedHandler">
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
    int ActiveTabIndex { get; set; }
    
    void TabChangedHandler(int newIndex)
    {
        // this will update the view-model for all items but the third, 
        // effectively cancelling the event for the third tab
        if (newIndex != 2)
        {
            ActiveTabIndex = newIndex;
        }
    }
}
````

## See Also

  * [TabStrip Overview](slug:components/tabstrip/overview)
  * [Dynamic Tabs](slug:tabstrip-tabs-collection)
