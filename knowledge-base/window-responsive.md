---
title: Responsive Window
description: How to adjust the size of a Window when the browser window size changes so that it is responsive
type: how-to
page_title: Responsive Window
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

When the user resizes the browser window you may want to have the window resized with the new dimensions, so it is also responsive.



## Solution

The following examples show how you can make responsive Window:
* [Dimensions set in percent](#dimensions-set-in-percent)
* [CSS media queries](#css-media-queries)


### Dimensions set in percent

Generally, the `Width` and `Height` parameters of the Window can take values in `%`, `vw` or `vh`, and the window will render according to the dimensions of its parent element (which is the `TelerikRootComponent` which should match the browser viewport).

>caption Observe the behavior of a Window with set `Width` and `Height` in `%`

````CSHTML
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


>note The `Width` and `Height` parameters render as inline CSS styles, meaning that they will have the highest priority. If you want to override them in a stylesheet (see below) you must use the `!important` statement.


### CSS media queries

You can change the dimensions of the window based on the viewport size through media queries, not only through percentage units.

If you want to use the CSS media queries, you have to create a separate CSS file under the `wwwroot` folder. This is required because the media queries start with `@` which conflicts with the Razor syntax. Technically, you could escape them as `@@`.

>caption Observe the behavior of a Window made responsive with media queries

**Component:**
````Component
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
````Stylesheet
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
