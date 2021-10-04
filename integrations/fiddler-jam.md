---
title: Fiddler Jam in Blazor
page_title: Fiddler Jam in Blazor
description: Capture network logs and log issues in a Blazor application
slug: fiddler-jam-blazor
tags: telerik,blazor,fiddler,jam,capture,log,issue,video
published: True
position: 0
---

# Fiddler Jam

[Fiddler Jam](https://www.telerik.com/fiddler-jam) is Telerik's new tool designed to facilitate the information exchange between the support and end-user. A simple capture log can provide a lot of useful information to the support team:

* Video recording and screenshots, along with sharable link
* Captured user actions such as mouse and keyboard interactions
* Captured console logs and errors
* Captured network traffic
* Captured Local and Session Storage logs

The tool's mission is to reduce the back-and-forth communication in support messages, and save time of our customers. In addition, this would help the support team understand and investigate the issue faster and thus the response time would be shorter.

## Install Fiddler Jam

Fiddler Jam provides powerful Chrome extension that could be installed from [Chrome Web Store page for Fiddler Jam](https://chrome.google.com/webstore/detail/fiddler-jam/fnkjlegmkbicdodlheligomlfbdblpfj). 

You could find detailed instruction on how to install the extension in [Fiddler Jam Extension Installation](https://docs.telerik.com/fiddler-jam/extension/installation) article.

## Capture a Log

Once you have [installed the Fiddler Jam browser extension](#installing-fiddler-jam), you can start capturing your use case, or an issue, and then send it to the support team. You can capture issues for both Blazor Server-side applications and Blazor WebAssembly applications.

The detailed capturing instructions can be found in [Fiddler Jam extension - Recording a log](https://docs.telerik.com/fiddler-jam/extension/recording-a-log) while below you can find a short video demonstrating the Installation and Capture processes. For convenience, below you can find summarized instructions to follow more easily when capturing a log.

<iframe style="width:560px; height:315px; display: block; margin-left: auto; margin-right: auto;" src="https://www.youtube.com/embed/AegKWavRSv0" title="YouTube Video Player - Blazor, FiddlerJam" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

1. Navigate to <a href="about:blank" target="_blank">about:blank</a> or an empty page to ensure a clean capture
2. Open the Fiddler Jam extension (the default shortcut is `Ctrl+Shift+F`)
3. Configure the recording settings through the `Advanced Options` button (located above the `Start Capture` button):
   - Ensure the `Mask Post Data` switch is `disabled` if reproducing the issue triggers a postback or a POST request
   - Ensure the `Capture video` is `enabled` to provide more details and context in the capture
   - Configure other settings per your assessment. Hover the information icon to see a brief explanation of the setting
        <br /> <br />![Fiddler Jam Settings](images/fiddler-jam-capture-settings.png)
4. Click the `Start Capture button`
5. Navigate to your blazor application (e.g. `https://mydomain.com/mypagewithissue`) in the same tab. In case you started the capture from your `https://mydomain.com/mypagewithissue` page instead of a blank page, follow the steps below to ensure a proper capture
   1. Click the address bar
   2. Press Enter to navigate
    >note **Important**: The page refresh must be from navigation to the page, otherwise the browser will use the requests from cache and will not include them in the capture
6. Perform all interactions to reproduce the issue
7. After the issue is replicated, open the extension again(or use the shortcut `Ctrl+Shift+F`) and click the `Stop Capture` button
8. Proceed to [Submit a log](#submit-a-log)

## Submit a log
1. (*Optional*) You could use the `Password Protection` switch button to restrict the access to the captured data by entering a password (requirements: min 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number).
1. Click the `Get Link` button
1. Copy the generated link and share it in the support ticket

## Useful Resources

* [Product Page: Fiddler Jam](https://www.telerik.com/fiddler-jam)
* [Documentation: Fiddler Jam](https://docs.telerik.com/fiddler-jam/introduction)