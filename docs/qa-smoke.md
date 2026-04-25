# QA Smoke Test (Windows 11 Beta)

This checklist validates that a contributor can build and verify core playback behavior quickly on Windows 11.

## Scope

Manual smoke coverage for:
- install prerequisites
- build app
- run app
- open sample media
- verify play/pause
- verify clean app exit

## Prerequisites

1. Windows 11 machine.
2. .NET SDK 8.0 installed.
3. Visual Studio 2022 with required Windows/.NET workloads.
4. Windows App SDK runtime version required by this branch.
5. Local sample media file (`.mp3` or `.mp4`) in a user-accessible folder.

## Smoke steps

### 1) Install prerequisites
- Confirm tooling is installed and up to date.
- Open a terminal and verify SDK:

```bash
dotnet --info
```

Expected: command succeeds and prints installed SDK/runtime details.

### 2) Build app
From repo root:

```bash
dotnet restore
dotnet build -c Release
```

Expected: build completes with `Build succeeded.` and no blocking errors.

### 3) Run app

```bash
dotnet run -c Release
```

Expected:
- Main window opens.
- App remains responsive for at least 10 seconds.

### 4) Open a sample media file
- Use app UI to open a local `.mp3` or `.mp4` file.
- Wait for media metadata/timeline to appear.

Expected:
- File loads without error dialog.
- Playback controls become active.

### 5) Verify play/pause
- Press **Play** and confirm audio/video starts.
- Press **Pause** and confirm playback stops/holds position.
- Press **Play** again and confirm resume from paused position.

Expected:
- Control actions occur within normal UI response time.
- No crash/hang during control toggling.

### 6) Verify clean app exit
- Close app via window close button (X) or app menu exit.

Expected:
- App exits normally.
- No crash dialog.
- Process does not remain running in Task Manager.

## Pass/Fail criteria

- **Pass**: all expected outcomes above are met.
- **Fail**: any crash, hang, launch blocker, or inability to load/play sample media.

## First-run troubleshooting notes

### Missing runtime
- Install/repair missing .NET or Windows App SDK runtime.
- Re-run `dotnet restore` then `dotnet build -c Release`.

### Signing or certificate trust problems
- Trust/install required development certificate.
- Rebuild and relaunch.

### Path/permission problems
- Move repo/media file under user-writable directories.
- Avoid protected system folders.
- Retry using a terminal started with permissions required by your org policy.
