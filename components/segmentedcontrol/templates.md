---
title: Templates
page_title: SegmentedControl - Templates
description: Use the ItemTemplate of the Blazor SegmentedControl to customize how each segment renders its content, including custom icons and text labels.
slug: segmentedcontrol-templates
tags: telerik,blazor,segmented,control,templates
published: True
position: 20
components: ["segmentedcontrol"]
---

# SegmentedControl Templates

The SegmentedControl lets you customize the rendering of each item using an [Item Template](#item-template).

## Item Template

`<ItemTemplate>` allows you to control what is rendered inside each item button. The custom template content replaces the default item rendering (icon and text). The item remains a `<button>` HTML element regardless of the template content.

The template receives a `context` argument that represents the current item from the `Data` collection.

>caption Use ItemTemplate to render item text with a conditional notification count badge

<demo metaUrl="client/segmentedcontrol/templates/example-1/" height="320"></demo>

## See Also

* [SegmentedControl Overview](slug:segmentedcontrol-overview)
* [SegmentedControl Events](slug:segmentedcontrol-events)
