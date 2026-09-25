---
title: Modes
page_title: PromptBox - Input Modes
description: Learn about the different input modes of the Blazor PromptBox component - SingleLine, MultiLine, and Auto modes with their behaviors and use cases.
slug: promptbox-modes
tags: telerik,blazor,promptbox,modes,singleline,multiline,auto
published: True
position: 15
components: ["promptbox"]
---

# PromptBox Input Modes

The Blazor PromptBox component supports three distinct input modes that adapt to different user scenarios and content requirements. Each mode provides a specific behavior for text input and adornment positioning.

You can control the input mode through the `Mode` parameter using the `PromptBoxMode` enumeration.

## Mode Types

The PromptBox supports the following input modes:

* Auto Mode (Default): Starts as a single-line input and automatically expands into a multi-line textarea when the content overflows.

* SingleLine Mode: A fixed single-line input with horizontal scrolling. The height remains constant regardless of content length.

* MultiLine Mode: A traditional textarea that grows vertically and supports scrolling. Best suited for longer content entered across multiple lines from the start.

## Example

>caption Comprehensive mode comparison

<demo metaUrl="client/promptbox/modes/example-1/" height="420"></demo>

## See Also

* [PromptBox Overview](slug:promptbox-overview)
* [PromptBox Adornments](slug:promptbox-adornments)
* [PromptBox Events](slug:promptbox-events)