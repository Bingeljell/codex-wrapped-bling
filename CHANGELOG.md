# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased] - 2025-12-28

### Added
- **Model Usage Bars**: Added a token-based bar chart with top models and an "Other" bucket.
- **Time of Day Heatmap**: Added a 7x24 tokens heatmap by weekday/hour (local time).
- **Top Projects**: Added a top-5 projects list ranked by token usage.
- **Model Switching Stats**: Added total model switches and dominant model share to Usage Detail.

### Changed
- **Data Pipeline**: Collector and stats now track project usage, hourly activity, and full model usage totals.
- **Layout**: Increased canvas height and bottom padding; resized the time-of-day heatmap to fill its card width.
- **Project Labels**: Display project basenames instead of full paths.
- **Theme**: Updated the palette to an Electric Christmas scheme (neon red/green accents, warm whites, gold streaks).

### Fixed
- **Satori Rendering**: Added explicit `display` styles to satisfy Satori's layout requirements.
- **Image Clipping**: Prevented the bottom stats row from getting cut off.
