---
title: State
page_title: Grid for Blazor | State
description: Save, load, change the Grid for Blazor state - grouping, sorting, filtering and so on.
slug: grid-state
tags: telerik,blazor,grid,state,save,load,layout,set,change
published: True
position: 40
---

# Grid State

The Grid lets you save, load and change its current state through code. The state includes all the user-configurable elements of the grid - such as sorting, filtering, paging, grouping, edited items, selection, column size and order.

This article contains the following sections:

* State basics
* Save and Load state - example
* Set state - example

## Basics

The state is a generic class whose type is determined by the type of the model you use for the grid. It contains fields that correspond to the grid behaviors which you can use to save, load and modify the grid state.

The grid offers two events and two methods to allow flexible operations over its state:

### Events

The `OnStateInit` and `OnStateChanged` events are raised by the grid so you can have an easy to use hook for loading and saving state, respectively.

* `OnStateInit` fires when the grid is initializing and you can provide the state you load from your storage to the `GridState` field of its event arguments.

* `OnStateChanged` fires when the user makes a change to the grid state (such as dragging to group by a field, filtering a column, editing, selecting and so on). The `GridState` field of the event arguments provides the current grid state so you can store it.

By combining these two events you can save the grid layout for your users automatically by only calling upon your storage service in the respective method.

### Methods

The `GetState` and `SetState` instance methods provide flexibility for your business logic. They let you get and set the current grid state on demand outside of the grid events.

* `GetState` returns the grid state so you can store it only on a certain condition - for example, you may want to save the grid layout only on a button click, and not on every user interaction with the grid. You can also use it to get information about the current state of the filters, sorts and so on, if you are not using the OnRead event.

* `SetState` takes an instance of a grid state so you can use your own code to alter the grid layout and state. For example, you can have a button that puts the grid in a certain configuration that helps your users review data (like certain filters, sorts, groups, expanded detail templates, etc.). You can also use this method to reset the grid to a clean (or cleaner) state.

## Examples


>caption Set sorting programmatically

````Sorting
@[template](/_contentTemplates/grid/state.md#set-sort-from-code)
````
````FilterMenu
@[template](/_contentTemplates/grid/state.md#set-sort-from-code)
````

## See Also

  * [Live Demo: Grid Sorting](https://demos.telerik.com/blazor-ui/grid/sorting)
   
