[Discord Notify API Documentation - v1.1.0](../README.md) / [Exports](../modules.md) / DiscordNotify

## Hierarchy

- [`DiscordNotifier`](DiscordNotifier.md)

  ↳ **`DiscordNotify`**

## Table of contents

### Methods

- [send](DiscordNotify.md#send)
- [extend](DiscordNotify.md#extend)
- [success](DiscordNotify.md#success)
- [error](DiscordNotify.md#error)
- [alert](DiscordNotify.md#alert)
- [info](DiscordNotify.md#info)
- [sendFile](DiscordNotify.md#sendfile)
- [sendToThread](DiscordNotify.md#sendtothread)

## Methods

### send

▸ **send**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| [`SendArgs`](SendArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[DiscordNotifier](DiscordNotifier.md).[send](DiscordNotifier.md#send)

#### Defined in

[index.ts:2](https://github.com/Devlander-Software/discord-notify/blob/main/src/index.ts#L2)

___

### extend

▸ **extend**(`args`): [`DiscordNotifier`](DiscordNotifier.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| [`SendArgs`](SendArgs.md) |

#### Returns

[`DiscordNotifier`](DiscordNotifier.md)

#### Defined in

[index.ts:6](https://github.com/Devlander-Software/discord-notify/blob/main/src/index.ts#L6)

___

### success

▸ **success**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| [`SendArgs`](SendArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:7](https://github.com/Devlander-Software/discord-notify/blob/main/src/index.ts#L7)

___

### error

▸ **error**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| [`SendArgs`](SendArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:8](https://github.com/Devlander-Software/discord-notify/blob/main/src/index.ts#L8)

___

### alert

▸ **alert**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| [`SendArgs`](SendArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:9](https://github.com/Devlander-Software/discord-notify/blob/main/src/index.ts#L9)

___

### info

▸ **info**(`args`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| [`SendArgs`](SendArgs.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:10](https://github.com/Devlander-Software/discord-notify/blob/main/src/index.ts#L10)

___

### sendFile

▸ **sendFile**(`args`, `file`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| [`SendArgs`](SendArgs.md) |
| `file` | [`FileAttachment`](FileAttachment.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:11](https://github.com/Devlander-Software/discord-notify/blob/main/src/index.ts#L11)

___

### sendToThread

▸ **sendToThread**(`args`, `threadId`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `string` \| [`SendArgs`](SendArgs.md) |
| `threadId` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:12](https://github.com/Devlander-Software/discord-notify/blob/main/src/index.ts#L12)
