import { Meteor } from 'meteor/meteor';

import { Mixes } from './mixes';

Meteor.methods({
  addMix: function(mix) {
    return Mixes.insert(mix);
  },

  deleteMix: function(mixId) {
    const mix = Mixes.findOne(mixId);

    if (!mix) throw new Meteor.error('no mix found', 'No mix found');
    
    if (this.userId === null || mix.creator !== this.userId) throw new Meteor.Error('not mix creator', 'Only a Mix creator can Delete their Mix');

    return Mixes.remove({_id: mix._id});
  },

  saveMix: function(mix) {
    const dbMix = Mixes.findOne(mix._id);

    if (!dbMix) throw new Meteor.error('no mix found', 'No mix found');
    
    if (dbMix.creator !== this.userId) throw new Meteor.Error('not mix creator', 'Only a Mix creator can Save their Mix');

    return Mixes.update({_id: dbMix._id}, mix);
  },

  updateMixName: function(mixId, name) {
    const dbMix = Mixes.findOne(mixId);

    if (!dbMix) throw new Meteor.error('no mix found', 'No mix found');
    
    if (dbMix.creator !== this.userId) throw new Meteor.Error('not mix creator', 'Only a Mix creator can Save their Mix');

    if (name !== dbMix.name) {
      return Mixes.update({_id: dbMix._id}, {
        $set: {name: name}
      });
    }
  }
});