---
title: Overview
page_title: Validation Tools - Overview
description: Overview of the Validation Tools for Blazor.
slug: validation-tools-overview
tags: telerik,blazor,validation,tools,overview
published: True
position: 0
components: ["validationmessage", "validationsummary", "validationtooltip"]
---
# Blazor Validation Tools Overview

Telerik UI for Blazor provides different ways to show and customize validation messages. The validation tools can be used together with the [Telerik Form](slug:form-overview) or with any form that provides an [`EditContext`](https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editcontext) like the [standard Blazor `EditForm`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.forms.editform).

@[template](/_contentTemplates/common/form-validation.md#note-validation)

## Validation Tools

Telerik UI for Blazor provides the following validation tools to help you style your form validation:

* [Validation Summary](slug:validation-tools-summary)
* [Validation Message](slug:validation-tools-message)
* [Validation Tooltip](slug:validation-tools-tooltip)

These components add default styling and customization options on top of the standard Blazor validation tools `ValidationSummary` and `ValidationMessage`.

The validation components must receive an `EditContext` instance as a cascading parameter, so they can reside in a [Telerik Form](slug:form-overview) or a standard Blazor `EditForm`.

@[template](/_contentTemplates/common/form-validation.md#note-editcontext-formitem-template)

@[template](/_contentTemplates/common/form-validation.md#note-telerik-role-in-validation)

# Next Steps

* Use [TelerikValidationSummary](slug:validation-tools-summary)
* Explore [TelerikValidationMessage](slug:validation-tools-message)
* Try [TelerikValidationTooltip](slug:validation-tools-tooltip)

## See Also

* [Live Demo: Validation](https://demos.telerik.com/blazor-ui/validation/overview)
* [Form Component](slug:form-overview)
