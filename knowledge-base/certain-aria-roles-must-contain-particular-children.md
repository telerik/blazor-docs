---
title: Ensuring Specific ARIA Roles Contain Required Children in UI for Blazor Grid
description: Learn how to ensure ARIA roles in the UI for Blazor Grid component meet accessibility requirements by containing the necessary child elements.
type: how-to
page_title: Meeting ARIA Role Requirements in UI for Blazor Grid
meta_title: Meeting ARIA Role Requirements in UI for Blazor Grid
slug: aria-roles-required-children-blazor-grid
tags: blazor, grid, accessibility, aria, roles
res_type: kb
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> UI for Blazor Grid </td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

I want to ensure that specific ARIA (Accessible Rich Internet Applications) roles in the [UI for Blazor Grid](https://docs.telerik.com/blazor-ui/components/grid/overview) component meet accessibility standards by containing the required child elements. This ensures compliance with accessibility guidelines.

This knowledge base article also answers the following questions:
- How do I address ARIA role warnings in UI for Blazor Grid?
- How can I ensure proper ARIA role structure in Blazor Grid?
- What are the required child elements for ARIA roles in the Blazor Grid?

## Solution

To ensure that ARIA roles in the UI for Blazor Grid contain the required child elements:

1. Use the `GridAccessibilitySettings` to customize ARIA attributes in the Grid component.
2. Ensure that the `role`, `aria-rowcount`, and other ARIA attributes are correctly set for Grid rows and cells.

Example of setting ARIA attributes for the Grid:

```razor
<TelerikGrid Data=@MyData
             Height="500px"
             Width="100%"
             Pageable="true"
             GridAccessibilitySettings="@GridAccessibilitySettings">
</TelerikGrid>

@code {
    GridAccessibilitySettings GridAccessibilitySettings = new GridAccessibilitySettings
    {
        Role = "grid", // Sets the ARIA role
        AriaRowCount = MyData.Count // Ensures correct row count for screen readers
    };
}
```

3. Validate that all child elements of the Grid (e.g., rows, headers, and cells) contain required ARIA roles and attributes where applicable.

Example of custom ARIA roles for Grid cells:

```razor
<TelerikGrid Data=@MyData Pageable="true" Height="500px" Width="100%">
    <GridColumns>
        <GridColumn Field="Id" Title="ID" Role="gridcell" />
        <GridColumn Field="Name" Title="Name" Role="gridcell" />
    </GridColumns>
</TelerikGrid>
```

4. Test the Grid component using accessibility tools like the WAVE Accessibility Tool or Lighthouse to identify and resolve any ARIA role errors.

## See Also

- [UI for Blazor Grid Overview Documentation](https://docs.telerik.com/blazor-ui/components/grid/overview)
- [Accessibility and ARIA Roles in Blazor Grid](https://docs.telerik.com/blazor-ui/knowledge-base/grid-aria-roles)
- [WAVE Accessibility Tool](https://wave.webaim.org/) for testing accessibility issues. 
