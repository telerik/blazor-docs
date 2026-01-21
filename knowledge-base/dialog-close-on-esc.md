---
title: How to Close the Dialog on ESC When its Content is Focused
description: Learn how to enable closing the Dialog on ESC key after focusing the content by adding a focusable wrapper.
type: how-to
page_title: How to Close the Dialog on ESC When its Content is Focused
slug: dialog-kb-close-on-esc
tags: blazor, dialog, keyboard
res_type: kb
---

## Description

This knowledge base article answers to the following questions: 

* How to make Dialog responsive to keyboard events when content is clicked?
* Why doesn't ESC key work after clicking inside Dialog content?
* How can I make the Dialog close with the ESC key after the title has been clicked?
* How to maintain keyboard functionality in Dialog after focus changes?

When you click or focus inside the Dialog content area, the focus moves away from the Dialog component. As a result, the Dialog does not receive keyboard events, and pressing the `ESC` key does not close it. This behavior occurs because the keydown events are not invoked for the Dialog when the focus is on another element or the body tag.

## Solution

To ensure the Dialog closes on `ESC` even after focusing the content, wrap the Dialog content in a `div` with `tabindex="0"`. This makes the content wrapper focusable and allows keyboard events to be captured. Add custom styling to handle the focus state and preserve the existing content padding.

>caption Example of Implementing a Focusable Wrapper with Visual Indication

````RAZOR
<TelerikDialog @bind-Visible="@DialogVisible"
               Width="500px"
               Height="300px"
               Class="focusable-content">
    <DialogTitle>
        <div tabindex="0" class="dialog-wrapper">
            Focusable Title
        </div>
    </DialogTitle>
    <DialogContent>
        <div tabindex="0" class="dialog-wrapper">
            <p>Click anywhere in this content area, then press ESC to close the dialog.</p>
        </div>
    </DialogContent>
    <DialogButtons>
        <TelerikButton OnClick="@CloseDialog" ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">Close</TelerikButton>
    </DialogButtons>
</TelerikDialog>

<TelerikButton OnClick="@OpenDialog">Open Dialog</TelerikButton>

<style>
    /* Remove default Dialog content padding to let wrapper handle it */
    .focusable-content .k-dialog-content {
        padding: 0;
    }

    /* Remove default Dialog title padding to let wrapper handle it */
    .focusable-content .k-dialog-titlebar {
        padding: 0;
    }

    /* Focusable wrapper that fills the entire Dialog title area */
    .focusable-content .k-dialog-titlebar-actions {
        padding-block: var(--kendo-spacing-3, 0.75rem);
        padding-inline: var(--kendo-spacing-4, 1rem);
    }

    /* Focusable wrapper that fills the entire Dialog content area */
    .focusable-content .dialog-wrapper {
        padding: 1rem;
        outline: none;
        height: 100%;
        box-sizing: border-box;
        transition: background-color 0.2s ease;
    }

        /* Optional visual indication when the wrapper is focused */
        /* .focusable-content .dialog-wrapper:focus-within {
            background-color: rgba(0, 123, 255, 0.05);
        } */
</style>

@code {
    private bool DialogVisible { get; set; } = true;
    private string SampleText { get; set; } = string.Empty;

    private void OpenDialog()
    {
        DialogVisible = true;
    }

    private void CloseDialog()
    {
        DialogVisible = false;
    }
}
````
