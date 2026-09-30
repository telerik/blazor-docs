---
title: Editing
page_title: ListView - Editing
description: How to edit, insert and delete items in the listview for Blazor.
slug: listview-editing
tags: telerik,blazor,listview,editing,crud
published: True
position: 3
components: ["listview"]
---

# Editing

The ListView lets you edit the data through a dedicated [edit template](slug:listview-templates#edit-template). You can put the items in edit/insert mode, as well as delete items through dedicated command buttons from the listview.

To invoke the commands, use the `ListViewCommandButton` component in the templates of the component. It can take the following built-in `Command` values:
* `Add` - initializes a new item insertion by adding the `EditTemplate` at the top of the listview.
* `Edit` - puts the item in whose `Template` it is in edit mode so it renders its `EditTemplate`.
* `Save` - saves the changes on the currently edited/inserted item.
* `Delete` - deletes the current item.
* `Cancel` - cancels the current operation (e.g., puts the edited item into read mode without saving changes, or removes thew newly inserted item).

The command buttons expose the standard button features such as icons, text, primary state and an `OnClick` event handler that you can use to implement custom commands, although you can use any button or DOM event handler for that.

The CUD operations are implemented through dedicated events that let you alter the data source (both in the view-model, in in your actual database):

* `OnUpdate` - fires when an existing item is saved.
* `OnEdit` - fires when the user clicks the Edit command, cancellable.
* `OnCreate` - fires when a new item is saved.
* `OnDelete` - fires when an item is deleted.
* `OnCancel` - fires when the Cancel button is clicked.

@[template](/_contentTemplates/common/inputs.md#edit-debouncedelay)

>caption How to edit data in the ListView

<demo metaUrl="client/listview/editing/example-1/" height="420"></demo>

>caption The result from the code snippet above after clicking Edit for the second item

>tip You can add validation in the edit/insert templates as well, and handle it by cancelling the `OnUpdate` and `OnCreate` events depending on the result of the validation (be that local `DataAnnotation` validation, or remote validation through your data service). You can find several examples in the [ListView Validation](https://github.com/telerik/blazor-ui/tree/master/listview/ValidationExamples) sample project.


## See Also

* [ListView Overview](slug:listview-overview)
   
  
