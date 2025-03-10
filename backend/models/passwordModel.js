import mongoose from 'mongoose';

const passwordSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
      enum: ['mails', 'devices', 'github', 'social-media'],
    },
    subcategory: {
      type: String,
      required: true,
    },
    platformName:{
      type: String,
      required: true,

    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Password = mongoose.model('Password', passwordSchema);

export default Password;