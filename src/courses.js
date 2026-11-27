// Seed course catalog, grouped by purpose. Edit freely: item ids are what progress is keyed on.
// Sources: CU Boulder MS-CS Coursera pages, IBM Coursera professional certificate pages,
// and learn.derivative.ca curriculum pages.
// NOTE: items marked with a trailing "(verify)" in README were assembled from partial listings.
(function (root) {
  const week = (id, n, title, hours) => ({ id: `${id}-w${n}`, group: `Week ${n}`, title, hours });
  const td = (id, group, titles) => {
    const groupId = group
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return titles.map((t, i) => ({ id: `${id}-${groupId}-${i + 1}`, group, title: t }));
  };

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
    {
      id: 'ibm-swe', purpose: 'Backend Certification', code: 'Course 1',
      title: 'Introduction to Software Engineering',
      items: [].concat(
        td('ibm-swe', 'Module 1 – Software Engineering Overview', [
          'Software Engineering and the SDLC', 'Software Requirements',
          'Requirements Specification Documents']),
        td('ibm-swe', 'Module 2 – Software Development and Testing', [
          'Programming Fundamentals', 'Application Development Tools',
          'Software Testing and Quality Assurance']),
        td('ibm-swe', 'Module 3 – Software Architecture', [
          'Software Architecture and Design', 'Object-Oriented Analysis and Design',
          'Architectural Patterns']),
        td('ibm-swe', 'Module 4 – Software Engineering Careers', [
          'Software Engineer Roles', 'Career Paths and the Job Search'])),
    },
    {
      id: 'ibm-linux', purpose: 'Backend Certification', code: 'Course 2',
      title: 'Hands-on Introduction to Linux Commands and Shell Scripting',
      items: [].concat(
        td('ibm-linux', 'Module 1 – Linux Basics', [
          'Linux Distributions and Architecture', 'The Terminal and Navigation',
          'Text Editors and Package Management']),
        td('ibm-linux', 'Module 2 – Linux Commands', [
          'Informational and Navigation Commands', 'File Management and File Viewing',
          'Networking, Archiving, and Compression']),
        td('ibm-linux', 'Module 3 – Shell Scripting', [
          'Shell Scripts and the Shebang', 'Pipes and Filters',
          'Variables, Bash Scripting, and Cron Jobs'])),
    },
    {
      id: 'ibm-git', purpose: 'Backend Certification', code: 'Course 3',
      title: 'Getting Started with Git and GitHub',
      items: [].concat(
        td('ibm-git', 'Module 1 – Git and GitHub Fundamentals', [
          'Version Control, Git, and GitHub', 'GitHub Repositories and Commits']),
        td('ibm-git', 'Module 2 – Git Workflows', [
          'Branches and Repositories', 'Cloning, Forking, and Merging']),
        td('ibm-git', 'Module 3 – GitHub Projects', [
          'Create and Share an Open-Source Project']),
        td('ibm-git', 'Module 4 – GitHub for Social Coding', [
          'Pull Requests and Collaboration'])),
    },
    {
      id: 'ibm-python', purpose: 'Backend Certification', code: 'Course 4',
      title: 'Python for Data Science, AI & Development',
      items: [].concat(
        td('ibm-python', 'Module 1 – Python Basics', [
          'Python and Jupyter Notebooks', 'Data Types and Variables', 'Expressions and Strings']),
        td('ibm-python', 'Module 2 – Python Data Structures', [
          'Lists and Tuples', 'Dictionaries and Sets']),
        td('ibm-python', 'Module 3 – Python Programming Fundamentals', [
          'Conditions and Branching', 'Loops and Functions', 'Objects and Classes']),
        td('ibm-python', 'Module 4 – Working with Data in Python', [
          'Pandas and NumPy', 'Reading and Writing Files',
          'APIs and Web Scraping with Beautiful Soup']),
        td('ibm-python', 'Module 5 – Final Project', [
          'Develop and Test Python Code'])),
    },
    {
      id: 'ibm-flask', purpose: 'Backend Certification', code: 'Course 5',
      title: 'Developing AI Applications with Python and Flask',
      items: [].concat(
        td('ibm-flask', 'Module 1 – Python Coding Practices and Packaging', [
          'Static Code Analysis', 'Unit Testing', 'Python Packaging']),
        td('ibm-flask', 'Module 2 – Web App Deployment using Flask', [
          'Flask Applications and Routing', 'Request and Response Handling',
          'REST APIs and CRUD Operations', 'Deploy a Flask Application']),
        td('ibm-flask', 'Module 3 – Creating AI Applications', [
          'IBM Watson AI Libraries', 'Sentiment Analysis Project',
          'Deploy an AI Application with Flask'])),
    },
    {
      id: 'ibm-django', purpose: 'Backend Certification', code: 'Course 6',
      title: 'Django Application Development with SQL and Databases',
      items: [].concat(
        td('ibm-django', 'Module 1 – Introduction to Databases', [
          'Database Concepts', 'Relational Data Modeling', 'Basic SQL Queries']),
        td('ibm-django', 'Module 2 – ORM and Django Models', [
          'Object-Relational Mapping', 'Django Models and CRUD Operations']),
        td('ibm-django', 'Module 3 – Django Views and Templates', [
          'Django MVT Pattern', 'Django Views and Templates', 'Django Admin']),
        td('ibm-django', 'Module 4 – Django Forms and CRUD', [
          'Forms and User Input', 'CRUD Web Application']),
        td('ibm-django', 'Module 5 – Bootstrap and Deployment', [
          'Bootstrap Integration', 'Deploy a Django Application'])),
    },
    {
      id: 'ibm-containers', purpose: 'Backend Certification', code: 'Course 7',
      title: 'Introduction to Containers w/ Docker, Kubernetes & OpenShift',
      items: [].concat(
        td('ibm-containers', 'Module 1 – Containers and Docker', [
          'Docker Architecture', 'Dockerfiles and Container Images',
          'Docker Networking, Storage, and Volumes']),
        td('ibm-containers', 'Module 2 – Kubernetes Basics', [
          'Kubernetes Architecture', 'kubectl and Kubernetes Objects',
          'Pods and Deployments']),
        td('ibm-containers', 'Module 3 – Kubernetes Workloads', [
          'ReplicaSets and Autoscaling', 'Rolling Updates',
          'ConfigMaps, Secrets, and Service Bindings']),
        td('ibm-containers', 'Module 4 – OpenShift and Istio', [
          'OpenShift Architecture and Builds', 'Operators',
          'Istio Service Mesh'])),
    },
    {
      id: 'ibm-microservices', purpose: 'Backend Certification', code: 'Course 8',
      title: 'Application Development using Microservices and Serverless',
      items: [].concat(
        td('ibm-microservices', 'Module 1 – Microservices', [
          'Microservice Design and Best Practices', 'Microservice Anti-Patterns']),
        td('ibm-microservices', 'Module 2 – REST APIs', [
          'REST Architecture', 'Flask REST APIs', 'Swagger, cURL, and Postman',
          'API Gateways']),
        td('ibm-microservices', 'Module 3 – Serverless Computing', [
          'Serverless Architecture', 'Function-as-a-Service',
          'Serverless Framework and Platforms']),
        td('ibm-microservices', 'Module 4 – IBM Cloud Code Engine', [
          'Build and Deploy Applications', 'Dockerfiles and Container Deployment']),
        td('ibm-microservices', 'Module 5 – Service Mesh and OpenShift', [
          'Service Mesh Concepts', 'Microservices on OpenShift']),
        td('ibm-microservices', 'Module 6 – Microservices Project', [
          'Create and Deploy a Microservices Application'])),
    },
    {
      id: 'ibm-security', purpose: 'Backend Certification', code: 'Course 9',
      title: 'Application Security and Monitoring',
      items: [].concat(
        td('ibm-security', 'Module 1 – Security in the SDLC', [
          'DevSecOps', 'Authentication and Encryption',
          'Threat Modeling and Vulnerability Scanning']),
        td('ibm-security', 'Module 2 – Secure Testing and Code Review', [
          'Static and Dynamic Analysis', 'Vulnerability and Component Analysis',
          'Runtime Protection']),
        td('ibm-security', 'Module 3 – OWASP and Common Vulnerabilities', [
          'OWASP Top 10', 'SQL Injection and Cross-Site Scripting',
          'Secrets, Data Integrity, and Dependency Security']),
        td('ibm-security', 'Module 4 – Application Monitoring', [
          'Golden Signals', 'Prometheus and Grafana',
          'Logging, Alerts, and Troubleshooting'])),
    },
    {
      id: 'ibm-capstone', purpose: 'Backend Certification', code: 'Course 10',
      title: 'Back-end Application Development Capstone Project',
      items: [].concat(
        td('ibm-capstone', 'Module 1 – Flask Services', [
          'Create a Flask Application', 'Routing and Error Handling',
          'External API Calls']),
        td('ibm-capstone', 'Module 2 – NoSQL and MongoDB', [
          'MongoDB Basics and Shell Commands', 'MongoDB with Flask',
          'Build a Songs Microservice']),
        td('ibm-capstone', 'Module 3 – Django Application', [
          'Create a Django Data Model', 'Django Migrations',
          'Connect Django to Microservices']),
        td('ibm-capstone', 'Module 4 – Cloud Deployment', [
          'Deploy with IBM Cloud Code Engine', 'Deploy with OpenShift',
          'Deploy with Kubernetes']),
        td('ibm-capstone', 'Module 5 – Final Integration', [
          'Integrate and Test Microservices', 'Submit the Capstone Project'])),
    },
  ];

  if (typeof module !== 'undefined' && module.exports) module.exports = COURSES;
  else root.COURSES = COURSES;
})(typeof self !== 'undefined' ? self : this);
