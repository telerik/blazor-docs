---
title: State
page_title: Gantt - State
description: Save, load, change the Gantt for Blazor state - grouping, sorting, filtering and so on.
slug: Gantt-state
tags: telerik,blazor,Gantt,state,save,load,layout,set,change,management
published: True
position: 50
---

# Gantt State

The Gantt lets you save, load and change its current state through code. The state management includes all the user-configurable elements of the Gantt - such as sorting, filtering, paging, grouping, edited items, selection, column size and order.

You can see this feature in the [Live Demo: Gantt State](https://demos.telerik.com/blazor-ui/Gantt/persist-state).

This article contains the following sections:

<!-- Start Document Outline -->

* [Basics](#basics)
	* [Events](#events)
	* [Methods](#methods)
* [Information in the Gantt State](#information-in-the-Gantt-state)
* [Examples](#examples)
	* [Save and Load Gantt State from Browser LocalStorage](#save-and-load-Gantt-state-from-browser-localstorage)
    * [Save and Load Gantt State in a WebAssembly application](#save-and-load-Gantt-state-in-a-webassembly-application)
	* [Set Gantt Options Through State](#set-Gantt-options-through-state)
	* [Set Default (Initial) State](#set-default-initial-state)
	* [Get and Override User Action That Changes The Gantt](#get-and-override-user-action-that-changes-the-Gantt)
	* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)
	* [Get Current Columns Visibility, Order, Field](#get-current-columns-visibility-order-field)

<!-- End Document Outline -->


## Basics

The Gantt state is a generic class whose type is determined by the type of the model you use for the Gantt. It contains fields that correspond to the Gantt behaviors which you can use to save, load and modify the Gantt state.

Fields that pertain to model data (such as edited item, inserted item, selected items) are also typed according to the Gantt model. If you restore such data, make sure to implement appropriate comparison checks - by default the `.Equals `check for a class (model) is a reference check and the reference from the storage is unlikely to match the reference from the Gantt `Data`. Thus, you may want to override the `.Equals` method of the model you use so it compares by an ID, for example, or otherwise (in the app logic) re-populate the models in the state object with the new model references from the Gantt data source.

The Gantt offers two events and two methods to allow flexible operations over its state:

* [Events](#events)

* [Methods](#methods)

### Events

The `OnStateInit` and `OnStateChanged` events are raised by the Gantt so you can have an easy to use hook for loading and saving state, respectively.

* `OnStateInit` fires when the Gantt is initializing and you can provide the state you load from your storage to the `State` field of its event arguments.

* `OnStateChanged` fires when the user makes a change to the Gantt state (such as paging, sorting, grouping, filtering, editing, selecting and so on). The `State` field of the event argument provides the current Gantt state so you can store it. The `PropertyName` field of the event arguments indicates what is the aspect that changed.
    * @[template](/_contentTemplates/Gantt/state.md#statechanged-possible-prop-values)
    * We recommend that you use an **`async void`** handler for the `OnStateChanged` event in order to reduce re-rendering and to avoid blocking the UI update while waiting for the service to store the data. Doing so will let the UI thread continue without waiting for the storage service to complete.
    * Filtering always resets the current page to 1, so the `OnStateChanged` event will fire twice. First, `PropertyName` will be equal to `"Page"`, and the second time it will be `"FilterDescriptors"`. However, the `State` field of the event argument will provide correct information about the overall Gantt state in both event handler executions.

By using the `OnStateChanged` and `OnStateInit` events, you can save and restore the Gantt layout for your users by calling your storage service in the respective handler.

### Methods

The `GetState` and `SetState` instance methods provide flexibility for your business logic. They let you get and set the current Gantt state on demand outside of the Gantt events.

* `GetState` returns the Gantt state so you can store it only on a certain condition - for example, you may want to save the Gantt layout only on a button click, and not on every user interaction with the Gantt. You can also use it to get information about the current state of the filters, sorts and so on, if you are not using the OnRead event.

* `SetState` takes an instance of a Gantt state so you can use your own code to alter the Gantt layout and state. For example, you can have a button that puts the Gantt in a certain configuration that helps your users review data (like certain filters, sorts, groups, expanded detail templates, initiate item editing or inserting, etc.).

If you want to make changes on the current Gantt state, first get it from the Gantt through the `GetState` method, then apply the modifications on the object you got and pass it to `SetState`.

If you want to put the Gantt in a certain configuration without preserving the old one, create a `new GanttState<T>()` and apply the settings there, then pass it to `SetState`.

To reset the Gantt state, call `SetState(null)`.

You should avoid calling `SetState` in the Gantt [CRUD methods]({%slug components/Gantt/editing/overview%}) (such as [OnRead]({%slug components/Gantt/manual-operations%}), `OnUpdate`, `OnEdit`, `OnCreate`, `OnCancel`). Doing so may lead to unexpected results because the Gantt has more logic to execute after the event.

## Information in the Gantt State

The following information is present in the Gantt state:

* **Editing** - whether the user was inserting or editing an item (opens the same item for editing with the current data from the built-in editors of the Gantt - the data is updated in the `OnChange` event, not on every keystroke for performance reasons). The `OriginalEditItem` carries the original model without the user modifications so you can compare.

* **Filtering** - filter descriptors (fields by which the Gantt is filtered, the operator and value).

* **SearchFilter** - filter descriptor specific to the GanttSearchBox.

* **Grouping** - group descriptors (fields by which the Gantt is grouped), collapsed group indexes.

* **Paging** - page index, offset (skip) for virtual scrolling.

* **Rows** - list of expanded items.

* **Sorting** - sort descriptors (fields by which the Gantt is sorted, and the direction).

* **Selection** - list of selected items.

* **Columns** - Visible, Width, Index (order) of the column that the user sees, Locked (pinned).

    * The Gantt matches the columns from its markup sequentially (in the same order) with the columns list in the state object. So, when you restore/set the state, the Gantt must initialize with the same collection of columns that were used to save the state.
    
        The `Index` field in the column state object represents its place (order) that the user sees and can choose through the `Reordable` feature, not its place in the Gantt markup. You can find an example below.
    
        If you want to change the visibility of columns, we recommend you use their `Visible` parameter rather than conditional markup - this parameter will be present in the state and will not change the columns collection count which makes it easier to reconcile changes.


## Examples

You can find the following examples in this section:

* [Save and Load Gantt State from Browser LocalStorage](#save-and-load-Gantt-state-from-browser-localstorage)
* [Set Gantt Options Through State](#set-Gantt-options-through-state)
* [Set Default (Initial) State](#set-default-initial-state)
* [Get and Override User Action That Changes The Gantt](#get-and-override-user-action-that-changes-the-Gantt)
* [Initiate Editing or Inserting of an Item](#initiate-editing-or-inserting-of-an-item)
* [Get Current Columns Visibility, Order, Field](#get-current-columns-visibility-order-field)

### Save and Load Gantt State from Browser LocalStorage

The following example shows one way you can store the Gantt state - through a custom service that calls the browser's LocalStorage. You can use your own database here, or a file, or Microsoft's ProtectedBrowserStorage package, or any other storage you prefer. This is just an example you can use as base and modify to suit your project.

>note We support the `System.Text.Json` serialization that is built-in in Blazor.

>caption Save, Load, Reset Gantt state on every state change. Uses a sample LocalStorage in the browser.

<div class="skip-repl"></div>
````Component

````
````Service

````

### Save and Load Gantt State in a WebAssembly application
The [knowledge base article for saving the Gantt state in a WASM application]({%slug Gantt-kb-save-state-in-webassembly%}) explains two ways of storing the `Gantt` state - through a custom controller and a custom service that calls the browser's LocalStorage.

### Set Gantt Options Through State

The Gantt state allows you to control the behavior of the Gantt programmatically - you can, for example, set sorts, filteres, expand hierarhical rows, collapse groups.

>tip The individual tabs below show how you can use the state to programmatically set the Gantt filtering, sorting, grouping and other features.

@[template](/_contentTemplates/Gantt/state.md#initial-state)

<div class="skip-repl"></div>
````Sorting
@[template](/_contentTemplates/Gantt/state.md#set-sort-from-code)
````
````FilterRow
@[template](/_contentTemplates/Gantt/state.md#filter-row-from-code)
````
````FilterMenu
@[template](/_contentTemplates/Gantt/state.md#filter-menu-from-code)
````
````Grouping
@[template](/_contentTemplates/Gantt/state.md#group-from-code)
````
````Hierarchy
@[template](/_contentTemplates/Gantt/state.md#expand-hierarchy-from-code)
````

@[template](/_contentTemplates/Gantt/state.md#filter-menu-default-filters)


### Set Default (Initial) State

If you want the Gantt to start with certain settings for your end users, you can pre-define them in the `OnStateInit event`.

>caption Choose a default state of the Gantt for your users

````CSHTML

````

### Get and Override User Action That Changes The Gantt

Sometimes you may want to know what the user changed in the Gantt (e.g., when they filter, sort and so on) and even override those operations. One way to do that is to monitor the [`OnRead` event]({%slug common-features-data-binding-onread%}), cache the previous [`DataSourceRequest` argument]({%slug common-features-data-binding-onread%}#event-argument), compare against it, alter it if needed, and implement the operations yourself. Another is to use the `OnStateChanged` event.

The example below shows the latter. Review the code comments to see how it works and to make sure you don't get issues. You can find another example of overriding the user actions in the [Static Gantt Group]({%slug Gantt-kb-static-group%}) Knowledge Base article.

>caption Know when the Gantt state changes, which parameter changes, and amend the change

````CSHTML

````

### Initiate Editing or Inserting of an Item

The Gantt state lets you store the item that the user is currently working on - both an existing model that is being edited, and a new item the user is inserting. This happens automatically when you save the Gantt state. If you want to save on every keystroke instead of on `OnChange` - use a custom editor template and update the `EditItem` or `InsertedItem` of the state object as required, then save the state into your service.

In addition to that, you can also use the `EditItem`, `OriginalEditItem` and `InsertItem` fields of the state object to put the Gantt in edit/insert mode through your own application code, instead of needing the user to initiate this through a [command button]({%slug components/Gantt/columns/command%}).

>caption Put and item in Edit mode or start Inserting a new item

````CSHTML

````


### Get Current Columns Visibility, Order, Field

The `ColumnStates` property of the GanttState object provides you with information about the current state of the Gantt columns. It contains the following properties:


Field | Type | Description
---------|----------|---------
 `Index` | `int` | the current index of the column based on the position the user chose
 `Id` | `string` | the Id of the column if it is set
 `Field` | `string` | the field of the column
 `Visible` | `bool?` | whether the column is hidden or not
 `Locked` | `bool` | whether the column is locked or not
 `Width` | `string` | the width of the column if it is set

By looping over the `ColumnStates` collection you can know what the user sees. By default, the order of the columns in the state collection will remain the same but their `Index` value will be changed to indicate their position. You can, for example, sort by the index and filter by the visibility of the columns to get the approximate view the user sees.

>caption Obtain the current columns visibility, rendering order, locked state and field name

````CSHTML

````




## See Also

  * [Live Demo: Gantt State](https://demos.telerik.com/blazor-ui/Gantt/persist-state)
   
