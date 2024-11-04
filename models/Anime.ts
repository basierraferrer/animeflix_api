import {Schema, model, Document, Types} from 'mongoose';

interface Anime extends Document<Types.ObjectId> {
  title: string;
  synopsis: string;
  releaseDate: Date;
  rating: number;
  genre: string[];
}

const AnimeSchema = new Schema<Anime>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    synopsis: {
      type: String,
      required: [true, 'Synopsis is required'],
    },
    releaseDate: {
      type: Date,
      required: [true, 'Release date is required'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
    },
    genre: {
      type: [String],
      required: [true, 'Genre is required'],
    },
  },
  {timestamps: true},
);

AnimeSchema.index({title: 'text'});

export default model<Anime>('Anime', AnimeSchema);
