---
title: Dimensions
page_title: Dimensions
description: How dimensions work and are set in the Telerik UI for Blazor component suite.
slug: common-features/dimensions
tags: telerik,blazor,dimensions,width,height,percent,pixel
published: True
position: 7
---

# Dimensions

This article explains how dimensional properties like `Width`, `Height`, `Top` and `Left` work in Telerik UI for Blazor to set size and position.

## Basics

Component parameters for dimensions and positions are usually `string` properties that are not parsed by the Telerik components. You can set any [valid CSS unit](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units). For example, `100px`, `50%`, or `80vw` are all valid options. At the time of writing there is no `Unit` type in the underlying framework.

The string you provide is usually rendered as an inline `style` attribute, so you must provide a valid value that will not break other options. You do not need to include a semicolon (`;`) in the parameter value.

## Percentages

When setting percentage values like `100%` or `50%`, keep in mind the following: web standards require elements with percentage heights to have a parent with an explicit height. This requirement applies recursively until either an element with a pixel height or the `html` element is reached.

Elements that are 100% high should not have margins, paddings, borders, or sibling elements, unless you set a [`box-sizing:border-box`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing) CSS style to them.

When setting percentage dimensions to elements with special positioning (such as `Width` of a Window or the popup `Width` of a DropDownList), their parent element in the DOM determines the resulting component dimensions.

## Position

When using positioning parameters, for example `Top` or `Left`, the component placement may be affected by CSS styles on the component's parent. If you experience issues, [inspect the rendered HTML to see what elements are present and what their CSS styles are](slug:themes-override#tools).

>tip You can set dimensions in percentage (such as `Width="100%"`) to make the components responsive and let them resize according to the app layout and browser viewport. A lot of components expand to 100% width by default, for example, the Grid, Form, Scheduler, Spreadsheet, all input components, and others.

## Examples

The examples here showcase different units and examples of using them to set dimensions and positions. The results you get may vary from the screenshots here because of different CSS rules in your project and different browser/screen sizes. Review the explanations in the code for more details on what to expect.

>caption Setting sizes in different dimensions (percent, pixel, vw in this sample)

````RAZOR
<div style="width: 500px; border: 1px solid red;">
    <TelerikTextBox Width="50%" />
    <br />
    <TelerikTextBox Width="100px" />
    <br />
    <TelerikTextBox Width="10vw" />
</div>
````

![Blazor Basic Width Settings](images/basic-width-settings.png)

>caption Using auto width to have an element adjust to its contents

````RAZOR
<TelerikDropDownList Data="@MyList" @bind-Value="MyItem">
    <DropDownListSettings>
        <DropDownListPopupSettings Width="auto" />
    </DropDownListSettings>
</TelerikDropDownList>

@code {
    protected List<string> MyList = new List<string>() 
    {
        "first",
        "second very long item that determines the width of the dropdown element",
        "third"
        //avoid popup Height="auto" for many items,
        // because the dropdown will go off the screen and not scroll
    };

    protected string MyItem { get; set; } = "third";
}
````

![Blazor Auto Size For Dropdown](images/auto-size-for-dropdown.png)


>caption Position is controlled by the parent element with special positioning

````RAZOR
<TelerikWindow Visible="true" Top="100px" Left="100px" Width="30vw" Height="40vh">
    <WindowContent>
        The parent element of the window is the TelerikRootComponent which should match the app element and the viewport.
        <br />
        This window will be 100px off the top left corner of the viewport in a blank app without special CSS rules. You can also use other units, such as percent.
        <br />
        Also, the size of this window will depend on the viewport size - resize your browser to see the effects.
    </WindowContent>
    <WindowTitle>Examples of offsets and dimensions</WindowTitle>
</TelerikWindow>
````

![Blazor Parent Element Offset](images/parent-element-offset.png)

## See Also

* [Themes](slug:themes-overview)
* [Override Theme Styles](slug:themes-override)
