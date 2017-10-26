$(document).ready(
  function AppViewModel() {
    var self = this;

    self.aboutMe = ko.observableArray([
      {
        heading: 'What I Can Do',
        content: ''
      },
      {
        heading: 'Who I Am',
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
);

var model = new AppViewModel();

ko.applyBindings(model);
