---
title: Menu items dont close when hovered over
description: Menu items dont close when hovered over
type: troubleshooting
page_title: Menu items dont close when hovered over
slug: kb-menu-items-dont-close
position: 
tags: 
ticketid: 1479006
res_type: kb
---

## Description

I have setup a [Menu]({%slug components/menu/overview%}) in my Telerik Blazor Application. When the component is hosted and the user hovers quickly over the menu items they would not close.

>caption The menu items do not close when the user hovers quickly over them

![menu items do not close on hover](images/menu-items-dont-close.gif)
   
## Cause\Possible Cause(s)

This behavior is mainly observed when the application uses the `Blazor Server` hosting model. It occurs mostly due to high latency to the server which hosts the project because every user interaction involves a network hop (passing one data package from one network segment to the next).

If the application is deployed to a cloud hosting and the WebSockets are not enabled the performance of will be hindered.

## Solution

A solution to this would be using the `Blazor WebAssembly` hosting model. That would strip the latency since the content of the application is executed on the device of the user.