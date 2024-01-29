@echo off
SETLOCAL

:: Set the paths
SET sourceFolder=./build
SET deployFolder=\\10.0.0.115\c$\inetpub\wwwroot\UrgentScreen

:: Run the build command
echo Running build command...
::call %buildCommand%
call npm run build:dev
if %errorlevel% neq 0 exit /b %errorlevel%

:: Check if the source folder exists
if not exist "%sourceFolder%\*" (
    echo Source folder not found: %sourceFolder%
    exit /b 1
)

:: Clear the deploy folder
echo Clearing deploy folder...
if exist "%deployFolder%\*" (
    for /d %%x in ("%deployFolder%\*") do rmdir /S /Q "%%x"
    del /Q "%deployFolder%\*"
)

:: Copy the new build files to the deploy folder
echo Deploying files to %deployFolder%...
xcopy /E /I /Q "%sourceFolder%" "%deployFolder%"

echo Deployment completed successfully.

ENDLOCAL
