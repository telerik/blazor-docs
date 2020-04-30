---
title: Responsive Window
description: How to adjust the size of a Window when its container or the browser window size changes
type: how-to
page_title: How to make a responsive Window
slug: window-kb-responsive
position:
tags:
res_type: kb
---

## Environment
<table>
    <tbody>
	    <tr>
	    	<td>Product</td>
	    	<td>Window for Blazor</td>
	    </tr>
    </tbody>
</table>


## Description

When the user resizes the browser window you may want to have the window resized with the new dimensions.



## Solution

The following examples show how you can make responsive Window:
* [Dimensions set in percent](#dimensions-set-in-percent)
* [CSS media queries](#css-media-queries)

### Dimensions set in percent
Generally, the `Width` and `Height` parameters of the Window can take values in `%`, and the chart will render according to the dimensions of its parent element.

This works well for the initial rendering and the chart will be "responsive" immediately according to your layout, regardless of the display (desktop, tablet, phone).

>note When being rendered those parameters will be inline CSS styles, meaning that they will have the highest priority. If you want to override them you must use the `!important` statement.

>caption Observe the behavior of a Window with set `Width` and `Height` in `%`

````CSHTML
@* The Width and Height parameters are set to 40% *@

<TelerikWindow Modal="true"
               Visible="true"
               Width="40%"
               Height="40%">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        I am modal so the page behind me is not available to the user.
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Name="Maximize" />
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>
````
### CSS media queries

If you want to use the CSS media queries you have to create a separate CSS file under the wwwroot. This is required because the media queries start with @ which conflicts with the Razor syntax.

>caption Observe the behavior of a Window made responsive with media queries

**Component:**
````CSHTML
@* The Class parameter is set to make cascading the styles easier *@

<TelerikWindow Modal="true"
               Visible="true"
               Class="myWindow">
    <WindowTitle>
        <strong>The Title</strong>
    </WindowTitle>
    <WindowContent>
        I am modal so the page behind me is not available to the user.
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize" />
        <WindowAction Name="Maximize" />
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>
````

**CSS file:**

````CSHTML
@* The myWindow class used in the media queries is the same as in the Class parameter *@
@* Add the CSS file in the _Host.cshtml *@

@media only screen and (min-width: 992px) {
    .myWindow{
        max-width: 800px;
    }
}

@media only screen and (min-width: 576px) and (max-width: 992px) {
    .myWindow {
        width: 500px;
    }
}

@media only screen and (min-width: 300px) and (max-width: 576px) {
    .myWindow {
        width: 350px;
    }
}
````

## See also:

 * [Documentation Window for Blazor | Size]({%slug components/window/size%})
