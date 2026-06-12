export const profile = {
  name: "Som Ramnani",
  role: "Front End Developer",
  email: "som.ramnani@gmail.com",
  github: "https://github.com/somramnani",
  linkedin: "https://www.linkedin.com/in/som-ramnani-b1990b14b/",
  resume: "https://somramnani2025resume.tiiny.site",
};

export const skills = [
  "HTML5",
  "CSS3",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express.js",
  "Astro",
  "Tailwind CSS",
  "Three.js",
  "GraphQL",
  "Storybook",
  "Cypress",
  "Jest",
  "Mocha",
  "Git",
  "Docker",
  "Material UI",
];

export const techBadges = {
  HTML5: {
    name: "HTML5",
    icon: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
  },
  CSS3: {
    name: "CSS3",
    icon: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
  },
  Bootstrap: {
    name: "Bootstrap",
    icon: "https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white",
  },
  JavaScript: {
    name: "JavaScript",
    icon: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
  },
  Handlebars: {
    name: "Handlebars.js",
    icon: "https://img.shields.io/badge/Handlebars.js-000000?style=for-the-badge&logo=handlebarsdotjs&logoColor=white",
  },
  NodeJS: {
    name: "Node.js",
    icon: "https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white",
  },
  Express: {
    name: "Express.js",
    icon: "https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white",
  },
  Passport: {
    name: "Passport",
    icon: "https://img.shields.io/badge/Passport-2E3A87?style=for-the-badge&logo=passport&logoColor=white",
  },
  Sequelize: {
    name: "Sequelize",
    icon: "https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white",
  },
  React: {
    name: "React",
    icon: "https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white",
  },
};

export const projects = [
  {
    title: "Date Night",
    description:
      "A web app that helps people search for multiple date-night activities in a given location.",
    image: "/DateNight.png",
    liveUrl: "https://date-night-2-456a8b6a285c.herokuapp.com",
    githubUrl: "https://github.com/somramnani/date-night-v2",
    tech: [
      techBadges.HTML5,
      techBadges.CSS3,
      techBadges.Bootstrap,
      techBadges.JavaScript,
      techBadges.Handlebars,
      techBadges.NodeJS,
      techBadges.Express,
      techBadges.Passport,
      techBadges.Sequelize,
    ],
  },
  {
    title: "Restaurant Manager",
    description:
      "An application where managers can track employees and manage reservations.",
    image: "/restaurant-employees.jpg",
    liveUrl: "https://manager-restaurant-4129383b2be4.herokuapp.com",
    githubUrl: "https://github.com/somramnani/RestaurantManager",
    tech: [
      techBadges.HTML5,
      techBadges.CSS3,
      techBadges.Bootstrap,
      techBadges.JavaScript,
      techBadges.Handlebars,
      techBadges.NodeJS,
      techBadges.Express,
      techBadges.Passport,
      techBadges.Sequelize,
    ],
  },
  {
    title: "Store",
    description:
      "A React, TypeScript, and Vite store app that renders products from JSON and supports a shopping cart flow.",
    image: "/store.png",
    liveUrl: "https://store-dusky-omega.vercel.app/",
    githubUrl: "https://github.com/somramnani/store",
    tech: [techBadges.React],
  },
  {
    title: "2D Fighting Game",
    description:
      "A two-player fighting game built with vanilla JavaScript and CSS, featuring a classic arena combat system.",
    image: "/fighting-game-demo.png",
    liveUrl: "https://fighting-game-psi.vercel.app",
    githubUrl: "https://github.com/somramnani/2d-fighting-game",
    tech: [techBadges.HTML5, techBadges.CSS3, techBadges.JavaScript],
  },
];
