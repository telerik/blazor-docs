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

The Telerik Gantt for Blazor lets you define dependencies, which are rendered in the [Timeline](slug://gantt-timeline) section of the component. A dependency represents a relation between two tasks. The direction of the arrow indicates which task is dependent on the other. You can bind a [data collection of different dependency types](slug://gantt-dependencies-databind) and allow your users to [edit](slug://gantt-dependencies-editing) the dependencies.

## Basics

To define dependencies in your Gantt Chart:

* Add the `GanttDependenciesSettings` tag, child tag of the `<TelerikGantt>`.
* Inside the `GanttDependenciesSettings` add the `<GanttDependencies>` and provide a data collection to the `Data` parameter. 

## Gantt Dependency Features

* [Dependency Data Binding](slug://gantt-dependencies-databind) allows you to provide a collection of dependencies to the Gantt Chart for Blazor.
* [Dependency Editing](slug://gantt-dependencies-editing) allows the user to edit the dependencies.
