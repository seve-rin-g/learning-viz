// Seed course catalog, grouped by purpose. Edit freely: item ids are what progress is keyed on.
// Sources: CU Boulder MS-CS Coursera pages and learn.derivative.ca curriculum pages.
// NOTE: items marked with a trailing "(verify)" in README were assembled from partial listings.
(function (root) {
  const week = (id, n, title, hours) => ({ id: `${id}-w${n}`, group: `Week ${n}`, title, hours });
  const td = (id, group, titles) =>
    titles.map((t, i) => ({ id: `${id}-${group.slice(0, 3)}-${i + 1}`, group, title: t }));

  const COURSES = [
    {
      id: 'csca5622', purpose: 'MS in CS-AI', code: 'CSCA 5622',
      title: 'Introduction to Machine Learning: Supervised Learning',
      items: [
        week('csca5622', 1, 'Introduction to Supervised Learning & Linear Regression Basics'),
        week('csca5622', 2, 'Linear Regression for Prediction & Inference'),
        week('csca5622', 3, 'Classification – Logistic Regression, Discriminant Analysis, & K-Nearest Neighbors'),
        week('csca5622', 4, 'Resampling (Cross-Validation, Bootstrap) & Regularization (Ridge, Lasso)'),
        week('csca5622', 5, 'Decision Trees & Ensemble Methods (Bagging, Random Forests, Boosting)'),
      ],
    },
    {
      id: 'csca5632', purpose: 'MS in CS-AI', code: 'CSCA 5632',
      title: 'Unsupervised Algorithms in Machine Learning',
      items: [
        week('csca5632', 1, 'Unsupervised Learning Basics & Exploratory Data Analysis'),
        week('csca5632', 2, 'Principal Component Analysis (PCA)'),
        week('csca5632', 3, 'K-Means Clustering'),
        week('csca5632', 4, 'Hierarchical Clustering'),
        week('csca5632', 5, 'Matrix Completion, Missing Values, and Recommender Systems'),
      ],
    },
    {
      id: 'csca5642', purpose: 'MS in CS-AI', code: 'CSCA 5642',
      title: 'Introduction to Deep Learning',
      items: [
        week('csca5642', 1, 'Neural Network Foundations'),
        week('csca5642', 2, 'Training and Regularizing Neural Networks'),
        week('csca5642', 3, 'Convolutional Neural Networks for Image Recognition'),
        week('csca5642', 4, 'Sequence Modeling – RNNs, LSTMs, and the Attention Mechanism'),
        week('csca5642', 5, 'Transformers, Vision Transformers, and CLIP'),
      ],
    },
    {
      id: 'td100', purpose: 'TouchDesigner Curriculum', code: '100 Series',
      title: 'TouchDesigner Fundamentals (The 100 Series)',
      items: [].concat(
        td('td100', '101 – Navigating the Environment', [
          'The User Interface', 'Using the OP Create Dialog', 'Reading Network Anatomy',
          'Reading Operator Anatomy', 'Operator Wires, References & Links', 'Working with TOPs',
          'Working with CHOPs', 'Working with DATs', 'Working with SOPs', 'Working with COMPs']),
        td('td100', '102 – TOPs: Working with Images', [
          'Working with Image Files', 'Working with Video Files', 'Adjusting Images', 'Shapes & Colors',
          'Basic Compositing', 'Mattes & Masks', 'Building Patterns', 'Routing Your Content',
          'Creating a Bloom Effect', 'Creating a Feedback Effect', 'Live Sources', 'Saving Images & Video']),
        td('td100', '103 – CHOPs: Working With Signals', [
          'Controlling OPs with CHOPs', 'Working with Single Sample CHOPs', 'Creating Patterns with CHOPs',
          'Working with Multi-Sample CHOPs', 'CHOP Math', 'Signal Routing', 'Time & Events',
          'CHOP History', 'Manipulating Audio', 'Input Signals & Simulation', 'The Kinect CHOP']),
        td('td100', '104 – SOPs: Rendering 3D Scenes', [
          '3D Generators', 'Essential Procedural Modeling', 'Animating with the Noise SOP',
          'Basic Render Setup', '3D Geometry COMP Features', 'Working with Cameras', 'Lights & Shadows',
          'Texturing Geometry with MATs', 'Physically Based Rendering']),
        td('td100', '105 – COMPs: Organization & Outputs', [
          'Outputting Content to Displays', 'Panel Layout & Organization',
          'Organizing Operators & Networks', 'Paths of Operators & Networks']),
        td('td100', '106 – COMPs: Interface Building & Controls', [
          'Relationships between Parameters', 'Simple Panel Interactions', 'Working with Custom Parameters',
          'Fast UIs with the Parameter COMP', 'Palette Widgets']),
        td('td100', '107 – DATs: Scripting & Python', [
          'Text & Tables', 'Parsing JSON', 'Python Expressions & Scripting (remaining topics)']),
        td('td100', '108 – Resources, Tips & Tricks', ['Resources, Tips & Tricks'])),
    },
    {
      id: 'td200', purpose: 'TouchDesigner Curriculum', code: '200 Series',
      title: 'TouchDesigner Intermediate (The 200 Series)',
      items: [].concat(
        td('td200', '201 – Converting Data Types & Instancing', [
          'Moving Between OP Families', 'Converting to TOPs & CHOPs', 'Converting to DATs & SOPs',
          'Basics of Instancing', 'Instancing with TOPs', 'Instancing with CHOPs', 'Instancing with DATs']),
        td('td200', '202 – TOPs & Intermediate Image Manipulation', [
          'Working with the Noise TOP', 'Image Displacement Techniques', 'Channel Shifting RGB Effects',
          'Using the Texture 3D TOP', 'Slit Scan using the Time Machine TOP',
          'Working with the OpenColorIO TOP', 'Working with Render Passes']),
        td('td200', '203 – CHOPs & Intermediate Signal Manipulation', [
          'Using the Shuffle CHOP', 'Working with Time in Interactive Systems',
          'Sequencing Events with the Timer CHOP', 'State Switching with CHOPs',
          'Logic in Interactive Systems', 'Working with Data Sets using CHOPs',
          'Working with Discrete Data Events', 'Recording Your Data']),
        td('td200', '204+ – Rendering, Replicators, Python & Extensions', [
          'Orthographic & Perspective Render Setups', 'Render Picking in 3D Scenes',
          'Manipulating Lighting in 3D Scenes', 'Replicators & Callbacks',
          'Python Variables in TouchDesigner', 'Working with Data in Tables',
          'Simple Extensions'])),
    },
  ];

  if (typeof module !== 'undefined' && module.exports) module.exports = COURSES;
  else root.COURSES = COURSES;
})(typeof self !== 'undefined' ? self : this);
