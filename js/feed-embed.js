var feed = new Instafeed({
  get: 'user',
  userId: '2048414042',
  clientId: '6d1d890fd38e403dac716652aecb57eb',
  accessToken: '2048414042.6d1d890.fd778857b2d0460299c3d55c49cc9d01',
  resolution: 'standard_resolution',
  template: '<a href="{{link}}" target="_blank" rel="noopener noreferrer" id="{{id}}"><img src="{{image}}" /></a>',
  sortBy: 'most-recent',
  filter: function(image) {
    return image.tags.indexOf('nature') >= 0;
  },
  limit: 6,
  links: true
});
feed.run();
