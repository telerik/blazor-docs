---
title: Animations
page_title: Animations
description: Learn about the animation options for the Telerik Window component in Blazor.
slug: window-animations
tags: telerik,blazor,window,animations
published: True
position: 4
---

# Blazor Window Animations

The Telerik Window component for Blazor provides an option to control the opening animations to enhance the user experience. You can configure the animation type and duration using the following parameters:

## Parameters

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value| Description |
|--------------------|------------------------------------|-------------|
| `AnimationType`| `WindowAnimationType` (`None`)| Specifies the type of animation used when the window opens or closes. The full list of animation types is listed in the section below. |
| `AnimationDuration`| `int` (`300`)| Defines the duration of the animation in milliseconds. |

## WindowAnimation Types

The `WindowAnimationType` enumeration includes the following options:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Animation Type | Description                                                                                     |
|----------------|-------------------------------------------------------------------------------------------------|
| `None` (default)| No animation.                                                                                  |
| `SlideUp`      | Slides in from the bottom and slides out to the bottom.                                         |
| `SlideDown`    | Slides in from the top and slides out to the top.                                               |
| `SlideRight`   | Slides in from the left and slides out to the left.                                             |
| `SlideLeft`    | Slides in from the right and slides out to the right.                                           |
| `PushUp`       | Pushes in from the bottom and pushes out to the top.                                            |
| `PushDown`     | Pushes in from the top and pushes out to the bottom.                                            |
| `PushLeft`     | Pushes in from the right and pushes out to the left.                                            |
| `PushRight`    | Pushes in from the left and pushes out to the right.                                            |
| `Fade`         | Fades in and out.                                                                               |
| `ZoomIn`       | Zooms in from a larger size to its actual size and zooms out by expanding before disappearing.  |
| `ZoomOut`      | Zooms in from a smaller size to its actual size and zooms out by shrinking to the center.       |

## Example

````RAZOR
<div class="k-d-flex k-align-items-stretch k-gap-5">
    <div class="k-d-flex k-flex-col">
        <label for="animation">Animation Type</label>
        <TelerikDropDownList Data="@AnimationTypes"
                             Value="@Animation"
                             ValueChanged="@((WindowAnimationType animation) => ChangeAnimation(animation))"
                             Width="130px"
                             Id="animation" />
    </div>

    <div class="k-d-flex k-flex-col">
        <label for="duration">Animation Duration</label>
        <TelerikNumericTextBox @bind-Value="@Duration"
                               Width="130px"
                               Id="duration" />
    </div>

    <div class="k-align-self-flex-end">
        <TelerikButton OnClick="@(() => Visible = !Visible)">@(Visible ? "Hide Window" : "Show Window")</TelerikButton>
    </div>
</div>

<TelerikWindow @bind-Visible="@Visible"
               Height="300px"
               Width="300px"
               @bind-Top="@Top"
               @bind-Left="@Left"
               AnimationType="@Animation"
               AnimationDuration="@Duration">
    <WindowTitle>
        Animations
    </WindowTitle>
    <WindowContent>
        Current animation type: <strong>@Animation</strong>
    </WindowContent>
</TelerikWindow>

@code {
    private bool Visible { get; set; }
    private int Duration { get; set; } = 300;
    private string Top { get; set; } = "50%";
    private string Left { get; set; } = "50%";

    private List<WindowAnimationType>? AnimationTypes { get; set; }
    private WindowAnimationType Animation { get; set; } = WindowAnimationType.ZoomOut;

    private async Task ChangeAnimation(WindowAnimationType animation)
    {
        Animation = WindowAnimationType.None;
        Visible = false;
        // Artificial delay to reset the animation for demonstration purposes
        await Task.Delay(500);
        Animation = animation;
        Visible = true;
    }

    protected override async Task OnInitializedAsync()
    {
        AnimationTypes = new List<WindowAnimationType>();

        // Populate the list of animation types.
        foreach (WindowAnimationType animation in Enum.GetValues(typeof(WindowAnimationType)))
        {
            AnimationTypes.Add(animation);
        }

        // Artificial delay to show the window after initialization for the sake of the example
        await Task.Delay(500);
        Visible = true;

        await base.OnInitializedAsync();
    }
}
````

## Limitations

When the Window is set to be inside a container, it may appear outside of it after the animation completes. This occurs because animation classes scale the Window component, causing it to render inside the container initially, but move outside after the transition ends.

## See Also

* [Blazor Window Overview](slug:window-overview)