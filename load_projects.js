const projects = [
  {
    title: 'AI Fashion Mirror',
    description: 'An AI fashion mirror project based on React',
    image: '/assets/img/mirror.png',
    accomplishments: [
      '<b>Tools</b>: TypeScript, HTML, CSS, React, Node.js',
      'Integrated with PRE API',
      'Take photos of users',
      'Display AI generated comments and fashion advice',
    ],
    link: 'https://github.com/natapokie/ai-fashion-mirror',
    time: '2024-09',
  },
  {
    title: 'Open Source Map',
    description: 'Geographic Information System software design',
    image: '/assets/img/map_project.png',
    accomplishments: [
      '<b>Tools</b>: C++, GTK',
      'Uses C++ and software development tools to program a GIS software in a team of 3',
      'Implement path-finding algorithms like Dijkstra and A* to get shortest path between intersections',
      'Use GTK to design UI supporting multiple functions for map usage',
    ],
    link: 'https://docs.google.com/presentation/d/1sv3nVnLqu5-BgBSRExNNuLlefhMb_VeT/edit?usp=sharing&ouid=110080259429906623471&rtpof=true&sd=true',
    time: '2022-04',
  },
];

let allProjectsVisible = false;

function findMostRecentProject(projects) {
  projects.sort((a, b) => new Date(b.time) - new Date(a.time));

  return projects[0];
}

function displayMostRecentProject() {
  const recentProject = findMostRecentProject(projects);
  const projectDiv = document.getElementById('recent-projects');

  // Clear any existing content in the recent projects section
  projectDiv.innerHTML = '';

  // Add the most recent project to the section
  let recentProjectHTML = `
    <div class="col s12 m6 l4 project">
      <div class="card medium">
        <div class="card-image waves-effect waves-block waves-light">
          <img alt="${recentProject.title}" src="${
    recentProject.image
  }" style="height: 100%; width: 100%" class="activator" />
        </div>
        <div class="card-content">
          <span class="card-title activator teal-text hoverline">${
            recentProject.title
          }<i class="mdi-navigation-more-vert right"></i></span>
          <p>${recentProject.description}</p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text"><small>Accomplishments</small><i class="mdi-navigation-close right"></i></span>
          <ul>
            ${recentProject.accomplishments
              .map((accomplishment) => `<li>${accomplishment}</li>`)
              .join('')}
          </ul>
          <div class="card-action">
            <a href="${
              recentProject.link
            }" target="_blank" class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped"><i class="fa fa-external-link"></i></a>
          </div>
        </div>
      </div>
    </div>
  `;
  projectDiv.innerHTML = recentProjectHTML;
}

window.onload = displayMostRecentProject;

function loadMoreProjects() {
  const projectDiv = document.getElementById('recent-projects');

  if (allProjectsVisible == false) {
    let allProjectsContent = '';

    for (let i = 1; i < projects.length; i++) {
      const project = projects[i];
      allProjectsContent += `
          <div class="col s12 m6 l4 project">
            <div class="card medium">
              <div class="card-image waves-effect waves-block waves-light">
                <img alt="${project.title}" src="${
        project.image
      }" style="height: 100%; width: 100%" class="activator" />
              </div>
              <div class="card-content">
                <span class="card-title activator teal-text hoverline">${
                  project.title
                }<i class="mdi-navigation-more-vert right"></i></span>
                <p>${project.description}</p>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text"><small>Accomplishments</small><i class="mdi-navigation-close right"></i></span>
                <ul>
                  ${project.accomplishments
                    .map((accomplishment) => `<li>${accomplishment}</li>`)
                    .join('')}
                </ul>
                <div class="card-action">
                  <a href="${
                    project.link
                  }" target="_blank" class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped"><i class="fa fa-external-link"></i></a>
                </div>
              </div>
            </div>
          </div>
        `;
    }

    projectDiv.innerHTML += allProjectsContent;
    document.getElementById('load-more-btn').textContent = 'Show Most Recent';
    allProjectsVisible = true;
  } else {
    displayMostRecentProject();
    document.getElementById('load-more-btn').textContent = 'Load More';
    allProjectsVisible = false;
  }
}

document.getElementById('load-more-btn').addEventListener('click', loadMoreProjects);
