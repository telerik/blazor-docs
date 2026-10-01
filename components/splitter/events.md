---
title: Events
page_title: Splitter - Events
description: Events in the Splitter for Blazor.
slug: splitter-events
tags: telerik,blazor,splitter,events
published: true
position: 20
components: ["splitter"]
---

# Events

This article explains the events available in the Telerik Splitter for Blazor:

* Splitter
    * [OnCollapse](#oncollapse)
    * [OnExpand](#onexpand)
    * [OnResize](#onresize)
* Pane
    * [SizeChanged](#sizechanged)
    * [CollapsedChanged](#collapsedchanged)

## OnCollapse

The `OnCollapse` event fires when a pane is collapsed. It receives the index of the pane that was collapsed in its event arguments.

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

>caption Handling the OnCollapse event of the splitter

<demo metaUrl="client/splitter/events/example-5/" height="420"></demo>


## OnExpand

The `OnExpand` event fires when a pane is expanded. It receives the index of the pane that was expanded in its event arguments.

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

>caption Handling the OnExpand event of the splitter

<demo metaUrl="client/splitter/events/example-4/" height="420"></demo>


## OnResize

The `OnResize` event fires after the user has finished resizing a pane (after the mouse button is released). It fires for each resized pane and receives the index and new size in its event arguments.

@[template](/_contentTemplates/common/general-info.md#rerender-after-event)

>caption Handle the OnResize event of the splitter

<demo metaUrl="client/splitter/events/example-3/" height="420"></demo>

## SizeChanged

The `SizeChanged` event is triggered when the `Size` parameter of the corresponding pane is changed.

>caption Handle the SizeChanged event of a Splitter Pane

<demo metaUrl="client/splitter/events/example-2/" height="420"></demo>


## CollapsedChanged

The `CollapsedChanged` event is triggered when the `Collapsed` parameter of the corresponding pane is changed.

>caption Handle the CollapsedChanged event of a Splitter Pane

<demo metaUrl="client/splitter/events/example-1/" height="420"></demo>

## See Also

* [Splitter Overview](slug:splitter-overview)
