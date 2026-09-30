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

<demo metaUrl="client/skeleton/appearance/example-1/" height="420"></demo>

## ShapeType

The Skeleton `ShapeType` parameter sets the form of the Skeleton. It takes a member of the [`SkeletonShapeType` enum](slug:Telerik.Blazor.SkeletonShapeType) and the default value is `Text`.

The differences between `Rectangle` and `Text` are:

* The Text shape has rounded corners.
* The effective Text shape height is 60% of the set `Height`. In this way, you can display multiple Text Skeletons one below the other with empty space in-between.

>caption Using Skeleton shapes

<demo metaUrl="client/skeleton/appearance/example-2/" height="420"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: Skeleton Appearance](https://demos.telerik.com/blazor-ui/skeleton/appearance)
