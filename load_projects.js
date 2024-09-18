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
  },
  // Add more projects as needed...
];

let allProjectsVisible = false;

// Function to display the latest project initially
function displayLatestProject() {
  const projectDiv = document.getElementById('recent-projects');
  projectDiv.innerHTML = ''; // Clear existing content

  // Add first project (AI Fashion Mirror already in HTML)
  let firstProjectHTML = `
      <div class="col s12 m6 l4 project">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img alt="${projects[0].title}" src="${
    projects[0].image
  }" style="height: 100%; width: 100%" class="activator" />
          </div>
          <div class="card-content">
            <span class="card-title activator teal-text hoverline">${
              projects[0].title
            }<i class="mdi-navigation-more-vert right"></i></span>
            <p>${projects[0].description}</p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text"><small>Accomplishments</small><i class="mdi-navigation-close right"></i></span>
            <ul>
              ${projects[0].accomplishments
                .map((accomplishment) => `<li>${accomplishment}</li>`)
                .join('')}
            </ul>
            <div class="card-action">
              <a href="${
                projects[0].link
              }" target="_blank" class="btn-floating btn-large waves-effect waves-light blue-grey tooltipped"><i class="fa fa-github"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
  projectDiv.innerHTML = firstProjectHTML;
}

// Function to display all remaining projects
function loadMoreProjects() {
  const projectDiv = document.getElementById('recent-projects');

  if (!allProjectsVisible) {
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
    displayLatestProject(); // Reset to show the first project
    document.getElementById('load-more-btn').textContent = 'Load More';
    allProjectsVisible = false;
  }
}

// Add event listener for the button
document.getElementById('load-more-btn').addEventListener('click', loadMoreProjects);

// Initialize by showing the latest project
window.onload = displayLatestProject;
