---
title: Prompt Library
page_title: Telerik Blazor Prompt Library
description: Get familiar with some example prompts that show how to use the Telerik AI Coding Assistant for better developer productivity.
slug: ai-prompt-library
tags: telerik,blazor,ai
published: True
position: 2
previous_url: /ai/prompt-library
tag: updated
---

# AI Coding Assistant Prompt Library

This article provides a list of sample prompts for use with the [Telerik Blazor MCP Server](slug:ai-mcp-server). They can help you get a better idea what the Telerik AI Coding Assistant can do and how to compose your prompts. This collection is not exhaustive and you can prompt the Telerik AI Coding Assistant about other scenarios and components as well.

>tip [Go straight to the prompts ⬇️](#general-prompts)

## How to Use the Prompts

All prompts in this library target the [Telerik Blazor MCP Server](slug:ai-mcp-server). The [`#telerik_blazor_assistant` handle](slug:ai-mcp-server#usage) assumes that this is the server name you have [entered in the `mcp.json` file during installation](slug:ai-mcp-server#installation).

1. Browse the [prompt library](#general-prompts) to find a prompt that suits your needs.
2. Copy the prompt text including the `#telerik_blazor_assistant` handle.
3. (optional) Customize the prompt as needed for your specific use case.
4. Run the prompt against the MCP server.

>warning Always double-check the code and solutions proposed by any AI-powered tool before applying them to your project.

## General Prompts

This section provides examples of general questions related to Telerik UI for Blazor.

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Setup Components
#telerik_blazor_assistant in the current Blazor project, use the existing model classes and data and help me visualize the data by configuring a Grid, a Chart, and a DatePicker. The Grid should display Product details, the Chart should show Sales figures per Category, and the DatePicker should allow filtering Products by date range.

```
```Razor
```

```prompt Component Overview
#telerik_blazor_assistant What are the primary use cases of the Telerik UI for Blazor Grid vs TreeList vs ListView? Provide examples of their usage.
```
```Razor
```

</div>

## Advanced Tool-Specific Prompts

This section provides prompt examples for directly calling individual specialized tools for more granular control.

### Component Tool

Use the `#telerik_component_assistant` handle for specific implementations that need the UI for Blazor components:

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Grid Configuration
#telerik_component_assistant Create a Grid component that uses the Product model and has paging (50 records per page), sorting, and filtering enabled.
```
```Razor
```

```prompt Grid with Virtual Scrolling
#telerik_component_assistant Show me sample code for a Telerik UI for Blazor Grid with virtual scrolling. The page size must be 20 records, the height of the Grid must be 450px, and the rows must be 40px high.
```
```Razor
```

</div>

### Icon Tool

Use the `#telerik_icon_assistant` handle for finding and implementing suitable icons based on your scenario:

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

```prompt Navigation Icons
#telerik_icon_assistant Add icons suitable for the Home, Settings, and User Profile buttons in my navigation bar.
```
```Razor
```

```prompt Toolbar Action Icons
#telerik_icon_assistant Find appropriate icons for data visualization actions like export, print, refresh, and search in a dashboard toolbar.
```
```Razor
```

</div>

## Component-Specific Prompts

### Grid

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant Create a basic Grid component that displays employee data with columns for ID, Name, Position, and Salary. Include sorting and pagination functionality.
````

````TEXT.skip-repl
#telerik_blazor_assistant Implement a Grid with enabled filtering and show how to set up different filter types for text, numeric, and date columns.
````

````TEXT.skip-repl
#telerik_blazor_assistant Set up a Grid that loads data from a REST API endpoint.
````

````TEXT.skip-repl
#telerik_blazor_assistant Set up a Grid with virtual scrolling to handle large datasets efficiently
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a Grid having Edit button on each row, and conditional formatting based on cell values.
````

````TEXT.skip-repl
#telerik_blazor_assistant Implement Grid with enabled grouping and expand/collapse functionality for the groups.
````

````TEXT.skip-repl
#telerik_blazor_assistant Set up a Grid with еnabled multiple selection.
````

````TEXT.skip-repl
#telerik_blazor_assistant Set up a Grid with еnabled checkbox selection. 
````

````TEXT.skip-repl
#telerik_blazor_assistant Create an editable Grid that includes validation for different data types.
````

</div>

### Scheduler

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant Create a Scheduler component with month, week, and day views.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a Scheduler with sample event data and enabled basic event creation, editing, and deletion functionality.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a resource-based Scheduler with sample data grouped by Name of the event owner.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a Scheduler that allows users to toggle between different views and displays appointments.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a Scheduler that allows to create weekly repeating events.
````

</div>

### Chart

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant Build a column chart that shows quarterly sales by region.
````

````TEXT.skip-repl
#telerik_blazor_assistant Build a column chart that shows quarterly sales by region with drill-down functionality to show monthly data when clicking on a quarter.
````

</div>

### Form

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant How to create a form with three TextBox fields.
````

````TEXT.skip-repl
 #telerik_blazor_assistant Generate a Form with required field validation for email and password inputs.
````

</div>

### Upload

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant Create a simple Upload component allowing chunk file upload.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create an Upload component allowing single file upload to a predefined saving location.
````

</div>

### DropDownList

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant Create two cascading DropDownLists where the second list depends on the first selection. Use Categories and Products data with a simple relationship.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a DropDownList with countries data and enabled filtering.
````

</div>

### DatePicker

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant Create a DatePicker that disables weekends.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create two DatePickers for "From" and "To" date selection where the "To" picker's min date updates based on "From" selection.
````

````TEXT.skip-repl
#telerik_blazor_assistant Render a DatePicker with a default selected date.
````

````TEXT.skip-repl
#telerik_blazor_assistant Configure the DatePicker to show week numbers in its calendar popup.
````

````TEXT.skip-repl
#telerik_blazor_assistant Change the display format in the DatePicker so dates show as 'MM/dd/yyyy'.
````

</div>

### Calendar

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant Create a Calendar component in which all past days are disabled.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a Calendar component in which all weekends are disabled.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a Calendar that shows the past 5 years.
````

</div>

### MultiSelect

<div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr;">

````TEXT.skip-repl
#telerik_blazor_assistant Create a MultiSelect with an array of product objects and show the selected product names below the component.
````

````TEXT.skip-repl
#telerik_blazor_assistant Create a MultiSelect with checkboxes bound to a simple list of countries and show the selected count.
````

</div>

## See Also 

* [Telerik Blazor MCP Server](slug:ai-mcp-server)

<style>
.d-print-none button:nth-child(2) {
  display: none !important;
}
</style>
