/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import {
  search, searchAlbums, searchTracks, searchPlayLists, searchArtists,
} from '../src/main';

global.fetch = require('node-fetch');

chai.use(sinonChai);

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    fetchedStub.resolves({ json: () => {} });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    // search generico = +1 de um tipo
    // search albums
    // search Tracks
    // search PlayLists

    it('should exist the search method', () => {
      expect(search).to.exist;
    });
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    it('should exist the searchPlayLists method', () => {
      expect(searchPlayLists).to.exist;
    });
  });

  describe('Generic search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct URL to fetch', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?query=Incubus&type=artist',
        );

        const albums = search('Incubus', 'album');

        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?query=Incubus&type=album',
        );
      });
      context('passing more than one type', () => {
        const artistAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?query=Incubus&type=artist,album',
        );
      });
      it('should return the JSON Data from the Promise', () => {
        promise.resolves({ body: 'json' });
        const artists = search('Incubus', 'artist');
        expect(artists.resolveValue).to.be.eql({ body: 'json' }); // É um equal só que Deep in
      });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?query=Incubus&type=artist',
      );
      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?query=Muse&type=artist',
      );
    });
  });
  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const artists = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?query=Incubus&type=album',
      );
      const artists2 = searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?query=Muse&type=album',
      );
    });
  });
  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const artists = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?query=Incubus&type=tracks',
      );
      const artists2 = searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?query=Muse&type=tracks',
      );
    });
  });
  describe('searchPlayLists', () => {
    it('should call fetch functon', () => {
      const artists = searchPlayLists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the URL', () => {
      const artists = searchPlayLists('Incubus');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?query=Incubus&type=playlist',
      );
      const artists2 = searchPlayLists('Muse');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?query=Muse&type=playlist',
      );
    });
  });
});
