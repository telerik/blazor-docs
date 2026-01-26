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
# Appearance Settings

This article explains how to control the visual appearance of the Skeleton component.

The Skeleton component provides multiple parameters that control its appearance:

* [ShapeType](#shapetype)
* [AnimationType](#animationtype)


## ShapeType

The `ShapeType` parameter sets the shape of the Skeleton. It takes a member of the `SkeletonShapeType` enum:

* `Text` (default)
* `Rectangle`
* `Circle`

>caption Change the ShapeType

````RAZOR
@*This example shows the difference between the shapes of the Skeleton*@

<div class="row">
    <div class="col-4" style="position: relative;">
        <TelerikSkeleton ShapeType="@SkeletonShapeType.Circle"
                         Width="50px" Height="50px" Visible="true">
        </TelerikSkeleton>
    </div>
    <div class="col-4" style="position: relative;">
        <TelerikSkeleton ShapeType="@SkeletonShapeType.Rectangle"
                         Width="50px" Height="50px" Visible="true">
        </TelerikSkeleton>
    </div>
    <div class="col-4" style="position: relative;">
        <TelerikSkeleton ShapeType="@SkeletonShapeType.Text"
                         Width="50px" Height="50px" Visible="true">
        </TelerikSkeleton>
    </div>
</div>
````

## AnimationType

The `AnimationType` parameter controls the type of animation for the Skeleton. There are three predefined options, which are members of the `SkeletonAnimationType` enum:

* `None`
* `Pulse` (default)
* `Wave`

>caption The animations for the Skeleton

````RAZOR
@* The different animations for the Skeleton. *@

<div class="row">
    <div class="col-4" style="position:relative;">
        <TelerikSkeleton AnimationType="@SkeletonAnimationType.None"
                         Width="50px" Height="50px" Visible="true">
        </TelerikSkeleton>
    </div>
    <div class="col-4" style="position:relative;">
        <TelerikSkeleton AnimationType="@SkeletonAnimationType.Pulse"
                         Width="50px" Height="50px" Visible="true">
        </TelerikSkeleton>
    </div>
    <div class="col-4" style="position:relative;">
        <TelerikSkeleton AnimationType="@SkeletonAnimationType.Wave"
                         Width="50px" Height="50px" Visible="true">
        </TelerikSkeleton>
    </div>
</div>
````

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: Skeleton Appearance](https://demos.telerik.com/blazor-ui/skeleton/appearance)
