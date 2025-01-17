import * as Stream from 'stream';
import * as strtok3 from 'strtok3/lib/core';
import {ITokenizer} from 'strtok3/lib/type';

import {ParserFactory} from './ParserFactory';
import { IAudioMetadata, INativeTagDict, IOptions, IRandomReader, ITag } from './type';
import { RandomBufferReader } from './common/RandomBufferReader';
import { APEv2Parser } from './apev2/APEv2Parser';
import { hasID3v1Header } from './id3v1/ID3v1Parser';
import { getLyricsHeaderLength } from './lyrics3/Lyrics3';

/**
 * Parse audio from Node Stream.Readable
 * @param {Stream.Readable} stream Stream to read the audio track from
 * @param {string} mimeType Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export function parseStream(stream: Stream.Readable, mimeType?: string, options: IOptions = {}): Promise<IAudioMetadata> {
  return parseFromTokenizer(strtok3.fromStream(stream), mimeType, options);
}

/**
 * Parse audio from Node Buffer
 * @param {Stream.Readable} buf Buffer holding audio data
 * @param {string} mimeType <string> Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 * Ref: https://github.com/Borewit/strtok3/blob/e6938c81ff685074d5eb3064a11c0b03ca934c1d/src/index.ts#L15
 */
export async function parseBuffer(buf: Buffer, mimeType?: string, options: IOptions = {}): Promise<IAudioMetadata> {

  const bufferReader = new RandomBufferReader(buf);
  await scanAppendingHeaders(bufferReader, options);

  const tokenizer = strtok3.fromBuffer(buf);
  return parseFromTokenizer(tokenizer, mimeType, options);
}

/**
 * Parse audio from ITokenizer source
 * @param {ITokenizer} tokenizer Audio source implementing the tokenizer interface
 * @param {string} mimeType <string> Content specification MIME-type, e.g.: 'audio/mpeg'
 * @param {IOptions} options Parsing options
 * @returns {Promise<IAudioMetadata>}
 */
export function parseFromTokenizer(tokenizer: ITokenizer, mimeType?: string, options?: IOptions): Promise<IAudioMetadata> {
  if (!tokenizer.fileSize && options.fileSize) {
    tokenizer.fileSize = options.fileSize;
  }
  return ParserFactory.parseOnContentType(tokenizer, mimeType, options);
}

/**
 * Create a dictionary ordered by their tag id (key)
 * @param nativeTags list of tags
 * @returns tags indexed by id
 */
export function orderTags(nativeTags: ITag[]): INativeTagDict {
  const tags = {};
  for (const tag of nativeTags) {
    (tags[tag.id] = (tags[tag.id] || [])).push(tag.value);
  }
  return tags;
}

/**
 * Convert rating to 1-5 star rating
 * @param {number} rating Normalized rating [0..1] (common.rating[n].rating)
 * @returns {number} Number of stars: 1, 2, 3, 4 or 5 stars
 */
export function ratingToStars(rating: number): number {
  return rating === undefined ? 0 : 1 + Math.round(rating * 4);
}

export async function scanAppendingHeaders(randomReader: IRandomReader, options: IOptions = {}) {

  let apeOffset = randomReader.fileSize;
  if (await hasID3v1Header(randomReader)) {
    apeOffset -= 128;
    const lyricsLen = await getLyricsHeaderLength(randomReader);
    apeOffset -= lyricsLen;
  }

  options.apeOffset = await APEv2Parser.findApeFooterOffset(randomReader, apeOffset);
}
