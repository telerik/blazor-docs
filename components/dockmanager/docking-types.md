---
title: Docking Types
page_title: DockManager - Docking Types
description: Docking Types in the DockManager for Blazor.
slug: dockmanager-dock-types
tags: telerik, blazor, dockmanager, docking
published: true
position: 10
components: ["dockmanager"]
---

# Docking Panes

The Blazor DockManager component exposes the ability to dock globally or within other panes.

## Docking Types

### Global Docking

When a user drags a pane, a global docking navigator always appears. This allows the user to dock the pane to one of the component's edges, making it a root pane.

### Inner Docking

When a user drags a pane and hovers over another pane, a dock navigator for that pane appears. The user can then choose to:

* Drop the pane on any of the parent pane’s outer edges, splitting it.
* Drop it in the center of the navigator to add it as a tab within the parent pane.

## Disable Docking over Individual Panes

To disable docking over a specific pane, set its `Dockable` parameter to `false`.

>caption DockManager with disabled docking option over some panes.

<demo metaUrl="client/dockmanager/docking-types/" height="650"></demo>