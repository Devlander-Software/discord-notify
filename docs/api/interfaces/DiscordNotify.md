[**Discord Notify API Documentation v1.0.1**](../README.md)

***

[Discord Notify API Documentation](../globals.md) / DiscordNotify

Defined in: index.ts:5

## Extends

- [`DiscordNotifier`](DiscordNotifier.md)

## Methods

### send()

> **send**(`args`): `Promise`\<`void`\>

Defined in: index.ts:2

#### Parameters

##### args

`string` | [`SendArgs`](SendArgs.md)

#### Returns

`Promise`\<`void`\>

#### Inherited from

[`DiscordNotifier`](DiscordNotifier.md).[`send`](DiscordNotifier.md#send)

***

### extend()

> **extend**(`args`): [`DiscordNotifier`](DiscordNotifier.md)

Defined in: index.ts:6

#### Parameters

##### args

`string` | [`SendArgs`](SendArgs.md)

#### Returns

[`DiscordNotifier`](DiscordNotifier.md)

***

### success()

> **success**(`args`): `Promise`\<`void`\>

Defined in: index.ts:7

#### Parameters

##### args

`string` | [`SendArgs`](SendArgs.md)

#### Returns

`Promise`\<`void`\>

***

### error()

> **error**(`args`): `Promise`\<`void`\>

Defined in: index.ts:8

#### Parameters

##### args

`string` | [`SendArgs`](SendArgs.md)

#### Returns

`Promise`\<`void`\>

***

### alert()

> **alert**(`args`): `Promise`\<`void`\>

Defined in: index.ts:9

#### Parameters

##### args

`string` | [`SendArgs`](SendArgs.md)

#### Returns

`Promise`\<`void`\>

***

### info()

> **info**(`args`): `Promise`\<`void`\>

Defined in: index.ts:10

#### Parameters

##### args

`string` | [`SendArgs`](SendArgs.md)

#### Returns

`Promise`\<`void`\>

***

### sendFile()

> **sendFile**(`args`, `file`): `Promise`\<`void`\>

Defined in: index.ts:11

#### Parameters

##### args

`string` | [`SendArgs`](SendArgs.md)

##### file

[`FileAttachment`](FileAttachment.md)

#### Returns

`Promise`\<`void`\>

***

### sendToThread()

> **sendToThread**(`args`, `threadId`): `Promise`\<`void`\>

Defined in: index.ts:12

#### Parameters

##### args

`string` | [`SendArgs`](SendArgs.md)

##### threadId

`string`

#### Returns

`Promise`\<`void`\>
