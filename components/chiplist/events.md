---
title: Events
page_title: ChipList - Events
description: Events in the ChipList for Blazor.
slug: chiplist-events
tags: telerik,blazor,chiplist,events
published: true
position: 20
components: ["chiplist"]
---

# Events

This article describes the Blazor ChipList events and provides a runnable example with sample event handler implementations.

* [OnRemove](#onremove)
* [SelectedItemsChanged](#selecteditemschanged)

## OnRemove

The `OnRemove` event fires when the user clicks the remove icon on any chip in the ChipList. The event handler receives a `ChipListRemoveEventArgs` object which provides the removed chip in the `Item` field that you can cast to your model type. You can cancel the event by setting the `IsCancelled` field to `true`.

## SelectedItemsChanged

The `SelectedItemsChanged` fires when the user selects a chip from the ChipList. [Read the Selection article for more information on the SelectedItemsChanged event...](slug:chiplist-selection#one-way-binding)

## Example

>caption Handle the Blazor ChipList Events

<demo metaUrl="client/chiplist/events/" height="300"></demo>


## See Also

* [ChipList Overview](slug:chiplist-overview)
* [ChipList Selection](slug:chiplist-selection)
