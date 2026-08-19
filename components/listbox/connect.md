---
title: Connect ListBoxes
page_title: ListBox - Connect Multiple Instances
description: How to connect (link) several ListBoxes and move items from one to another with the ListBox toolbar buttons.
slug: listbox-connect
tags: telerik,blazor,listbox
published: True
position: 30
components: ["listbox"]
---

# Connect ListBox Instances

One of the main benefits of the Telerik Blazor ListBox is the ability to move items from one component instance to another. This article explains how to link multiple ListBoxes to transfer items.

The ListBox component allows connecting unlimited number of instances. However, the connecting always works in pairs:

* There is one primary ListBox instance and one secondary.
* The primary ListBox is the one that shows toolbar buttons and fires `OnTransfer` events.
* The secondary ListBox can be primary to a third ListBox component, and so on.


## Configuration

To connect ListBox components:

1. Set the `Id` parameter of all ListBox instances.
1. Set the `ConnectedListBoxId` parameter of the primary instance to the `Id` value of the secondary instance.
1. [Hide the transfer buttons](slug:listbox-toolbar) from the secondary instance, unless it's a primary one for another ListBox.
1. Subscribe to the [`OnTransfer` event handler](slug:listbox-events#ontransfer) of all primary ListBoxes.
1. [`Rebind()`](slug:listbox-overview#listbox-reference-and-methods) each ListBox after making programmatic changes to its `Data`.

> The object references in `args.Items` in the [`OnTransfer` handler](slug:listbox-events#ontransfer) do not match the object references in the `Data` collection of the source ListBox. To remove items from the source ListBox, search for them by some unique identifier.


## Example

>caption Connect and move items between ListBoxes

<demo metaUrl="client/listbox/connect/" height="500px"></demo>


## Next Steps

* [Enable ListBox drag-and-drop](slug:listbox-dragdrop)
* [Implement ListBox templates](slug:listbox-templates)
* [Handle ListBox events](slug:listbox-events)


## See Also

* [Live Demo: ListBox](https://demos.telerik.com/blazor-ui/listbox/overview)
