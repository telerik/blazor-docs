---
title: Appearance
page_title: LoaderContainer Appearance
description: Appearance settings of the LoadingContainer for Blazor.
slug: loadercontainer-appearance
tags: telerik,blazor,loader,container,loadercontainer,appearance
published: True
position: 5
components: ["loadercontainer"]
---

# Appearance Settings

This article explains how to control the LoaderContainer look and feel.

The LoaderContainer uses a nested internal [Loader component](slug:loader-overview) to show the animated indicator. The LoaderContainer exposes parameters, which directly control the Loader's appearance:

* [LoaderType](#loadertype)
* [Size](#size)
* [ThemeColor](#themecolor)

In addition, the LoaderContainer component provides a [LoaderPosition](#loaderposition) parameter.

You can see the appearance settings in action in the [LoaderContainer Appearance live demo](https://demos.telerik.com/blazor-ui/loadercontainer/appearance).


## LoaderPosition

The `LoaderPosition` parameter controls the position of the animated loading indicator in relation to the loading `Text`. There are three predefined options, which are members of the `LoaderPosition` enum:

* `Top` (default) - the loading animation is above the text
* `Start` - the loading animation is to the left of the text
* `End` - the loading animation is to the right of the text

>caption The position of the Loader indicator

<demo metaUrl="client/loadercontainer/appearance/example-1/" height="650"></demo>

## LoaderType

The `LoaderType` parameter of the LoaderContainer will affect the shape of animated loading indicator. The parameter works only when there is **no** [`<Template>`](slug:loadercontainer-template).

See the [Loader `Type` documentation](slug:loader-appearance#type) for the possible values and how the component looks.

>caption Setting TelerikLoaderContainer LoaderType

<demo metaUrl="client/loadercontainer/appearance/example-2/" height="420"></demo>


## Size

The `Size` parameter of the LoaderContainer will affect the dimensions of animated loading indicator. The parameter works only when there is **no** [`<Template>`](slug:loadercontainer-template).

See [Loader `Size`](slug:loader-appearance#size) for a list of possible values and how to set them more easily.

>caption Setting TelerikLoaderContainer Size

<demo metaUrl="client/loadercontainer/appearance/example-3/" height="420"></demo>


## ThemeColor

The `ThemeColor` parameter of the LoaderContainer will affect the text color and the loading indicator color. The parameter works only when there is **no** [`<Template>`](slug:loadercontainer-template).

See [Loader `ThemeColor`](slug:loader-appearance#themecolor) for a list of possible values and how the component looks.

>caption Setting TelerikLoaderContainer ThemeColor

<demo metaUrl="client/loadercontainer/appearance/example-4/" height="420"></demo>

### Custom LoaderContainer Colors

The following example shows [how to override the CSS styles in the theme](slug:themes-override) and apply custom colors to all LoaderContainer elements.

>caption Custom LoaderContainer colors

<demo metaUrl="client/loadercontainer/appearance/example-5/" height="420"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)

## Next Steps

* [Experiment with LoaderContainer templates](slug:loadercontainer-template)


## See Also

* [Live Demo: LoaderContainer Appearance](https://demos.telerik.com/blazor-ui/loadercontainer/appearance)
