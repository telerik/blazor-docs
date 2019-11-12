---
title: Events
page_title: Grid for Blazor | Events
description: Events of the Grid for Blazor
slug: grid-events
tags: telerik,blazor,grid,events
published: True
position: 100
---

# Grid Events

This article explains the events available in the Telerik Grid for Blazor. They are grouped logically.

* [CUD Events](#cud-events) - events related to Creating, Updating and Deleting items
* [Read Event](#read-event) - event related to obtaining data
* [Other Events](#other-events) - other events the grid provides
	* [Command Button Click](#command-button-click)

## CUD Events

The `OnCreate`, `OnUpdate` and `OnDelete` events let you get the data item that the user changed so you can transfer the user action to the actual data source.

The `OnEdit` and `OnCancel` events let you respond to user actions - when they want to edit an item and when the want to cancel changes on an item they have been editing. You can use them to, for example, prevent editing of certain items based on some condition.

You can read more about the CUD events in the [Editing Overview]({%slug components/grid/editing/overview%}) article.

## Read Event

In the common case, you provide all the data to the grid's `Data` collection and the grid performs operations like paging, filtering, sorting on it for you. In some cases you may want to do this with your own code (for example, to retrieve only a small number of items in order to improve the backend performance). You can do this by attaching to the `OnRead` event where you can perform all the data read operations in the grid. You can read more about them in the [Manual Data Source Operations]({%slug components/grid/manual-operations%}) article.


## Other Events

## Command Button Click

The command buttons of a grid provide an `OnClick` event before firing their built-in command (such as opening a row for editing, or adding a new row). You can do this to implement some additional logic and to also handle custom commands - both from a [Command Column]({%slug components/grid/columns/command%}), and from a [Toolbar Button]({%slug components/grid/features/toolbar%})

## See Also

  * [Grid Overview]({%slug components/grid/overview%})
  * [Grid Editing Overview]({%slug components/grid/editing/overview%})
  * [Manual Data Source Operations]({%slug components/grid/manual-operations%})
