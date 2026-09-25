---
title: Appearance
page_title: Form Appearance
description: Appearance settings of the Form for Blazor.
slug: form-appearance
tags: telerik,blazor,form,appearance
published: True
position: 35
components: ["form"]
---

# Appearance Settings

This article outlines the available Form parameters, which control its appearance.

## Size

You can increase or decrease the Form dimensions with the `Size` parameter, which affects the font size, margins, and paddings in the Form. The parameter also influences the nested Telerik components that are not part of a [`Template`](slug:form-formitems-template).

For a valid and readable Form configuration, set the `Size` to a `string` member of the static [`ThemeConstants.Form.Size`](slug:Telerik.Blazor.ThemeConstants.Form.Size) class. The following code snippets are equivalent:

>caption Setting the Form Size Parameter

````RAZOR.skip-repl
<TelerikForm Size="@ThemeConstants.Form.Size.Small" />

<TelerikForm Size="sm" />
````

## Example

>caption All Built-in Form Sizes

<demo metaUrl="client/form/appearance/example-1/" height="620"></demo>

## See Also

* [Live Demo: Form Appearance](https://demos.telerik.com/blazor-ui/form/appearance)
