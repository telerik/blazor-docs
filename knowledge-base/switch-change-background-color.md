---
title: Change the Switch Background Color
description: How to customize the Blazor Switch styles and change the background colors for all states.
type: how-to
page_title: How to Change the Switch Background Color
slug: switch-kb-change-background-color
position: 
tags: switch, styles
ticketid: 1546317
res_type: kb
components: ["switch"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Switch for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to change the Switch background color?

How to customize the background styles of only one Switch on the page, if there are many?

What CSS class to change the Switch background color when it has focus?


## Solution

Add custom CSS rules to the app, which [override the default styles](slug:themes-override) and apply custom background color for on, off, focused and hover state.

The example below uses a `Class` parameter to render a custom CSS class to one of the Switches. To target all Switch instances on the page or in the app, remove the `.my-switch` class from the component declaration and the CSS code.

>caption Blazor Switch with custom background styles

````RAZOR
<p>
    Custom styles:
    <TelerikSwitch @bind-Value="@Value"
                    Width="70px"
                    OnLabel="Yes"
                    OffLabel="No"
                    Class="my-switch" />

    Default styles:
    <TelerikSwitch @bind-Value="@Value"
                    Width="70px"
                    OnLabel="Yes"
                    OffLabel="No" />
</p>

<p>
    <label> Toggle Switch State: <TelerikCheckBox @bind-Value="@Value" /> </label>
</p>

<style>
    /* ON - regular and hover state */
    .my-switch.k-switch-on .k-switch-track,
    .my-switch.k-switch-on:hover .k-switch-track {
        background-color: #3c3;
        color: #fff;
    }
    /* ON - focused state */
    .my-switch.k-switch-on.k-focus .k-switch-track {
        background-color: #060;
        color: #fff;
    }

    /* OFF - regular and hover state */
    .my-switch.k-switch-off .k-switch-track,
    .my-switch.k-switch-off:hover .k-switch-track {
        background-color: #ccc;
        color: #000;
    }
    /* OFF - focused state */
    .my-switch.k-switch-off.k-focus .k-switch-track {
        background-color: #666;
        color: #fff;
    }
</style>

@code {
    bool Value { get; set; }
}
````

## See Also

* [Override and customize the Blazor theme CSS](slug:themes-override)
