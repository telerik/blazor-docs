---
title: Confirm Button Click and Create a Message Box
description: How to confirm the click of a button and to create a message box.
type: how-to
page_title: How to confirm button click and create a message box
slug: common-kb-confirm-button-messagebox
position: 
tags: 
res_type: kb
---


## Description

Sometimes user actions can be sensitive or result in data deletion. For such cases, you may want to require confirmation to protect against accidental clicks.


## Solution

UI for Blazor includes [Alert, Confirm and Prompt popup dialogs]({%slug dialog-predefined%}), which can be used to interact with the user.

Another option is to use the [Window component]({%slug components/window/overview%}), if the predefined Dialogs do not provide enough flexibility for a specific scenario. Here are two examples:

* [https://github.com/telerik/blazor-ui/tree/master/common/confirm-button](https://github.com/telerik/blazor-ui/tree/master/common/confirm-button)
* [https://github.com/telerik/blazor-ui/tree/master/common/message-box](https://github.com/telerik/blazor-ui/tree/master/common/message-box)
