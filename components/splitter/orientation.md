---
title: Orientation
page_title: Splitter Orientation
description: Splitter Orientation
slug: splitter-orientation
tags: telerik,blazor,splitter,orientation,horizontal,vertical
published: True
position: 8
components: ["splitter"]
---

# Splitter Orientation

You can customize the Splitter orientation through the its `Orientation` parameter. It takes a member of the `SplitterOrientation` enum:

* `Horizontal` (the default)
* `Vertical`

>caption Splitter with vertical orientation

<demo metaUrl="client/splitter/orientation/example-2/" height="500"></demo>

## Nested Splitters With Different Orientation

You can create more complex layouts that include both horizontal and vertical Splitters. To do that, add a Telerik Splitter as a child of another Splitter's pane. Usually, the nested Splitter should be 100% high.

>caption Layout with nested Splitters

<demo metaUrl="client/splitter/orientation/example-1/" height="570"></demo>

## Next Steps

* [Manage the Splitter state](slug:splitter-state)
* [Handle Splitter events](slug:splitter-events)

## See Also

* [Live Demo: Splitter Orientation](https://demos.telerik.com/blazor-ui/splitter/orientation)
