---
title: License Key
page_title: Telerik License Key in CI/CD
description: Learn how to create and install a Telerik license key file in continuous integration and continuous delivery (CI/CD) workflows and environments.
slug: deployment-license-key
tags: installation, license, deployment
published: True
position: 7
---

# Telerik License Key in CI/CD Environment

This article describes how to set up and activate your [Telerik UI for Blazor license key](slug:installation-license-key) across a few popular CI/CD services by using environment variables.

@[template](/_contentTemplates/common/get-started.md#license-key-version)

## Basics

The Telerik license activation process in a CI/CD environment involves the following steps:

1. Add the `Telerik.Licensing` NuGet package as a dependency to all projects that reference Telerik UI for Blazor or Telerik Document Processing. This package activates the Telerik products at build time by using the provided license key.
    ````XML.skip-repl
    <PackageReference Include="Telerik.Licensing" Version="1.*" />
    ````
1. Go to the [License Keys page](https://www.telerik.com/account/your-licenses/license-keys) in your Telerik account and download your license key.
1. Set your license key value as an [environment variable](#creating-environment-variables) with a name `TELERIK_LICENSE`. In specific cases you may need to [use a license file](#using-license-file) instead.

## Creating Environment Variables

The recommended way to provide your license key to the `Telerik.Licensing` NuGet package in CI/CD environment is to use environment variables. Each CI/CD platform has a different process for setting environment variables. This article lists only some of the most popular examples.

### Azure Pipelines

1. Create a new [secret variable](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/variables?view=azure-devops&tabs=yaml%2Cbatch#secret-variables). Follow the respective producedure for your **YAML**,  **Classic**, or **CLI** pipeline setup. Also check the separate article [Set Secret Variables](https://learn.microsoft.com/en-us/azure/devops/pipelines/process/set-secret-variables).
1. Paste the contents of the license key file as a value of the secret variable.
1. Map the secret variable to a new environment variable named `TELERIK_LICENSE`.
1. Use the `TELERIK_LICENSE` environment variable in the tasks, steps, or scripts that build and publish the Blazor app.

>caption Using a TELERIK_LICENSE environment variable in Azure Pipeline YAML

````YAML.skip-repl
steps:

- task: DotNetCoreCLI@2
  inputs:
    command: 'build'
    # ...
  env:
    TELERIK_LICENSE: $(Secret_Telerik_License_Key)
````

> Another option is to use a Telerik license file as a [secure file in the pipeline](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/secure-files). Implement a [script that copies the license file](https://learn.microsoft.com/en-us/azure/devops/pipelines/library/secure-files?view=azure-devops#consume-a-secure-file-in-a-pipeline) to the application's root folder, so that it's available to all projects that need it.

### GitHub Actions

1. Create a new [Repository Secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository) or an [Organization Secret](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-an-organization).
1. Paste the contents of the license key file as a value of the GitHub secret.
1. Assign the secret to an environment variable named `TELERIK_LICENSE`.
1. Use the `TELERIK_LICENSE` environment variable in the steps, which build and publish the Blazor app:
    ````YAML.skip-repl
    env:
      TELERIK_LICENSE: ${{ "{{ secrets.Telerik_License_Key }}" }}
    ````
    The resulting workflow steps may look similar to:
    ````YAML.skip-repl
    - name: Build Step
      run: dotnet build -c Release
      env:
        TELERIK_NUGET_KEY: ${{ "{{ secrets.Telerik_NuGet_Key }}" }}
        TELERIK_LICENSE: ${{ "{{ secrets.Telerik_License_Key }}" }}

    - name: Publish Step
      run: dotnet publish -c Release
      env:
        TELERIK_LICENSE: ${{ "{{ secrets.Telerik_License_Key }}" }}
    ````
    Also see [Using NuGet Keys](slug:deployment-nuget#using-nuget-keys) in the article [Restoring NuGet Packages in Your CI Workflow](slug:deployment-nuget). It shows how to use the `TELERIK_NUGET_KEY` environment variable in your CI build environment.

### Docker

1. [Create a Docker build secret](https://docs.docker.com/build/building/secrets/#using-build-secrets) that holds the Telerik license key file.
    ````SH.skip-repl
    docker build --secret id=telerik-license-key,src=/path/to/telerik-license.txt .
    ````
1. [Mount the secret](https://docs.docker.com/build/building/secrets/#secret-mounts) and set a `TELERIK_LICENSE` [environment variable in the build container](https://docs.docker.com/build/building/secrets/#target). The environment variable is required when building and publishing the Telerik Blazor app.
    ````SH.skip-repl
    RUN --mount=type=secret,id=telerik-license-key,env=TELERIK_LICENSE \
        dotnet publish BlazorProjectName.csproj -c Release -o /app/publish /p:UseAppHost=false
    ````

## Using License File

Use a license file on Windows and Windows Server machines, which are managed directly through the operating system's user interface. Do not use an environment variable in these cases.

## Next Steps

* [Restore Telerik NuGet Packages in CI/CD Workflows](slug:deployment-nuget)

## See Also

* [CI, CD, Build Server](slug:deployment-ci-cd-build-pc)
* [Workflow Details for Telerik UI for Blazor](slug:getting-started/what-you-need)
