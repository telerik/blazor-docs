---
title: Editing does not Work When Model Properties are Read-Only or Without Setters
description: The editing fails when the bound model has read-only properties
type: troubleshooting
page_title: Editing does not Work When Model Properties are Read-Only or Without Setters
slug: common-kb-read-only-properties
position: 
tags: grid, scheduler, edit, telerik, blazor, readonly, setter
ticketid: 1631052, 1620193, 1621413, 1632496, 1632497
res_type: kb
components: ["general"]
---
## Environment
<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> Scheduler for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

Editing does not work, and the `OnUpdate` event does not fire when a property in my bound model does not have a setter or is read-only.  

## Error Message

If the Telerik source code is attached to the app, the following exception is thrown: 

````C#.skip-repl
System.ArgumentException: Property set method not found.
````

## Cause

By design, the component clones the edited data item, so the user can cancel editing and restore the original value. When the Grid clones the item, the component creates a new model instance and tries to set its properties. However, when some properties are read-only, the component is unable to set their properties, and an exception is thrown. 

## Solution

Currently, the only solution is to bind the component to a view model with non-read-only properties with setters. If the reason for using read-only properties is to prevent editing in some columns, you can set Editable="false" to the column in question. 

## Notes

There is an open feature request that will allow developers to [populate the cloned edit item manually](https://feedback.telerik.com/blazor/1587593-add-the-ability-to-manually-populate-the-model-properties-when-creating-editing-items), this will be an alternative solution to this scenario.

