---
title: Overview
page_title: Editor Overview
description: Overview of the Editor for Blazor.
slug: editor-overview
tags: telerik,blazor,editor
published: True
position: 0
---

# Editor Overview

first simple example, something like

````
<TelerikEditor @bind-Value="@TheEditorValue"></TelerikEditor>

@TheEditorValue

@code{
    string TheEditorValue { get; set; }
}
````

## Reference


## Dependencies

list the JS files for ProseMirror, that the editor registers them upon initialization to reduce initial load time and simplify usage; why JS is needed (HTML editing is a browser feature and happens in the browser, so that's where the logic for that must lie by necessity).


## Get/Set content

value binding - one and two-way (link value bind vs data bind article, link validation article); the UpdateInterval parameter.

Maybe a note that you must sanitize the html string before storing to DB and after getting it from DB to ensure it does not contain malicious content.


## Methods

talk about ExecuteAsync, where to find the command arguments and names, snippet with "paste at cursor position".


## Features

consider - maybe link toolbars, import/export, custom commands, events, validation. There isn't much left so this may drop out.


## See Also

  * [Live Demo: Editor](https://demos.telerik.com/blazor-ui/editor/overview)
  * [Toolbar]({%slug editor-toolbars%})
  * [Events]({%slug editor-events%})
  * [API Reference](https://docs.telerik.com/blazor-ui/api/Telerik.Blazor.Components.TelerikEditor)
   
