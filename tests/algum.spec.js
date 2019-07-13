/* eslint-disable no-unused-vars */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { getAlbum, getAlbumTrack } from '../src/algum';

chai.use(sinonChai);

// API of Album
// getAlbum
// getAlbumTracks

global.fetch = require('node-fetch');

describe('Album', () => {
  let fetchedStub;
  let promise;
  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.resolves({ json: () => ({ album: 'name' }) });
  });
  afterEach(() => {
    fetchedStub.restore();
  });
  describe('Smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });
    it('should have getAlbumTrack method', () => {
      expect(getAlbumTrack).to.exist;
    });
  });
  describe('getAlbum', () => {
    // verificar se o fetch ocorre
    it('should call fetch function', () => {
      const album = getAlbum();
      expect(fetchedStub).to.have.been.calledOnce;
    });
    // verificar se o fetch ocorre com a url desejada
    it('should call fetch with correct url', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy',
      );
      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      expect(fetchedStub).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk',
      );
    });
    // verifica se o dado é recebido pela Promise
    it('should return the correct data from Promise', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name' });
      });
    });
  });
});
