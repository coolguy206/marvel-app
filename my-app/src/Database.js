import PouchDB from 'pouchdb';
var dbComics = new PouchDB('marvel-comics');
var dbCharacters = new PouchDB('marvel-characters');
var dbEvents = new PouchDB('marvel-events');
var dbSeries = new PouchDB('marvel-series');
var dbCreators = new PouchDB('marvel-creators');
var dbStories = new PouchDB('marvel-stories');
export default {comics: dbComics, characters: dbCharacters, events: dbEvents, series: dbSeries, creators: dbCreators, stories: dbStories};
