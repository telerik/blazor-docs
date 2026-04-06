---
title: Localization and Globalization Recipes
description: "Find knowledge base articles about Localization and Globalization in Blazor components."
tags: localization, globalization, internationalization, culture
slug: pillar-localization-globalization
page_title: Localization and Globalization Knowledge Base Articles 
---

Explore the [how-to](#localization-and-globalization-how-tos) and [troubleshooting](#localization-and-globalization-troubleshooting) guides below for solutions to common localization and globalization scenarios.

Telerik UI for Blazor provides comprehensive support for both localization (translating UI text and ARIA attributes) and globalization (adapting number and date formats to the current culture), as well as right-to-left (RTL) rendering for many components. To enable these features, you must register the Telerik services, optionally implement and register a custom localization service, and ensure your resource files are up to date for full translation coverage.

* Localization allows you to display component texts in different languages by implementing the `ITelerikStringLocalizer` interface and providing translations for all required keys. You can use .resx files or other sources for your translations, and register your custom localizer after calling `AddTelerikBlazor()` in your `Program.cs` file. For example:

    ````C#.skip-repl
    builder.Services.AddTelerikBlazor();
    builder.Services.AddSingleton(typeof(ITelerikStringLocalizer), typeof(SampleResxLocalizer));
    ````

* Globalization ensures that date, number, and currency formats follow the current thread culture. Most input and display components (such as Grid, DatePicker, NumericTextBox, etc.) automatically use the current culture for formatting. You can find details and examples for each component in the documentation, including how to set supported date formats and [how culture affects rendering](slug:globalization-formats).

* Right-to-left support is available for many components and can be enabled globally using the `<TelerikRootComponent>`, which also cascades localization and other global settings to all Telerik components in your app.

## Localization and Globalization How Tos

The knowledge base articles below originate from support tickets and community questions about Localization and Globalization, and typically cover custom scenarios that aren't covered in the [main documentation](slug:globalization-overview).

* [How to override selected localization resource strings without maintaining full resource files?](slug:common-kb-localize-selected-localization-keys)
* [How to display currency format without decimals?](slug:numeric-textbox-kb-zero-decimals)
* [How to apply locale-specific formatting to numeric labels in the Chart?](slug:chart-kb-localized-numeric-labels)
* [How to change the first day of the week via `CultureInfo` settings—a locale-driven behavior?](slug:datepicker-kb-change-starting-day-of-week)
* [How to load non-Latin (Cyrillic) fonts for correct rendering in PDF exports—a non-ASCII/internationalization concern?](slug:grid-kb-load-cyrillic-fonts-in-pdf-export)

## Localization and Globalization Troubleshooting

The troubleshooting articles below will help you solve localization and globalization problems when implementing custom scenarios.

* [Troubleshooting missing or untranslated texts in Telerik Blazor components](slug:common-kb-partial-localization)
* [Troubleshooting null value / format parameter error in an app with localization](slug:common-kb-null-value-parameter-format)
* [Unexpected behavior with percentage range formatting](slug:numerictextbox-kb-percentage-range)
* [Scientific notation appearing for small numbers instead of decimal notation](slug:numeric-kb-scientific-format-small-numbers)
