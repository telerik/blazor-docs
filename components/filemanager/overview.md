---
title: Overview
page_title: FileManager Overview
description: Overview of the FileManager for Blazor.
slug: filemanager-overview
tags: telerik,blazor,filemanager,overview
published: True
position: 0
---

# Blazor FileManager Overview

The <a href = "https://www.telerik.com/blazor-ui/filemanager" target="_blank">Blazor FileManager component</a> ....



## Creating Blazor FileSelect

1. Add the `TelerikFileSelect` tag.
1. Set `AllowedExtensions` to a `List<string>`.
1. Set `MaxFileSize` in bytes.
1. If you are using a Blazor **Server** app and `MaxFileSize` is greater than **32 KB**, [increase the maximum SignalR message size](#large-file-support).
1. Implement an [`OnSelect` event handler]({%slug fileselect-events%}#onselect).

Steps 2 and 3 are optional, but strongly recommended.

>caption Using FileSelect

````CSHTML

````


## Elements

## Data Binding

## Toolbar

## Navigation

## Preview Pane

## Events

## Methods

Rebind ()



## FileManager Parameters

The following table lists the FileManager parameters. Also check the [FileManager API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikFileManager) for a full list of properties, methods and events.


| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |



## Next Steps

* [FileManager Data Binding]({%slug filemanager-data-binding%})
* [Explore FileManager Events]({%slug filemanager-events%})


## See Also

* [FileManager API](/blazor-ui/api/Telerik.Blazor.Components.TelerikFileManager)
* [Live Demo: FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview)
