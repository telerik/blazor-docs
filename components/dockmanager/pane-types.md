---
title: Pane Types
page_title: DockManager - Pane Types
description: Pane Types in the DockManager for Blazor.
slug: dockmanager-pane-types
tags: telerik, blazor, dockmanager, panes
published: true
position: 5
---

# Pane Types

The Blazor DockManager component exposes the ability to configure different pane types.

When defining pane types, the naming convention follows the structure `<DockManager*Type*Pane>`, where **Type** specifies the behavior of the pane. The available types are:

#### Content Pane

Provides full control over explicitly defining custom content to be rendered for a given pane based on specific requirements. 

* It can be a direct child of all other panes and the `<DockManagerPanes>` tag.
* The `DockManagerContentPane` cannot have child panes.

#### TabGroup Pane

Groups panes in a tab strip, similar to the [TabStrip component](slug://components/tabstrip/overview). Users can navigate through panes using tabs in the header. 

* It can be a direct child of `<DockManagerSplitPane>`. 
* It can only contain `<DockManagerContentPane>` children.

#### Split Pane

Organizes panes in a [Splitter-like](slug://splitter-overview) manner, allowing the container pane to be split either horizontally or vertically. 

* It can be a direct child of another `<DockManagerSplitPane>`. 
* It can contain `<DockManagerTabGroupPane>`, `<DockManagerContentPane>`, and other `<DockManagerSplitPane>` tags as children. 
* Only this pane type can be declared as a direct child of the `<DockManagerFloatingPanes>` tag.