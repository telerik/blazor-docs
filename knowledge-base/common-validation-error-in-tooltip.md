---
title: ValidationMessage as Tooltip
description: How to show validation errors and messages in a tooltip.
type: how-to
page_title: Validation error in tooltip
slug: common-kb-validation-error-in-tooltip
position: 
tags: 
ticketid: 1454018
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

Can you please advise me on how to display validation message as tooltip?


## Solution

This article contains several different ways to implement validation notifications with popups:

* [Telerik Validation Tooltip Component](#telerikvalidationtooltip)
* [Telerik Form Component](#telerikform)
* [Validation Summary in a Popup](#validation-summary-in-a-popup)
* [Per-Input Validation Popups](#per-input-validation-popups) - it is much easier to use the Telerik components listed above to get this functionality

### TelerikValidationTooltip

You can use the [TelerikValidationTooltip](slug:validation-tools-tooltip) to enable tooltip validation messages either in the [Telerik Form](slug:form-overview) or in the Microsoft EditForm.

### TelerikForm

The [Telerik Form](slug:form-overview) component comes with a [popup validation mode](slug:form-validation#validation-message-type) out-of-the-box.

### Validation Summary in a Popup

There are several key aspects in implementing this:

* A tooltip component that can be shown programmatically. See this page for a Telerik one: https://feedback.telerik.com/blazor/1494644-show-tooltip-programatically. When it gets implemented, this code will become simpler. The current mockup stores the button coordinates when the mouse enters it. See the code comments for more details.
* An event that will show and hide the tooltip. In this sample, the `OnValidSubmit` and `OnInvalidSubmit` of the `EditForm` are used.
* You need to place the validation summary component in the tooltip, which means the tooltip must be inside the form.

>caption Validation Summary in a Tooltip

````RAZOR
@using System.ComponentModel.DataAnnotations

<EditForm Model="@ValidationModel" OnValidSubmit="@HideTooltip" OnInvalidSubmit="@ShowTooltip">
    <DataAnnotationsValidator />

    <TelerikAnimationContainer @ref="@AnimationContainer"
                               AnimationType="@AnimationType.Fade"
                               Top="@TopStyle" Left="@LeftStyle"
                               Width="300px" Height="100px">
        <div role="tooltip"
             class="validation-tooltip k-tooltip k-tooltip-closable k-popup k-group k-reset k-state-border-up"
             style="margin-left: 12px;">
            <div class="k-tooltip-content">
                <ValidationSummary></ValidationSummary>
            </div>
            <div class="k-callout k-callout-w"></div>
        </div>
    </TelerikAnimationContainer>

    <TelerikTextBox @bind-Value="@ValidationModel.RequiredField"></TelerikTextBox>
    <br /><br />
    <TelerikTextBox @bind-Value="@ValidationModel.LengthField"></TelerikTextBox>
    <br /><br />
    <span @onmouseover="@StoreBtnPos"
          @onmouseout="@HideTooltip">
        @* You may want to remove the onmouseout handler, depending on the UX you are looking for. *@
        <TelerikButton ThemeColor="primary">Submit</TelerikButton>
    </span>
</EditForm>

<style>
    .validation-tooltip .validation-message {
        color: inherit;
    }
</style>

@code {
    //Tooltip container properties
    private TelerikAnimationContainer AnimationContainer { get; set; } = null!;
    private int Top { get; set; }
    private int Left { get; set; }
    private string TopStyle => Top.ToString() + "px";
    private string LeftStyle => Left.ToString() + "px";
    private int ButtonOffsetY { get; set; } = -50;
    private int ButtonOffsetX { get; set; } = 50;

    private TextValidationModel ValidationModel = new TextValidationModel() { LengthField = "Too long text" };

    // TODO - get the desired Top and Left according to the location you want to show the tooltip.
    // In this sample, we store the button coordinates if the user mouses over the button.
    // If the user uses the keyboard only then there will be an issue and to handle that
    // you'd have to use some JS interop to get those coordinates in advance.

    private void StoreBtnPos(MouseEventArgs args)
    {
        Top = (int)args.PageY + ButtonOffsetY;
        Left = (int)args.PageX + ButtonOffsetX;
    }

    private async Task HideTooltip()
    {
        await AnimationContainer.HideAsync();
        // You can also create your own EditContext and use its OnValidationStateChanged event to hide the tooltip.
    }

    private async Task ShowTooltip()
    {
        await AnimationContainer.ShowAsync();
    }

    class TextValidationModel
    {
        [Required]
        public string RequiredField { get; set; } = string.Empty;

        [StringLength(10, ErrorMessage = "That text is too long")]
        public string LengthField { get; set; } = string.Empty;
    }
}
````

### Per-Input Validation Popups

This sample uses a Tooltip component and mimics clicks on its targets to make it show up. Comments in the code provide more details on the implementation approach and ideas for enhancements.

>caption Tooltips for validated inputs

````RAZOR
@using System.ComponentModel.DataAnnotations

@inject IJSRuntime JS

<EditForm Model="@ValidationModel" OnInvalidSubmit="@ShowTooltip">
    <DataAnnotationsValidator />

    <TelerikTooltip TargetSelector="#required-field" ShowOn="@TooltipShowEvent.Click">
        <Template Context="RequiredContext">
            The field is required
        </Template>
    </TelerikTooltip>
    <TelerikTooltip TargetSelector="#length-field" ShowOn="@TooltipShowEvent.Click">
        <Template Context="Length">
            That text is too long
        </Template>
    </TelerikTooltip>

    <TelerikTextBox @bind-Value="@ValidationModel.RequiredField" Id="required-field"></TelerikTextBox>
    <br /><br />
    <TelerikTextBox @bind-Value="@ValidationModel.LengthField" Id="length-field"></TelerikTextBox>
    <br /><br />
    <span @onmouseover="@(() => ShowTooltip())">
        <TelerikButton ThemeColor="primary">Submit</TelerikButton>
    </span>
</EditForm>

<script suppress-error="BL9992">
    // the scripts should be extracted in a separate js file
    window.triggerClick = (id) => {
        document.getElementById(id).click();
    }
</script>

@code {
    private TextValidationModel ValidationModel = new TextValidationModel() { LengthField = "Too long text" };

    private async Task ShowTooltip()
    {
        // Trigger programmatic click on the element with the passed id.
        // You can filter and show tooltips only for the fields that failed validation.
        await JS.InvokeVoidAsync("triggerClick", "required-field");
        await JS.InvokeVoidAsync("triggerClick", "length-field");
    }

    public class TextValidationModel
    {
        [Required]
        public string RequiredField { get; set; } = string.Empty;

        [StringLength(10, ErrorMessage = "That text is too long")]
        public string LengthField { get; set; } = string.Empty;
    }
}
````
