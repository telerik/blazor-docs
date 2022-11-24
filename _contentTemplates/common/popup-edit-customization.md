#popup-settings
Parameter | Type | Description
---------|----------|---------
 `Class` | `string` | CSS class of the edit popup
 `Title` | `string` | The title of the edit popup
 `Width` | `string` | The Width of the edit popup
 `MaxWidth` | `string` | The maximum width of the window
 `MinWidth` | `string` | The minimum width of the window
 `Height` | `string` | The height of edit popup
 `MaxHeight` | `string` | The maximum height of the window
 `MinHeight` | `string` | The minimum height of the window

>tip The min/max options for the width and height apply to the initial rendering of the window and not browser resizing.
#end

#edit-form-settings
Parameter | Type | Description
---------|----------|---------
`ButtonsLayout` | `FormButtonsLayout` <br/> (`End`)  | The horizontal alignment of the buttons. Takes a member of the `FormButtonsLayout` enum: <br/> - `Start` <br/> - `End` <br/> - `Center` <br/> - `Stretch`
 `Columns` | `int` | The count of the columns
 `ColumnSpacing` | `int` | The column spacing 
 `Orientation` | `FormOrientation` <br/> (`Vertical`) | The orientation of the form. Takes a member of the `FormOrientation` enum: <br/> - `Horizontal` <br/> - `Vertical`
#end