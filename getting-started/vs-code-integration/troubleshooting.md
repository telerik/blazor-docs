---
title: Тroubleshooting
page_title: Visual Studio Code Integration Overview
description: Learn how to enhance your experience in developing web applications with Progress Telerik UI for Blazor.
slug: getting-started-vs-code-integration-troubleshooting
position: 4
---

# Troubleshooting

If the extension does not function correctly (missing pages, does not start, etc.), the first step is to clean up the cache files.

## General Extension Issues

To clear the cache files:

1. Uninstall the extension from VS Code.
2. Delete the `BlazorT` and `KendoT` folders - they contain the cache for the Telerik Extensions. To locate the cache folders:
    * On Windows, open `%localappdata%`.
    * On Mac, open `/Users/[user_name]/.local/share/`.
3. [Install](https://marketplace.visualstudio.com/items?itemName=TelerikInc.blazortemplatewizard) the extension again.

## Convert Project Command Issues

If you are trying to convert your project through the `Convert Command` in the Telerik UI for Blazor Visual Studio Code Extension and observe any issues, see the dedicated [Convert Project troubleshooting section]({%slug getting-started-vs-code-integration-convert-project%}#troubleshooting).
