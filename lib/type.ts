import { GenericTagId, TagType } from './common/GenericTagTypes';

/**
 * Attached picture, typically used for cover art
 */
export interface IPicture {
  /**
   * Image mime type
   */
  format: string;
  /**
   * Image data
   */
  data: Buffer;
  /**
   * Optional description
   */
  description?: string;
  /**
   * Picture type
   */
  type?: string;
}

/**
 * Abstract interface to access rating information
 */
export interface IRating {
  /**
   * Rating source, could be an e-mail address
   */
  source?: string;
  /**
   * Rating [0..1]
   */
  rating: number;
}

export interface ICommonTagsResult {
  track: { no: number, of: number };
  disk: { no: number, of: number };
  /**
   * Release year
   */
  year?: number;
  /**
   * Track title
   */
  title?: string;
  /**
   * Track, maybe several artists written in a single string.
   */
  artist?: string;
  /**
   * Track artists, aims to capture every artist in a different string.
   */
  artists?: string[];
  /**
   * Track album artists
   */
  albumartist?: string;
  /**
   * Album title
   */
  album?: string;
  /**
   * Release data
   */
  date?: string;
  /**
   * Original release date
   */
  originaldate?: string;
  /**
   * Original release yeat
   */
  originalyear?: number;
  /**
   * List of comments
   */
  comment?: string[];
  /**
   * Genre
   */
  genre?: string[];
  /**
   * Embedded album art
   */
  picture?: IPicture[];
  /**
   * Track composer
   */
  composer?: string[];
  /**
   * Lyrics
   */
  lyrics?: string[];
  /**
   * Album title, formatted for alphabetic ordering
   */
  albumsort?: string;
  /**
   * Track title, formatted for alphabetic ordering
   */
  titlesort?: string;
  /**
   * The canonical title of the work
   */
  work?: string;
  /**
   * Track artist, formatted for alphabetic ordering
   */
  artistsort?: string;
  /**
   * Album artist, formatted for alphabetic ordering
   */
  albumartistsort?: string;
  /**
   * Composer(s), formatted for alphabetic ordering
   */
  composersort?: string[];
  /**
   * Lyricist(s)
   */
  lyricist?: string[];
  /**
   * Writer(s)
   */
  writer?: string[];
  /**
   * Conductor(s)
   */
  conductor?: string[];
  /**
   * Remixer(s)
   */
  remixer?: string[];
  /**
   * Arranger(s)
   */
  arranger?: string[];
  /**
   * Engineer(s)
   */
  engineer?: string[];
  /**
   * Producer(s)
   */
  producer?: string[];
  /**
   * Mix-DJ(s)
   */
  djmixer?: string[];
  /**
   * Mixed by
   */
  mixer?: string[];
  technician?: string[];
  label?: string[];
  grouping?: string[];
  subtitle?: string[];
  discsubtitle?: string[];
  totaltracks?: string;
  totaldiscs?: string;
  compilation?: string;
  rating?: IRating[];
  bpm?: number;
  /**
   * Keywords to reflect the mood of the audio, e.g. 'Romantic' or 'Sad'
   */
  mood?: string;
  /**
   * Release format, e.g. 'CD'
   */
  media?: string;
  /**
   * Release catalog number(s)
   */
  catalognumber?: string[];
  /**
   * TV show title
   */
  tvShow?: string;
  /**
   * TV show title, formatted for alphabetic ordering
   */
  tvShowSort?: string;
  /**
   * TV season title sequence number
   */
  tvSeason?: number;
  /**
   * TV Episode sequence number
   */
  tvEpisode?: number;
  /**
   * TV episode ID
   */
  tvEpisodeId?: string,
  /**
   * TV network
   */
  tvNetwork?: string,
  podcast?: string;
  podcasturl?: string;
  releasestatus?: string;
  releasetype?: string[];
  releasecountry?: string;
  script?: string;
  language?: string;
  copyright?: string;
  license?: string;
  encodedby?: string;
  encodersettings?: string;
  gapless?: boolean;
  barcode?: string; // ToDo: multiple??
  // International Standard Recording Code
  isrc?: string[];
  asin?: string;
  musicbrainz_recordingid?: string;
  musicbrainz_trackid?: string;
  musicbrainz_albumid?: string;
  musicbrainz_artistid?: string[];
  musicbrainz_albumartistid?: string[];
  musicbrainz_releasegroupid?: string;
  musicbrainz_workid?: string;
  musicbrainz_trmid?: string;
  musicbrainz_discid?: string;
  acoustid_id?: string;
  acoustid_fingerprint?: string;
  musicip_puid?: string;
  musicip_fingerprint?: string;
  website?: string;
  'performer:instrument'?: string[];
  averageLevel?: number;
  peakLevel?: number;
  notes?: string[];
  originalalbum?: string;
  originalartist?: string;
  // Discogs:
  discogs_artist_id?: number[];
  discogs_release_id?: number;
  discogs_label_id?: number;
  discogs_master_release_id?: number;
  discogs_votes?: number;
  discogs_rating?: number;

  /**
   * Track gain ratio [0..1]
   */
  replaygain_track_gain_ratio?: number;
  /**
   * Track peak ratio [0..1]
   */
  replaygain_track_peak_ratio?: number;

  /**
   * Track gain ratio
   */
  replaygain_track_gain?: IRatio;

  /**
   * Track peak ratio
   */
  replaygain_track_peak?: IRatio;

  /**
   * Album gain ratio
   */
  replaygain_album_gain?: IRatio;

  /**
   * Album peak ratio
   */
  replaygain_album_peak?: IRatio;

  /**
   * minimum & maximum global gain values across a set of files scanned as an album
   */
  replaygain_undo?: {
    leftChannel: number,
    rightChannel: number
  };

  /**
   * minimum & maximum global gain values across a set of files scanned as an album
   */
  replaygain_track_minmax?: number[];

  /**
   * The initial key of the music in the file, e.g. "A Minor".
   * Ref: https://docs.microsoft.com/en-us/windows/win32/wmformat/wm-initialkey
   */
  key?: string;
}

export interface IRatio {
  /**
   * [0..1]
   */
  ratio: number;

  /**
   * Decibel
   */
  dB: number;
}

export type FormatId =
  'container'
  | 'duration'
  | 'bitrate'
  | 'sampleRate'
  | 'bitsPerSample'
  | 'codec'
  | 'tool'
  | 'codecProfile'
  | 'lossless'
  | 'numberOfChannels'
  | 'numberOfSamples'
  | 'audioMD5';

export interface IFormat {

  /**
   * E.g.: 'flac'
   */
  readonly container?: string, // ToDo: make mandatory

  /**
   * List of tags found in parsed audio file
   */
  readonly tagTypes?: TagType[],

  /**
   * Duration in seconds
   */
  readonly duration?: number,

  /**
   * Number bits per second of encoded audio file
   */
  readonly bitrate?: number,

  /**
   * Sampling rate in Samples per second (S/s)
   */
  readonly sampleRate?: number,

  /**
   * Audio bit depth
   */
  readonly bitsPerSample?: number,

  /**
   * Encoder brand, e.g.: LAME3.99r
   */
  readonly tool?: string,

  /**
   * Encoder name / compressionType, e.g.: 'PCM', 'ITU-T G.711 mu-law'
   */
  readonly codec?: string,

  /**
   * Codec profile
   */
  readonly codecProfile?: string,

  readonly lossless?: boolean,

  /**
   * Number of audio channels
   */
  readonly numberOfChannels?: number,

  /**
   * Number of samples frames.
   * One sample contains all channels
   * The duration is: numberOfSamples / sampleRate
   */
  readonly numberOfSamples?: number

  /**
   * 16-byte MD5 of raw audio
   */
  readonly audioMD5?: Buffer;
}

export interface ITag {
  id: string,
  value: any
}

/**
 * Flat list of tags
 */
export interface INativeTags {
  [tagType: string]: ITag[];
}

/**
 * Tags ordered by tag-ID
 */
export interface INativeTagDict {
  [tagId: string]: any[];
}

export interface INativeAudioMetadata {
  format: IFormat,
  native: INativeTags
  quality: IQualityInformation;
}

export interface IQualityInformation {
  /**
   * Warnings
   */
  warnings: IParserWarning[];

}

export interface IParserWarning {
  message: string;
}

export interface IAudioMetadata extends INativeAudioMetadata {
  /**
   * Metadata, form independent interface
   */
  common: ICommonTagsResult;

}

/**
 * Corresponds with parser module name
 */
export type ParserType = 'mpeg' | 'apev2' | 'mp4' | 'asf' | 'flac' | 'ogg' | 'aiff' | 'wavpack' | 'riff' | 'musepack' | 'dsf' | 'dsdiff' | 'adts';

export interface IOptions {
  path?: string,

  /**
   *  default: `undefined`, pass the
   */
  fileSize?: number,

  /**
   *  default: `false`, if set to `true`, it will return native tags in addition to the `common` tags.
   */
  native?: boolean,

  /**
   * default: `false`, if set to `true`, it will parse the whole media file if required to determine the duration.
   */
  duration?: boolean;

  /**
   * default: `false`, if set to `true`, it will skip parsing covers.
   */
  skipCovers?: boolean;

  /**
   * default: `false`, if set to `true`, it will not search all the entire track for additional headers.
   * Only recommenced to use in combination with streams.
   */
  skipPostHeaders?: boolean;

  /**
   * Set observer for async callbacks to common or format.
   */
  observer?: Observer;

  apeOffset?: number;
}

/**
 * Event definition send after each change to common/format metadata change to observer.
 */
export interface IMetadataEvent {

  /**
   * Tag which has been updated.
   */
  tag: {

    /**
     * Either 'common' if it a generic tag event, or 'format' for format related updates
     */
    type: 'common' | 'format'

    /**
     * Tag id
     */
    id: GenericTagId | FormatId

    /**
     * Tag value
     */
    value: any
  };

  /**
   * Metadata model including the attached tag
   */
  metadata: IAudioMetadata
}

export type Observer = (update: IMetadataEvent) => void;

/**
 * Provides random data read access
 * Used read operations on file of buffers
 */
export interface IRandomReader {

  /**
   * Total length of file or buffer
   */
  fileSize: number;

  /**
   * Read from a given position of an abstracted file or buffer.
   * @param buffer {Buffer} is the buffer that the data will be written to.
   * @param offset {number} is the offset in the buffer to start writing at.
   * @param length {number}is an integer specifying the number of bytes to read.
   * @param position {number} is an argument specifying where to begin reading from in the file.
   * @return {Promise<number>} bytes read
   */
  randomRead(buffer: Buffer, offset: number, length: number, position: number): Promise<number>;
}
