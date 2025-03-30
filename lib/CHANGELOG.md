# Changelog

## [0.6.1](https://github.com/rushdynamic/avastha/compare/v0.6.0...v0.6.1) (2025-03-30)


### Bug Fixes

* remove deep check from setstate ([cff121f](https://github.com/rushdynamic/avastha/commit/cff121fb0155b82b68bd4dfaccbb5e9f9cf204e6))

## [0.6.0](https://github.com/rushdynamic/avastha/compare/v0.5.4...v0.6.0) (2025-03-28)

### Features

- support mutable actions ([6709170](https://github.com/rushdynamic/avastha/commit/6709170bf1f12eb1c5391ca66c1c991338f794cb))

### Bug Fixes

- deep comparison in useStore ([b0233a1](https://github.com/rushdynamic/avastha/commit/b0233a15d116d2c1b8434618f613d195e20561d8))
- recursively create proxy for nested state during mutable updates ([0aa7c1d](https://github.com/rushdynamic/avastha/commit/0aa7c1de4c80e674b2fe3241404b6131973ebbbf))
- use deep comparison in useSyncExternalStore selector ([31bc1a0](https://github.com/rushdynamic/avastha/commit/31bc1a03e58fc99358f096e4e960b99315f420ec))

## [0.5.4](https://github.com/rushdynamic/avastha/compare/v0.5.3...v0.5.4) (2025-03-26)

### Bug Fixes

- make params optional in debug middleware ([5cd44b7](https://github.com/rushdynamic/avastha/commit/5cd44b7ad75921f4bd696e91aab855765f562f0b))

## [0.5.3](https://github.com/rushdynamic/avastha/compare/v0.5.2...v0.5.3) (2025-03-26)

### Bug Fixes

- make react and react-dom dev and peer dependencies ([5926a87](https://github.com/rushdynamic/avastha/commit/5926a8743e9a5ef8ef7cb5ed6a94a50b37d1d4cb))

## [0.5.2](https://github.com/rushdynamic/avastha/compare/v0.5.1...v0.5.2) (2025-03-26)

### Bug Fixes

- stricter type in deep equals ([#27](https://github.com/rushdynamic/avastha/issues/27)) ([9cc1fa5](https://github.com/rushdynamic/avastha/commit/9cc1fa5e0449a6434a3d205c47af339228ce7a47))

## [0.5.1](https://github.com/rushdynamic/avastha/compare/v0.5.0...v0.5.1) (2025-03-26)

### Bug Fixes

- deep object comparison ([#25](https://github.com/rushdynamic/avastha/issues/25)) ([444c9cf](https://github.com/rushdynamic/avastha/commit/444c9cf7981d8271958df41699472f3de652e361))

## [0.5.0](https://github.com/rushdynamic/avastha/compare/v0.4.1...v0.5.0) (2025-03-26)

### Features

- basic debug logging middleware ([#23](https://github.com/rushdynamic/avastha/issues/23)) ([42dd072](https://github.com/rushdynamic/avastha/commit/42dd072e96e99fbb94e09ca91edb34b321c69b6b))

## [0.4.1](https://github.com/rushdynamic/avastha/compare/v0.4.0...v0.4.1) (2025-03-26)

### Bug Fixes

- state equality check ([#21](https://github.com/rushdynamic/avastha/issues/21)) ([786f8b5](https://github.com/rushdynamic/avastha/commit/786f8b550cd30ab0f35da3f20edda5ba03e23e0a))

## [0.4.0](https://github.com/rushdynamic/avastha/compare/avastha-v0.3.0...avastha-v0.4.0) (2025-03-25)

### Features

- basic counter example ([d7d9ba1](https://github.com/rushdynamic/avastha/commit/d7d9ba1ebcc759f377dde68a64a460fc85a4dd30))
- basic library and example ([07c2831](https://github.com/rushdynamic/avastha/commit/07c28310641b594141fa6dffbe7804de76361a2a))
- create initial state with subscriptions ([4505a44](https://github.com/rushdynamic/avastha/commit/4505a443a47758ca972b16600107f11409389524))
- integrate useSyncExternalStore ([ef66179](https://github.com/rushdynamic/avastha/commit/ef6617967c5758ef03393520fd608d7f378656e1))
- rewrite from scratch using useSyncExternalStore ([7b25803](https://github.com/rushdynamic/avastha/commit/7b258030f0db9ae861663162a5f4357ff969ac9c))

### Bug Fixes

- config for npm publish ([7057476](https://github.com/rushdynamic/avastha/commit/705747638ac40e1a6a417cca42809e883a795f7a))
- ignore types while transpiling ([f2d4729](https://github.com/rushdynamic/avastha/commit/f2d4729c8d8903e862bd1889064a44f5089b2977))
- partial state return type for updater ([d7df189](https://github.com/rushdynamic/avastha/commit/d7df18953465db4d03515fc6a4f2d76347d510e5))
- type checking in counter example ([9f1f230](https://github.com/rushdynamic/avastha/commit/9f1f2304d8638f24db3145d7db32979f324a0ce3))
- type declarations not emitted during build ([c8c6d70](https://github.com/rushdynamic/avastha/commit/c8c6d706f7852637d306aa5e4c2caaa19302c086))

## [0.3.0](https://github.com/rushdynamic/sqrrl/compare/sqrrl-v0.2.0...sqrrl-v0.3.0) (2025-03-24)

### Features

- basic counter example ([d7d9ba1](https://github.com/rushdynamic/sqrrl/commit/d7d9ba1ebcc759f377dde68a64a460fc85a4dd30))
- basic library and example ([07c2831](https://github.com/rushdynamic/sqrrl/commit/07c28310641b594141fa6dffbe7804de76361a2a))
- create initial state with subscriptions ([4505a44](https://github.com/rushdynamic/sqrrl/commit/4505a443a47758ca972b16600107f11409389524))
- integrate useSyncExternalStore ([ef66179](https://github.com/rushdynamic/sqrrl/commit/ef6617967c5758ef03393520fd608d7f378656e1))
- rewrite from scratch using useSyncExternalStore ([7b25803](https://github.com/rushdynamic/sqrrl/commit/7b258030f0db9ae861663162a5f4357ff969ac9c))

### Bug Fixes

- config for npm publish ([7057476](https://github.com/rushdynamic/sqrrl/commit/705747638ac40e1a6a417cca42809e883a795f7a))
- ignore types while transpiling ([f2d4729](https://github.com/rushdynamic/sqrrl/commit/f2d4729c8d8903e862bd1889064a44f5089b2977))
- partial state return type for updater ([d7df189](https://github.com/rushdynamic/sqrrl/commit/d7df18953465db4d03515fc6a4f2d76347d510e5))
- type checking in counter example ([9f1f230](https://github.com/rushdynamic/sqrrl/commit/9f1f2304d8638f24db3145d7db32979f324a0ce3))
- type declarations not emitted during build ([c8c6d70](https://github.com/rushdynamic/sqrrl/commit/c8c6d706f7852637d306aa5e4c2caaa19302c086))

## [0.2.0](https://github.com/rushdynamic/sqrrl/compare/sqrrl-v0.1.0...sqrrl-v0.2.0) (2025-03-24)

### Features

- basic counter example ([d7d9ba1](https://github.com/rushdynamic/sqrrl/commit/d7d9ba1ebcc759f377dde68a64a460fc85a4dd30))
- basic library and example ([07c2831](https://github.com/rushdynamic/sqrrl/commit/07c28310641b594141fa6dffbe7804de76361a2a))
- create initial state with subscriptions ([4505a44](https://github.com/rushdynamic/sqrrl/commit/4505a443a47758ca972b16600107f11409389524))
- integrate useSyncExternalStore ([ef66179](https://github.com/rushdynamic/sqrrl/commit/ef6617967c5758ef03393520fd608d7f378656e1))

### Bug Fixes

- config for npm publish ([7057476](https://github.com/rushdynamic/sqrrl/commit/705747638ac40e1a6a417cca42809e883a795f7a))
- ignore types while transpiling ([f2d4729](https://github.com/rushdynamic/sqrrl/commit/f2d4729c8d8903e862bd1889064a44f5089b2977))
- partial state return type for updater ([d7df189](https://github.com/rushdynamic/sqrrl/commit/d7df18953465db4d03515fc6a4f2d76347d510e5))
- type checking in counter example ([9f1f230](https://github.com/rushdynamic/sqrrl/commit/9f1f2304d8638f24db3145d7db32979f324a0ce3))
- type declarations not emitted during build ([c8c6d70](https://github.com/rushdynamic/sqrrl/commit/c8c6d706f7852637d306aa5e4c2caaa19302c086))
