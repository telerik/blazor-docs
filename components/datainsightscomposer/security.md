---
title: Security
page_title: DatAInsightsComposer Security
description: Learn about best security practices when using the DatAInsightsComposer.
slug: datainsightscomposer-security
tags: telerik, blazor, datainsightscomposer, security
published: True
position: 40
components: ["datainsightscomposer"]
---

# DatAInsightsComposer Security

The DatAInsightsComposer sends the user prompt and your dataset metadata (field names, labels, and descriptions) to an AI model, and turns the AI model reply into Grid, Chart, and Gauge components. The AI service, user access, and data are all part of the application. Security is therefore shared between the DatAInsightsComposer and the app. This article describes the existing built-in protections and what application should take care of separately.

## Responsibility Model

The following table lists:

* The DatAInsightsComposer behaviors that relate to app and data security.
* Additional application enhancements that can improve security.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Area | DatAInsightsComposer | Application |
| --- | --- | --- |
| AI Service Connection | Calls the registered `IChatClient` (or custom backend). | Configures and secures the AI service, including endpoint, credentials, and encrypted connection. |
| User&nbsp;Access | No authentication or authorization. | Applies restrictions through app authentication and authorization. |
| Datasets | <ul><li>Does not send data items to the AI model.</li><li>Works with all provided datasets and data items in the `Datasets` parameter or `OnDataProcess` event.</li></ul> | Decides which datasets, fields, and items the user can see, and passes only those to the DatAInsightsComposer. |
| Prompts | <ul><li>Sanitizes prompts by removing control characters and markup-like content.</li><li>Marks prompts as untrusted before sending them to the AI model.</li><li>Tells the AI model not to follow instructions.</li></ul> | Set a prompt length limit and additional custom validation, rate limits, and usage quotas. |
| AI Responses | <ul><li>Checks the response structure, including component configurations and field names.</li><li>Rejects AI malformed responses that do not conform to a strict schema.</li><li>Rejects AI responses that contain unexpected component types, duplicate component settings, or non-existent data field names.</li><li>The DatAInsightsComposer does not execute AI output as code or HTML. The DatAInsightsComposer always renders titles, descriptions, messages, and errors as encoded text.</li></ul> | Decides how much to trust the generated result. Validates values such as formats, colors, and numbers. |
| Logging and Auditing | Raises events such as `OnGenerate`, `OnSave`, and `OnHistoryItemCreate`. | Logs user prompts, component configurations, and displayed data. |

## Trust Boundaries and Entry Points

The application should focus on the following potentially harmful inputs or potentially sensitive outputs:

* User prompts&mdash;Free text typed by the user is the main route for prompt-injection attempts. The DatAInsightsComposer provides base sanitization, but the app should also validate them and enforce a length limit. `MaxPromptLength` is unlimited by default and can be bypassed in the browser.
* Dataset metadata&mdash;Field names, labels, and descriptions are sent to the AI model by design. If these come from user input or external systems, sanitize them too. Do not include sensitive information the dataset metadata.
* AI service connection&mdash;Use a trusted, encrypted endpoint. Keep credentials out of client-accessible code. Review the AI provider's data retention policy. In Blazor WebAssembly apps, route calls through a server-side backend.

>warning New prompt injection attacks are discovered regularly. When making AI service calls, the application must apply the latest best practices that validate user prompts and prevent potential prompt injection.

## See Also

* [Live Demos: DatAInsightsComposer](https://demos.telerik.com/blazor-ui/datainsightscomposer/overview)
* [DatAInsightsComposer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
