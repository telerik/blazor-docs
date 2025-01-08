---
title: Upload Files to Azure Blob Storage
description: How to upload files directly to Azure Blob Storage using the Telerik Blazor FileSelect and Upload components.
type: how-to
page_title: How to Upload Files Directly to Azure Blob Storage
slug: upload-kb-azure-blob-storage
position: 
tags: fileselect, upload, azure
ticketid: 1532310, 1555878, 1567320
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>FileSelect for Blazor, <br /> Upload for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to upload files to Microsoft Azure Blob Storage by using Telerik Blazor components?

Can I upload files directly to Azure Blob Storage?


## Solution

Both the [FileSelect](slug://fileselect-overview) and [Upload](slug://upload-overview) components can help with uploading files to Azure Blob Storage. There are some [differences between how the two components work](slug://upload-overview#upload-vs-fileselect), which will determine the exact usage.

### Using FileSelect

The `TelerikFileSelect` provides the selected files to the .NET runtime as a `System.IO.Stream`. Use the [`OnSelect` event](slug://fileselect-events#onselect) to obtain the file and send it to the Azure blob service.

### Using Upload

The `TelerikUpload` needs an HTTP endpoint, which will receive the uploaded file via a **POST** request.

The Azure Blob Service does not expose such HTTP endpoint. Do the following:

1. [Implement a `Save` controller action method](slug://upload-overview#implement-controller-methods) in the Blazor app.
1. Set the action method URL as a `SaveUrl` in the Upload.
1. Send the uploaded file to the blob service after you obtain it in the `Save` action method.

In this way, the file will go to your Blazor app server first, then to the Azure storage.

### Security

No matter which component you use, we recommend sending the file to the Blazor application server first. This will spare the need to expose sensitive authentication information about the blob storage to the client.
