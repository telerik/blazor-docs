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

Right-to-Left (RTL) support represents the ability of a library, website, or application to handle and respond to users who communicate through right-to-left languages. Right-to-left languages are Arabic, Hebrew and others.

The default language input for most users of the web is left-to-right. However, many websites and applications wish to also provide RTL support for their visitors. The RTL functionality falls more into the internationalization space but can be considered as an accessibility feature as well. After all, RTL is about making user experiences more accessible for visitors who use right-to-left languages.

## Configuration

Enabling the Right-to-Left support is configured on root level so it targets all UI for Blazor components in the application. To enable the Right-to-Left direction of the components in your application, set the `EnableRtl` parameter of the `TelerikRootComponent`  to `true`.

````CSHTML
<TelerikRootComponent EnableRtl="true">
    @Body
</TelerikRootComponent>
````

>tip You may change the setting during runtime based on external input, such as language selection or information from the user agent of a visitor.

## Supported Components

The majority of the UI for Blazor components incorporate RTL support. Check the [Internationalization Support table]({%slug globalization-overview%}#internationalization-support) for a complete list of the supported components and links to their demo pages.

## Limitations

While the `TelerikRootComponent` may wrap the entire application, it does not render any HTML elements in the DOM. Thus, the `EnableRtl` parameter of the `TelerikRootComponent` only ensures the RTL direction of the Telerik components ant does not alter the direction of any custom HTML elements.

For any additional markup present in your application, you have to explicitly set `dir` attribute of some wrapping HTML element. 

Not matching the RTL direction of the application with the one that `TelerikRootComponent` uses may lead to undesired behavior such as breaking the tabbing sequence - different in a document with RTL direction as it goes from right to left as well.

If you need to change the `EnableRtl` parameter of the `TelerikRootComponent` during runtime make sure to also change the `dir` attribute of your custom wrapping element.

## Keyboard Navigation

When the Right-to-Left direction is enabled, the shortcuts for the [components that support keyboard navigation]({%slug accessibility-keyboard-navigation%}) will remain unchanged except for the `Left arrow` and `Right arrow` keys.

The functionality of the left and right arrow keys is reversed to follow the right right-to-Left direction.

## See Also

  * [Localization]({%slug globalization-localization%})
  * [Globalization Formats]({%slug globalization-formats%})
