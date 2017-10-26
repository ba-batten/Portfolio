function AppViewModel() {
  var self = this;

  self.intro = ko.observable(
    {
      heading: 'Hi, I\'m Brandon and I am a Front-End developer.',
      content: 'My passion is creating beautiful web pages from scratch with elegant code. ' +
        'Take a look around and get to know a little bit about me and the work I do.  ' +
        'Hopefully we can work together on something amazing.'
    }
  );

  self.aboutMe = ko.observableArray([
    {
      heading: 'Who I Am',
      content: ''
    },
    {
      heading: 'What I Can Do',
      content: ''
    },
    {
      heading: 'Check Out My Blog',
      content: ''
    },
    {
      heading: 'How To Get Up With Me',
      content: ''
    },
  ]);
};

var model = new AppViewModel();

ko.applyBindings(model);
