---
title: Breaking Changes in 2.0.0
description: Handle the changes in the 2.0.0 major release of the Telerik UI for Blazor components.
type: how-to
page_title: Changes in 2.0.0
slug: changes-in-2-0-0
position: 
tags: 
ticketid: 
res_type: kb
---

In the `2.0.0` release, there are some changes in the Telerik Blazor components that have been brewing for a while due to the evolution of the framework. This article explains what they are and what you need to change.

A shortlist of the changes:
* The component namespaces changed, so now you only need to include `@using Telerik.Blazor.Components` and `@using Telerik.Blazor` in your main `_Imports.razor` file, instead of a per-component statement in each view.
* Some inner tags changed names for brevity. A detailed list with the changes per component is available below.
    * Most notably, the `Telerik` prefix is removed from all child tags, only the root-level components are still `<TelerikComponentName>`.
* Some methods that manipulated collections or state are now gone. The way to alter collections (like Action buttons on a Window) is to use conditional markup and looping over collections from a view model. When we were initially creating the components, there were indications that there will be programmatic creation options. It seems this is not going to be the case, and conditional markup plus binding is the way to affect markup.

## Namespace Change

Until now, you had to include things like `@using Telerik.Blazor.Components.<ComponentName>` for every component use used, in every view.

As of the `2.0.0` version, you only need to add the following to your main **~/_Imports.razor** file, and you have to remove the `@using` statements per component:

````
@using Telerik.Blazor
@using Telerik.Blazor.Components
````

You can keep `@using Telerik.Blazor.Components` in the views, it simply is not needed anymore.

## Removed Methods and Properties

This is a list of the components that had methods removed and the new approach of doing things.

### Grid

* The `AddColumn()` and `RemoveColumn()` methods are removed. Use conditional markup instead, like in the [Columns demo](https://demos.telerik.com/blazor-ui/grid/columns).
* The `Filterable` property is removed in favor of `FilterMode`.
* The `EditMode` property is now an enum. Use `EditMode="@GridEditMode.Incell|Inline|Popup"`.


## Removed Tags

This is a list of the components that had their child tags removed.

### Grid

Here are the changes in the grid:

* The `TelerikGridEvents` and `EventsManager` tags are removed. The CRUD events of the grid are now available at its root-level tag, for example `<TelerikGrid OnRead=@ReadItems>`.



