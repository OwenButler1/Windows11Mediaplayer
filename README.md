# Windows11Mediaplayer (Beta)

A lightweight Windows 11 media player beta focused on quick local setup and validation.

## Prerequisites

Install the following before building:

### Operating system
- **Windows 11** (recommended for all QA and release validation).

### SDK / runtime / toolchain
- **.NET SDK 8.0 (x64)**
- **Windows App SDK Runtime 1.5+** (or the runtime version required by your branch)
- **Visual Studio 2022 (17.8+)** with:
  - `.NET desktop development`
  - `Universal Windows Platform development` (if your local branch still uses UWP assets)
  - `Windows App SDK / WinUI tooling` components
- **Git**

> Tip: On a new machine, open Visual Studio Installer and add the workloads first to avoid restore/build failures.

## Clone the repo

```bash
git clone <REPO_URL>
cd Windows11Mediaplayer
```

## Build

From repo root, restore and build in Release:

```bash
dotnet restore
dotnet build -c Release
```

If your environment has multiple project files, target the solution/project explicitly:

```bash
dotnet build -c Release <path-to-sln-or-csproj>
```

## Run

Run from repo root:

```bash
dotnet run -c Release
```

Or target a specific project if needed:

```bash
dotnet run -c Release --project <path-to-csproj>
```

## Expected launch output

On successful startup you should see:

1. Build output ending with **`Build succeeded.`**
2. App window appears on desktop (media player shell/UI visible).
3. No immediate crash, runtime popup, or signing/trust error.

A first-time run can be slightly slower because runtime components and caches initialize.

## Quick validation

Use the smoke checklist in [`docs/qa-smoke.md`](docs/qa-smoke.md).

## Troubleshooting (first-run)

### Missing runtime / framework
Symptoms:
- App fails to launch after build.
- Error mentions missing framework or Windows App SDK runtime.

Fix:
- Install/repair the required runtime (Windows App SDK and .NET runtime/SDK versions used by the branch).
- Re-run:

```bash
dotnet restore
dotnet build -c Release
```

### Signing / trust issues
Symptoms:
- Launch blocked by certificate/trust warning.
- Packaged build cannot be installed/started.

Fix:
- Ensure the dev certificate is installed and trusted for Current User.
- Rebuild after certificate trust is established.
- If your team provides a signing script/profile, re-apply it before packaging.

### Path / permission issues
Symptoms:
- Restore/build fails with access denied.
- App cannot read sample media in protected folders.

Fix:
- Avoid protected directories (for example, use a workspace under your user profile).
- Run terminal/IDE with sufficient permissions when required by policy.
- Place sample media in a user-accessible path (for example, `C:\Users\<you>\Videos\samples`).
