---
title: Troubleshooting
page_title: Troubleshooting - Visual Studio Integration
description: Troubleshooting steps for Telerik UI for Blazor Visual Studio extensions.
slug: getting-started-vs-integration-troubleshooting
position: 8
---

# Troubleshooting

This article provides solutions for common issues you may encounter while working with the Telerik UI for Blazor Visual Studio (VS) Extensions.

## The Telerik sub-menu is missing from the Extensions menu

**Cause**: The Visual Studio extensions are disabled or not correctly installed.

**Solution**: Depending on whether the extensions are disabled or not correctly installed, use one of the following approaches:

* If the extensions are disabled:

   1. Open Visual Studio.
   1. From the menu bar, select **Extensions** > **Manage Extensions**.
   1. Open the **Installed** tab.
   1. Search for **Telerik Blazor VSExtensions** and make sure they are **Enabled**.

      ![Troubleshooting when the VS extension is disabled](images/enable-extensions.png)

* If the extensions are not correctly installed:

   1. Open Visual Studio.
   1. From the menu bar, select **Extensions** > **Manage Extensions**.
   1. Open the **Online** tab.
   1. Search for **Telerik Blazor VSExtensions**
   1. Download and install the extensions.

If you apply both approaches and the issue persists, generate a Visual Studio [ActivityLog](https://docs.microsoft.com/en-us/visualstudio/ide/reference/log-devenv-exe?view=vs-2019) and contact the Progress Support Team:

1. Under **Administrative rights**, open the [**Developer Command** prompt](https://docs.microsoft.com/en-us/dotnet/framework/tools/developer-command-prompt-for-vs) for Visual Studio.
1. Execute the `devenv /log %userprofile%\desktop\ActivityLog.xml` command to start Visual Studio and create logs on your Desktop.
1. Reproduce the issue so that the log can capture it.
1. Attach the `Activitylog` files when you contact our support.

## Issues occur when converting existing projects

For any issues with the **Convert Project** wizard, see its [dedicated troubleshooting section]({%slug getting-started-vs-integration-convert-project%}#troubleshooting).

## See Also

* [Telerik UI for Blazor Visual Studio Extensions Overview]({% slug getting-started-vs-integration-overview %})
* [Creating New Projects with Visual Studio]({% slug getting-started-vs-integration-new-project %})
* [Downloading the Latest Telerik UI for Blazor Versions]({% slug getting-started-vs-integration-latest-version %})
