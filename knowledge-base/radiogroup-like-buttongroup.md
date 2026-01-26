---
title: Style the RadioGroup Like a ButtonGroup
description: How to style the RadioGroup to look Like a ButtonGroup with toggle buttons and single selected item.
type: how-to
page_title: How to Style the RadioGroup to Look Like a ButtonGroup
slug: radiogroup-kb-like-buttongroup
position:
tags: radiogroup, button, buttongroup, styles
ticketid: 1547117
res_type: kb
components: ["radiogroup"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>RadioGroup for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

How to implement RadioGroup behavior, but style the label and radio input pairs like toggle buttons in a ButtonGroup? Similar to a radio group, only one button should be selected at a time.

## Solution

Use custom CSS to make the radio inputs invisible and style their labels to look like buttons.

The RadioGroup will look similar to a [ButtonGroup with single selection](slug:buttongroup-selection#single-selection). The major difference is that the RadioGroup has a single value of type `<T>`, while each button in the ButtonGroup is bound to a separate `boolean` value for its selected state.

>tip The following example is for versions 6.0 and above, which feature an [updated HTML rendering for the RadioGroup](slug:rendering-changes-in-6-0-0#radiogroup). If you are using an older version, use the [alternative CSS code from the section below](#solution-up-to-version-5-1-1).

>caption Style the RadioGroup like a ButtonGroup

````RAZOR
<h1 style="font-size:1.5rem;">RadioGroup like a ButtonGroup</h1>

<p>Selected Value: <strong><code>@CurrentStatus</code></strong></p>

<h2 style="font-size: 1.2rem; margin: .6em 0">Workaround with RadioGroup and CSS</h2>

<TelerikRadioGroup Class="radio-buttons"
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

<h2 style="font-size: 1.2rem; margin: .6em 0">Built-in Approach with ButtonGroup</h2>

<TelerikButtonGroup>
    @foreach (var item in Statuses)
    {
        <ButtonGroupToggleButton Selected="@( item.Id == CurrentStatus )"
                                 SelectedChanged="@( (bool newSelected) => ToggleButtonSelectedChanged(newSelected, item.Id) )">
            @item.Text
        </ButtonGroupToggleButton>
    }
</TelerikButtonGroup>

<style>
    /* remove the horizontal space between the RadioGroup items */
    .k-radio-list.radio-buttons {
        gap: 0;
    }

    /* reset styles and support absolute radio inputs */
    .radio-buttons .k-radio-list-item {
        margin: 0;
        padding: 0;
        position: relative;
    }

    /* hide the radio buttons */
    .radio-buttons .k-radio-wrap {
        opacity: 0;
        position: absolute;
    }

    .radio-buttons .k-radio-wrap::before {
        display: none;
    }

    /* make the radio labels look like buttons */
    .radio-buttons .k-radio-label {
        display: inline-block;
        margin: 0;
        padding: .2em .6em;
        border: 1px solid #ff6358;
        border-left-width: 0;
        position: relative;
        font-size: var(--kendo-font-size, inherit);
        color: #ff6358;
    }

    /* first and last button borders */
    .radio-buttons .k-radio-list-item:first-child .k-radio-label {
        border-left-width: 1px;
        border-radius: .2em 0 0 .2em;
    }

    .radio-buttons .k-radio-list-item:last-child .k-radio-label {
        border-radius: 0 .2em .2em 0;
    }

    /* button selected state */
    .radio-buttons .k-radio-wrap:has(.k-radio:checked) + .k-radio-label {
        background-color: #ff6358;
        color: #fff;
    }
</style>

@code{
    private List<Status> Statuses { get; set; } = new();

    private int CurrentStatus { get; set; } = 3;

    private void ToggleButtonSelectedChanged(bool newSelected, int id)
    {
        if (newSelected)
        {
            CurrentStatus = id;
        }
    }

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
        public string Text { get; set; } = string.Empty;
    }
}
````

### Solution up to version 5.1.1

The following CSS code targets different RadioGroup HTML markup up to version 5.1.1.

>caption CSS code to style the RadioGroup like a ButtonGroup up to version 5.1.1

<div class="skip-repl"></div>

````CSS
/* remove the horizontal space between the RadioGroup items */
.k-radio-list.radio-buttons {
    gap: 0;
}

/* reset styles and support absolute radio inputs */
.radio-buttons .k-radio-item {
    margin: 0;
    padding: 0;
    position: relative;
}

/* hide the radio buttons */
.radio-buttons .k-radio {
    opacity: 0;
    position: absolute;
}

.radio-buttons .k-radio::before {
    display: none;
}

/* make the radio labels look like buttons */
.radio-buttons .k-radio-label {
    display: inline-block;
    margin: 0;
    padding: .2em .6em;
    border: 1px solid #ff6358;
    border-left-width: 0;
    position: relative;
    font-size: var(--kendo-font-size, inherit);
    color: #ff6358;
}

/* first and last button borders */
.radio-buttons .k-radio-item:first-child .k-radio-label {
    border-left-width: 1px;
    border-radius: .2em 0 0 .2em;
}

.radio-buttons .k-radio-item:last-child .k-radio-label {
    border-radius: 0 .2em .2em 0;
}

/* button selected state */
.radio-buttons .k-radio:checked + .k-radio-label {
    background-color: #ff6358;
    color: #fff;
}
````

## See Also

* [How to override CSS theme styles](slug:themes-override)
