# Changelog

All notable changes to this project will be documented in this file, starting from v1.1.0.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

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
