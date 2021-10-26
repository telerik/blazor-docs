---
title: Stretch Switch Dynamically to Fit Long Text Labels
description: How to expand the TelerikSwitch automatically, according to its text labels.
type: how-to
page_title: Resize the Switch on the fly, based on longer on/off labels
slug: switch-strecth-expand-resize
position:
tags: switch, stretch, resize, expand, labels
ticketid: 1539464
res_type: kb
---

## Description

How do I stretch the Switch horizontally, in order to see the whole dynamic on/off text labels? The goal is to expand the component and fit the complete text automatically inside the TelerikSwitch dynamically at runtime. Setting the width to a fixed value is not a viable solution.

## Solution

The Switch relies on absolute positioning styles, which require defined dimensions to work properly. However, it is possible to calculate the Switch width dynamically, based on the length of its labels.

>caption Expand the Switch on the fly, depending on the text label length

````CSHTML
<TelerikSwitch Value="@Value"
               Width="@Width"
               OnLabel="@OnLabel"
               OffLabel="@OffLabel"></TelerikSwitch>

@code {
    bool Value { get; set; }
    string OnLabel { get; set; } = "Long text on";
    string OffLabel { get; set; } = "Long text off and some more text";

    string Width
    {
        get
        {
            return Math.Max(OnLabel.Length, OffLabel.Length) * .8 + "em";
        }
    }
}
````
