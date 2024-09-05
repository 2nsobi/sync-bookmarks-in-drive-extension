@echo off
rem Copies and modifes certain files such that they can properly be used by the extension once built.

rem enabledelayedexpansion prevents env vars set with "set" to remain set after batch file exectution.
setlocal enabledelayedexpansion

rem 1) Copy src/background/ to built dist/ dir.

xcopy /e /i .\src\background .\dist\background

rem 2) Replace enviroment variable placeholers within manifest file with their values.

rem 2.1) Define paths
set "env_file=.env"
set "target_file=.\src\manifest.json"
set "output_file=.\dist\manifest.json"

rem 2.2) Set env vars defined in .env (https://stackoverflow.com/a/75535174).
for /F "delims== tokens=1,* eol=#" %%i in (%env_file%) do set %%i=%%~j

rem 2.3) Replace env var placeholders within src/manifest.json with values and ouput result to
rem      dist/manifest.json (https://stackoverflow.com/a/2962024).
goto :start

:expand
echo %~1 >> %output_file%
goto:eof

:start
echo "" > %output_file%
for /f "delims=" %%i in (%target_file%) do call:expand "%%i"

echo Environmental variable replacement complete. Output saved to %output_file%
