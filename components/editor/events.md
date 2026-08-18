---
title: Events
page_title: Editor - Events
description: Events of the Editor for Blazor.
slug: editor-events
tags: telerik,blazor,editor,event
published: True
position: 150
components: ["editor"]
---

# Editor Events

This article explains the events available in the Telerik Editor for Blazor:

* [ValueChanged](#valuechanged)

## ValueChanged

The `ValueChanged` event in the editor is debounced with the `DebounceDelay` value (100ms by default). Every time the user changes the content and that interval elapses, the event will fire and will provide you with the new content.

When you use that event, you cannot use two-way binding and so you must update the view-model field yourself. If you do not do that, you can effectively cancel the user input, or you can even alter the content.

>caption Handle the ValueChanged event

<demo metaUrl="client/editor/events/value-changed/" height="300"></demo>


## See Also

* [Editor Overview](slug:editor-overview)
