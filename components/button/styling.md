---
title: Styling
page_title: Button Styling
description: Learn how to apply styles to the Blazor Button component by Telerik UI.
slug: button-styling
tags: telerik,blazor,button,styling,
published: True
position: 10
---

# Styling

There are a few ways to style the Button component:

* Set a [primary button](#primary-button) style.
* Use another [built-in theme](slug://themes-overview).
* Use the [Button `Class`](#button-class) attribute.

## Primary Button

To set a Primary button you should set the `ThemeColor` parameter to `primary`. [Read the Appearance article for further information...](slug://button-appearance).

## Button Class

The Class attribute allows you to define custom CSS rules that apply to the HTML rendering of one or several Buttons.

>caption Set CSS class to the button and change its appearance

````RAZOR
<TelerikButton Class="my-button">Large button with red text</TelerikButton>

<style>
    .my-button,
    .my-button:hover {
        color: red;
        width: 200px;
        height: 50px;
    }
</style>
````
