---
title: Card Icon Button Size Too Big
description: Card Action icon buttons can expand and become large squares when using vertical orientation or stretched layout.
type: troubleshooting
page_title: Card Icon Button Size Incorrect
slug: card-kb-icon-buttons-too-large
position: 
tags: card, buttons
ticketid: 1558442
res_type: kb
category: knowledge-base
components: ["card"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Card for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

Card icon buttons are sized incorrectly when used with vertical orientation. The CardAction icon buttons become huge squares with side length of the Card's width.

The icon buttons become large squares also in horizontal orientation with stretched layout.


## Possible Cause

There are two CSS styles in the Telerik Blazor theme, which cause the action icon buttons to increase their size and become big:

1. Icon buttons without text are square by definition:

    <div class="skip-repl"></div>
    ````CSS
    .k-icon-button {
        aspect-ratio: 1;
    }
    ````

1. A `Stretch` Layout or `Vertical` Orientation for the `CardActions` area will expand the action buttons **horizontally**, so they fill the Card width. However, icon buttons will also expand **vertically**, because of their square aspect ratio.

    <div class="skip-repl"></div>
    ````CSS
    .k-card-actions-stretched > * {
        flex: 1 1 auto;
    }
    ````


## Solution

There are two ways to prevent icon button expansion:

* [Use **Horizontal** `CardOrientation` together with **Center** `CardActionsLayout`](slug:card-actions).
* Use a custom CSS class to [override the theme styles](slug:themes-override) and remove the square aspect ratio.

>caption Prevent CardAction icon buttons becoming too large


````RAZOR
<p>Card 1</p>

<TelerikCard Width="350px">
    <CardHeader>
        <CardTitle>Vertical orientation</CardTitle>
        <CardSubTitle>Custom CardActions Class</CardSubTitle>
    </CardHeader>
    <CardActions Orientation="@CardOrientation.Vertical" Class="no-icon-expand">
        <TelerikButton FillMode="@FlatFillMode" Icon="@SvgIcon.Comment"></TelerikButton>
        <TelerikButton FillMode="@FlatFillMode" Icon="@SvgIcon.Comment"></TelerikButton>
    </CardActions>
</TelerikCard>

<p>Card 2</p>

<TelerikCard Width="350px">
    <CardHeader>
        <CardTitle>Horizontal orientation / Stretched layout</CardTitle>
        <CardSubTitle>Custom CardActions Class</CardSubTitle>
    </CardHeader>
    <CardActions Orientation="@CardOrientation.Horizontal" Layout="CardActionsLayout.Stretch" Class="no-icon-expand">
        <TelerikButton FillMode="@FlatFillMode" Icon="@SvgIcon.Comment"></TelerikButton>
        <TelerikButton FillMode="@FlatFillMode" Icon="@SvgIcon.Comment"></TelerikButton>
    </CardActions>
</TelerikCard>

<p>Card 3</p>

<TelerikCard Width="350px">
    <CardHeader>
        <CardTitle>Horizontal orientation / Center layout</CardTitle>
    </CardHeader>
    <CardActions Orientation="@CardOrientation.Horizontal" Layout="@CardActionsLayout.Center">
        <TelerikButton FillMode="@FlatFillMode" Icon="@SvgIcon.Comment"></TelerikButton>
        <TelerikButton FillMode="@FlatFillMode" Icon="@SvgIcon.Comment"></TelerikButton>
    </CardActions>
</TelerikCard>

<style>
    .no-icon-expand .k-icon-button {
        aspect-ratio: auto;
    }
</style>

@code {
    string FlatFillMode { get; set; } = ThemeConstants.Button.FillMode.Flat;
}
````
