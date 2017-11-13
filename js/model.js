function AppViewModel() {
  var self = this;

  self.intro = ko.observable(
    {
      heading: 'Hi, I\'m Brandon and I build websites.',
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
        '  You can find me hanging out with my family, taking in a football game, or knocking ' +
        ' around some golf balls when I\'m not spending quality time with my laptop and favorite text-editor .',
      link: '',
      linkDesc: ''
    },
    {
      heading: 'What I Can Do',
      content: 'My tech tool bag consists of HTML, CSS, and JavaScript.  I use several frameworks and libraries ' +
        ' such as Bootstrap, jQuery, and Knockout JS.  I design test suites with Jasmine.  Some other ' +
        'technologies I take advantage of are Git for version control and Adobe products like Photoshop and Illustrator ' +
        'for when I need to edit or create an image.',
      link: '',
      linkDesc: ''
    },
    {
      heading: 'Check Out My Blog',
      content: 'Want to know my thoughts on all things web development and programming?  Maybe you want ' +
      'some insight on whatever I\'m thinking about that day or an in depth analysis of my favorite sports teams. ' +
      'Check out my new blog for all that and more!',
      link: 'https://frontendwebninja.blogspot.com/',
      linkDesc: 'Blog'
    }
  ]);

  self.prevWork = [
    {
      name: "Neighborhood Map",
      url: "https://github.com/ba-batten/NeighborhoodMap",
      pic: "images/neighborhood-map-square.jpeg",
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
      pic: "images/frogger-clone-square.jpeg",
      description: "An HTML5 Canvas powered video game, developed using the best practices" +
        " in Object Oriented JavaScript.",
      id: "#arcadeCloneModal",
      xHashId: "arcadeCloneModal",
      label: "arcadeCloneModalLabel"
    },
    {
      name: "Wikipedia Viewer",
      url: "https://codepen.io/brandonbatten/pen/jGegZY",
      pic: "images/wiki-viewer-square.jpeg",
      description: "Takes search term to make AJAX call to Wikipedia API to search for" +
        " Wikipedia articles",
      id: "#wikipediaViewerModal",
      xHashId: "wikipediaViewerModal",
      label: "wikipediaViewerModalLabel"
    },
    {
      name: "Weather Widget",
      url: "https://codepen.io/brandonbatten/pen/eGXEEB",
      pic: "images/weather-square.jpeg",
      description: "Weather widget that makes AJAX calls to get the current location," +
        " and weather conditions to display along with the date and time.",
      id: "#weatherWidgetModal",
      xHashId: "weatherWidgetModal",
      label: "weatherWidgetModalLabel"
    },
    {
      name: "Quote Machine",
      url: "https://codepen.io/brandonbatten/pen/oGqJGE",
      pic: "images/quote-machine-square.jpeg",
      description: "Randomly displays quotes from the popular TV show \"The Office\"." +
        " User is able to tweet quotes.",
      id: "#quoteMachineModal",
      xHashId: "quoteMachineModal",
      label: "quoteMachineModalLabel"
    },
    {
      name: "Website Optimization",
      url: "https://github.com/ba-batten/WebsiteOptimization",
      pic: "images/pizzeria-square.jpeg",
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
      pic: "images/feed-reader-square.jpeg",
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
