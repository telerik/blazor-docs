---
title: Overview
page_title: DropZone Integration
description: Discover the Blazor DropZone for Blazor and explore the examples.
slug: dropzone-integration
tags: telerik,blazor,dropzone,external,drag,drop,file,overview
published: True
position: 5
---

# DropZone Integration

This article explains the specifics of integrating the DropZone with the [FileSelect]({%slug fileselect-overview%}) and [Upload]({%slug upload-overview%}) component.

>caption In this article:
* [Basics](#basics)
* [DropZone Integration with FileSelect](#dropzone-integration-with-fileselect)
* [DropZone Integration with Upload](#dropzone-integration-with-upload)

## Basics

The DropZone component can be used to define a dedicated area in the view port where the users can drag and drop files into. To further handle the file upload, you need to integrate the DropZone with either FileSelect or Upload component.

The connection is achieved in two simple steps:

1. Set the `Id` parameter of the DropZone component.
1. Set the `DropZoneId` of the FileSelect/Upload component to match the `Id` the DropZone.

Once the file is dropped in the DropZone, it is automatically sent to the connected FileSelect or Upload for further actions.

## DropZone Integration with FileSelect

````CSHTML
````

## DropZone Integration with Upload

````CSHTML
````

## See Also

  * [Live Demo: DropZone](https://demos.telerik.com/blazor-ui/dropzone/overview)
