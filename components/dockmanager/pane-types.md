---
title: Pane Types
page_title: DockManager - Pane Types
description: Pane Types in the DockManager for Blazor.
slug: dockmanager-pane-types
tags: telerik, blazor, dockmanager, panes
published: true
position: 5
components: ["dockmanager"]
---

# Pane Types

The Blazor DockManager component exposes the ability to configure different pane types.

When defining pane types, the naming convention follows the structure `<DockManager`**`Type`**`Pane>`, where **Type** specifies the behavior of the pane. The available types are:

## Content Pane

Provides full control over explicitly defining custom content to be rendered for a given pane based on specific requirements. 

* It can be a direct child of all other panes and the `<DockManagerPanes>` tag.
* The `DockManagerContentPane` cannot have child panes.

## TabGroup Pane

Groups panes in a tab strip, similar to the [TabStrip component](slug:tabstrip-overview). Users can navigate through panes using tabs in the header. 

* It can be a direct child of `<DockManagerSplitPane>`. 
* It can only contain `<DockManagerContentPane>` children.

## Split Pane

Organizes panes in a [Splitter-like](slug:splitter-overview) manner, allowing the container pane to be split either horizontally or vertically. 

* It can be a direct child of another `<DockManagerSplitPane>`. 
* It can contain `<DockManagerTabGroupPane>`, `<DockManagerContentPane>`, and other `<DockManagerSplitPane>` tags as children. 
* Only this pane type can be declared as a direct child of the `<DockManagerFloatingPanes>` tag.

## Restore Closed Panes

To restore closed panes, track their visibility state in a collection. Use two-way binding for the `Size` parameter to persist the pane size.  

The following example demonstrates how to use:

* Two-way binding to maintain pane size.
* The `Visible` parameter and the `VisibleChanged` event to track pane visibility.

>caption Restore closed panes through `Visible` and `@bind-Size`

<demo metaUrl="client/dockmanager/pane-types/" height="700"></demo>

## Examples

Check the [DockManager Overview](slug:dockmanager-overview) and [DockManager Events](slug:dockmanager-events) articles for examples that include all pane types.
