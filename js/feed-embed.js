---
---

var rejects           = ['1442796174989608823_2048414042', '1440206917909479033_2048414042'];
var total             = 0;
var total_to_display  = 6;

var feed = new Instafeed({
  get: 'user',
  userId: '2048414042',
  clientId: '{{ site.instagram_id }}',
  accessToken: '{{ site.instagram_key }}',
  resolution: 'standard_resolution',
  template: '<a href="{{link}}" target="_blank" rel="noopener noreferrer" id="{{id}}"><img src="{{image}}" /></a>',
  sortBy: 'most-recent',
  limit: 12,
  links: true,
  success: function() {
    total = 0;
  },
  filter: function(image) {
    if (rejects.indexOf(image.id) == -1 && total < total_to_display) {
      total = total + 1;
      return true;
    }
    return false;
  }
});
feed.run();
