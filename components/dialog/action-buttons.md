---
title: Action Buttons
page_title: Dialog Action Buttons
description: How to setup action buttons of the Dialog for Blazor. Use different button layouts.
slug: dialog-action-buttons
tags: telerik,blazor,dialog,action,buttons
published: True
position: 7
components: ["dialog"]
---
# Dialog Action Buttons

The Dialog provides a dedicated area for action buttons. They enable the application to provide specific interaction to users.

To specify action buttons in the Dialog, use the `DialogButtons` tag.

## Button Layout

The Dialog action buttons can render in a few different layout configurations. This depends on the `ButtonsLayout` parameter of the component. It expects a member of the `DialogButtonsLayout` enum:

* `Start`
* `Center`
* `End`
* `Stretched` (default value)

## Example

The following example demonstrates all supported layout options for the Dialog action buttons.

>caption Using Dialog ButtonsLayout

````RAZOR
<TelerikDialog @ref="@DialogRef"
               @bind-Visible="@DialogVisible"
               Title="Select Buttons Layout"
               ButtonsLayout="@SelectedButtonLayout">
    <DialogContent>
        <TelerikRadioGroup Data="@ButtonLayouts"
                           @bind-Value="@SelectedButtonLayout"
                           OnChange="@OnRadioChange">
        </TelerikRadioGroup>
    </DialogContent>
    <DialogButtons>
        <TelerikButton>Cancel</TelerikButton>
        <TelerikButton ThemeColor="primary">OK</TelerikButton>
    </DialogButtons>
</TelerikDialog>

@code {
    private TelerikDialog DialogRef { get; set; }

    private bool DialogVisible { get; set; } = true;

    private DialogButtonsLayout SelectedButtonLayout { get; set; } = DialogButtonsLayout.End;

    private async Task OnRadioChange(object newValue)
    {
        DialogRef.Refresh(); // Refresh() is needed to re-render the Dialog content.
    }

    private List<DialogModel> ButtonLayouts { get; set; } = new List<DialogModel>()
    {
        new DialogModel() { Text = "Start", Value = DialogButtonsLayout.Start },
        new DialogModel() { Text = "End", Value = DialogButtonsLayout.End },
        new DialogModel() { Text = "Center", Value = DialogButtonsLayout.Center },
        new DialogModel() { Text = "Stretch", Value = DialogButtonsLayout.Stretch }
    };

    public class DialogModel
    {
        public string Text { get; set; }
        public DialogButtonsLayout Value { get; set; }
    }
}
````

## See Also

* [(KB) Keep Content in the DOM When the Window Is Closed](slug:window-kb-keep-content-when-closed)
