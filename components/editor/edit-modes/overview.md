---
title: Overview
page_title: Editor - Edit Modes Overview
description: Overview of the edit modes in the Editor for Blazor.
slug: editor-edit-modes-overview
tags: telerik,blazor,edit,mode,overview
published: True
position: 0
---


# Editor Edit Modes Overview

The Editor provides two different configuration modes you can set that affect the way the content is styled.

You control which mode is used through the `EditMode` parameter of the editor which takes a member of the `Telerik.Blazor.EditorEditMode` enum:

* [`Iframe`]({%slug editor-edit-modes-iframe%}) - (the default) - the content area is an editable `<iframe>` element.
* [`Div`]({%slug editor-edit-modes-div%}) - the content area is an editable `<div>` element.

The key difference is that the `Iframe` mode creates a separate HTML document for editing, and this means that it does not inherit the CSS rules from the current page, and the editor can add some rules of its own to provide styling (for example, for `<table>` elements).

````CSHTML
@* the two different edit modes *@

<TelerikEditor @bind-Value="@Val1" EditMode="@EditorEditMode.Iframe"></TelerikEditor>

<TelerikEditor @bind-Value="@Val2" EditMode="@EditorEditMode.Div"></TelerikEditor>

@code {
    public string Val1 { get; set; } = "<p>I am in an iframe</p>";
    public string Val2 { get; set; } = "<p>I am in a div</p>";
}
````



## See Also

  * [Div Mode]({%slug editor-edit-modes-div%})
  * [Iframe Mode]({%slug editor-edit-modes-iframe%})
  * [Editor Overview]({%slug editor-overview%})
  * [Editor Toolbar]({%slug editor-toolbars%})

