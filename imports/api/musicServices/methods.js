import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
  Meteor.methods({
    searchApple: function(term) {
      this.unblock();
      var results = Meteor.http.call('GET', 'https://itunes.apple.com/search?media=music&limit=50&country=US&term=' + term);

      if (results.data.resultCount > 0) {
        return results.data.results.map(result => {
          return {
            trackName: result.trackName,
            artistName: result.artistName,
            albumName: result.collectionName,
            duration: result.trackTimeMillis,
            explicit: (result.trackExplicitness.toLowerCase() === 'explicit'),
            releaseDate: result.releaseDate,
            streamable: result.isStreamable,
            applePreviewUrl: result.previewUrl,
            appleArtistId: result.artistId,
            appleAlbumId: result.collectionId,
            appleTrackId: result.trackId
          };
        });
      }

      return [];
    },
  readMailgunSettings:function(){
      this.unblock();
      return Assets.getText('settings.json');
  }
  });
}