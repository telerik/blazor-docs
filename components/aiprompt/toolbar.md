---
title: Toolbar
page_title: AIPrompt - Toolbar
description: Learn how to configure and use the Blazor AIPrompt toolbar and its buttons, and see how to define custom toolbar buttons.
slug: aiprompt-toolbar
tags: telerik,blazor,aiprompt,ai,prompt,toolbar
published: True
position: 20
components: ["aiprompt"]
---
# AIPrompt ToolBar

The AIPrompt ToolBar renders buttons for the predefined views (Prompt, Output, and Command) and also allows you to add custom tools, which may invoke arbitrary commands or handlers.
The toolbar buttons for the Prompt and Output views are always available, while the one for the Commands view is optional. Any custom buttons that you add will always appear after the view-related buttons.

* [Built-in Tools](#built-in-tools)
* [Custom Tools](#custom-tools)


## Built-in Tools

### AIPromptToolBarButton

The AI Prompt ToolBar button is a plain button that you can click and it raises an event so the application can respond to that.

You can add multiple buttons to the Telerik AIPrompt. To do that you should add the `<AIPromptToolBarButton>` to the `<AIPromptToolBar>`.

### AIPromptToolBarButton parameters

The `AIPromptToolBarButton` tag exposes parameters that allow you to customize the buttons:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default Value | Description |
| ----------- | ----------- | ----------- |
| `Class` | `string` | The CSS class that will be rendered on the main wrapping element of the AIPromptToolBarButton. You could use that class to cascade styles. |
| `Icon` | `object` | Adds a font icon to the button. You can find more information on adding a font icon to a Telerik Component in [Telerik Font and Svg Icons article](slug:common-features-icons#icon-namespaces). |
| `OnClick` | `EventCallback<MouseEventArgs>` | The onclick event handler. |
| `ChildContent` | `RenderFragment` | The child content rendered within the button. |

### AIPromptToolBarSpacer

The spacer consumes the available empty space and push the rest of the tools next to one another.

## Custom Tools

To define custom tools within the ToolBar, use the `<AIPromptToolBarTemplateItem>` tag, which is a standard Blazor `RenderFragment`.

The example below omits any event handlers for brevity. Custom buttons are to be used for arbitrary logic which is not part of the AIPrompt component, thus feel free to attach the handlers you need.

>caption Setting up the AIPrompt ToolBar

````RAZOR
<TelerikAIPrompt OnPromptRequest="@HandlePromptRequest">
    <AIPromptToolBar>
        <AIPromptToolBarButton OnClick="@OnToolBarButtonClick">My Button</AIPromptToolBarButton>
        <AIPromptToolBarSpacer/>
        <AIPromptToolBarTemplateItem>
            <TelerikSplitButton OnClick="@OnSplitButtonClick">
                <SplitButtonContent>Insert</SplitButtonContent>
                <SplitButtonItems>
                    <SplitButtonItem>Insert above</SplitButtonItem>
                    <SplitButtonItem>Insert below</SplitButtonItem>
                </SplitButtonItems>
            </TelerikSplitButton>
        </AIPromptToolBarTemplateItem>
    </AIPromptToolBar>
</TelerikAIPrompt>

@code {
    private void HandlePromptRequest(AIPromptPromptRequestEventArgs args)
    {
        // handle the prompt request here.
    }

    private void OnToolBarButtonClick()
    {
        // handle the toolbar button click here.
    }

    private void OnSplitButtonClick()
    {
        // handle the split button click here.
    }
}
````


## Next Steps

* [Customize the AIPrompt Views](slug:aiprompt-views-overview)
* [Implement AIPrompt Templates](slug:aiprompt-templates)
* [Handle AIPrompt Events](slug:aiprompt-events)

## See Also

* [Views Templates](slug:aiprompt-views-templates)
* [Live Demo: AIPrompt Overview](https://demos.telerik.com/blazor-ui/aiprompt/overview)