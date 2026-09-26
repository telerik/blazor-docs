---
title: Adornments
page_title: PromptBox - Adornments
description: Learn how to customize the Blazor PromptBox component with adornment templates for adding buttons, icons, and custom elements as prefixes, suffixes, and top elements.
slug: promptbox-adornments
tags: telerik,blazor,promptbox,adornments,templates,prefixes,suffixes
published: True
position: 10
components: ["promptbox"]
---

# PromptBox Adornments

The Blazor PromptBox component provides flexible adornment templates that allow you to add custom elements such as buttons, icons, or components around the input area. Adornments adapt intelligently to the current input mode, ensuring optimal layout and user experience.

You can also control the order of action buttons by arranging them within the templates.

The PromptBox supports three types of adornment templates that position content in different areas of the component based on the current [input mode](slug:promptbox-modes).

## Adornment Types

### Start Affix Template

The `PromptBoxStartAffixTemplate` renders content at the beginning of the input area. Its positioning adapts based on the current input mode:

* **SingleLine and Auto (while the input is one line tall)**: The affix is displayed on the left side, inline with the text
* **MultiLine and Auto (after the input grows to multiple lines)**: The affix moves to the bottom-left corner of the input area

In `Auto` mode, the position updates automatically as the input expands from one line to multiple lines while the user types.

>caption Start affix with mode-aware positioning

<demo metaUrl="client/promptbox/adornments/example-3/" height="320"></demo>

### End Affix Template  

The `PromptBoxEndAffixTemplate` renders content at the end of the input area, typically used for action buttons or secondary controls:

* **SingleLine and Auto (while the input is one line tall)**: The affix is displayed on the right side, inline with the text
* **MultiLine and Auto (after the input grows to multiple lines)**: The affix moves to the bottom-right corner of the input area

In Auto mode, the position updates automatically as the input expands from one line to multiple lines while the user types.

>caption End affix with multiple interactive elements

<demo metaUrl="client/promptbox/adornments/example-2/" height="320"></demo>

### Top Affix Template

The `PromptBoxTopAffixTemplate` renders content above the input area and is only visible in `MultiLine` mode or when `Auto` mode has expanded:

* **SingleLine**: Not displayed
* **MultiLine**: Always visible at the top
* **Auto (Default)**: Appears after expansion to multi-line

>caption Top affix for header information and controls

<demo metaUrl="client/promptbox/adornments/example-1/" height="420"></demo>

# Action Buttons Configuration

Add the desired action button tag within the affix template to configure its position.

>caption Example with action buttons arranged

<demo metaUrl="client/promptbox/adornments/example-1/" height="420"></demo>

## See Also

* [PromptBox Overview](slug:promptbox-overview)
* [PromptBox Modes](slug:promptbox-modes)
* [PromptBox Events](slug:promptbox-events)