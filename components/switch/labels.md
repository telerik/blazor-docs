---
title: Labels
page_title: Switch Labels
description: Labels in the Switch for Blazor.
slug: switch-labels
tags: telerik,blazor,labels,on,off
published: True
position: 10
components: ["switch"]
---

# Switch Labels

`On` or `Off` labels are rendered inside the Switch based on its value:

* `OnLabel` will be shown when the Switch `Value` is `true` 
* `OffLabel` will be shown when the Switch `Value` is `false`

The component allows customization of the labels text through the dedicated parameters. [Provide your desired strings](#customize-labels-text) for the Switch labels or [use a blank space to remove visible labels](#remove-labels).

## Customize Labels Text

Provide the desired text for the On and Off labels through the corresponding parameters. If the text is longer, you can increase the component `Width` to ensure the label will be visible.

<demo metaUrl="client/switch/labels/customize/" height="220"></demo>

## Remove Labels

To remove the Switch labels, use a blank space for the `OnLabel` and `OffLabel` parameters.

<demo metaUrl="client/switch/labels/remove/" height="220"></demo>

## See Also

* [Live Demo: Switch Labels](https://demos.telerik.com/blazor-ui/switch/labels)
* [Switch Events](slug:switch-events)