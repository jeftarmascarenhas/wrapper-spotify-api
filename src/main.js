export const search = (query, type) => {
  fetch(`https://api.spotify.com/v1/search?query=${query}&type=${type}`).then(data => data.json());
};
export const searchAlbums = () => {};
export const searchTracks = () => {};
export const searchPlayLists = () => {};
export const searchArtist = () => {};
