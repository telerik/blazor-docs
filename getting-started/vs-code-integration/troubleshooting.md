---
title: Тroubleshooting
page_title: Visual Studio Code Integration Overview
description: Learn how to enhance your experience in developing web applications with Progress Telerik UI for Blazor.
slug: getting-started-vs-code-integration-troubleshooting
position: 4
---

# Troubleshooting

If the extension does not work right (missing pages, does not start, etc.), you can try the following to clean up cache files and get it working again:

## General Extension Issues

1. Uninstall the extension from VS Code.
2. Go to the extensions templates cache folder and delete the `BlazorT` and `KendoT` folders - they are where caches for the Telerik extensions are kept:
    * on Windows, open `%localappdata%` 
    * on Mac, open `/Users/[user_name]/.local/share/`
3. [Install](https://marketplace.visualstudio.com/items?itemName=TelerikInc.blazortemplatewizard) the extension again.

## Convert Project Command Issues

If you are trying to convert your project through the `Convert Command` of the Telerik UI for Blazor Visual Studio Code Extension and you are having problems with it, see its [dedicated troubleshooting section]({%slug getting-started-vs-code-integration-convert-project%}#troubleshooting).