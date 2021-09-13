---
title: Overview
page_title: Gantt Chart - Dependencies
description: Overview of the Dependencies for the Gantt Chart for Blazor.
slug: gantt-dependencies-overview
tags: telerik,blazor,gantt,chart,dependencies
published: True
position: 0
---

# Gantt Dependencies

The Telerik Gantt for Blazor allows you define dependencies, which are rendered in the [Timeline]({%slug gantt-timeline%}) section of the component. A dependency represents a relation between two tasks. The direction of the arrow indicates which task dependent on the other. You can bind a [data collection]({%slug gantt-dependencies-databind%}), define different [types]({%slug gantt-dependencies-types%}) of dependencies, and allow your users to [edit]({%slug gantt-dependencies-editing%}) the dependencies.


#### To define dependencies in your Gantt Chart

* Add the `GanttDependenciesSettings` tag, child tag of the `<TelerikGantt>`
* inside the `GanttDependenciesSettings` add the `<GanttDependencies>` and provide a data collection to the `Data` parameter. 


## Gantt Dependencies Features:

* Data Binding - You can provide a collection of dependencies to the Gantt Chart for Blazor. For more information read the [Data Binding]({%slug gantt-dependencies-databind%}) article.

* `TypeField` - `string` - Defines the dependency type. For more information read the [Types]({%slug gantt-dependencies-types%}) article. 

* `Editing` - You can allow the user edit the dependencies. For more information read the [Editing]({%slug gantt-dependencies-editing%}) article.

