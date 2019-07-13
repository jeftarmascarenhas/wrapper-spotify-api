export const search = (query, type) => fetch(`https://api.spotify.com/v1/search?query=${query}&type=${type}`, {
  headers: {
    Authorization:
        'Bearer BQDjoy_qymZ7DTWmMiGQWGUbwYsMJj3cfjJxKzrVqv3GV7EwtypmwpZYJrgX95FdQetQUk8Qb1XehRE-4XRoLRMfR-XwoNiVXeVr63kQXwmN7UDKBUbUiC1D-_HCGBryoXgUwNs7HlGWubrCcJxv9_qdi87FT54',
  },
}).then(data => data.json());
export const searchArtists = query => search(query, 'artist');
export const searchAlbums = query => search(query, 'album');
export const searchTracks = query => search(query, 'tracks');
export const searchPlayLists = query => search(query, 'playlist');
