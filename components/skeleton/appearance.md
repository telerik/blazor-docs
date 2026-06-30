---
title: Appearance
page_title: Skeleton Appearance
description: Appearance settings of the Skeleton for Blazor.
slug: skeleton-appearance
tags: telerik,blazor,skeleton,appearance
published: True
position: 5
components: ["skeleton"]
---

# Skeleton Appearance

This article explains how to control the visual appearance of the Telerik Skeleton component for Blazor.

* [AnimationType](#animationtype)
* [ShapeType](#shapetype)

## AnimationType

The Skeleton `AnimationType` parameter controls the animation of the Skeleton. Set a predefined option that is a member of the [`SkeletonAnimationType` enum](slug:Telerik.Blazor.SkeletonAnimationType). The default value is `Pulse`.

>caption Using Skeleton animations

````RAZOR
<div style="display: flex; gap: 2em;">
    <div style="flex: 1">
        Pulse Animation (default)
        <TelerikSkeleton AnimationType="@SkeletonAnimationType.Pulse"
                         Height="40px"
                         ShapeType="@SkeletonShapeType.Rectangle" />
    </div>
    <div style="flex: 1">
        Wave Animation
        <TelerikSkeleton AnimationType="@SkeletonAnimationType.Wave"
                         Height="40px"
                         ShapeType="@SkeletonShapeType.Rectangle" />
    </div>
    <div style="flex: 1">
        No Animation
        <TelerikSkeleton AnimationType="@SkeletonAnimationType.None"
                         Height="40px"
                         ShapeType="@SkeletonShapeType.Rectangle" />
    </div>
</div>
````

## ShapeType

The Skeleton `ShapeType` parameter sets the form of the Skeleton. It takes a member of the [`SkeletonShapeType` enum](slug:Telerik.Blazor.SkeletonShapeType) and the default value is `Text`.

The differences between `Rectangle` and `Text` are:

* The Text shape has rounded corners.
* The effective Text shape height is 60% of the set `Height`. In this way, you can display multiple Text Skeletons one below the other with empty space in-between.

>caption Using Skeleton shapes

````RAZOR
<div style="display: flex; gap: 2em;">
    <div style="flex: 1">
        Circle (default)

        <TelerikSkeleton Height="64px"
                        ShapeType="@SkeletonShapeType.Circle"
                        Width="64px" />
    </div>
    <div style="flex: 1">
        Rectangle

        <TelerikSkeleton Height="64px"
                        ShapeType="@SkeletonShapeType.Rectangle" />
    </div>
    <div style="flex: 1">
        Text (default)

        <TelerikSkeleton Height="24px" />
        <TelerikSkeleton Height="24px" />
        <TelerikSkeleton Height="24px" />
    </div>
</div>
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: Skeleton Appearance](https://demos.telerik.com/blazor-ui/skeleton/appearance)
