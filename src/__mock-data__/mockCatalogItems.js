import * as React from 'react';

const description = (
  <div key="description">
    <h2 key="desc-1">Lorem ipsum</h2>
    Praesent sagittis est et arcu fringilla placerat. Cras erat ante, dapibus
    non mauris ac, volutpat sollicitudin ligula. Morbi gravida nisl vel risus
    tempor, sit amet luctus erat tempus. Curabitur blandit sem non pretium
    bibendum. Donec eleifend non turpis vitae vestibulum. Vestibulum ut sem ac
    nunc posuere blandit sed porta lorem. Cras rutrum velit vel leo iaculis
    imperdiet.
    <h2 key="desc-2">Dolor sit amet</h2>
    Donec consequat dignissim neque, sed suscipit quam egestas in. Fusce
    bibendum laoreet lectus commodo interdum. Vestibulum odio ipsum, tristique
    et ante vel, iaculis placerat nulla. Suspendisse iaculis urna feugiat lorem
    semper, ut iaculis risus tempus.
    <h2 key="desc-3">Consectetur</h2>
    Curabitur nisl quam, interdum a venenatis a, consequat a ligula. Nunc nec
    lorem in erat rhoncus lacinia at ac orci. Sed nec augue congue, vehicula
    justo quis, venenatis turpis. Nunc quis consectetur purus. Nam vitae viverra
    lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
    eu augue felis. Maecenas in dignissim purus, quis pulvinar lectus. Vivamus
    euismod ultrices diam, in mattis nibh.
    <h2 key="desc-4">Documentations</h2>
    <a key="link-1" href="https://www.patternfly.org/">
      https://www.patternfly.org
    </a>
  </div>
);

export const mockCatalogItems = [
  {
    uid: 1,
    kind: 'ImageStream',
    tags: ['builder', '.net', 'dotnet', 'dotnetcore', 'rh-dotnet20'],
    shortDescription:
      'Build and run .NET Core 2.0 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/redhat-developer/s2i-dotnetcore/tree/master/2.0/build/README.md.',
    iconClass: null,
    imgUrl: 'icon-dotnet',
    name: '.NET Core',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 2,
    kind: 'ImageStream',
    tags: ['builder', 'httpd'],
    shortDescription:
      'Build and serve static content via Apache HTTP Server (httpd) 2.4 on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/httpd-container/blob/master/2.4/README.md.',
    iconClass: null,
    imgUrl: 'icon-apache',
    name: 'Apache HTTP Server (httpd)',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 3,
    kind: 'ClusterServiceClass',
    tags: ['quickstart', 'php', 'cakephp'],
    shortDescription:
      'An example CakePHP application with a MySQL database. For more information about using this template, including OpenShift considerations, see https://github.com/openshift/cakephp-ex/blob/master/README.md.',
    iconClass: null,
    imgUrl: 'icon-php',
    name: 'CakePHP + MySQL',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 4,
    kind: 'ClusterServiceClass',
    tags: ['quickstart', 'perl', 'dancer'],
    shortDescription:
      'An example Dancer application with a MySQL database. For more information about using this template, including OpenShift considerations, see https://github.com/openshift/dancer-ex/blob/master/README.md.',
    iconClass: null,
    imgUrl: 'icon-perl',
    name: 'Dancer + MySQL',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 5,
    kind: 'ClusterServiceClass',
    tags: ['quickstart', 'python', 'django'],
    shortDescription:
      'An example Django application with a PostgreSQL database. For more information about using this template, including OpenShift considerations, see https://github.com/openshift/django-ex/blob/master/README.md.',
    iconClass: null,
    imgUrl: 'icon-python',
    name: 'Django + PostgreSQL',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 6,
    kind: 'ClusterServiceClass',
    tags: ['instant-app', 'jenkins'],
    shortDescription:
      'Jenkins service, without persistent storage.↵↵WARNING: Any data stored will be lost upon pod destruction. Only use this template for testing.',
    iconClass: null,
    imgUrl: 'icon-jenkins',
    name: 'Jenkins (Ephemeral)',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 7,
    kind: 'ClusterServiceClass',
    tags: ['database', 'mariadb'],
    shortDescription:
      'MariaDB database service, with persistent storage. For more information about using this template, including OpenShift considerations, see https://github.com/sclorg/mariadb-container/blob/master/10.2/root/usr/share/container-scripts/mysql/README.md.↵↵NOTE: Scaling to more than one replica is not supported. You must have persistent volumes available in your cluster to use this template.',
    iconClass: null,
    imgUrl: 'icon-mariadb',
    name: 'MariaDB',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 8,
    kind: 'ClusterServiceClass',
    tags: ['database', 'mongodb'],
    shortDescription:
      'MongoDB database service, with persistent storage. For more information about using this template, including OpenShift considerations, see https://github.com/sclorg/mongodb-container/blob/master/3.2/README.md.↵↵NOTE: Scaling to more than one replica is not supported. You must have persistent volumes available in your cluster to use this template.',
    iconClass: null,
    imgUrl: 'icon-mongodb',
    name: 'MongoDB',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 9,
    kind: 'ClusterServiceClass',
    tags: ['database', 'mysql'],
    shortDescription:
      'MySQL database service, with persistent storage. For more information about using this template, including OpenShift considerations, see https://github.com/sclorg/mysql-container/blob/master/5.7/root/usr/share/container-scripts/mysql/README.md.↵↵NOTE: Scaling to more than one replica is not supported. You must have persistent volumes available in your cluster to use this template.',
    iconClass: null,
    imgUrl: 'icon-mysql-database',
    name: 'MySQL',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 10,
    kind: 'ImageStream',
    tags: ['builder', 'nginx'],
    shortDescription:
      'Build and serve static content via Nginx HTTP Server and a reverse proxy (nginx) on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/nginx-container/blob/master/1.12/README.md.',
    iconClass: null,
    imgUrl: 'icon-nginx',
    name: 'Nginx HTTP server and a reverse proxy (nginx)',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 11,
    kind: 'ImageStream',
    tags: ['builder', 'nodejs'],
    shortDescription:
      'Build and run Node.js 8 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-nodejs-container/blob/master/8/README.md.',
    iconClass: null,
    imgUrl: 'icon-nodejs',
    name: 'Node.js',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 12,
    kind: 'ClusterServiceClass',
    tags: ['quickstart', 'nodejs'],
    shortDescription:
      'An example Node.js application with a MongoDB database. For more information about using this template, including OpenShift considerations, see https://github.com/openshift/nodejs-ex/blob/master/README.md.',
    iconClass: null,
    imgUrl: 'icon-nodejs',
    name: 'Node.js + MongoDB',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 13,
    kind: 'ImageStream',
    tags: ['builder', 'php'],
    shortDescription:
      'Build and run PHP 7.1 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-php-container/blob/master/7.1/README.md.',
    iconClass: null,
    imgUrl: 'icon-php',
    name: 'PHP',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 14,
    kind: 'ImageStream',
    tags: ['builder', 'perl'],
    shortDescription:
      'Build and run Perl 5.24 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-perl-container/blob/master/5.24/README.md.',
    iconClass: null,
    imgUrl: 'icon-perl',
    name: 'Perl',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 15,
    kind: 'ClusterServiceClass',
    tags: ['instant-app', 'jenkins'],
    shortDescription:
      'This example showcases the new Jenkins Pipeline integration in OpenShift,↵which performs continuous integration and deployment right on the platform.↵The template contains a Jenkinsfile - a definition of a multi-stage CI/CD process - that↵leverages the underlying OpenShift platform for dynamic and scalable↵builds. OpenShift integrates the status of your pipeline builds into the web↵console allowing you to see your entire application lifecycle in a single view.',
    iconClass: null,
    imgUrl: 'icon-jenkins',
    name: 'Pipeline Build Example',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 16,
    kind: 'ClusterServiceClass',
    tags: ['database', 'postgresql'],
    shortDescription:
      'PostgreSQL database service, with persistent storage. For more information about using this template, including OpenShift considerations, see https://github.com/sclorg/postgresql-container/.↵↵NOTE: Scaling to more than one replica is not supported. You must have persistent volumes available in your cluster to use this template.',
    iconClass: null,
    imgUrl: 'icon-postgresql',
    name: 'PostgreSQL',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 17,
    kind: 'ImageStream',
    tags: ['builder', 'python'],
    shortDescription:
      'Build and run Python 3.6 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-python-container/blob/master/3.6/README.md.',
    iconClass: null,
    imgUrl: 'icon-python',
    name: 'Python',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 18,
    kind: 'ClusterServiceClass',
    tags: ['quickstart', 'ruby', 'rails'],
    shortDescription:
      'An example Rails application with a PostgreSQL database. For more information about using this template, including OpenShift considerations, see https://github.com/openshift/rails-ex/blob/master/README.md.',
    iconClass: null,
    imgUrl: 'icon-ruby',
    name: 'Rails + PostgreSQL',
    provider: 'Red Hat, Inc.',
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 19,
    kind: 'ImageStream',
    tags: ['builder', 'ruby'],
    shortDescription:
      'Build and run Ruby 2.5 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/sclorg/s2i-ruby-container/blob/master/2.5/README.md.',
    iconClass: null,
    imgUrl: 'icon-ruby',
    name: 'Ruby',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  },
  {
    uid: 20,
    kind: 'ImageStream',
    tags: ['builder', 'wildfly', 'java'],
    shortDescription:
      'Build and run WildFly 12 applications on CentOS 7. For more information about using this builder image, including OpenShift considerations, see https://github.com/openshift-s2i/s2i-wildfly/blob/master/README.md.',
    iconClass: null,
    imgUrl: 'icon-wildfly',
    name: 'WildFly',
    provider: undefined,
    version: '0.22.2 (latest)',
    certifiedLevel: 'Certified',
    healthIndex: 'Healthy',
    repository: 'https://github.com/patternfly/patternfly.git',
    containerImage: '0.22.2',
    createdAt: 'Aug 23, 1:58 pm',
    description
  }
];
