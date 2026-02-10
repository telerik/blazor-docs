---
title: AI Service Setup
page_title: Grid - AI Service Setup
description: Learn how to set up the Smart Extensions library to handle AI requests from Smart Grid and automatically generate Grid commands from natural language prompts.
slug: grid-ai-service-setup
previous_url: /common-features/integration-with-telerik-ai-smartcomponents-extensions
tags: telerik,blazor,grid,ai,service,setup,smart,extensions
published: True
position: 10
components: ["grid"]
---

# Grid AI Service Setup

To enable AI-powered interaction in the [Smart Grid AI Assistant tools](slug:grid-ai-assistant-tools-setup), you need a backend service that processes natural language prompts and returns executable Grid commands. The `Telerik.AI.SmartComponents.Extensions` library for .NET simplifies this by automatically handling the request/response format and command generation.

This article shows you how to build your own .NET backend service. You will learn how to:

- Install the [`Telerik.AI.SmartComponents.Extensions`](https://www.nuget.org/packages/Telerik.AI.SmartComponents.Extensions) package
- Configure your AI provider (Azure OpenAI, OpenAI, or local models)
- Create an API endpoint that uses the library
- Understand the commands the library generates

## How It Works

The AI Assistant tools send user prompts to your backend service, which must return the response in a specific format that the Grid understands. The `Telerik.AI.SmartComponents.Extensions` package for .NET simplifies this process by handling the request/response formatting automatically.

The Smart Extensions library acts as a bridge between your AI model and the Grid. You provide the AI configuration (Azure OpenAI, OpenAI API, or local LLM credentials) and create an API endpoint, while the library handles all request/response formatting and command generation.

How the library processes requests:

1. Receives structured requests from the Grid containing the user's prompt and Grid column information.
2. Configures your AI model with Grid-specific function definitions using [tool calling](https://learn.microsoft.com/en-us/dotnet/ai/ichatclient#tool-calling). These function definitions enable the AI to understand available Grid capabilities and generate appropriate command responses.
3. Processes the AI response and extracts structured commands.
4. Returns formatted commands that the Grid applies automatically.

For example, when a user types "Show products with price over 100", the library processes this prompt and returns a structured filter command with the appropriate field, operator, and value that the Grid can apply.

## Prerequisites

Before you start, ensure you have:

* .NET 8.0 or later
* Azure OpenAI or OpenAI API access
* ASP.NET Core (for web API scenarios)

## Setup Steps

Follow these steps to set up the Smart Extensions library in your .NET application.

### Install Required Packages

Add the [`Telerik.AI.SmartComponents.Extensions` NuGet package](https://www.nuget.org/packages/Telerik.AI.SmartComponents.Extensions) to your project. It adds the following dependencies:

```bash.skip-repl
dotnet add package Telerik.AI.SmartComponents.Extensions
dotnet add package Microsoft.Extensions.AI
```

Install your AI provider package. For Azure OpenAI:

```bash.skip-repl
dotnet add package Azure.AI.OpenAI
```

### Configure the AI Client

Add your AI provider credentials and configuration in the `appsettings.json` file. This example shows Azure OpenAI configuration:

````json.skip-repl
{
  "AI": {
    "AzureOpenAI": {
      "Endpoint": "https://your-openai-resource.openai.azure.com/",
      "Key": "your-api-key-here",
      "Chat": {
        "ModelId": "gpt-4"
      }
    }
  }
}
````

Register the AI chat client in your application by adding the following code to `Program.cs`:

````C#.skip-repl
using Microsoft.Extensions.AI;
using Azure.AI.OpenAI;

var builder = WebApplication.CreateBuilder(args);

// Configure Azure OpenAI Chat Client
builder.Services.AddSingleton<IChatClient>(serviceProvider =>
{
    IConfiguration configuration = serviceProvider.GetRequiredService<IConfiguration>();
    string endpoint = configuration["AI:AzureOpenAI:Endpoint"];
    string apiKey = configuration["AI:AzureOpenAI:Key"];
    string modelId = configuration["AI:AzureOpenAI:Chat:ModelId"];

    var client = new AzureOpenAIClient(new Uri(endpoint), new Azure.AzureKeyCredential(apiKey));
    return client.AsChatClient(modelId);
});

builder.Services.AddControllers();
var app = builder.Build();
````

### Process Grid AI Requests

Create a controller that handles Grid AI requests. The Smart Extensions library provides two key methods:

- `AddGridChatTools()`&mdash;Configures the AI model with Grid-specific capabilities.
- `ExtractGridResponse()`&mdash;Extracts structured commands and messages from the AI response that the Grid can understand.

````C#.skip-repl
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using Telerik.AI.SmartComponents.Extensions;

[ApiController]
[Route("[controller]/[action]")]
public class GridController : Controller
{
    private readonly IChatClient _chatClient;

    public GridController(IChatClient chatClient)
    {
        _chatClient = chatClient;
    }

    [HttpPost]
    [Route("/grid/smart-state")]
    public async Task<IActionResult> SmartState([FromBody] GridAIRequest request)
    {
        // Create chat completion options
        var options = new ChatOptions();

        // Add Grid-specific chat tools for AI processing
        options.AddGridChatTools(request.Columns);

        // Convert request contents to chat messages
        var conversationMessages = request.Contents
            .Select(m => new ChatMessage(ChatRole.User, m.Text))
            .ToList();

        // Process the request and obtain the AI response
        ChatResponse completion = await _chatClient.GetResponseAsync(conversationMessages, options);

        // Extract structured response from the AI response
        GridAIResponse response = completion.ExtractGridResponse();

        return Json(response);
    }
}
````

With this setup, the library automatically handles the following tasks:

* Interprets the user's natural language prompts
* Generates appropriate Grid commands (filtering, sorting, etc.)
* Formats the response correctly for the Grid

### Configure the Frontend

Now that your backend is ready, configure your Blazor Grid to use this API endpoint. See [Grid AI Assistant Tools Setup](slug:grid-ai-assistant-tools-setup) for frontend setup options.

## Understanding the Request

When users submit natural language prompts through the AI Assistant tools, the Grid automatically constructs and sends a `GridAIRequest` to your backend endpoint. Understanding this request structure helps you optimize your AI service implementation.

### How the Grid Constructs Requests

The Grid gathers information from your data model and current configuration to build the request:

1. **Column Information**&mdash;Extracts field names and types from your Grid columns
2. **User Prompt**&mdash;Packages the natural language text the user entered
3. **Context Data**&mdash;Includes column values for enum-like fields when available

### Example Request Construction

Consider a Grid displaying employee data with this model:

````C#.skip-repl
public class Employee
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public int Age { get; set; }
    public string Department { get; set; }  // Limited set of values
    public decimal Salary { get; set; }
    public string City { get; set; }        // Limited set of values
    public string Gender { get; set; }      // Limited set of values
}
````

When a user submits the prompt "Show me all employees in IT department", the Grid constructs a request like this:

````C#.skip-repl
var request = new GridAIRequest
{
    Role = "user",
    Columns = new List<GridAIColumn>
    {
        new() { Field = "FirstName" },
        new() { Field = "LastName" },
        new() { Field = "Age" },
        new() { Field = "Department", Values = new[] { "IT", "HR", "Finance", "Marketing" } },
        new() { Field = "Salary" },
        new() { Field = "City", Values = new[] { "New York", "London", "Paris", "Tokyo" } },
        new() { Field = "Gender", Values = new[] { "Male", "Female" } }
    },
    Contents = new List<GridAIRequestContent>
    {
        new() { Type = "text", Text = "Show me all employees in IT department" }
    }
};
````

The `Values` arrays for Department, City, and Gender help the AI understand the possible values for these fields, leading to more accurate filtering commands.

>tip Providing the `Values` property for fields with limited options (status, categories, enums) significantly improves AI accuracy. The AI can validate user requests against these values and generate precise filter conditions.

## Request and Response Format

The Smart Extensions library uses specific request and response structures when handling communication between the Grid and your backend service. This section documents both formats to help you understand the communication flow.

### Request Structure

The Grid sends a `GridAIRequest` object to your endpoint containing the user's prompt and column information:

````C#.skip-repl
public class GridAIRequest
{
    public string Role { get; set; }                          // Message sender (typically "user")
    public List<GridAIRequestContent> Contents { get; set; }  // User's natural language prompt
    public List<GridAIColumn> Columns { get; set; }           // Grid column definitions
}

public class GridAIRequestContent
{
    public string Type { get; set; }   // Content type (typically "text")
    public string Text { get; set; }   // The natural language prompt
}

public class GridAIColumn
{
    public string Id { get; set; }        // Unique column identifier
    public string Field { get; set; }     // Field name from your data model
    public string[] Values { get; set; }  // Optional predefined values for enum-like fields
}
````

Example request JSON:

````json.skip-repl
{
  "Role": "user",
  "Contents": [
    {
      "Type": "text",
      "Text": "Show products with price over 100"
    }
  ],
  "Columns": [
    {
      "Id": "productName",
      "Field": "ProductName"
    },
    {
      "Id": "price",
      "Field": "Price"
    },
    {
      "Id": "status",
      "Field": "Status",
      "Values": ["Active", "Inactive", "Pending"]
    }
  ]
}
````

>tip Include the `Values` property for columns with predefined values (status, category, etc.) to help the AI generate more accurate filters.

### Response Structure

When processing the Grid request using the `ExtractGridResponse()` method, a `GridAIResponse` object is generated:

````C#.skip-repl
public class GridAIResponse
{
    public List<ICommand> Commands { get; set; }  // Grid operation commands
    public List<string> Messages { get; set; }     // Status messages
}
````

Example response JSON:

````json.skip-repl
{
  "Commands": [
    {
      "Type": "GridFilterCommand",
      "Filter": {
        "Field": "Price",
        "Operator": "greaterthan",
        "Value": 100
      }
    }
  ],
  "Messages": ["Filtered products by price greater than 100"]
}
````

## Command Types

The library generates specific command types based on the user's prompt. The following sections list all available commands grouped by operation category:

### Data Operations

| Command Type | Description | Parameters |
|--------------|-------------|------------|
| `GridFilterCommand` | Applies a filter to the Grid | `Filter` with field, operator, and value |
| `GridSortCommand` | Sorts Grid data | `Sort` with field and direction |
| `GridGroupCommand` | Groups Grid data | `Group` with field and direction |
| `GridPageCommand` | Navigates to a specific page | `Page` number |
| `GridPageSizeCommand` | Changes page size | `PageSize` value |
| `GridClearFilterCommand` | Clears all filters | None |
| `GridClearSortCommand` | Clears all sorting | None |
| `GridClearGroupCommand` | Clears all grouping | None |

Example:

````json.skip-repl
{
  "Commands": [
    {
      "Type": "GridFilterCommand",
      "Filter": {
        "Field": "Price",
        "Operator": "greaterthan",
        "Value": 100
      }
    }
  ]
}
````

### Column Operations

| Command Type | Description | Parameters |
|--------------|-------------|------------|
| `GridColumnShowCommand` | Shows a hidden column | Column `Id` |
| `GridColumnHideCommand` | Hides a visible column | Column `Id` |
| `GridColumnLockCommand` | Locks a column | Column `Id` |
| `GridColumnUnlockCommand` | Unlocks a column | Column `Id` |
| `GridColumnResizeCommand` | Resizes a column | Column `Id` and `Width` |
| `GridColumnReorderCommand` | Reorders a column | Column `Id` and `Position` |

Example:

````json.skip-repl
{
  "Commands": [
    {
      "Type": "GridColumnHideCommand",
      "Id": "age"
    }
  ]
}
````

### Highlighting and Selection

| Command Type | Description | Parameters |
|--------------|-------------|------------|
| `GridHighlightCommand` | Highlights rows or cells based on filters | `Highlight` with filters and cells |
| `GridSelectCommand` | Selects rows or cells based on filters | `Select` with filters and cells |
| `GridClearHighlightCommand` | Clears all highlighting | None |
| `GridClearSelectCommand` | Clears all selection | None |

Example:

````json.skip-repl
{
  "Commands": [
    {
      "Type": "GridHighlightCommand",
      "Highlight": {
        "Filters": [
          {
            "Field": "Status",
            "Operator": "equalto",
            "Value": "Active"
          }
        ]
      }
    }
  ]
}
````

### Export Operations

| Command Type | Description | Parameters |
|--------------|-------------|------------|
| `GridExportExcelCommand` | Exports Grid to Excel | `FileName` |
| `GridExportPDFCommand` | Exports Grid to PDF | `FileName` |
| `GridExportCSVCommand` | Exports Grid to CSV | `FileName` |

Example:

````json.skip-repl
{
  "Commands": [
    {
      "Type": "GridExportExcelCommand",
      "FileName": "products.xlsx"
    }
  ]
}
````

## Sample Prompts

The Smart Extensions library interprets natural language prompts and converts them into Grid operations. The following examples demonstrate the types of prompts you can use:

### Data Operations

````text.skip-repl
"Show products with price over 100"
"Sort by amount descending"
"Group by account type"
"Go to page 20"
"Clear filtering"
````

### Column Operations

````text.skip-repl
"Hide the Age column"
"Lock the Name column"
"Resize the Name column to 200px"
"Move the Department column to position 1"
````

### Highlighting and Selection

````text.skip-repl
"Highlight rows where status is Active"
"Select age cells where age is greater than 30"
"Clear selection"
````

### Export Operations

````text.skip-repl
"Export to Excel with file name 'employee_data'"
"Export to PDF"
````

## Filter Operators

The library supports various filter operators for different data types:

- `equalto`&mdash;Exact match
- `contains`&mdash;Contains substring (text)
- `startswith`&mdash;Starts with text
- `endswith`&mdash;Ends with text
- `greaterthan`&mdash;Greater than (numeric/date)
- `lessthan`&mdash;Less than (numeric/date)
- `greaterthanorequal`&mdash;Greater than or equal
- `lessthanorequal`&mdash;Less than or equal
- `notequalto`&mdash;Not equal to

## Best Practices

Follow these recommendations to optimize your Smart Extensions implementation and ensure reliable AI-powered Grid operations.

### Provide Column Values

When Grid columns have predefined values (enums, status fields, categories), include them in the column definitions. This helps the AI generate more accurate filters by understanding the available options for each field:

````C#.skip-repl
new GridAIColumn
{
    Field = "Status",
    Values = new[] { "Active", "Inactive", "Pending" }
},
new GridAIColumn
{
    Field = "Department",
    Values = new[] { "IT", "HR", "Finance", "Marketing" }
}
````

### Error Handling

Implement proper error handling to manage AI service failures and provide meaningful feedback to users:

````C#.skip-repl
[HttpPost]
[Route("/grid/smart-state")]
public async Task<IActionResult> SmartState([FromBody] GridAIRequest request)
{
    try
    {
        var options = new ChatOptions();
        options.AddGridChatTools(request.Columns);

        var messages = request.Contents
            .Select(m => new ChatMessage(ChatRole.User, m.Text))
            .ToList();

        var completion = await _chatClient.GetResponseAsync(messages, options);
        var response = completion.ExtractGridResponse();

        return Json(response);
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { error = $"AI processing failed: {ex.Message}" });
    }
}
````

### Input Validation

Validate incoming requests before processing them to ensure all required data is present:

````C#.skip-repl
if (request?.Columns == null || !request.Columns.Any())
{
    return BadRequest("Columns are required");
}

if (request.Contents == null || !request.Contents.Any())
{
    return BadRequest("Content is required");
}
````

## Troubleshooting

### Connection Errors

- Verify your AI service endpoint URL is correct in `appsettings.json`
- Check that your API key is valid and not expired
- Ensure your application can reach the Azure OpenAI service (firewall/network settings)

### Model Not Found

- Confirm the model ID (e.g., "gpt-4") is deployed in your Azure OpenAI resource
- Check that the model name in `appsettings.json` matches exactly
- Verify the deployment name matches the model configuration

### Token Limit Exceeded

- Reduce the number of columns sent in requests
- Limit the size of the `Values` arrays for columns
- Consider using a model with higher token limits (e.g., gpt-4-32k)
- Break complex requests into smaller, more focused prompts

### Invalid Responses

- Ensure the `Contents` property contains valid text prompts
- Verify column definitions include correct field names
- Check that column `Values` arrays contain representative data samples

## See Also

* [Grid AI Assistant Tools Setup](slug:grid-ai-assistant-tools-setup)
* [Grid AI Smart Box](slug:grid-ai-smart-box)
* [Grid AI Toolbar Assistant](slug:grid-ai-toolbar-assistant)
* [Grid AI Row Highlight](slug:grid-ai-row-highlight)
* [Microsoft.Extensions.AI Documentation](https://learn.microsoft.com/en-us/dotnet/ai/)
