#rowclick

The `OnRowClick` event fires when the user:

* Clicks or taps on a data row.
* Hits Enter while the row has focus. This scenario requires enabled keyboard navigation (`Navigable="true"`).

@[template](/_contentTemplates/common/click-events.md#clickdoesnotfire)

`OnRowClick` event fires *before* selection.

#end

#rowdoubleclick

The `OnRowDoubleClick` event fires when the user double-clicks or double-taps on a data row.

@[template](/_contentTemplates/common/click-events.md#clickdoesnotfire)

`OnRowDoubleClick` event fires *before* selection.

#end

#clickdoesnotfire

The event *does not fire* when the user:

* Clicks or taps on a command button;
* Selects a row via the built-in checkbox column;
* Expands or collapses the hierarchy;
* When the clicked row is in edit mode.

#end

#rowclick-args-example

        if (args.EventArgs is KeyboardEventArgs keyboardEventArgs)
        {
            Console.WriteLine($"The user pressed {keyboardEventArgs.Key} on row {model.Name} and column {args.Field}.");
        }
        else if (args.EventArgs is MouseEventArgs mouseEventArgs)
        {
            Console.WriteLine($"The user clicked {mouseEventArgs.ClientX} {mouseEventArgs.ClientY} on row {model.Name} and column {args.Field}.");
        }

#end

#rowcontextmenu

The `OnRowContextMenu` event fires when the user:

* Right-clicks or taps-and-holds a data row;
* Hits the context menu keyboard button while the row has focus. This scenario requires enabled keyboard navigation (`Navigable="true"`).

Use `OnRowContextMenu` to [integrate the Context menu](slug://contextmenu-integration#context-menu-for-a-grid-row) with the table rows.

#end

#clickeventargs

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Property | Type | Description |
|---|---|---|
| `EventArgs` | `EventArgs` | This object maps to `MouseEventArgs` or `KeyboardEventArgs` depending on the user action. |
| `Field` | `string` | The `Field` parameter of the clicked column. |
| `Item` | `object` | The data item. Cast the object to your model type to access its members. |
| `ShouldRender` | `bool` | Sets if the component will re-render after the event via `StateHasChanged()` call. This can be useful if you need to change the component parameters or state during the event execution, and especially if you need to execute async logic in the event handler. |

#end

#rowclick-args

The event arguments expose an `EventArgs` property. It maps to `MouseEventArgs` or `KeyboardEventArgs` depending on the user's action (clicking the row with the mouse/tapping it on a touch device, or pressing `Enter` when the row is focused). You can use the event arguments to determine the keyboard key or the position of the mouse cursor when the user took an action.

#end
