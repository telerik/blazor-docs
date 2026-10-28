---
title: Events
page_title: ExpansionPanel Events
description: Learn about the Telerik ExpansionPanel component events and event arguments.
slug: expansionpanel-events
tags: blazor,expansionpanel,events
components: ["expansionpanel"]
published: True
position: 100
---

# ExpansionPanel Events

This article describes the available events in the Telerik ExpansionPanel for Blazor.

## ExpandedChanged

The ExpansionPanel `ExpandedChanged` event fires when:

* The user expands or collapses the component.
* The app executes the component's `ExpandAsync`, `CollapseAsync`, or `ToggleAsync` method.

Make sure to update the value of the `Expanded` parameter by using the boolean argument that the event handler receives.

>caption Using the ExpansionPanel events

<demo metaUrl="client/expansionpanel/events/events-1/" height="420"></demo>

## See Also

* [ExpansionPanel API Reference](slug:Telerik.Blazor.Components.TelerikExpansionPanel)
