---
title: Popup Editing
page_title: Gantt Tree - Popup Editing
description: Popup editing of data in Gantt Tree for Blazor.
slug: gant-tree-popup-editing
tags: telerik,blazor,gantt,popup,editing
published: True
position: 15
components: ["gantt"]
---

# Gantt Tree Popup Editing

In this article:

* [Basics](#basics)
* [Customization](#customization)

## Basics

Popup editing lets the user click an [Edit command button](slug:components/grid/columns/command) on the row, and a popup shows up with the editable fields associated with a Gantt Task. They can then click the `Save` button in the dialog to submit the changes to the model. This fires the `OnUpdate` event where your code receives the updated model so you can work with the data (for example, to call the appropriate method of your service).

In a similar fashion, the `Cancel` and `Delete` command buttons and the `Add` toolbar button fire events to let you handle the data source operations.

You can also cancel the events by setting the `IsCancelled` property of the event arguments to `true`. This lets you prevent the user from editing certain records, inserting or deleting items, based on your application logic.

To enable Popup editing in the Gantt Tree, set its `TreeListEditMode` property to `GanttTreeListEditMode.Popup`, then handle the CRUD events as shown in the example below.

The popup editing dialog renders up to four tabs that allow you to edit:

* `General`—The fields that are used in the [data-binding schema](slug:gantt-data-binding-overview#gantt-tree-item-features).
* `Other`—The fields that are not included in the [data-binding schema](slug:gantt-data-binding-overview#gantt-tree-item-features) but are present in the bound model.
* `Predecessor` and `Successor` - render if you have defined [dependencies](slug:gantt-dependencies-overview) in the Gantt component. You can use these tabs as an alternative to the standard [dependency editing](slug:gantt-dependencies-editing)

## Event Arguments

In Telerik UI for Blazor version 4.5.0, the `GanttUpdateEventArgs` received three new collections as fields. They are populated when you define [Dependencies](slug:gantt-dependencies-overview) in the Gantt.

| Field | Type | Description |
|----------|----------|----------|
| `CreatedDependencies` | `List<GanttDependencyDescriptor>`  | A collection  of the newly created dependencies. |
| `UpdatedDependencies` | `List<GanttDependencyDescriptor>`  | A collection  of the updated dependencies. |
| `DeletedDependencies` | `List<GanttDependencyDescriptor>`  | A collection  of the deleted dependencies. |

### GanttDependencyDescriptor

The `GanttDependencyDescriptor` exposes four fields that describe the mutated dependency:

| Field | Type | Description |
|----------|----------|----------|
| `PredecessorId` | `object`  | The Id of the predecessor of the mutated dependency. |
| `SuccessorId` | `object`  | The Id of the successor of the mutated dependency. |
| `Type` | `GanttDependencyType` enum | The [type of the dependency](slug:gantt-dependencies-databind). |
| `DataItem` | `object`  | The model associated with this dependency. |

>caption The Command buttons and the Gantt events let you handle data operations in Popup edit mode.

<demo metaUrl="client/gantt/popup/example-2/" height="740"></demo>

>note It is up to the data access logic to save the data once it is changed in the data collection, or to revert changes. The example above showcases the events that allow you to do that. In a real application, the code for handling data operations may be entirely different.

## Customization

The Gantt exposes options to customize the edit popup and its form. You can define your desired configuration in the `GanttPopupEditSettings` and `GanttPopupEditFormSettings` tags under the `GanttSettings` tag.

### Popup Settings

The `GanttPopupEditSettings` nested tag exposes the following parameters to allow popup customization:

@[template](/_contentTemplates/common/popup-edit-customization.md#popup-settings)

### Edit Form Customization

The `GanttPopupEditFormSettings` nested tag exposes the following parameters to allow edit form customization:

Parameter | Type | Description
---------|----------|---------
 `Columns` | `int` | The count of the columns
 `ColumnSpacing` | `int` | The column spacing 
 `Orientation` | `FormOrientation` <br/> (`Vertical`) | The orientation of the form. Takes a member of the `FormOrientation` enum: <br/> - `Horizontal` <br/> - `Vertical`

>caption Customize the popup edit form

<demo metaUrl="client/gantt/popup/example-1/" height="740"></demo>

## See Also

* [Live Demo: Gantt Popup Editing](https://demos.telerik.com/blazor-ui/gantt/editing-popup)
   
