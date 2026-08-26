# Changelog

This project follows [Semantic Versioning](https://semver.org/). Because ShoeHorn UI is pre-1.0, minor versions may include documented API changes.

## Unreleased

### Added

- Shared `ShField` context for labels, descriptions, errors, required, disabled, and invalid state.
- Alert, Progress, Spinner, Tooltip, and VisuallyHidden primitives.
- Automated axe accessibility smoke tests and component interaction contracts.
- CI quality checks and public package validation.

### Changed

- Native form controls now use SSR-safe IDs and forward attributes to the correct element.
- Switch now uses a native checkbox with switch semantics.
- RadioGroup now uses native fieldset, legend, and radio behavior.
- Tabs now use instance-safe relationships and true roving focus.
- Dialog now uses the native dialog element with controlled focus behavior.
- Combobox now keeps active descendants aligned with rendered enabled options.
- Link-mode Button now preserves native link semantics.

### Fixed

- Public exports now include all supported components and types.
- Production styles no longer import nonexistent components.
- Declaration generation, linting, and formatting failures.
