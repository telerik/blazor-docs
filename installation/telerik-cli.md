---
title: Telerik CLI
page_title: Telerik CLI
description: Learn about the Telerik .NET tool, how to install it, and how to use it.
slug: installation-cli
tags: cli
published: True
tag: new
position: 1
---

# Telerik CLI

The Telerik CLI is a [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools) that can help you set up your Telerik development environment, including:

* Install or update your [license key](#get-license-key).
* Set up the [Telerik NuGet feed](#set-up-nuget-feed).
* Install the [Telerik Blazor MCP server](#install-mcp-server).

## Installation

The [Telerik CLI NuGet package](https://www.nuget.org/packages/Telerik.CLI) is hosted on `nuget.org`. To install the Telerik CLI .NET tool globally on your computer, run the following command in your preferred command shell:

>caption Install Telerik CLI

````SH.skip-repl
dotnet tool install -g Telerik.CLI
````

Without the `-g` flag, .NET installs the tool in the current folder only.

To verify successful installation, run:

>caption Confirm Telerik CLI installation

````SH.skip-repl
dotnet tool list -g
````

To update the Telerik CLI to the latest version, run:

>caption Update Telerik CLI

````SH.skip-repl
dotnet tool update telerik.cli -g
````

To uninstall the Telerik CLI, run:

>caption Uninstall Telerik CLI

````SH.skip-repl
dotnet tool uninstall -g Telerik.CLI
````

## Usage

Each Telerik CLI command starts with the `telerik` tool name, followed by the respective command and options. First, [log in the CLI](#log-in) to use the other commands effectively.

### Help

To get help about the tool or a specific command, use the `-h` option:

>caption Getting help in the Telerik CLI

````SH.skip-repl
telerik -h

telerik nuget -h

telerik nuget config -h
````

### Manual Authentication

Most Telerik CLI commands rely on authentication. If you are not [logged in the CLI](#log-in) before command execution, the web browser opens `https://identity.telerik.com` where you need to provide your Telerik account credentials. On successful authentication, the browser redirects to `https://login.telerik.com` and then to `localhost`. If this browser integration fails due to security or network settings, you can also authenticate manually. In this case, use the `--manual` option, which is available for the following Telerik CLI commands:

* `login`
* `license get-key`
* `nuget config`

>caption Using Telerik CLI commands with manual authentication

````SH.skip-repl
telerik login --manual

telerik license get-key --manual
````

In manual mode, the CLI outputs a link to `https://identity.telerik.com` for you to open in a browser. On successful authentication, the browser redirects to `https://login.telerik.com`. Copy this URL, paste it in the CLI, and press `Enter`.

### Command Output

Each Telerik CLI command has two output formats:

* Human readable (default)
* JSON&mdash;to use it, append the `--json` option

>caption Telerik CLI output format comparison

````SH.skip-repl
telerik whoami
Logged in as john.doe@telerik.com.

telerik whoami --json
{
  "exitCode": 0,
  "message": "Logged in as john.doe@telerik.com.",
  "data": {
    "email": "john.doe@telerik.com",
    "firstName": "John",
    "lastName": "Doe"
  },
  "success": true
}
````

## Log In

Most Telerik CLI commands are related to your Telerik identity. It's recommended to log in first, so that all the other commands work without the need for additional authentication:

````SH.skip-repl
telerik login
````

The `login` command opens `https://identity.telerik.com` in a browser window where you need to provide your Telerik account credentials. Then the browser makes of couple of redirects. If this process does not succeed, see [Manual Authentication](#manual-authentication) above.

The Telerik CLI stores credentials and session data in:

| Operating System | Path |
| --- | --- |
| Windows | `%AppData%\Telerik` |
| macOS / Linux | `~/.telerik` |

## Check Login State

To see which Telerik user is logged in the CLI, use the `whoami` command:

````SH.skip-repl
telerik whoami
````

The CLI will output your Telerik user account email.

## Log Out

To log out from the Telerik CLI, use the `logout` command.

````SH.skip-repl
telerik logout
````

## Get License Key

To download or update your [Telerik license key](slug:installation-license-key), use the `license get-key` command:

````SH.skip-repl
telerik license get-key
````

The `license get-key` command downloads your up-to-date Telerik license key and creates a `telerik-license.txt` file in your [operating system user's folder](slug:installation-license-key#manual-installation).

## Set Up NuGet Feed

To [add the Telerik NuGet server to your package sources](slug:installation/nuget), use the `nuget config` command:

````SH.skip-repl
telerik nuget config
````

By default, the `nuget config` command updates your [global `NuGet.Config` file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior). The newly added Telerik NuGet feed name is `TelerikNuGetV3`. The command generates a new API key that you can delete and revoke from the [API Keys page in your Telerik account](https://www.telerik.com/account/downloads/api-keys).

> Telerik NuGet API keys expire in two years.

You can use the `nuget config` command with the following options:

* `--scope project` and `--path` that points to the folder that contains the `NuGet.Config` file to modify.
* `--api-key` to provide an existing Telerik NuGet API key inline, otherwise the CLI generates a new one.
* `--force` to overwrite any existing Telerik credentials in the `NuGet.Config` file.

````SH.skip-repl
telerik nuget config --scope project --path . --force
````

## Install MCP Server

To [install the Telerik Blazor MCP server](slug:ai-installation), use the `mcp config` command:

````SH.skip-repl
telerik mcp config
````

By default, the command creates or updates the global `mcp.json` configuration files of all supported IDEs with all available Telerik MCP servers.

| IDE | Operating System | Configuration File Path |
| --- | --- | --- |
| Visual Studio | Windows | `%USERPROFILE%\.mcp.json` |
| VS Code | Windows | `%APPDATA%\Code\User\mcp.json`  |
| VS Code | macOS | `~/Library/Application Support/Code/User/mcp.json` |
| VS Code | Linux | `~/.config/Code/User/mcp.json`  |
| Cursor  | Windows | `%USERPROFILE%\.cursor\mcp.json` |
| Cursor | macOS, Linux | `~/.cursor/mcp.json` |

You can also fine-tune the process with the following options:

* Specify which Telerik products you are interested in, for example, just `blazor`.
* `--ide` specifies your preferred IDE. The supported values are `visualstudio`, `vscode`, `cursor`, and `all`.

````SH.skip-repl
telerik mcp config blazor --ide visualstudio
````

## See Also

* [Workflow Details](slug:what-you-need)
