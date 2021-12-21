---
title: Style the RadioGroup Like a ButtonGroup
description: How to style the RadioGroup to look Like a ButtonGroup with toggle buttons and single selected item.
type: how-to
page_title: How to Style the RadioGroup to Look Like a ButtonGroup
slug: radiogroup-kb-like-buttongroup
position:
tags: radiogroup, button, buttongroup
ticketid: 1547117
res_type: kb
---

## Description

How to implement RadioGroup behavior, but style the label and radio input pairs like toggle buttons in a ButtonGroup? Similar to a radio group, only one button should be selected at a time.

## Solution

Use custom CSS to make the radio inputs invisible and style their labels to look like buttons.

The RadioGroup will look the same as a [ButtonGroup with single selection]({%slug buttongroup-selection%}#single-selection). The major difference is that the RadioGroup has a single value of `<T>`, while each button in the ButtonGroup is bound to a separate `boolean` value for its selected state.

>caption Style the RadioGroup Like a ButtonGroup

````CSHTML
<h1>RadioGroup like a ButtonGroup</h1>

<br />
<TelerikRadioGroup Class="labels-only"
                   Data="@Statuses"
                   @bind-Value="@CurrentStatus"
                   ValueField="@nameof(Status.Id)"
                   TextField="@nameof(Status.Text)"
                   Layout="RadioGroupLayout.Horizontal"
                   LabelPosition="RadioGroupLabelPosition.After">
</TelerikRadioGroup>

<br />
<TelerikRadioGroup Data="@Statuses"
                   @bind-Value="@CurrentStatus"
                   ValueField="@nameof(Status.Id)"
                   TextField="@nameof(Status.Text)"
                   Layout="RadioGroupLayout.Horizontal"
                   LabelPosition="RadioGroupLabelPosition.After">
</TelerikRadioGroup>

<br />
<p>Selected Value: <strong>@CurrentStatus.ToString()</strong></p>

<style>
    /* remove the horizontal space between the RadioGroup items */
    .labels-only {
        display: flex;
    }

    /* reset styles and support absolute radio inputs */
    .labels-only .k-radio-item {
        margin: 0;
        padding: 0;
        position: relative;
    }

    /* hide the radio buttons */
    .labels-only .k-radio {
        opacity: 0;
        position: absolute;
    }
    .labels-only .k-radio:checked::before {
        display: none;
    }

    /* make the radio labels to look like buttons */
    .labels-only .k-radio-label {
        display: inline-block;
        margin: 0;
        padding: .4em .6em .3em;
        border: 1px solid #ff6358;
        border-left-width: 0;
        position: relative;
        color: #ff6358;
    }

    /* first and last button borders */
    .labels-only .k-radio-item:first-child .k-radio-label {
        border-left-width: 1px;
        border-radius: .2em 0 0 .2em;
    }
    .labels-only .k-radio-item:last-child .k-radio-label {
        border-radius: 0 .2em .2em 0;
    }

    /* button selected state */
    .labels-only .k-radio:checked + .k-radio-label {
        background-color: #ff6358;
        color: #fff;
    }
</style>

@code{
    List<Status> Statuses { get; set; } = new();
    int CurrentStatus { get; set; } = 3;

    protected override Task OnInitializedAsync()
    {
        for (int i = 1; i <= 4; i++)
        {
            Statuses.Add(new Status()
            {
                Id = i,
                Text = "Option " + i.ToString()
            });
        }

        return base.OnInitializedAsync();
    }

    public class Status
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````
