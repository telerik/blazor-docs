---
title: Localization Assistant
page_title: 
description: Learn how to set up and use the Telerik localization tool that integrates with the Telerik UI for Blazor Agentic UI Generator.
slug: agentic-ui-generator-localization-assistant
position: 25
tags: telerik,blazor,ai,agentic,localization
published: True
tag: new
---

# Telerik UI for Blazor Localization Assistant

The Telerik UI for Blazor localization assistant allows you to:

* Localize an existing Blazor application by moving hard-coded UI strings from the application code to new or existing `.resx` files.
* Translate an existing [Telerik resource file](slug:globalization-localization#step-2-add-resouce-files) and generate `.resx` files for more languages.
* Translate an existing application resource file and generate `.resx` files for more languages.

Although the localization tool is part of the Telerik AI tools, most of its tasks (except the translation process itself) depend on deterministic algorithms for better reliability.

## Prerequisites

Before using the Telerik localization assistant:

* Check the [general prerequisites of the Telerik MCP tools](slug:agentic-ui-generator-getting-started#prerequisites).
* [Install the Telerik Blazor MCP server](slug:agentic-ui-generator-getting-started#quick-start).
* Obtain an OpenAI or Azure OpenAI endpoint and API key.
* Enable and set up [Blazor Localization](slug:globalization-localization#basics) in your app.

## Installation

To use the Telerik localization assistant:

1. Locate the [global or project-specific `mcp.json` or `.mcp.json` file](slug:agentic-ui-generator-getting-started#quick-start) that contains the `"telerik-blazor-mcp"` configuration.
1. In the `"env"` section, set some additional environment variables:
    * `"TELERIK_BLAZOR_MCP_ENABLE_LOCALIZATION": "true"`
    * `"TELERIK_LOCALIZATION_PROVIDER_BASE_URL": "YOUR_API_ENDPOINT"`
    * `"TELERIK_LOCALIZATION_PROVIDER_API_KEY": "YOUR_MODEL_API_KEY"`
    * `"TELERIK_LOCALIZATION_PROVIDER_MODEL": "YOUR_MODEL"`

The resulting `"telerik-blazor-mcp"` configuration in the JSON file should look similar to:

````JSON.skip-repl
{
  "servers": {
    "telerik-blazor-mcp": {
      "type": "stdio",
      "command": "dnx",
      "args": ["Telerik.Blazor.MCP", "--yes"],
      "env": {
        "TELERIK_BLAZOR_MCP_ENABLE_LOCALIZATION": true,
        "TELERIK_LOCALIZATION_PROVIDER_BASE_URL": "https://api.openai.com/...",
        "TELERIK_LOCALIZATION_PROVIDER_API_KEY": "abcdefghijklmnopqrstuvwxyz",
        "TELERIK_LOCALIZATION_PROVIDER_MODEL": "gpt-4.1"
      }
    }
  }
}
````

## Usage

Invoke the Telerik localization assistant with natural language. The MCP tool tries to infer all the required [mode](#modes) and [parameter](#parameters) information from the prompt. If necessary, you can also type a more technical prompt that direcly references `#telerik_localization_assistant` and sets the mode and parameters explicitly.

The standard algorithm and interaction with the tool includes several distinct steps that require separate prompts. Each step corresponds to an operation [mode](#modes) of the localization tool:

1. (`preview`) Scan a Blazor project and identify hard-coded strings to localize and source files to update. Generate a reviewable localization plan.
1. (`apply`) Approve the plan, replace the identified strings with localization expressions and move the strings to `.resx` files without translating them yet. Validate the changes.
1. (`translate`) Translate the strings inside the `.resx` files. Validate the changes.
1. (`status`) Review the status and result of the workflow before or after any of the above steps.

> Do not modify relevant source files between the `preview` and `apply` steps.

## Modes

A mode is the specific action that the Telerik localization tool performs. For better reliability and code safety, each step requires its own separate prompt. Each mode has required and optional configuration [parameters](#parameters). A parameter name or value does not necessarily need to be present in your prompt if it can be inferred from the Chat history and context. If necessary, you can also type a more technical prompt that direcly references `#telerik_localization_assistant` and sets the mode and parameters explicitly.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Mode&nbsp;Name | Description | Required Parameters | Optional Parameters |
| --- | --- | --- | --- |
| `preview` | Scan the project and generate a localization plan that includes: <ul><li>Candidate string count</li><li>Affected files</li><li>Target resource files</li><li>A `planId`</li></ul> | `projectPath`, <br /> `scanCodeFiles`, <br /> `targetLocales` | |
| `apply` | Execute an approved localization plan: <ul><li>Replace the hard-coded strings in the project with localization expressions</li><li>Create or populate the expected `.resx` files with the same non-translated strings. Translation occurs in the separate `translate` mode.</li></ul> `apply` is possible only if the application code has not changed after the last `preview` execution, otherwise the plan is marked as stale and you need to run `preview` again. | `projectPath`, <br /> `planId` |  |
| `translate` | [Translate approved or existing `.resx` values](#translate-resource-files). If you already have populated non-translated `.resx` files, you can use `translate` together with `resourcePaths` directly without `preview` and `apply` before that. | `projectPath`, <br /> `targetLocales` | `resourcePaths`, <br /> `retranslateExisting` |
| `status` | Return the latest workflow state and result. Use it to see: <ul><li>Whether a workflow exists</li><li>Which plan was last saved</li><li>Whether the last saved plan is stale</li><li>How many resources or locales were translated</li></ul> | `projectPath` |  |

## Parameters

A parameter is a required or optional argument for a given mode that configures the mode operation. A required parameter does not necessarily need to be present in your prompt if it can be inferred from the Chat history and context.

| Parameter Name | Description |
| --- | --- |
| `mode` | The workflow task to execute. Always required. |
| `scanCodeFiles` | Defines whether to [scan `.razor.cs` and `.cs` files of Razor components](#localize-strings-in-razorcs-and-cs-files). |
| `planId` | A unique identifier that is generated in a previously executed `preview`. |
| `projectPath` | The project root and write boundaries of the localization assistant. Always required. |
| `resourcePaths` | Existing `.resx` files to translate. |
| `retranslateExisting` | Defines whether to translate and overwrite existing non-empty translations in existing `.resx` files. |
| `targetLocales` | Culture codes like in array format, for example, `[ "en-US", "es-ES" ]`. |


## Localize Strings in .razor Files

Scanning in `.razor` files detects the following candidates for translation:

* Plain visible text nodes in Razor markup
* The following HTML attributes:
    * `title`
    * `placeholder`
    * `alt`
    * `aria-label`
    * `aria-description`
* The following component parameters:
    * `Description`
    * `Hint`
    * `Subtitle`
    * `Text`
    * `Label`
    * `Title`
    * `Placeholder`
    * `HeaderText`
    * `EmptyText`
    * `Tooltip`

The Telerik localization tool does not handle the following scenarios intentionally:
 
* String interpolation in markup, for example: `@($"Welcome back, {userName}!")`
* String concatenation in markup, for example: `@("Hello, " + userName + "!")`
* String literals and arrays inside Razor `@code` blocks, for example: `private string[] messages = ["Welcome", "Goodbye"];`. Replace array values with resource lookups at the point where they are displayed.

Localize interpolated or concatenated strings manually with `IStringLocalizer`. For example:
 
* `Localizer["WelcomeBack", userName]`
* `Localizer["HelloUser", userName]`

The Razor scanner extracts supported literal strings directly from markup elements and attributes. It does not evaluate arbitrary C# expressions or determine whether values declared in a `@code` block will eventually be displayed. The only supported `@code` exception is a string literal passed to `JS.InvokeAsync` or `JS.InvokeVoidAsync` for display in a JavaScript `confirm()` or `alert()`.

## Localize Strings in .razor.cs and .cs Files

Scanning in C# files is optional and runs only:

* When you run a `preview` with `scanCodeFiles=true`
* For `Component.razor.cs` and `Component.cs` files that are associated with a scanned Razor component.
 
The scanning process of C# files is conservative by design and complies with the following rules.

### Supported Property Names

The supported list of UI property names includes:
 
* `Description`
* `Hint`
* `Subtitle`
* `Text`
* `Label`
* `Title`
* `Placeholder`
* `HeaderText`
* `EmptyText`
* `Tooltip`

### Supported C# Contexts

The following cases are valid candidates for automatic localization:
 
* A direct assignment of a member with a name that exactly matches an allowed name, for example `Text` in `button.Text = "Save"`.
* A property initializer with a matching property name, for example: `private string EmptyText { get; set; } = "No records".`.
* A `return` statement inside a method or property with a name that ends with an allowed name, for example: `string BuildTooltip() { return "Tooltip text" }`. 
* A plain string literal in one of the supported contexts.
* A simple interpolated string in one of the supported contexts, for example: `popup.Title = $"Delete {count}"`. The tool converts dynamic values to indexed resource arguments.

### Unsupported C# Contexts

The following cases are intentionally not supported:

* Field initializers, even when the field name occurs the allowed list.
* Local variables and arbitrary string declarations.
* Assignments to names outside the exact allowed list. Names such as `ButtonLabel`, `Greeting`, `StatusMessage`, or `DialogTitleText` are not partial matches.
* Arbitrary method arguments or return statements from methods/properties whose names do not end with an allowlisted name. 
* String concatenation such as `"Hello, " + userName`.
* Interpolated strings that use alignment or format clauses, such as `$"Total: {total:C2}"` or `$"{Name, 20}"`.
* Indirect data flow where the scanner would need to determine how or where a value is eventually displayed.
* Strings inside logging calls.
* Strings inside C# attributes. 
* `nameof(...)` expressions.
* Existing `IStringLocalizer` keys and expressions that are already localized.
* Values that contain no letters or are only whitespace.
* Values that look like URLs, routes, fragments, or other non-UI identifiers, including strings beginning with `/` or `#`. 
* Non-UI application data related to logging, routing, configuration, and internal identifiers.

## Translate Resource Files

The Telerik localization assistant can translate a complete Telerik UI for Blazor `.resx` file when this file already exists in your app. If you don't have a complete and verified `.resx` file with Telerik localization strings, use the [default English resource file](slug:globalization-localization#step-2-add-resouce-files) as a starting point.

## Troubleshooting

Use the following guidance to explain or troubleshoot unexpected tool behaviors.

### Skipped Strings During Scanning

If a visible C# string is not detected during scanning:

* Confirm that `preview` is called with `scanCodeFiles=true`.
* Confirm that the source is a companion `.razor.cs` or `.cs` file.
* Confirm that the string falls directly inside one of the supported contexts above.
* Localize the string manually with `IStringLocalizer<T>`. Do not rename fields or restructure application logic only to satisfy the scanner.
* Add the corresponding key and source value to the component `.resx` file.
* Use indexed resource arguments for dynamic values, for example: `Localizer["CodeBehindDemo.Farewell", userName]`.

A skipped C# string is not necessarily a bug. The scanner is intentionally restrictive to avoid extracting logs, configuration, routing values, identifiers, and business-logic strings as user-facing resources.


### Error Messages

The Telerik localization assistant may report errors in certain scenarios:

| Error Message | Description and Resolution |
| --- | --- |
| projectPath is required | The tool did not receive a valid absolute project path. Call the tool and provide the path to the project folder or the `.csproj` file. |
| Invalid planId | A tool call in `apply` mode received a non-existent `planId`. Rerun the tool in `preview` mode and use the returned `planId`. |
| Translated text is missing protected token. | the translation response did not preserve required placeholders/tokens. Collect the affected source value and provider/model details and contact technical support. |
| Invalid locale error | One or more of the provided cultures is incorrect. Define cultures as pairs of language and region codes, for example, `en-US` or `es-ES`. |

## See Also

* [Telerik Blazor Localization](slug:globalization-localization)
* [Telerik UI for Blazor AI Tools Overview](slug:ai-overview)
