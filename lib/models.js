var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };


ContextBlock = (function() {
    function ContextBlock(doc) {
        _.extend(this, doc);
    }

    return ContextBlock;

})();

VideoBlock = (function(_super) {
    __extends(VideoBlock, _super);

    function VideoBlock(doc) {
        VideoBlock.__super__.constructor.call(this, doc);
        this.type = 'video';
        if (this.source == null) {
            this.source = 'youtube';
        }
    }

    VideoBlock.prototype.title = function() {
        if (this.source === 'youtube' || this.source === 'vimeo') {
            return this.reference.title
        }
    };

    VideoBlock.prototype.caption = function() {
        if (this.source === 'youtube' || this.source === 'vimeo') {
            return this.reference.description
        }
    };

    VideoBlock.prototype.username = function() {
        if (this.source === 'youtube' || this.source === 'vimeo') {
            return this.reference.username
        }
    };

    VideoBlock.prototype.creationDate = function() {
        if (this.source === 'youtube' || this.source === 'vimeo') {
            return this.reference.creationDate
        }
    };

    VideoBlock.prototype.url = function() {
        if (this.source === 'youtube') {
            return '//www.youtube.com/embed/' + this.reference.id;
        } else if (this.source === 'vimeo') {
            return '//player.vimeo.com/video/' + this.reference.id;
        }
    };

    VideoBlock.prototype.previewUrl = function() {
        if (this.source === 'youtube') {
            return '//img.youtube.com/vi/' + this.reference.id + '/0.jpg';
        } else if (this.source === 'vimeo') {
            return '//i.vimeocdn.com/video/' + this.reference.previewImage + '_640x359.jpg'
        }
    };

    VideoBlock.prototype.thumbnailUrl = function() {
        if (this.source === 'youtube') {
            return '//i.ytimg.com/vi/' + this.reference.id + '/default.jpg';
        } else if (this.source === 'vimeo') {
            return '//i.vimeocdn.com/video/' + this.reference.previewImage + '_100x75.jpg'
        }
    };

    VideoBlock.prototype.anchorMenuSnippet = function() {
        return this.reference.title;
    };

    return VideoBlock;

})(ContextBlock);

AudioBlock = (function(_super) {
    __extends(AudioBlock, _super);

    function AudioBlock(doc) {
        AudioBlock.__super__.constructor.call(this, doc);
        this.type = 'audio';
        if (this.source == null) {
            this.source = 'soundcloud';
        }
    }

    AudioBlock.prototype.url = function() {
        if (this.source === 'soundcloud') {
            return '//w.soundcloud.com/player/?url=https://api.soundcloud.com/tracks/' + this.reference.id + '&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true'
        }
    };

    AudioBlock.prototype.artworkUrl = function() {
        if (this.source === 'soundcloud') {
            return this.reference.artworkUrl;
        }
    };

    AudioBlock.prototype.previewUrl = function() {
        if (this.source === 'soundcloud' && this.reference.artworkUrl) {
            return this.reference.artworkUrl.replace(/large\.jpg/, "t500x500.jpg");
        }
    };

    AudioBlock.prototype.anchorMenuSnippet = function() {
        return this.reference.title;
    };


    return AudioBlock;

})(ContextBlock);

TwitterBlock = (function(_super) {
    __extends(TwitterBlock, _super);

    function TwitterBlock(doc) {
        TwitterBlock.__super__.constructor.call(this, doc);
        this.type = 'twitter';
        if (this.source == null) {
            this.source = 'twitter';
        }
    }

    TwitterBlock.prototype.userpic = function() {
        return this.reference.userPic
    };

    TwitterBlock.prototype.username = function() {
        return this.reference.username
    };

    TwitterBlock.prototype.screenname = function() {
        return this.reference.screenname
    };

    TwitterBlock.prototype.text = function() {
        return this.reference.userPic
    };

    TwitterBlock.prototype.date = function() {
        return this.reference.creationDate
    };

    TwitterBlock.prototype.tweet_url = function() {
        return '//twitter.com/' + this.reference.screenname + '/status/' + this.reference.id
    };

    TwitterBlock.prototype.user_url = function() {
        return '//twitter.com/' + this.reference.screenname
    };

    TwitterBlock.prototype.twitter_url = function() {
        return '//twitter.com/'
    };

    TwitterBlock.prototype.retweet_action = function() {
        return '//twitter.com/intent/retweet?tweet_id=' + this.reference.id
    };

    TwitterBlock.prototype.reply_action = function() {
        return '//twitter.com/intent/tweet?in_reply_to=' + this.reference.id
    };

    TwitterBlock.prototype.favorite_action = function() {
        return '//twitter.com/intent/favorite?tweet_id=' + this.reference.id
    };

    TwitterBlock.prototype.imgUrl = function(){
        var imgUrl;
        if (this.extendedEntities) {
            imgUrl = this.extendedEntities.media[0].media_url_https;
        }
        if (this.reference.retweetedStatus) {
            if (this.reference.retweetedStatus.entities.media) {imgUrl = this.reference.retweetedStatus.entities.media[0].media_url}
        } else {
            if (this.reference.entities.media) {imgUrl = this.reference.entities.media[0].media_url}
        }
        return imgUrl
    };

    TwitterBlock.prototype.retweet_url = function() {
        return '//twitter.com/' + this.reference.retweetedStatus.user.screen_name
    };

    TwitterBlock.prototype.retweetUser = function(){
        if (this.reference.retweetedStatus) {
            return this.reference.retweetedStatus.user.screen_name;
        }
    };

    TwitterBlock.prototype.anchorMenuSnippet = function() {
        return this.reference.text;
    };

    TwitterBlock.prototype.links = function(){

        if (this.reference.retweetedStatus) {
            var urls = this.reference.retweetedStatus.entities.urls;
        } else {
            var urls = this.reference.entities.urls;
        }
        return urls
    };

    TwitterBlock.prototype.formattedTweet = function() {
        var text = this.reference.text; // twttr seems to be escaping appropriately itself

        if (this.imgUrl()) {
            var imgIndex = text.lastIndexOf("http://");
            text = text.substring(0, imgIndex);
        }

        return twttr.txt.autoLink(text, {
            urlEntities: this.links(),
            targetBlank: true
        });
    };

    return TwitterBlock;

})(ContextBlock);

ImageBlock = (function(_super) {
    __extends(ImageBlock, _super);

    function ImageBlock(doc) {
        ImageBlock.__super__.constructor.call(this, doc);
        this.type = 'image';
        if (!this.source) { // TO-DO Remove
            this.source = 'imgur';
        }
    };

    ImageBlock.prototype.showVideo = function() {
        return this.webMUrl() || this.mp4Url();
    },

        ImageBlock.prototype.webMUrl = function() {
            if (this.source === 'imgur' && this.reference.hasWebM) {
                return '//i.imgur.com/' + this.reference.id + '.webm';
            }
        };

    ImageBlock.prototype.mp4Url = function(){
        if (this.source === 'imgur' && this.reference.hasMP4) {
            return '//i.imgur.com/' + this.reference.id + '.mp4';
        }
    };

    ImageBlock.prototype.url = function() {
        switch (this.source) {
            case 'local':
                return '/' + this.reference.id;
            case 'link':
                return this.reference.url;
            case 'imgur':
                return '//i.imgur.com/' + this.reference.id + '.' + this.reference.fileExtension;
            case 'flickr':
                return '//farm' + this.reference.flickrFarm + '.staticflickr.com/' + this.reference.flickrServer + '/' + this.reference.id + '_' + this.reference.flickrSecret + '.jpg'
            case 'embedly':
                return this.reference.url;
            case 'cloudinary':
                // TO-DO maybe use jpeg instead of png in certain situations
                return '//res.cloudinary.com/' + Meteor.settings['public'].CLOUDINARY_CLOUD_NAME + '/image/upload/c_limit,h_300,w_520/' + this.reference.id;
        }
    };

    ImageBlock.prototype.isFlickr = function() {
        return (this.source === 'flickr');
    }

    ImageBlock.prototype.webUrl = function() {
        switch (this.source) {
            case 'flickr':
                if(this.reference.ownerName){
                    return '//www.flickr.com/photos/' + this.reference.ownerName + '/' + this.reference.id;
                } else {
                    return encodeFlickrUrl(this.reference.id)
                }
        }
    }

    ImageBlock.prototype.ownerName = function() {
        switch (this.source) {
            case 'flickr':
                return this.reference.ownerName;
        }
    };

    ImageBlock.prototype.uploadDate = function() {
        switch (this.source) {
            case 'flickr':
                if(this.reference.uploadDate){
                    return this.reference.uploadDate.toDateString();
                }
        }
    };

    ImageBlock.prototype.previewUrl = function() {
        switch (this.source) {
            case 'local':
                return '/' + this.reference.id;
            case 'link':
                return this.reference.url;
            case 'imgur':
                if (this.reference.fileExtension === 'gif'){
                    return '//i.imgur.com/' + this.reference.id + 'l' + '.' + this.reference.fileExtension;
                } else {
                    return '//i.imgur.com/' + this.reference.id + '.' + this.reference.fileExtension;
                }
            case 'flickr':
                return '//farm' + this.reference.flickrFarm + '.staticflickr.com/' + this.reference.flickrServer + '/' + this.reference.id + '_' + this.reference.flickrSecret + '.jpg'
            case 'embedly':
                return this.reference.url;
            case 'cloudinary':
                return '//res.cloudinary.com/' + Meteor.settings['public'].CLOUDINARY_CLOUD_NAME + '/image/upload/c_limit,h_300,w_520/' + this.reference.id;
        }
    };

    ImageBlock.prototype.thumbnailUrl = function() {
        switch (this.source) {
            case 'local':
                return '/' + this.reference.id;
            case 'imgur':
                return '//i.imgur.com/' + this.reference.id + 't' + '.' + this.reference.fileExtension;
            case 'flickr':
                return '//farm' + this.reference.flickrFarm + '.staticflickr.com/' + this.reference.flickrServer + '/' + this.reference.id + '_' + this.reference.flickrSecret + '_t' + '.jpg';
            case 'embedly':
                return this.reference.thumbnailUrl;
            case 'cloudinary':
                // f_auto is slightly worse quality but less bandwidth
                return '//res.cloudinary.com/' + Meteor.settings['public'].CLOUDINARY_CLOUD_NAME + '/image/upload/f_auto,c_limit,h_150,w_260/' + this.reference.id;
        }
    };

    ImageBlock.prototype.anchorMenuSnippet = function() {
        return this.description || this.reference.title || this.reference.description || this.reference.id;
    };

    return ImageBlock;

})(ContextBlock);

GifBlock = (function(_super) {
    __extends(GifBlock, _super);

    function GifBlock(doc) {
        GifBlock.__super__.constructor.call(this, doc);
        this.type = 'gif';
    };


    GifBlock.prototype.isGiphy = function() {
        return (this.source === 'giphy');
    };

    GifBlock.prototype.showVideo = function() {
        return this.webMUrl() || this.mp4Url();
    };

    GifBlock.prototype.webMUrl = function() {
        if (this.source === 'cloudinary') {
            return '//res.cloudinary.com/' + Meteor.settings['public'].CLOUDINARY_CLOUD_NAME + '/image/upload/c_limit,h_300,w_520/' + this.reference.id + '.webm';
        }
    };

    GifBlock.prototype.mp4Url = function(){
        if (this.source === 'cloudinary') {
            return '//res.cloudinary.com/' + Meteor.settings['public'].CLOUDINARY_CLOUD_NAME + '/image/upload/c_limit,h_300,w_520/' + this.reference.id + '.mp4';
        }
    };

    GifBlock.prototype.url = function() {
        switch (this.source) {
            case 'giphy':
                return '//media4.giphy.com/media/' + this.reference.id + '/giphy.gif';
            case 'cloudinary':
                return '//res.cloudinary.com/' + Meteor.settings['public'].CLOUDINARY_CLOUD_NAME + '/image/upload/c_limit,h_300,w_520/' + this.reference.id;
        }
    };

    GifBlock.prototype.previewUrl = function() {
        switch (this.source) {
            case 'giphy':
                return '//media4.giphy.com/media/' + this.reference.id + '/giphy.gif';
            case 'cloudinary':
                return '//res.cloudinary.com/' + Meteor.settings['public'].CLOUDINARY_CLOUD_NAME + '/image/upload/c_limit,h_300,w_520/' + this.reference.id + '.jpg';
        }
    };

    GifBlock.prototype.thumbnailUrl = function() {
        switch (this.source) {
            case 'giphy':
                return '//media4.giphy.com/media/' + this.reference.id + '/200_d.gif';
            case 'cloudinary':
                // f_auto is slightly worse quality but less bandwidth
                return '//res.cloudinary.com/' + Meteor.settings['public'].CLOUDINARY_CLOUD_NAME + '/image/upload/f_auto,c_limit,h_150,w_260/' + this.reference.id;
        }
    };

    GifBlock.prototype.anchorMenuSnippet = function() {
        return this.description || this.reference.title || this.reference.description || this.reference.id;
    };

    return GifBlock;

})(ContextBlock);


VizBlock = (function(_super) {
    __extends(VizBlock, _super);

    function VizBlock(doc) {
        VizBlock.__super__.constructor.call(this, doc);
        this.type = 'viz';
    }

    VizBlock.prototype.url = function() {
        switch (this.source) {
            case 'oec':
                return '//atlas.media.mit.edu/en/explore/embed/tree_map/hs/' + this.reference.oecDirection + '/' + this.reference.oecCountry + '/all/show/' + this.reference.oecYear + '/?controls=false&lang=en'
        }
    };

    VizBlock.countries = [{"id": "ago", "name": "Angola"}, {"id": "bdi", "name": "Burundi"}, {"id": "ben", "name": "Benin"}, {"id": "bfa", "name": "Burkina Faso"}, {"id": "bwa", "name": "Botswana"}, {"id": "caf", "name": "Central African Republic"}, {"id": "civ", "name": "Cote d'Ivoire"}, {"id": "cmr", "name": "Cameroon"}, {"id": "cod", "name": "Democratic Republic of the Congo"}, {"id": "cog", "name": "Republic of the Congo"}, {"id": "com", "name": "Comoros"}, {"id": "cpv", "name": "Cape Verde"}, {"id": "dji", "name": "Djibouti"}, {"id": "dza", "name": "Algeria"}, {"id": "egy", "name": "Egypt"}, {"id": "eri", "name": "Eritrea"}, {"id": "esh", "name": "Western Sahara"}, {"id": "eth", "name": "Ethiopia"}, {"id": "gab", "name": "Gabon"}, {"id": "gha", "name": "Ghana"}, {"id": "gin", "name": "Guinea"}, {"id": "gmb", "name": "Gambia"}, {"id": "gnb", "name": "Guinea-Bissau"}, {"id": "gnq", "name": "Equatorial Guinea"}, {"id": "ken", "name": "Kenya"}, {"id": "lbr", "name": "Liberia"}, {"id": "lby", "name": "Libya"}, {"id": "lso", "name": "Lesotho"}, {"id": "mar", "name": "Morocco"}, {"id": "mdg", "name": "Madagascar"}, {"id": "mli", "name": "Mali"}, {"id": "moz", "name": "Mozambique"}, {"id": "mrt", "name": "Mauritania"}, {"id": "mus", "name": "Mauritius"}, {"id": "mwi", "name": "Malawi"}, {"id": "myt", "name": "Mayotte"}, {"id": "nam", "name": "Namibia"}, {"id": "ner", "name": "Niger"}, {"id": "nga", "name": "Nigeria"}, {"id": "reu", "name": "Reunion"}, {"id": "rwa", "name": "Rwanda"}, {"id": "sdn", "name": "Sudan"}, {"id": "sen", "name": "Senegal"}, {"id": "shn", "name": "Saint Helena"}, {"id": "sle", "name": "Sierra Leone"}, {"id": "som", "name": "Somalia"}, {"id": "ssd", "name": "South Sudan"}, {"id": "stp", "name": "Sao Tome and Principe"}, {"id": "swz", "name": "Swaziland"}, {"id": "syc", "name": "Seychelles"}, {"id": "tcd", "name": "Chad"}, {"id": "tgo", "name": "Togo"}, {"id": "tun", "name": "Tunisia"}, {"id": "tza", "name": "Tanzania"}, {"id": "uga", "name": "Uganda"}, {"id": "zaf", "name": "South Africa"}, {"id": "zmb", "name": "Zambia"}, {"id": "zwe", "name": "Zimbabwe"}, {"id": "ata", "name": "Antarctica"}, {"id": "atf", "name": "French South Antarctic Territory"}, {"id": "bvt", "name": "Bouvet Island"}, {"id": "hmd", "name": "Heard Island and McDonald Islands"}, {"id": "sgs", "name": "South Georgia South Sandwich Islands"}, {"id": "afg", "name": "Afghanistan"}, {"id": "are", "name": "United Arab Emirates"}, {"id": "arm", "name": "Armenia"}, {"id": "aze", "name": "Azerbaijan"}, {"id": "bgd", "name": "Bangladesh"}, {"id": "bhr", "name": "Bahrain"}, {"id": "brn", "name": "Brunei"}, {"id": "btn", "name": "Bhutan"}, {"id": "cck", "name": "Cocos (Keeling) Islands"}, {"id": "chn", "name": "China"}, {"id": "cxr", "name": "Christmas Island"}, {"id": "cyp", "name": "Cyprus"}, {"id": "geo", "name": "Georgia"}, {"id": "hkg", "name": "Hong Kong"}, {"id": "idn", "name": "Indonesia"}, {"id": "ind", "name": "India"}, {"id": "iot", "name": "British Indian Ocean Territory"}, {"id": "irn", "name": "Iran"}, {"id": "irq", "name": "Iraq"}, {"id": "isr", "name": "Israel"}, {"id": "jor", "name": "Jordan"}, {"id": "jpn", "name": "Japan"}, {"id": "kaz", "name": "Kazakhstan"}, {"id": "kgz", "name": "Kyrgyzstan"}, {"id": "khm", "name": "Cambodia"}, {"id": "kor", "name": "South Korea"}, {"id": "kwt", "name": "Kuwait"}, {"id": "lao", "name": "Laos"}, {"id": "lbn", "name": "Lebanon"}, {"id": "lka", "name": "Sri Lanka"}, {"id": "mac", "name": "Macau"}, {"id": "mdv", "name": "Maldives"}, {"id": "mid", "name": "Midway"}, {"id": "mmr", "name": "Burma"}, {"id": "mng", "name": "Mongolia"}, {"id": "mys", "name": "Malaysia"}, {"id": "npl", "name": "Nepal"}, {"id": "omn", "name": "Oman"}, {"id": "pak", "name": "Pakistan"}, {"id": "phl", "name": "Philippines"}, {"id": "prk", "name": "North Korea"}, {"id": "pse", "name": "Palestine"}, {"id": "qat", "name": "Qatar"}, {"id": "sau", "name": "Saudi Arabia"}, {"id": "sgp", "name": "Singapore"}, {"id": "syr", "name": "Syria"}, {"id": "tha", "name": "Thailand"}, {"id": "tjk", "name": "Tajikistan"}, {"id": "tkm", "name": "Turkmenistan"}, {"id": "tls", "name": "Timor-Leste"}, {"id": "tur", "name": "Turkey"}, {"id": "twn", "name": "Taiwan"}, {"id": "uzb", "name": "Uzbekistan"}, {"id": "vnm", "name": "Vietnam"}, {"id": "yar", "name": "Yemen Arab Republic"}, {"id": "yem", "name": "Yemen"}, {"id": "ymd", "name": "Democratic Yemen"}, {"id": "alb", "name": "Albania"}, {"id": "and", "name": "Andorra"}, {"id": "aut", "name": "Austria"}, {"id": "bel", "name": "Belgium"}, {"id": "bgr", "name": "Bulgaria"}, {"id": "bih", "name": "Bosnia and Herzegovina"}, {"id": "blr", "name": "Belarus"}, {"id": "blx", "name": "Belgium-Luxembourg"}, {"id": "che", "name": "Switzerland"}, {"id": "chi", "name": "Channel Islands"}, {"id": "csk", "name": "Czechoslovakia"}, {"id": "cze", "name": "Czech Republic"}, {"id": "ddr", "name": "Democratic Republic of Germany"}, {"id": "deu", "name": "Germany"}, {"id": "dnk", "name": "Denmark"}, {"id": "esp", "name": "Spain"}, {"id": "est", "name": "Estonia"}, {"id": "fdr", "name": "Federal Republic of Germany"}, {"id": "fin", "name": "Finland"}, {"id": "fra", "name": "France"}, {"id": "fro", "name": "Faroe Islands"}, {"id": "gbr", "name": "United Kingdom"}, {"id": "gib", "name": "Gibraltar"}, {"id": "grc", "name": "Greece"}, {"id": "hrv", "name": "Croatia"}, {"id": "hun", "name": "Hungary"}, {"id": "imn", "name": "Isle of Man"}, {"id": "irl", "name": "Ireland"}, {"id": "isl", "name": "Iceland"}, {"id": "ita", "name": "Italy"}, {"id": "ksv", "name": "Kosovo"}, {"id": "lie", "name": "Liechtenstein"}, {"id": "ltu", "name": "Lithuania"}, {"id": "lux", "name": "Luxembourg"}, {"id": "lva", "name": "Latvia"}, {"id": "mco", "name": "Monaco"}, {"id": "mda", "name": "Moldova"}, {"id": "mkd", "name": "Macedonia"}, {"id": "mlt", "name": "Malta"}, {"id": "mne", "name": "Montenegro"}, {"id": "nld", "name": "Netherlands"}, {"id": "nor", "name": "Norway"}, {"id": "pol", "name": "Poland"}, {"id": "prt", "name": "Portugal"}, {"id": "rou", "name": "Romania"}, {"id": "rus", "name": "Russia"}, {"id": "scg", "name": "Serbia and Montenegro"}, {"id": "sjm", "name": "Svalbard"}, {"id": "smr", "name": "San Marino"}, {"id": "srb", "name": "Serbia"}, {"id": "sun", "name": "USSR"}, {"id": "svk", "name": "Slovakia"}, {"id": "svn", "name": "Slovenia"}, {"id": "swe", "name": "Sweden"}, {"id": "ukr", "name": "Ukraine"}, {"id": "vat", "name": "Holy See (Vatican City)"}, {"id": "yug", "name": "Yugoslavia"}, {"id": "abw", "name": "Aruba"}, {"id": "aia", "name": "Anguilla"}, {"id": "ant", "name": "Netherlands Antilles"}, {"id": "atg", "name": "Antigua and Barbuda"}, {"id": "bes", "name": "Bonaire"}, {"id": "bhs", "name": "Bahamas"}, {"id": "blz", "name": "Belize"}, {"id": "bmu", "name": "Bermuda"}, {"id": "brb", "name": "Barbados"}, {"id": "can", "name": "Canada"}, {"id": "cri", "name": "Costa Rica"}, {"id": "cub", "name": "Cuba"}, {"id": "cuw", "name": "Cura\u00e7ao"}, {"id": "cym", "name": "Cayman Islands"}, {"id": "dma", "name": "Dominica"}, {"id": "dom", "name": "Dominican Republic"}, {"id": "grd", "name": "Grenada"}, {"id": "grl", "name": "Greenland"}, {"id": "gtm", "name": "Guatemala"}, {"id": "hnd", "name": "Honduras"}, {"id": "hti", "name": "Haiti"}, {"id": "jam", "name": "Jamaica"}, {"id": "kna", "name": "Saint Kitts and Nevis"}, {"id": "lca", "name": "Saint Lucia"}, {"id": "maf", "name": "Saint Maarten"}, {"id": "mex", "name": "Mexico"}, {"id": "msr", "name": "Montserrat"}, {"id": "mtq", "name": "Martinique"}, {"id": "naa", "name": "Netherland Antilles and Aruba"}, {"id": "nic", "name": "Nicaragua"}, {"id": "pan", "name": "Panama"}, {"id": "pci", "name": "Pacific Island (US)"}, {"id": "pcz", "name": "Panama Canal Zone"}, {"id": "pri", "name": "Puerto Rico"}, {"id": "slv", "name": "El Salvador"}, {"id": "spm", "name": "Saint Pierre and Miquelon"}, {"id": "tca", "name": "Turks and Caicos Islands"}, {"id": "tto", "name": "Trinidad and Tobago"}, {"id": "umi", "name": "United States Minor Outlying Islands"}, {"id": "usa", "name": "United States"}, {"id": "vct", "name": "Saint Vincent and the Grenadines"}, {"id": "vgb", "name": "British Virgin Islands"}, {"id": "vir", "name": "Virgin Islands"}, {"id": "asm", "name": "American Samoa"}, {"id": "aus", "name": "Australia"}, {"id": "cok", "name": "Cook Islands"}, {"id": "fji", "name": "Fiji"}, {"id": "fsm", "name": "Micronesia"}, {"id": "glp", "name": "Guadeloupe"}, {"id": "gum", "name": "Guam"}, {"id": "kir", "name": "Kiribati"}, {"id": "mhl", "name": "Marshall Islands"}, {"id": "mnp", "name": "Northern Mariana Islands"}, {"id": "ncl", "name": "New Caledonia"}, {"id": "nfk", "name": "Norfolk Island"}, {"id": "niu", "name": "Niue"}, {"id": "nru", "name": "Nauru"}, {"id": "nzl", "name": "New Zealand"}, {"id": "pcn", "name": "Pitcairn Islands"}, {"id": "plw", "name": "Palau"}, {"id": "png", "name": "Papua New Guinea"}, {"id": "pyf", "name": "French Polynesia"}, {"id": "slb", "name": "Solomon Islands"}, {"id": "tkl", "name": "Tokelau"}, {"id": "ton", "name": "Tonga"}, {"id": "tuv", "name": "Tuvalu"}, {"id": "vut", "name": "Vanuatu"}, {"id": "wlf", "name": "Wallis and Futuna"}, {"id": "wsm", "name": "Samoa"}, {"id": "arg", "name": "Argentina"}, {"id": "bol", "name": "Bolivia"}, {"id": "bra", "name": "Brazil"}, {"id": "chl", "name": "Chile"}, {"id": "col", "name": "Colombia"}, {"id": "ecu", "name": "Ecuador"}, {"id": "flk", "name": "Falkland Islands"}, {"id": "guf", "name": "French Guiana"}, {"id": "guy", "name": "Guyana"}, {"id": "per", "name": "Peru"}, {"id": "pry", "name": "Paraguay"}, {"id": "sur", "name": "Suriname"}, {"id": "ury", "name": "Uruguay"}, {"id": "ven", "name": "Venezuela"}, {"id": "wld", "name": "World"}, {"id": "xxa", "name": "Areas"}];

    VizBlock.prototype.oecCountryName = function() {
        switch (this.source) {
            case 'oec':
                if (this.reference.oecCountry) {
                    return _.findWhere(VizBlock.countries, {id: this.reference.oecCountry})['name'];
                }
        }
    };


    VizBlock.prototype.longSnippet = function() {
        switch (this.source) {
            case 'oec':
                return this.oecCountryName() + " " + this.reference.oecDirection + "s in " + this.reference.oecYear;
        }
    };

    VizBlock.prototype.anchorMenuSnippet = function() {
        switch (this.source) {
            case 'oec':
                return this.oecCountryName() + " (" + this.reference.oecYear + ")";
        }
    };

    return VizBlock;

})(ContextBlock);


MapBlock = (function(_super) {
    __extends(MapBlock, _super);

    function MapBlock(doc) {
        MapBlock.__super__.constructor.call(this, doc);
        this.type = 'map';
        if (this.source == null) {
            this.source = 'google_maps';
        }
    }

    MapBlock.prototype.longSnippet = function() {
        return this.reference.mapQuery;
    };

    MapBlock.prototype.anchorMenuSnippet = function() {
        return this.reference.mapQuery;
    };

    MapBlock.prototype.escape = function(value) {
        return encodeURIComponent(value).replace(/%20/g, "+");
    };

    MapBlock.prototype.url = function() {
        if (this.source === 'google_maps') {
            return 'https://www.google.com/maps/embed/v1/place?' + 'key=' + GOOGLE_API_CLIENT_KEY + '&q=' + this.escape(this.reference.mapQuery) + '&maptype=' + this.escape(this.reference.mapType);
        }
    };

    MapBlock.prototype.previewUrl = function() {
        if (this.source === 'google_maps') {
            return 'https://maps.googleapis.com/maps/api/staticmap?' + 'key=' + GOOGLE_API_CLIENT_KEY + '&center=' + this.escape(this.reference.mapQuery) + '&maptype=' + this.escape(this.reference.mapType) + '&size=' + '520x300';
        }
    };

    return MapBlock;

})(ContextBlock);

TextBlock = (function(_super) {
    __extends(TextBlock, _super);

    function TextBlock(doc) {
        TextBlock.__super__.constructor.call(this, doc);
        this.type = 'text';
        if (!this.source) {
            this.source = 'plaintext';
        }
    }

    TextBlock.prototype.longSnippet = function() {
        var maxLength;
        maxLength = 40;
        if (this.content.length <= maxLength) {
            return this.content;
        } else {
            return this.content.slice(0, maxLength) + '...';
        }
    };

    TextBlock.prototype.anchorMenuSnippet = function() {
        return this.content;
    };

    return TextBlock;

})(ContextBlock);

LinkBlock = (function(_super) {
    __extends(LinkBlock, _super);

    function LinkBlock(doc) {
        LinkBlock.__super__.constructor.call(this, doc);
        this.type = 'link';
    }

    LinkBlock.prototype.title = function() {
        return this.reference.title || this.reference.originalUrl;
    };

    LinkBlock.prototype.linkDescription = function() {
        return this.reference.description || '';
    };

    LinkBlock.prototype.thumbnailUrl = function() {
        return this.reference.thumbnailUrl || '//res.cloudinary.com/fold/image/upload/v1/static/LINK_SQUARE.svg';
    };

    LinkBlock.prototype.imageOnLeft = function() {
        return !this.reference.thumbnailUrl  || (this.reference.thumbnailWidth / this.reference.thumbnailHeight) <= 1.25;
    };

    LinkBlock.prototype.url = function() {
        return this.reference.url || this.reference.originalUrl;
    };

    LinkBlock.prototype.providerUrl = function() {
        return this.reference.providerUrl;
    };

    LinkBlock.prototype.providerTruncatedUrl= function() {
        return this.reference.providerUrl.replace(/(https?:\/\/)?(www\.)?/, "");
    };

    LinkBlock.prototype.anchorMenuSnippet = function() {
        return this.title();
    };
    return LinkBlock;

})(ContextBlock);

newTypeSpecificContextBlock =  function(doc) {
    switch (doc.type) {
        case 'video':
            return new VideoBlock(doc);
        case 'text':
            return new TextBlock(doc);
        case 'map':
            return new MapBlock(doc);
        case 'image':
            return new ImageBlock(doc);
        case 'gif':
            return new GifBlock(doc);
        case 'audio':
            return new AudioBlock(doc);
        case 'viz':
            return new VizBlock(doc);
        case 'twitter':
            return new TwitterBlock(doc);
        case 'link':
            return new LinkBlock(doc);
        default:
            return new ContextBlock(doc);
    }
};
