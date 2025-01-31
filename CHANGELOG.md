# Changelog

All notable changes to this project will be documented in this file, starting from v1.1.0.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

## 1.3.0 - 2025-01-31

### Added

- File-based routing

### Changed

- New way to configure the navbar

### Removed

- Old custom site folder
- Some articles parameters dedicated to custom pages have been removed (order, redirect)

## 1.2.2 - 2025-01-28

### Added

- New bright theme and theme switcher (+ automatic theme detection)

### Fixed

- Fix for the Youtube renderer for the RSS feed (links are working, no iframe anymore)

## 1.2.1 - 2025-01-25

### Fixed

- Fixing HTML rendering for many RSS clients

## 1.2.0 - 2024-11-26

### Added

- New markdown examples
- Clickable tags on the index
- Reset button for the search field

### Changed

- Updating dates to keep important posts on top
- Better style for footnote backrefs
- Better style for the search field

### Fixed

- noArticlesMessage is no more displayed when the user has no result on his "enter-triggered search", "No results" instead

## 1.1.5 - 2024-11-24

### Fixed

- Images now have a max-width of `min(100%, 600px)`

## 1.1.4 - 2024-11-24

### Added

- Adding max-width + spacing around images

## 1.1.3 - 2024-11-24

### Fixed

- Fixed the unused parameter `noArticlesMessage`. A custom message can now be set as expected.

## 1.1.2 - 2024-11-23

### Fixed

- Automatic structure generation no longer references a non-existing image

## [1.1.1] - 2024-11-20

### Added

- Updated README with the new template repo

### Changed

- Companion folders are no longer generated using the CLI to create an article
- Default image is no longer generated using the CLI to create an article

### Removed

- HTMX boosting: I had issues with the search feature fixed with a nasty script that wasn't ideal + a user reported scroll issues while loading new page, that was fixed by removing HTMX boosting.
- The nasty script to fix search with HTMX boosting has been removed
