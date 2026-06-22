```markdown
---
title: Ensuring ARIA Roles in UI for Blazor Grid Contain Required Children
description: Learn how to address ARIA compliance issues in the UI for Blazor Grid by ensuring ARIA roles contain the correct child elements.
type: how-to
page_title: Fixing ARIA Compliance Issues in UI for Blazor Grid
meta_title: Fixing ARIA Compliance Issues in UI for Blazor Grid
slug: fixing-aria-roles-blazor-grid
tags: ui-for-blazor, grid, aria-compliance, accessibility
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

I need to ensure that ARIA roles used in the [UI for Blazor Grid](https://docs.telerik.com/blazor-ui/components/grid/overview) conform to accessibility standards by containing the required child elements. This involves making sure that roles like `row` or `grid` are correctly structured to meet ARIA specifications.

This knowledge base article also answers the following questions:
- How do I fix ARIA role compliance issues in Blazor Grid?
- What are the required child elements for ARIA roles in Blazor Grid?
- How to handle ARIA role accessibility in UI for Blazor Grid?

## Solution

To ensure ARIA roles in the UI for Blazor Grid contain the required children:

1. Use the built-in accessibility features of the Grid component to meet ARIA compliance. The Grid automatically applies the necessary roles and child elements.
2. Verify that custom templates or additional elements do not disrupt the ARIA role structure. Ensure that any customizations adhere to ARIA standards.
3. Use the browser's accessibility tools to inspect the rendered Grid and confirm that roles like `grid`, `row`, and `cell` are correctly applied.
4. If necessary, add custom ARIA attributes manually to align with accessibility rules. For example:
   ```html
   <div role="row" aria-labelledby="row-label">
       <div role="gridcell" aria-labelledby="cell-label">
           <!-- Cell content -->
       </div>
   </div>
   ```
5. Test the Grid with screen readers to ensure the structure provides the intended navigational and descriptive information.

## See Also

- [UI for Blazor Grid Documentation](https://docs.telerik.com/blazor-ui/components/grid/overview)
- [ARIA Authoring Practices Guide](https://www.w3.org/TR/wai-aria-practices/)
- [UI for Blazor Accessibility Overview](https://docs.telerik.com/blazor-ui/accessibility/overview)
```
