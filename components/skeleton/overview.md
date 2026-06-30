---
title: Overview
page_title: Skeleton Overview
description: Overview of the Skeleton for Blazor.
slug: skeleton-overview
tags: telerik,blazor,skeleton,overview
published: True
position: 0
components: ["skeleton"]
---

# Blazor Skeleton Overview

The [Blazor Skeleton](https://www.telerik.com/blazor-ui/skeleton) is a loading indicator. What separates it from conventional loaders is that it mimics the page layout and content by showing elements in a similar shape as the actual content that will appear after loading.

## Creating Blazor Skeleton

1. Add one or more `<TelerikSkeleton>` tags.
1. Set the `Visible` parameter to a `bool` property or expression.
1. Use the `ShapeType` parameter, depending on the expected content.
1. Set a `Height` and an optional `Width`, depending on the expected layout.

>caption Basic Blazor Skeleton

````RAZOR
<div style="display: flex; gap: 2em; margin-bottom: 2em; align-items: center;">
    <TelerikSkeleton Height="8vw"
                     ShapeType="@SkeletonShapeType.Circle"
                     Visible="@SkeletonVisible"
                     Width="8vw" />

    <TelerikSkeleton Height="8vw"
                     ShapeType="@SkeletonShapeType.Rectangle"
                     Visible="@SkeletonVisible"
                     Width="36vw" />

    @if (!string.IsNullOrEmpty(Title))
    {
        <svg width="8vw" height="8vw" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="var(--kendo-color-success)" />
        </svg>
        <h1 style="margin: 0; padding: 0;">Content Title</h1>
    }
</div>

<TelerikSkeleton AnimationType="@SkeletonAnimationType.Pulse"
                 Height="1lh"
                 ShapeType="@SkeletonShapeType.Text"
                 Visible="@SkeletonVisible"
                 Width="40vw" />

<TelerikSkeleton AnimationType="@SkeletonAnimationType.Pulse"
                 Height="1lh"
                 ShapeType="@SkeletonShapeType.Text"
                 Visible="@SkeletonVisible"
                 Width="48vw" />

<TelerikSkeleton AnimationType="@SkeletonAnimationType.Pulse"
                 Height="1lh"
                 ShapeType="@SkeletonShapeType.Text"
                 Visible="@SkeletonVisible"
                 Width="44vw" />

<TelerikSkeleton AnimationType="@SkeletonAnimationType.Pulse"
                 Height="1lh"
                 ShapeType="@SkeletonShapeType.Text"
                 Visible="@SkeletonVisible"
                 Width="48vw" />

<TelerikSkeleton AnimationType="@SkeletonAnimationType.Pulse"
                 Height="1lh"
                 ShapeType="@SkeletonShapeType.Text"
                 Visible="@SkeletonVisible"
                 Width="44vw" />

<TelerikSkeleton AnimationType="@SkeletonAnimationType.Pulse"
                 Height="1lh"
                 ShapeType="@SkeletonShapeType.Text"
                 Visible="@SkeletonVisible"
                 Width="40vw" />

<p style="width:48vw">@Text</p>

@code {
    private string Title { get; set; } = string.Empty;
    private string Text { get; set; } = string.Empty;

    private bool SkeletonVisible { get; set; } = true;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(3000);

            Title = "Content Title";
            Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin lectus nec ante ornare auctor. Curabitur ut tempus odio. Quisque pretium sapien neque, quis vulputate metus ultrices ut. Quisque in lacus velit. Vivamus egestas cursus commodo. Phasellus a pulvinar enim, in gravida sapien. Nunc eget euismod elit. Vestibulum venenatis mollis odio. Nullam pellentesque consequat ante et posuere.";

            SkeletonVisible = false;

            StateHasChanged();
        }
    }
}
````

## Appearance

The Telerik Skeleton for Blazor provides options to control its [animation type and shape type](slug:skeleton-appearance):

## Skeleton API

See the [Skeleton API Reference](slug:Telerik.Blazor.Components.TelerikSkeleton) for a full list of available parameters.

## Next Steps

* [Check the Skeleton appearance settings](slug:skeleton-appearance)

## See Also

* [Live Demo: Skeleton](https://demos.telerik.com/blazor-ui/skeleton/overview)
* [Skeleton API Reference](slug:Telerik.Blazor.Components.TelerikSkeleton)
