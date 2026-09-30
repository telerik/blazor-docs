---
title: Data Binding to Interface
page_title: Blazor TreeList - Data Binding to Interface | Telerik UI for Blazor
description: Data binding the Blazor TreeList to multiple model types with the same interface.
slug: treelist-data-binding-interface
tags: telerik,blazor,treelist,data,bind,databind,databinding,interface
published: true
position: 4
components: ["treelist"]
---

# TreeList Data Binding to Interface

Since version 2.27, the TreeList supports binding to a collection of multiple model types that implement the same interface.

Note the usage of [`OnModelInit`](slug:treelist-events#onmodelinit) in the example below. The event handler sets the model type to be used for new items in the TreeList. One-type model creation is supported out-of-the-box. If you need to support adding instances of different types:

* Use custom **Add** buttons in the [TreeList Toolbar](slug:treelist-toolbar), one for each model type.
* In each button click handler, define an `InsertedItem` of the correct type in the [TreeList State](slug:treelist-state).
* [Put the TreeList in Insert mode](slug:treelist-kb-add-edit-state) with the [SetStateAsync method](slug:treelist-state#methods).

>caption Data Binding the TreeList to an Interface

<demo metaUrl="client/treelist/data-binding/interface/example-1/" height="720"></demo>

>note Up to version 2.26, the `Data` collection of the TreeList must contain instances of only one model type.


## See Also

* [Binding to Flat Data](slug:treelist-data-binding-flat-data)
* [Binding to Hierarchical Data](slug:treelist-data-binding-hierarchical-data)
* [Load on Demand](slug:treelist-data-binding-load-on-demand)
* [Live Demo: TreeList Flat Data](https://demos.telerik.com/blazor-ui/treelist/binding-flat-data)
* [Live Demo: TreeList Hierarchical Data](https://demos.telerik.com/blazor-ui/treelist/binding-hierarchical-data)
* [Live Demo: TreeList Load on Demand](https://demos.telerik.com/blazor-ui/treelist/load-on-demand)
