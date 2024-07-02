---
title: Overriding MinWidth in NumericInput for MAUI
description: Learn how to adjust the MinWidth of the NumericInput's InputEditor in MAUI to prevent content from being cut off.
type: how-to
page_title: How to Adjust the MinWidth of NumericInput's InputEditor in MAUI
slug: numericinput-maui-overriding-minwidth
tags: numericinput, maui, customization, minwidth, inputeditor
res_type: kb
ticketid: 1656724
---

## Environment

| Product | Version |
| --- | --- |
| NumericInput for MAUI | 7.0.0 |

## Description

When styling the [NumericInput](https://docs.telerik.com/devtools/maui/controls/numericinput/overview) with `HorizontalTextAlignment` set to `End`, the value is cut off as the control's width decreases. This issue occurs because the `InputEditor` has a `MinWidth` of 64.

This KB article also answers the following questions:
- How can I prevent the NumericInput value from being cut off when aligned to the end?
- Is it possible to customize the MinWidth of the NumericInput's InputEditor in MAUI?
- How to adjust the NumericInput's styling to utilize unused space on the left?

## Solution

To address the issue of the NumericInput's value being cut off due to the `MinWidth` setting of the `InputEditor`, follow these steps:

1. **Define the ControlTemplate**:  To access RadNumericInput's internal NumericInputEntry subcomponent, follow the directions in the [NumericInput - ControlTemplate](https://docs.telerik.com/devtools/maui/controls/numericinput/control-template) documentation.

2. **Subscribe to the NumericInputEntry's Loaded Event**:  

    ```xaml
    <telerik:NumericInputEntry x:Name="PART_Entry"
                           Style="{TemplateBinding ActualEntryStyle}"
                           Loaded="OnNumericInputLoaded"/>
    ```
    ```csharp
        private void OnNumericInputLoaded(object sender, EventArgs e)
        {  
        }
    ```

3. **Access the native Entry element**:  To access platform-specific implementation, use conditional compilation #ifdef for WINDOWS, and define the `Handler.PlatformView` as the abstract `RadMauiEntry` type.

    ```csharp
        private void OnNumericInputLoaded(object sender, EventArgs e)
        {
    #if WINDOWS
            if ((sender as NumericInputEntry)?.Handler?.PlatformView is RadMauiEntry nativeEntry)
            {
            }
    #endif
        }
    ```

4. **Set the Inputeditor's MinWdith property**:  With access to the handler's PlatformView, you can now set the `MinWidth` property of the concrete native WinUI `InputEditor` (which is of type RadTextBox).

    ```csharp
        private void OnNumericInputLoaded(object sender, EventArgs e)
        {
    #if WINDOWS
            if ((sender as NumericInputEntry)?.Handler?.PlatformView is RadMauiEntry nativeEntry)
            {
                // Concrete instance of InputEditor is WinUI RadTextBox
                nativeEntry.InputEditor.MinWidth = 0;
            }
    #endif
        }
    ```

## Notes

- Customizing internal settings of controls should be done with an understanding of the potential impact on control behavior and layout.
- Always test customization thoroughly to ensure it meets your application's requirements.

## See Also

- [NumericInput Overview](https://docs.telerik.com/devtools/maui/controls/numericinput/overview)
- [Customizing Entry Cursor in MAUI](https://docs.telerik.com/devtools/maui/knowledge-base/entry-cursor-customization)
