---
title: Position and Collision
page_title: Tooltip - Position and Collision
description: Choose the position of the Tooltip for Blazor relative to its target. Configure what happens if the Tooltip overflows the browser viewport boundaries.
slug: tooltip-position
tags: telerik,blazor,upload,async,validate,validation
published: true
position: 2
components: ["tooltip"]
---
# Tooltip Position and Collision

The Telerik Tooltip for Blazor can show on any side of its target. In scenarios when the configured position leads to content overflow outside the browser viewport boundaries, the component can automatically readjust, so that it remains fully visible on the screen.

## Position

The Tooltip component lets you define the location of its popup according to the target element. Set the `Position` parameter, which takes a member of the [`TooltipPosition` `enum`](slug:Telerik.Blazor.TooltipPosition). The default value is `Top`.

>caption Using Tooltip Position

````RAZOR
<TelerikTooltip Position="@CurrentPosition"
                TargetSelector=".tooltip-target" />

ToolTip <code>Position:</code>
<TelerikRadioGroup Data="@(Positions)"
                   @bind-Value="@CurrentPosition"
                    Layout="@RadioGroupLayout.Horizontal" />

<div style="display: flex; justify-content: center; align-items: center; height: 60vh;">
    <TelerikButton Class="tooltip-target"
                   ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
                   Title="@($"Tooltip at {CurrentPosition} position")">Hover Me</TelerikButton>
</div>

@code {
    private readonly IEnumerable<TooltipPosition> Positions = Enum.GetValues(typeof(TooltipPosition)).Cast<TooltipPosition>();
    private TooltipPosition CurrentPosition { get; set; } = TooltipPosition.Top;
}
````

## Collision

If the Tooltip target is close to the edge of the screen, there may be not enough space for the Tooltip to show on the designated side of the target. In such cases, the component automatically adjusts its location on the web page. To control this behavior, set the Tooltip `Collision` parameter to a member of the [`TooltipCollision` `enum`](slug:Telerik.Blazor.Components.TooltipCollision):

* `Fit` (default) instructs the Tooltip to shift until it is fully visible on the screen.
* `Flip` instructs the Tooltip to display on the other side of the target.

>caption Using Tooltip Collision

````RAZOR
<TelerikTooltip Collision="@TooltipCollision.Flip"
                Position="@TooltipPosition.Top"
                TargetSelector=".tooltip-target-flip" />

<TelerikTooltip Collision="@TooltipCollision.Fit"
                Position="@TooltipPosition.Right"
                TargetSelector=".tooltip-target-fit" />

<div>
    Hover the Eye icon ...
    <span title="Tooltip with Flip Collision" class="tooltip-target-flip">
        <TelerikSvgIcon Icon="@SvgIcon.Eye"
                        Size="@ThemeConstants.SvgIcon.Size.ExtraExtraExtraLarge" />
    </span>

    <p style="text-align: right;">
        ... and the question mark:

        <span title="Tooltip with Fit Collision" class="tooltip-target-fit">
            <TelerikSvgIcon Icon="@SvgIcon.QuestionCircle"
                            Size="@ThemeConstants.SvgIcon.Size.ExtraExtraLarge" />
        </span>
    </p>
</div>
````

## Next Steps

* [Choose a Tooltip Show Event](slug:tooltip-show-event)
* [Explore ToolTip Templates](slug:tooltip-template)

## See Also

* [Live Demo: Tooltip Position and Collision](https://demos.telerik.com/blazor-ui/tooltip/position)
* [Blazor Tooltip Overview](slug:tooltip-overview)
