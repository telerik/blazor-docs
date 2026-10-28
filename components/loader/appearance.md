---
title: Appearance
page_title: Loader Appearance
description: Appearance settings of the Loading indicator for Blazor.
slug: loader-appearance
tags: telerik,blazor,loader,appearance
published: True
position: 5
components: ["loader"]
---

# Appearance Settings

The loader component provides the following parameters that control its appearance:

* [Type](#type)
* [Size](#size)
* [ThemeColor](#themecolor)

You can use all three together to get the desired appearance. This article will explain their effect one by one.


## Type

The `Type` parameter controls the loading animation shape. It takes a member of the `Telerik.Blazor.Components.LoaderType` enum:

* `Pulsing` (default)
* `InfiniteSpinner`
* `ConvergingSpinner`

See them in action in the [Loader Overview live demo](https://demos.telerik.com/blazor-ui/loader/overview).

>caption Loader Types

<demo metaUrl="client/loader/appearance/example-1/" height="420"></demo>


## Size

The `Size` parameter accepts a `string` and there are three predefined sizes for the Loader. You can use the predefined properties in the `Telerik.Blazor.ThemeConstants.Loader.Size` static class:

* `Small` (equals `"sm"`)
* `Medium` (equals `"md"`) - default
* `Large` (equals `"lg"`)

See them in action in the [Loader Overview live demo](https://demos.telerik.com/blazor-ui/loader/overview).

>caption Loader Size

<demo metaUrl="client/loader/appearance/example-2/" height="420"></demo>


## ThemeColor

The `ThemeColor` parameter sets the color of the animated loading indicator. You can set it to a `string` property of the static class `ThemeConstants.Loader.ThemeColor`:

* `Primary`
* `Secondary`
* `Tertiary`

These predefined options match the main [Telerik Theme](slug:themes-overview) and you can see that in action in the [Loader Appearance live demo](https://demos.telerik.com/blazor-ui/loader/appearance).

>caption Built-in Theme Colors

<demo metaUrl="client/loader/appearance/example-3/" height="420"></demo>

### Custom Loader Colors

The `ThemeColor` parameter renders as the `k-loader-<ThemeColor>` CSS class on the wrapping element and you can set it to a custom value to cascade through and set the color to a setting of your own without customizing the entire theme.

>caption Custom Loader color without customizing the Telerik Theme

<demo metaUrl="client/loader/appearance/example-4/" height="320"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## See Also

* [Live Demo: Loader Overview](https://demos.telerik.com/blazor-ui/loader/overview)
* [Live Demo: Loader Appearance](https://demos.telerik.com/blazor-ui/loader/appearance)
