---
title: Telerik CLI
page_title: Telerik CLI
description: Learn about the Telerik .NET tool, how to install it, and how to use it.
slug: installation-cli
tags: cli
published: True
tag: new
position: 20
---

# Telerik CLI

The Telerik CLI is a [.NET tool](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools) that can help you set up your Telerik development environment, including:

* Install or update your [license key](#get-license-key).
* Set up the [Telerik NuGet feed](#set-up-nuget-feed).
* Install the [Telerik Blazor MCP server](#install-mcp-server).
* Set up the overall [Telerik UI for Blazor development environment](#set-up-telerik-environment).

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

Most Telerik CLI commands rely on authentication. If you are not [logged in the CLI](#log-in) before command execution, the web browser opens `https://identity.telerik.com` where you need to provide your Telerik account credentials. On successful authentication, the browser redirects to `https://login.telerik.com` and then to `localhost`. If this browser integration fails due to security or network settings, you can also authenticate manually. In this case, use the `--no-browser` option, which is available for the following Telerik CLI commands:

* `login`
* `license get-key`
* `nuget config`

>caption Using Telerik CLI commands with manual authentication

````SH.skip-repl
telerik login --no-browser

telerik license get-key --no-browser
````

In manual mode, the CLI outputs a link to `https://identity.telerik.com` for you to open in a browser. On successful authentication, the browser redirects to `https://login.telerik.com`. Copy this URL, paste it in the CLI, and press `Enter`.

The Telerik CLI can fall back to manual authentication even if the `--no-browser` option is not set. This happens if the automatic authentication takes longer than three minutes.

### Verbose Output

To see more detailed diagnostic output of any command, use the `--verbose` option:

>caption Getting detailed command output in the Telerik CLI

````SH.skip-repl
telerik setup blazor --verbose

telerik nuget config --verbose

telerik license get-key --verbose
````

### JSON Output

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

### Disable Automatic Updates

By default, the Telerik CLI will check for newer `Telerik.CLI` NuGet package version on every command execution. To disable the update check, use the `--no-update-check` option:

>caption Skipping Telerik CLI update checks

````SH.skip-repl
telerik setup blazor --no-update-check

telerik nuget config --no-update-check

telerik license get-key --no-update-check
````

## Log In

Most Telerik CLI commands are related to your [Telerik identity](https://www.telerik.com/account). It's recommended to log in first, so that all the other commands work without the need for additional authentication:

````SH.skip-repl
telerik login
````

The `login` command opens `https://identity.telerik.com` in a browser window where you need to provide your Telerik account credentials or create a new Telerik account. Then the browser makes of couple of redirects. If this process does not succeed, see [Manual Authentication](#manual-authentication) above.

The Telerik CLI stores a session token in:

| Operating System | Path |
| --- | --- |
| Windows | `%AppData%\Telerik` |
| macOS / Linux | `~/.telerik` |

The session token is valid for one month.

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

>tip This documentation section applies to Telerik UI for Blazor versions **13.3.0** and older. All packages required by newer versions are [available on nuget.org](https://www.nuget.org/profiles/Progress).

To [add the Telerik NuGet server to your package sources](slug:installation-nuget), use the `nuget config` command:

````SH.skip-repl
telerik nuget config
````

By default, the `nuget config` command updates your [global `NuGet.Config` file](https://learn.microsoft.com/en-us/nuget/consume-packages/configuring-nuget-behavior). The newly added Telerik NuGet feed name is `TelerikNuGetV3`. The command generates a new API key that you can delete and revoke from the [API Keys page in your Telerik account](https://www.telerik.com/account/downloads/api-keys).

> Telerik NuGet API keys expire in two years.

You can use the `nuget config` command with the following options:

* `--scope project` and `--path` that points to the folder that contains the `NuGet.Config` file to modify. The default `--scope` value is `user`.
* `--api-key` to provide an existing Telerik NuGet API key inline, otherwise the CLI generates a new one.
* `--force` to overwrite any existing Telerik credentials in the `NuGet.Config` file.

````SH.skip-repl
telerik nuget config --scope project --path . --force
````

## Install MCP Server

To [install the Telerik Blazor MCP server](slug:ai-overview), use the `mcp config` command:

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

## Create Telerik Blazor App

To create a [new Blazor app that includes Telerik UI for Blazor](slug:getting-started-workflow-details) with the help of the [Telerik UI for Blazor project templates](slug:installation-project-templates), use the `create` command:

````SH.skip-repl
telerik create blazor
````

The Telerik CLI will list the [available Telerik Blazor templates](slug:installation-project-templates#install) and prompt for all [template settings](slug:installation-project-templates#features-and-configuration), such as theme or icon type.

You can use the `create` command with the following options:

* `-o` or `--output` to set the parent folder for the new app. By default, that's the current folder.
* `--skip-template-install` to avoid downloading or updating the [`Telerik.Blazor.Templates` NuGet package](https://www.nuget.org/packages/Telerik.Blazor.Templates) if you already have it.

## Set Up Telerik Environment

The `setup` command performs multiple actions at once to configure your Telerik development environment:

* [Create your Telerik account or log in](#log-in) if you already have an account.
* Activate a [Telerik UI for Blazor trial](https://www.telerik.com/try/ui-for-blazor) if you don't have an active commercial license or trial.
* [Download a license key](#get-license-key) that includes all your product licenses and trials.
* [Configure the Telerik NuGet package source](#set-up-nuget-feed).
* [Install the Telerik MCP server(s)](#install-mcp-server).
* Install the [Telerik UI for Blazor project templates](slug:installation-project-templates).

````SH.skip-repl
telerik setup blazor
````

You can use the `setup` command with the following options:

* `--scope` and `--nuget-path` that determine if the Telerik NuGet feed is added to the global `NuGet.Config` file or to a project-specific file.
* `--force` to overwrite any existing Telerik credentials in the `NuGet.Config` file.
* `--interactive` to prompt the user at every step. Each prompt shows the default value in brackets and `Enter` accepts it. This option is enabled by default when the standard input is a CLI terminal and [`Console.IsInputRedirected` is `false`](https://learn.microsoft.com/en-us/dotnet/api/system.console.isinputredirected).
* `--no-interactive` to run without prompting the user and rely on explicit inline options or defaults. This option is enabled by default when the standard input is redirected and [`Console.IsInputRedirected` is `true`](https://learn.microsoft.com/en-us/dotnet/api/system.console.isinputredirected). The option is recommended for automation and CI use.

````SH.skip-repl
telerik setup blazor --scope project --nuget-path . --force --no-interactive
````

## See Also

* [Workflow Details](slug:getting-started-workflow-details)
