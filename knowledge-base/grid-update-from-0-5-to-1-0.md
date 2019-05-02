---
title: Upgrade grid from 0.5.0 to 1.0.0
description: Handle the changes in the grid API between the 0.5.0 pre-release and the first official 1.0.0 version.
type: how-to
page_title: Upgrade grid from 0.5.0 to 1.0.0
slug: grid-update-from-0-5-to-1-0
position: 
tags: 
ticketid: 
res_type: kb
---

There are some changes in the events and API of the Telerik Blazor Grid component between the 0.5.0 pre-release version and the 1.0.0 official version. We made them in order to provide better functionality, consistency and semantics of the way the component works.

Here is a list of the changes:

* The `Create` command is now called `Add`.
* The `Update` command is now called `Save`.
* The `OnCreate` event is now fired when a newly inserted item is saved. Previously, it was fired when the Add button was clicked.
* The `OnUpdate` event does not fire for newly inserted items, they are now to be handled through the `OnCreate` event.

You can find more details (and samples) on the current way the grid operates in the following articles:

* [grid editing overview]({%slug components/grid/editing/overview%})
* [grid command buttons]({%slug components/grid/columns/command%})
* [grid toolbar]({%slug components/grid/features/toolbar%})
