---
title: Keyboard Navigation
page_title: Grid - Keyboard Navigation
description: Find the default keyboard shortcuts of the Grid for Blazor. Learn how to customize the Grid keyboard navigation keys and key combinations.
slug: grid-keyboard-navigation
tags: telerik,blazor,grid,keyboard
published: True
tag: new
position: 95
components: ["grid"]
---

# Grid Keyboard Navigation

This article describes how the Grid keyboard navigation works, how to enable it, and how to [customize](#using-custom-keys) it. The article extends the general information about [keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation).

## Basics

To enable the Grid keyboard navigation, set the `Navigable` parameter of the component to `true`.

````RAZOR.skip-repl
<TelerikGrid Navigable="true" />
````

When the keyboard navigation is enabled, the Grid component becomes an accessible container that consists of the following structural elements:

* ToolBar
* Group Panel
* Data Grid (including header row, filter row, and data rows)
* Pager

These structural Grid elements are logically separated and each of them is part of the page tab sequence. Users can navigate to each structural element with the Tab key.

The Data Grid part is a single tab stop component. When the Data Grid gains focus, the focused cell is either the previously focused cell (if any), or the first data cell. The Tab key moves focus through all focusable elements and the grid does not block it - it uses [roving tab index](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex).

## Default Keys

The following sections list the default built-in keyboard shortcuts and the actions that they perform when a specific Grid area or cell is focused. Also check the [Grid Keyboard Navigation demo](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

### ToolBar

See [ToolBar keyboard navigation](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation).

### Group Panel

See [ChipList keyboard navigation](https://demos.telerik.com/blazor-ui/chiplist/keyboard-navigation).

### All Grid Cells

| Key Combination | Description |
| --- | --- |
| `Left Arrow` | Moves focus one cell to the left (if any). |
| `Right Arrow` | Moves focus one cell to the right (if any). |
| `Down Arrow` | Moves focus one cell down (if any). |
| `Up Arrow` | Moves focus one cell up (if any). |
| `Home` | Moves focus to the first cell in the current row. |
| `End` | Moves focus to the last cell in the current row. |
| `Ctrl` + `Home` | Moves focus to the first cell in the first row. |
| `Ctrl` + `End` | Moves focus to the last cell in the last row. |
| `Page Down` | Goes to the next page of items or scrolls one page down when using virtual scrolling. |
| `Page Up` | Goes to the previous page of items or scrolls one page up when using virtual scrolling. |

### Data Cells

| Key Combination | Description |
| --- | --- |
| `Enter` | The action depends on the focused cell: <ul><li>(data cell) Activates InCell edit mode.</li><li>(hierarchy cell) Expands or collapses a detail row.</li><li>(group cell) Expands or collapses a group.</li><li>(command cell) Focuses the first focusable element inside.</li></ul> |
| `F2` | Activates InCell or Inline edit mode. |
| `Esc` | <ul><li>Cancels InCell edit mode.</li><li>Moves focus from inside the cell to the cell itself.</li></ul> |
| `Space` | Selects the current row. |
| `Ctrl` + `Space` | Selects or deselects the current row. It `SelectionMode` is `Multiple`, preserves the other selected rows. |
| `Shift` + `Space` | Performs range selection. Selects all rows between the last selected rows and the current row. |
| `Shift` + `Arrow Up` | Selects the row above. It `SelectionMode` is `Multiple`, extends the selection range to the row above. |
| `Shift` + `Arrow Down` | Selects the row below. It `SelectionMode` is `Multiple`, extends the selection range to the row below. |
| `Delete` or `Backspace` | Fires the Grid `OnDelete` event, so that the app can remove the current Grid row from the component data. |

### Header Cells

| Key Combination | Description |
| --- | --- |
| `Enter` | Sort or unsort the current column, if sorting is enabled. |
| `Alt` + `Arrow Down` | Opens the Filter Menu or the Column Menu and moves focus to it. |
| `Ctrl` + `Space` | Group or ungroup the current column. |
| `Ctrl` `Left Arrow` | Reorder column to the left. |
| `Ctrl` `Right Arrow` | Reorder column to the right. |

### Column Menu

| Key Combination | Description |
| --- | --- |
| `Arrow Down` | Focuses the next item in the Column Menu. |
| `Arrow Up` | Focuses the previous item in the Column Menu. |
| `Enter` | Activates the focused action in the Column Menu. |
| `Space` | Toggles a focused CheckBox Menu Item. |
| `Esc` | Closes the Filter Menu. If a popup or dropdown is open inside the menu, it will close instead. Press `Esc` again to close the Filter Menu. |

### Filter Menu

| Key Combination | Description |
| --- | --- |
| `Tab` | Focuses the next item in the Filter Menu. |
| `Shift` + `Tab` | Focuses the previous item in the Filter Menu. |
| `Space` | Toggles a focused CheckBox Menu Item. |
| `Esc` | Closes the Filter Menu. If a popup or dropdown is open inside the menu, it will close instead. Press `Esc` again to close the Filter Menu. |

### Filter Row

| Key Combination | Description |
| --- | --- |
| `Arrow` | moves to the next editor in the form |
| `Enter` | Focuses the first focusable element inside the current cell. All filter row components gain `tabindex` `0` and allow tabbing. The focus remains trapped inside the filter row. |
| `Tab` | Goes through the filter row components. |
| `Esc` | Moves focus to the parent cell. |

### Group Row

| Key Combination | Description |
| --- | --- |
| `Enter` | Expands or collapses the group. |

### Inline Edit Row

| Key Combination | Description |
| --- | --- |
| `Tab` | Focuses the next editor in the row. |
| `Enter` | Submits the edit row, including validation. |
| `Esc` | Cancels edit mode and returns focus to the originating command cell. |

### InCell Edit Cell

| Key Combination | Description |
| --- | --- |
| `Tab` | Submits the edit changes and activates edit mode for the next cell on the same row or on the next row. Skips command columns and bound columns that have `Editable="false"`. |
| `Shift` + `Tab` | Submits the edit changes and activates edit mode for the previous cell on the same row or on the previous row. Skips command columns and bound columns that have `Editable="false"`. |
| `Enter` | Submits the edit changes and activates edit mode for the same cell on the next row. |
| `Esc` | Cancels edit mode and remains on the current cell. |

### Popup Edit Form

| Key Combination | Description |
| --- | --- |
| `Tab` | Focuses the next editor in the Form. |
| `Enter` | Submits the Form, including validation. |
| `Esc` | Closes the Form and returns focus to the originating command cell. |

### Detail Template Row

| Key Combination | Description |
| --- | --- |
| `Enter` | Toggles the detail template. |
| `Tab` | If the detail row is expandwd, focuses the first focusable element inside the detail template. |
| `Shift` + `Tab` | If on the first focusable element in the detail template, returns focus to the first focusable cell in the Grid. |

### Command Column Cells

| Key Combination | Description |
| --- | --- |
| `Enter` | Moves focus to the first button in the current cell. If a button is already focused, triggers its click action. |
| `Esc` | Returns focus from a button to the parent cell. |
| `Tab` | Moves focus to the next button in the column. |
| `Shift` + `Tab` | Moves focus to the previous button in the column. |

### CheckBox Column

| Key Combination | Description |
| --- | --- |
| `Space` | Toggles the checkbox to select or deselect the current row. |
| `Esc` | Returns focus to the cell. |

### Pager

See [Pager keyboard navigation](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation).

## Using Custom Keys

The Grid supports replacing the default built-in keyboard shortcuts or adding new ones that perform the same actions.

To override the built-in Grid keyboard shortcuts, you need to create a `Dictionary<GridKeyboardScope, Dictionary<string, GridKeyboardCommand?>>` that defines:

* Parts of the Grid that accept keyboard shortcuts as [`GridKeyboardScope`](#keyboard-scope) values.
* Key names as `string` values. Use the same key names as in the [`KeyboardEventArgs.Key`](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.components.web.keyboardeventargs.key) property, for example, `"B"`, `"Enter"`, or `"ArrowDown"`.
* Keyboard commands to execute as [`GridKeyboardCommand`](#keyboard-command) values.

Set the `Dictionary` to the Grid `CustomKeyboardShortcuts` parameter.

>caption Setting custom Grid keyboard shortcuts

````RAZOR.skip-repl
<TelerikGrid CustomKeyboardShortcuts="@GridCustomShortcuts" />

@code {
    private Dictionary<GridKeyboardScope, Dictionary<string, GridKeyboardCommand?>> GridCustomShortcuts = new()
    {
        [GridKeyboardScope.Common] = new Dictionary<string, GridKeyboardCommand?>
        {
            ["W"] = GridKeyboardCommand.NavigateUp,
            ["ArrowUp"] = GridKeyboardCommand.NavigateUp,
            ["PageUp"] = null
        },
        [GridKeyboardScope.HeaderCell] = new Dictionary<string, GridKeyboardCommand?>
        {
            ["O"] = GridKeyboardCommand.SortColumn
        },
        [GridKeyboardScope.DataCell] = new Dictionary<string, GridKeyboardCommand?>
        {
            ["Enter"] = GridKeyboardCommand.Select
        }
    };
}
````

### Keyboard Scope

The [`GridKeyboardScope`](slug:Telerik.Blazor.GridKeyboardScope) enum represents a part (zone) of the Grid that supports specific user keyboard actions, for example, `DataCell`, `HeaderCell`, `CommandCell`, and others. There is also a `Common` scope that includes all the other scopes.

You can define a custom keyboard shortcut in the `Common` scope and then override it again in a specific scope with a different custom keyboard shortcut.

> The Grid supports keyboard shortcut customizations only for the [Data Grid structural element](#basics).

### Keyboard Command

The [`GridKeyboardCommand`](slug:Telerik.Blazor.GridKeyboardCommand) enum represents a user action, for example, `SortColumn`, `EnterEditMode`, `Select`, and others.

You can define multiple keyboard shortcuts that execute the same keyboard command. If a Grid keyboard command has no custom key, the component uses the default key. To disable a built-in keyboard command for a specific key, use `null`.

### Example

>caption Override Grid keyboard shortcuts

````RAZOR
@using Telerik.Blazor.Components.Grid

<label class="k-checkbox-label">
    <TelerikCheckBox @bind-Value="@GridUseCustomShortcuts" />
    <span style="color: @(GridUseCustomShortcuts ? "var(--kendo-color-primary)" : "inherit")">Use Custom Keyboard Shortcuts</span>
</label>

@if (GridUseCustomShortcuts)
{
    <ul>
        <li><code>W A S D</code> for cell navigation in addition to <code>Arrow keys</code></li>
        <li><code>O</code> for column sorting in addition to <code>Enter</code></li>
        <li><code>Enter</code> for row selection <strong>instead of</strong> <code>Space</code></li>
        <li><code>PageUp</code> and <code>PageDown</code> <strong>do not</strong> page the Grid</li>
    </ul>
}

<TelerikGrid Data="@GridData"
             CustomKeyboardShortcuts="@(GridUseCustomShortcuts ? GridCustomShortcuts : null)"
             Groupable="true"
             Height="240px"
             Navigable="true"
             Pageable="true"
             SelectionMode="@GridSelectionMode.Single"
             @bind-SelectedItems="@GridSelectedItems"
             Sortable="true">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" />
        <GridColumn Field="@nameof(Product.Price)" DisplayFormat="{0:c2}" />
        <GridColumn Field="@nameof(Product.Quantity)" DisplayFormat="{0:n0}" />
        <GridColumn Field="@nameof(Product.Released)" DisplayFormat="{0:d}" />
        <GridColumn Field="@nameof(Product.Discontinued)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new();
    private IEnumerable<Product> GridSelectedItems { get; set; } = new List<Product>();

    private bool GridUseCustomShortcuts { get; set; } = true;

    private Dictionary<GridKeyboardScope, Dictionary<string, GridKeyboardCommand?>> GridCustomShortcuts = new()
    {
        [GridKeyboardScope.Common] = new Dictionary<string, GridKeyboardCommand?>
        {
            ["W"] = GridKeyboardCommand.NavigateUp,
            ["S"] = GridKeyboardCommand.NavigateDown,
            ["A"] = GridKeyboardCommand.NavigateLeft,
            ["D"] = GridKeyboardCommand.NavigateRight,
            ["ArrowUp"] = GridKeyboardCommand.NavigateUp,
            ["ArrowDown"] = GridKeyboardCommand.NavigateDown,
            ["ArrowLeft"] = GridKeyboardCommand.NavigateLeft,
            ["ArrowRight"] = GridKeyboardCommand.NavigateRight,
            ["PageUp"] = null,
            ["PageDown"] = null
        },
        [GridKeyboardScope.HeaderCell] = new Dictionary<string, GridKeyboardCommand?>
        {
            ["O"] = GridKeyboardCommand.SortColumn,
            ["Enter"] = GridKeyboardCommand.SortColumn
        },
        [GridKeyboardScope.DataCell] = new Dictionary<string, GridKeyboardCommand?>
        {
            ["Enter"] = GridKeyboardCommand.Select
        }
    };

    protected override void OnInitialized()
    {
        var rnd = Random.Shared;

        for (int i = 1; i <= 27; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i} {(char)rnd.Next(65, 91)}{(char)rnd.Next(65, 91)}",
                Group = $"Group {i % 3 + 1}",
                Price = rnd.Next(1, 100) * 1.23m,
                Quantity = rnd.Next(0, 10000),
                Released = DateTime.Today.AddDays(-rnd.Next(60, 1000)),
                Discontinued = i % 4 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Group { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Released { get; set; }
        public bool Discontinued { get; set; }
    }
}
````

## See Also

* [Online Demo: Grid Keyboard Navigation](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation)
* [Keyboard navigation in Telerik UI for Blazor](slug:accessibility-overview#keyboard-navigation)
* [Telerik UI for Blazor Accessibility Overview](slug:accessibility-overview)
