import {Schema, model, Document, Types} from 'mongoose';

interface FavoriteAnime {
  animeKey: string;
}

interface ContinueWatching {
  contentType: 'anime' | 'movie';
  contentId: string;
  progress: number;
  lastWatched: Date;
}

interface User extends Document<Types.ObjectId> {
  username: string;
  email: string;
  passwordHash: string;
  favorites?: {
    animes: FavoriteAnime[];
  };
  continueWatching?: ContinueWatching[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    favorites: {
      animes: [
        {
          animeKey: {
            type: String,
            required: [true, 'Anime key is required for favorite items'],
          },
        },
      ],
    },
    continueWatching: [
      {
        contentType: {
          type: String,
          enum: ['anime', 'movie'],
          required: true,
        },
        contentId: {
          type: String,
          required: [true, 'Content ID is required'],
        },
        progress: {
          type: Number,
        },
        last_watched: {
          type: Date,
          required: [true, 'Last watched date is required'],
        },
      },
    ],
    createdAt: {
      type: Date,
      required: [true, 'Creation date is required'],
    },
    updatedAt: {
      type: Date,
      required: [true, 'Update date is required'],
    },
  },
  {timestamps: true},
);

UserSchema.index({email: 1}, {unique: true});

export default model<User>('User', UserSchema);
