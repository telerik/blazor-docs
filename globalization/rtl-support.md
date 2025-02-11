---
title: Right-to-Left Support
page_title: Right-to-Left Support
description: Learn which globalization features are supported in the Telerik UI for Blazor components suite.
slug: rtl-support
tags: telerik,blazor,internationalization,right-to-left,right,left,rtl,support,overview
published: True
position: 5
---

# Right-to-Left Support

Right-to-Left (RTL) support represents the ability of any software or UI to handle users who communicate through right-to-left languages. Right-to-left languages are Arabic, Hebrew and others.

The default language input for most users on the web is left-to-right. However, many websites and applications need to provide RTL support for their visitors. The RTL functionality falls more into the internationalization space but can be considered an accessibility feature as well. After all, RTL is about making user experiences more accessible for visitors who use right-to-left languages.

## Configuration

Right-to-left support is configured at the root level so it affects all UI for Blazor components in the application. You cannot mix right-to-left and left-to-right orientation in the same application.

To enable right-to-left direction of the components in your application, set the `EnableRtl` parameter of the [`TelerikRootComponent`](slug:rootcomponent-overview)  to `true`.

>caption Enable RTL

<div class="skip-repl"></div>
````RAZOR
<TelerikRootComponent EnableRtl="true">
    @Body
</TelerikRootComponent>
````

>tip You may change the setting during runtime based on external input, such as language selection or information from the user agent of a visitor.

## Supported Components

The majority of the UI for Blazor components incorporate RTL support. Check the [Internationalization Support table](slug:globalization-overview#internationalization-support) for a complete list of the supported components and links to their demo pages.

## Limitations

While the `TelerikRootComponent` may wrap the entire application, it does not render any HTML elements in the DOM. Thus, the `EnableRtl` parameter of the `TelerikRootComponent` only ensures the RTL direction of the Telerik components ant does not alter the direction of any custom HTML elements.

For any additional markup in your application, you have to explicitly set the `dir` attribute of some wrapping HTML element. 

A mismatch between the RTL direction of the application and the `TelerikRootComponent` may lead to undesired behavior such as incorrect tabbing sequence. That latter goes from right to left in RTL user interfaces.

If you need to change the `EnableRtl` parameter of the `TelerikRootComponent` at runtime, make sure to also change the `dir` attribute of your wrapping HTML element.

## Keyboard Navigation

When the [right-to-left direction is enabled](slug:rtl-support), the keyboard shortcuts for the components that support keyboard navigation remain unchanged except for the `Left arrow` and `Right arrow` keys—their functionality is reversed to follow the right-to-left direction.


## See Also

  * [Localization](slug:globalization-localization)
  * [Globalization Formats](slug:globalization-formats)
