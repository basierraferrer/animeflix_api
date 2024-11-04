import {Schema, model, Document, Types} from 'mongoose';

interface Episode extends Document<Types.ObjectId> {
  title?: string;
  episode: number;
  season?: string;
  episodeSeason?: number;
  playerUrl: string;
  scrapeDate: Date;
  duration: number;
  animeId: Types.ObjectId;
}

const EpisodeSchema = new Schema<Episode>(
  {
    title: {
      type: String,
    },
    episode: {
      type: Number,
      required: [true, 'Episode number is required'],
      min: 1,
    },
    season: {
      type: String,
    },
    episodeSeason: {
      type: Number,
    },
    playerUrl: {
      type: String,
      required: [true, 'Player URL is required'],
    },
    scrapeDate: {
      type: Date,
      required: [true, 'Scrape date is required'],
    },
    duration: {
      type: Number,
    },
    animeId: {
      type: Schema.Types.ObjectId,
      ref: 'Anime',
      required: [true, 'Anime ID is required'],
    },
  },
  {timestamps: true},
);

EpisodeSchema.index({animeId: 1});
EpisodeSchema.index({animeId: 1, episode: 1});

export default model<Episode>('Episode', EpisodeSchema);
