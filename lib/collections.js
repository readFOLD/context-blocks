ContextBlocks = new Mongo.Collection("context_blocks", {
  transform: newTypeSpecificContextBlock
});

if(!this.Schema){
  Schema = {};
}

Schema.ContextReferenceProfile = new SimpleSchema({
  id: {
    type: String,
    optional: true
  },

  creationDate: {
    type: String,
    optional: true
  },

  username: {
    type: String,
    optional: true
  },

  userId: {
    type: String,
    optional: true
  },

  source: {
    type: String,
    optional: true
  },

  artworkUrl: {
    type: String,
    optional: true
  },

  previewImage: {
    type: String,
    optional: true
  },

  title: {
    type: String,
    optional: true,
    defaultValue: ''
  },

  description: {
    type: String,
    optional: true,
    defaultValue: ''
  },
  fileExtension: {
    type: String,
    optional: true
  },

  // Image


  flickrFarm: {
    type: String,
    optional: true
  },
  flickrSecret: {
    type: String,
    optional: true
  },
  flickrServer: {
    type: String,
    optional: true
  },
  uploadDate: {
    type: Date,
    optional: true
  },
  ownerName: {
    type: String,
    optional: true
  },

  hasWebM: {
    type: Boolean,
    optional: true
  },

  hasMP4: {
    type: Boolean,
    optional: true
  },



  // Image upload
  width: {
    type: Number,
    optional: true
  },
  height: {
    type: Number,
    optional: true
  },

  // twitter
  retweet: {
    type: String,
    optional: true
  },
  creationDate: {
    type: String,
    optional: true
  },
  username: {
    type: String,
    optional: true
  },
  screenname: {
    type: String,
    optional: true
  },
  userId: {
    type: String,
    optional: true
  },
  userPic: {
    type: String,
    optional: true
  },
  text: {
    type: String,
    optional: true
  },
  entities: {
    type: Object,
    optional: true,
    blackbox: true
  },
  extendedEntities: {
    type: Object,
    optional: true,
    blackbox: true
  },
  retweetedStatus: {
    type: Object,
    optional: true,
    blackbox: true
  },

  // Link
  title: { type: String, optional: true },
  thumbnailUrl: { type: String, optional: true },
  url: { type: String, optional: true },
  originalUrl: { type: String, optional: true },
  providerName: { type: String, optional: true },
  providerUrl: { type: String, optional: true },
  authorUrl: { type: String, optional: true },
  authorName: { type: String, optional: true },
  thumbnailHeight: { type: Number, optional: true },
  thumbnailWidth: { type: Number, optional: true },
  embedlyType: { type: String, optional: true },
  imageOnLeft: { type: Boolean, optional: true },

  // Rich or Extract
  html: { type: String, optional: true },

  // OEC
  oecYear: {
    type: String,
    optional: true
  },
  oecCountry: {
    type: String,
    optional: true
  },
  oecDirection: {
    type: String,
    optional: true
  },

  mapQuery: {
    type: String,
    optional: true
  },
  mapType: {
    type: String,
    allowedValues: ['roadmap', 'satellite'],
    defaultValue: 'satellite',
    optional: true,
    autoform: {
      afFieldInput: {
        firstOption: false,
        options: 'allowed'
      }
    }
  }

});

Schema.ContextBlocks = new SimpleSchema({
  authorId: {
    type: String
  },
  type: {
    type: String
  },
  source: {
    type: String,
    optional: true
  },
  fromEmbedly: {
    type: Boolean,
    optional: true
  },
  version: {
    type: String,
    optional: true
  },
  savedAt: {
    type: Date,
    optional: true
  },
  publishedAt: {
    type: Date,
    optional: true
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    },
    optional: true // optional because only added this fieldjust before launch
  },
  fullDetails: {
    type: Object,
    optional: true,
    blackbox: true
  },
  description: {
    type: String,
    optional: true
  },
  content: {
    type: String,
    trim: false,
    label: " ",
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 10,
        "class": "text-input"
      }
    }
  },
  published: {
    type: Boolean,
    defaultValue: false
  },
  everPublished: {
    type: Boolean,
    defaultValue: false
  },
  reference: {
    type: Schema.ContextReferenceProfile,
    optional: true
  },

  searchQuery: {
    type:String,
    optional:true
  },
  searchOption: {
    type: String,
    optional:true
  }
});

ContextBlocks.attachSchema(Schema.ContextBlocks);
