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


## Description

Can you please advise me on how to display validation message as tooltip?


## Solution

This article contains several different approaches for implementing validation notifications with popups:

* [Telerik Validation Tooltip Component](#telerikvalidationpopup)

* [Telerik Form Component](#telerikform)

* [Validation Summary in a Popup](#validation-summary-in-a-popup)

* [Per-Input Validation Popups](#per-input-validation-popups) - it is much easier to use the Telerik components listed above to get this functionality


### TelerikValidationTooltip

You can use the [TelerikValidationTooltip]({%slug validation-tools-tooltip%}) to enable tooltip validation messages either in the [Telerik Form]({%slug form-overview%}) or in the Microsoft EditForm.

### TelerikForm

The [Telerik Form]({%slug form-overview%}) component comes with a [popup validation mode]({%slug form-validation%}#validation-message-type) out-of-the-box.

### Validation Summary in a Popup

There are several key aspects in implementing this:

* A tooltip component that can be shown programmatically. See this page for a Telerik one: https://feedback.telerik.com/blazor/1494644-show-tooltip-programatically. When it gets implemented, this code will become simpler. The current mockup stores the button coordinates when the mouse enters it. See the code comments for more details.
* An event that will show and hide the tooltip. In this sample, the `OnValidSubmit` and `OnInvalidSubmit` of the `EditForm` are used.
* You need to place the validation summary component in the tooltip, which means the tooltip must be inside the form.

>caption Validation Summary in a Tooltip

````CSHTML
@* This sample shows one way to mock a tooltip and display the validation summary in it. *@

@using System.ComponentModel.DataAnnotations
@* this is for the validation model only *@

<style>
    /* implement desired styling, here we just add white background so the default red text pops out */
    .ValidationTooltip .k-tooltip-content {
        background: white;
    }
</style>

<EditForm Model="@validationModel" OnValidSubmit="@HideTooltip" OnInvalidSubmit="@ShowTooltip">
    <DataAnnotationsValidator />

    <TelerikAnimationContainer @ref="@AnimationContainer" Top=@TopStyle Left=@LeftStyle Width="300px" Height="100px" AnimationType=@AnimationType.Fade>
        <div role="tooltip" 
                class="ValidationTooltip k-widget k-tooltip k-tooltip-closable k-popup k-group k-reset k-state-border-up"
                style="margin-left: 12px;">
            <div class="k-tooltip-content">
                <div class="template-wrapper">
                    <ValidationSummary></ValidationSummary>
                </div>
            </div>
            <div class="k-callout k-callout-w"></div>
        </div>
    </TelerikAnimationContainer>

    <TelerikTextBox @bind-Value="@validationModel.RequiredField"></TelerikTextBox>
    <br /><br />
    <TelerikTextBox @bind-Value="@validationModel.LengthField"></TelerikTextBox>
    <br /><br />
    <span @onmouseover="@StoreBtnPos"
            @onmouseout="@HideTooltip">@* you may want to remove the onmouseout handler, depending on the UX you are looking for *@
        <TelerikButton Primary="true">Submit</TelerikButton>
    </span>
</EditForm>

@code {
    //tooltip implementation
    public int Top { get; set; }
    public int Left { get; set; }
    public string TopStyle { get { return Top.ToString() + "px"; } }
    public string LeftStyle { get { return Left.ToString() + "px"; } }
    public int ButtonOffsetY { get; set; } = -50;
    public int ButtonOffsetX { get; set; } = 50;
    public TelerikAnimationContainer AnimationContainer { get; set; }

    // TODO - get the desired Top and Left according to the location you want to show the tooltip
    // in this sample, we store the button coordinates if the user mouses over the button
    // if the user uses the keyboard only then there will be an issue and to handle that
    // you'd have to use some JS interop to get those coordinates beforehand

    void StoreBtnPos(MouseEventArgs args)
    {
        Top = (int)args.ClientY + ButtonOffsetY;
        Left = (int)args.ClientX + ButtonOffsetX;
    }

    //model and validation
    class TextValidationModel
    {
        [Required]
        public string RequiredField { get; set; }

        [StringLength(10, ErrorMessage = "That text is too long")]
        public string LengthField { get; set; }
    }

    TextValidationModel validationModel = new TextValidationModel() { LengthField = "Too long text" };

    async Task HideTooltip()
    {
        await AnimationContainer.HideAsync();
        // you may also want to create your own EditContext and hook to its OnValidationStateChanged event to hide the tooltip
    }

    async Task ShowTooltip()
    {
        await AnimationContainer.ShowAsync();
    }
}
````

### Per-Input Validation Popups

This sample uses a tooltip component and mimics clicks on its targets to make it show up. Comments in the code provide more details on the implementation approach and ideas for next steps in the implementation.

>caption Tooltips for validated inputs

````CSHTML
@* This sample shows one way programatically show tooltips and display the validation summary in it. *@

@inject IJSRuntime JS

<script suppress-error="BL9992">
    // the scripts should be extracted in a separate js file
    window.triggerClick = (id) => {
        document.getElementById(id).click();
    }
</script>

@using System.ComponentModel.DataAnnotations
@* this is for the validation model only *@

<style>
    /* implement desired styling, here we just add white background so the default red text pops out */
    .ValidationTooltip .k-tooltip-content {
        background: white;
    }
</style>

<EditForm Model="@validationModel" OnInvalidSubmit="@ShowTooltip">
    <DataAnnotationsValidator />

    <TelerikTooltip TargetSelector="#required-field" ShowOn="@TooltipShowEvent.Click">
        <Template Context="RequiredContext">The field is required</Template>
    </TelerikTooltip>
    <TelerikTooltip TargetSelector="#length-field" ShowOn="@TooltipShowEvent.Click">        
        <Template Context="Length">That text is too long</Template>
    </TelerikTooltip>

    <TelerikTextBox @bind-Value="@validationModel.RequiredField" Id="required-field"></TelerikTextBox>
    <br /><br />
    <TelerikTextBox @bind-Value="@validationModel.LengthField" Id="length-field"></TelerikTextBox>
    <br /><br />
    <span @onmouseover="@(() => ShowTooltip())">
        <TelerikButton Primary="true">Submit</TelerikButton>
    </span>
</EditForm>

@code {
    //model and validation
    class TextValidationModel
    {
        [Required]
        public string RequiredField { get; set; }

        [StringLength(10, ErrorMessage = "That text is too long")]
        public string LengthField { get; set; }
    }

    TextValidationModel validationModel = new TextValidationModel() { LengthField = "Too long text" };

    async Task ShowTooltip()
    {
        // this will trigger manual click to the element with the passed id
        // you can filter and show the tooltips only for the fields that failed validation check
        await JS.InvokeVoidAsync("triggerClick", "required-field");
        await JS.InvokeVoidAsync("triggerClick", "length-field");
    }
}

````


