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
      content: 'I built my first web site in high school and have carried a passion for web development ' +
        'ever since.  There is not a day that goes by that I am not writing code or planning out a new project.' +
        '  You can find me hanging out with my family, taking in a nice day watching football, or knocking ' +
        ' around golf balls when I\'m not spending quality time with my laptop and favorite text-editor .'
    },
    {
      heading: 'What I Can Do',
      content: 'My tech tool bag consists of HTML, CSS, and JavaScrtip.  I use several frameworks and libraries ' +
        ' such as Bootstrap, jQuery, and Knockout JS.  I design test suites with Jasmine.  Some other ' +
        'technologies I take advantage of are Git for version control and Adobe products like' +
        'Photoshop and Illustrator.  As I grow as a developer, I will be adding more tools to my tool bag.'
    },
    {
      heading: 'Check Out My Blog',
      content: 'Want to know my thoughts on all things web development and programming?  Maybe you want ' +
      'some insight on whatever I\'m thinking about that day or an in depth analysis of my favorite sports teams. ' +
      'Check out my new blog for all that and more!',
      link: '#'
    },
    {
      heading: 'How To Get Up With Me',
      content: ''
    },
  ]);

  self.prevWork = [
    {
      name: "Neighborhood Map",
      url: "https://github.com/ba-batten/NeighborhoodMap",
      smallPic: "images/neighborhood-map-370.jpeg",
      medPic: "images/neighborhood-map-640.jpeg",
      largePic: "images/neighborhood-map.jpeg",
      description: "A single-page web application, built using the Knockout framework," +
        " that displays a Google Map of an area and various points of interest. Users can" +
        " search all included landmarks and, when selected, additional information about" +
        " a landmark is presented from the FourSquare API.",
      id: "#neighborhoodMapModal",
      xHashId: "neighborhoodMapModal",
      label: "neighborhoodMapModalLabel"
    },
    {
      name: "Arcade Clone",
      url: "https://github.com/ba-batten/ClassicArcadeGameClone",
      smallPic: "images/frogger-clone_370.jpeg",
      medPic: "images/frogger-clone_640.jpeg",
      largePic: "images/frogger-clone.jpeg",
      description: "An HTML5 Canvas powered video game, developed using the best practices" +
        " in Object Oriented JavaScript.",
      id: "#arcadeCloneModal",
      xHashId: "arcadeCloneModal",
      label: "arcadeCloneModalLabel"
    },
    {
      name: "Website Optimization",
      url: "https://github.com/ba-batten/WebsiteOptimization",
      smallPic: "images/pizzeria-370.jpeg",
      medPic: "images/pizzeria-640.jpeg",
      largePic: "images/pizzeria.jpeg",
      description: "Optimized an inefficient web application's JavaScript, CSS and" +
        " assets delivery, ensuring it runs at 60fps and achieves a PageSpeed score" +
        " of at least 90.",
      id: "#websiteOptimizationModal",
      xHashId: "websiteOptimizationModal",
      label: "websiteOptimizationModalLabel"
    },
    {
      name: "Feed Reader Testing",
      url: "https://github.com/ba-batten/FeedReaderTesting",
      smallPic: "images/feed-reader-370.jpeg",
      medPic: "images/feed-reader-640.jpeg",
      largePic: "images/feed-reader.jpeg",
      description: "Wrote comprehensive unit tests, using the Jasmine testing" +
        " framework, for an RSS Feed Reader application that uses Google's RSS API.",
      id: "#feedReaderModal",
      xHashId: "feedReaderModal",
      label: "feedReaderModalLabel"
    }
  ];
};

var model = new AppViewModel();

ko.applyBindings(model);
