
/* =================================
   1. STARTER DATA
================================= */

const starterProjects = [
  {
    id: 1,
    title: "Campus Connect",
    category: "Web Development",
    description: "A college community platform where students can connect, share resources, and grow together.",
    skills: ["HTML", "CSS", "JavaScript"],
    roles: ["Frontend Developer", "Backend Developer"],
    owner: "Rahul Sharma",
    time: "5–10 hours/week",
    deadline: "",
    icon: "⌘"
  },
  {
    id: 2,
    title: "Study Buddy AI",
    category: "AI / Machine Learning",
    description: "A smart AI study assistant that helps students organise notes and study more effectively.",
    skills: ["Python", "AI", "APIs"],
    roles: ["ML Engineer", "Frontend Developer"],
    owner: "Ananya Verma",
    time: "10–15 hours/week",
    deadline: "",
    icon: "✧"
  },
  {
    id: 3,
    title: "FitLife",
    category: "Mobile App",
    description: "A fitness tracking application with personalised workouts and daily progress tracking.",
    skills: ["React Native", "Firebase", "UI/UX"],
    roles: ["Mobile Developer", "UI/UX Designer"],
    owner: "Karan Singh",
    time: "5–10 hours/week",
    deadline: "",
    icon: "▣"
  },
  {
    id: 4,
    title: "Event Hub",
    category: "Web Development",
    description: "A platform to discover college events, register for workshops and meet new people.",
    skills: ["HTML", "CSS", "JavaScript"],
    roles: ["Frontend Developer", "Backend Developer"],
    owner: "Sneha Patel",
    time: "1–5 hours/week",
    deadline: "",
    icon: "✦"
  },
  {
    id: 5,
    title: "Design Studio",
    category: "Design",
    description: "A creative space for students to collaborate on UI designs and share design systems.",
    skills: ["Figma", "UI/UX", "Prototyping"],
    roles: ["UI/UX Designer", "Frontend Developer"],
    owner: "Meera Joshi",
    time: "5–10 hours/week",
    deadline: "",
    icon: "✎"
  },
  {
    id: 6,
    title: "Smart Expense",
    category: "Web Development",
    description: "A simple expense manager that helps students track spending, income and savings.",
    skills: ["HTML", "CSS", "JavaScript"],
    roles: ["Frontend Developer", "Backend Developer"],
    owner: "Aman Verma",
    time: "5–10 hours/week",
    deadline: "",
    icon: "₹"
  }
];

const starterStudents = [
  {
    name: "Rahul Sharma",
    course: "BCA · 2nd Year",
    skills: ["HTML", "CSS", "JavaScript"],
    bio: "Building useful web applications."
  },
  {
    name: "Ananya Verma",
    course: "B.Tech · 2nd Year",
    skills: ["Python", "AI", "APIs"],
    bio: "Interested in AI and machine learning."
  },
  {
    name: "Sneha Patel",
    course: "BCA · 3rd Year",
    skills: ["React", "JavaScript", "CSS"],
    bio: "Frontend developer and problem solver."
  },
  {
    name: "Karan Singh",
    course: "B.Tech · 3rd Year",
    skills: ["Node.js", "MongoDB", "React"],
    bio: "Interested in full-stack development."
  },
  {
    name: "Meera Joshi",
    course: "B.Des · 2nd Year",
    skills: ["Figma", "UI/UX", "Prototyping"],
    bio: "Turning ideas into clean interfaces."
  },
  {
    name: "Aman Verma",
    course: "BCA · 2nd Year",
    skills: ["HTML", "CSS", "Git"],
    bio: "Learning development by building projects."
  }
];


/* =================================
   2. LOCAL STORAGE
================================= */

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (saved === null) {
      return fallback;
    }

    return JSON.parse(saved);
  } catch (error) {
    console.error("Could not load:", key, error);
    return fallback;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Could not save:", key, error);
    showToast("Could not save data in this browser.");
  }
}

let projects = loadData("teamup_projects", starterProjects);
let savedProjects = loadData("teamup_saved", []);
let applications = loadData("teamup_applications", []);
let students = loadData("teamup_students", starterStudents);

let profile = loadData("teamup_profile", {
  name: "Rijut Saluja",
  course: "BCA 2nd Year · Itarsi",
  bio: "Passionate about web development and building cool projects.",
  skills: ["HTML", "CSS", "JavaScript", "Git"],
  hours: "10–15 hours"
});

let selectedProjectId = null;
let applicationTab = "Pending";
let savedOnly = false;


/* =================================
   3. HELPER FUNCTIONS
================================= */

// Prevent user-entered text from being interpreted as HTML.

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, function (char) {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[char];
  });
}

function makeTags(items) {
  return items
    .map(item => `<span class="tag">${escapeHTML(item)}</span>`)
    .join("");
}

function initials(name) {
  return String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word[0] || "")
    .join("")
    .toUpperCase();
}

function persistProjects() {
  saveData("teamup_projects", projects);
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);

  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}


/* =================================
   4. NAVIGATION & MOBILE MENU
================================= */

const navLinks = document.getElementById("navLinks");
const menuBtn = document.getElementById("menuBtn");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  menuBtn.textContent = navLinks.classList.contains("open")
    ? "✕"
    : "☰";
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
  });
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      event.preventDefault();

      history.replaceState(null, "", link.getAttribute("href"));

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

const pageSections = document.querySelectorAll("main > section[id]");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + entry.target.id
      );
    });
  });
}, {
  rootMargin: "-20% 0px -65% 0px"
});

pageSections.forEach(section => observer.observe(section));


/* =================================
   5. DARK MODE
================================= */

const themeBtn = document.getElementById("themeBtn");

if (loadData("teamup_theme", "light") === "dark") {
  document.body.classList.add("dark");
  themeBtn.textContent = "☾";
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const theme = document.body.classList.contains("dark")
    ? "dark"
    : "light";

  themeBtn.textContent = theme === "dark" ? "☾" : "☼";

  saveData("teamup_theme", theme);
});


/* =================================
   6. PROJECT CARDS
================================= */

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  const search = document.getElementById("searchInput")
    .value.trim().toLowerCase();

  const category = document.getElementById("categoryFilter").value;
  const role = document.getElementById("roleFilter").value;

  const filtered = projects.filter(project => {
    const searchable = [
      project.title,
      project.description,
      project.category,
      project.owner,
      ...project.skills,
      ...project.roles
    ].join(" ").toLowerCase();

    const matchesSearch = searchable.includes(search);

    const matchesCategory =
      category === "All" || project.category === category;

    const matchesRole =
      role === "All" || project.roles.includes(role);

    const matchesSaved =
      !savedOnly || savedProjects.includes(project.id);

    return matchesSearch &&
      matchesCategory &&
      matchesRole &&
      matchesSaved;
  });

  grid.innerHTML = filtered.map(project => {
    const isSaved = savedProjects.includes(project.id);

    const openRoles = project.roles.filter(projectRole => {
      return !applications.some(app =>
        app.projectId === project.id &&
        app.role === projectRole &&
        app.status === "Accepted"
      );
    });

    return `
      <article class="project-card">

        <div class="project-card-top">
          <div class="project-icon">${escapeHTML(project.icon || "✳")}</div>

          <button
            class="save-btn ${isSaved ? "saved" : ""}"
            data-save="${project.id}"
            aria-label="Save project"
            aria-pressed="${isSaved}"
          >${isSaved ? "♥" : "♡"}</button>
        </div>

        <span class="badge">${escapeHTML(project.category)}</span>

        <h3>${escapeHTML(project.title)}</h3>

        <p class="project-description">
          ${escapeHTML(project.description)}
        </p>

        <div class="tag-list">
          ${makeTags(project.skills.slice(0, 4))}
        </div>

        <div class="project-card-footer">
          <span class="open-roles">
            ● ${openRoles.length} roles open
          </span>

          <button
            class="btn btn-primary"
            data-details="${project.id}"
          >View Project ↗</button>
        </div>

      </article>
    `;
  }).join("");

  document.getElementById("emptyProjects")
    .classList.toggle("hidden", filtered.length !== 0);

  document.getElementById("projectStat").textContent = projects.length;
  document.getElementById("studentStat").textContent = students.length;
}

document.getElementById("searchInput")
  .addEventListener("input", renderProjects);

document.getElementById("categoryFilter")
  .addEventListener("change", () => {
    document.querySelectorAll(".category-item").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category ===
          document.getElementById("categoryFilter").value
      );
    });

    renderProjects();
  });

document.getElementById("roleFilter")
  .addEventListener("change", renderProjects);

document.getElementById("savedFilter")
  .addEventListener("click", event => {
    savedOnly = !savedOnly;

    event.currentTarget.classList.toggle("saved", savedOnly);
    event.currentTarget.textContent = savedOnly ? "♥ Saved" : "♡ Saved";

    renderProjects();
  });

document.querySelectorAll(".category-item").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category-item").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    document.getElementById("categoryFilter").value =
      button.dataset.category;

    renderProjects();
  });
});

document.getElementById("projectGrid").addEventListener("click", event => {
  const saveButton = event.target.closest("[data-save]");
  const detailsButton = event.target.closest("[data-details]");

  if (saveButton) {
    const id = Number(saveButton.dataset.save);

    if (savedProjects.includes(id)) {
      savedProjects = savedProjects.filter(item => item !== id);
      showToast("Project removed from saved list.");
    } else {
      savedProjects.push(id);
      showToast("Project saved!");
    }

    saveData("teamup_saved", savedProjects);
    renderProjects();
  }

  if (detailsButton) {
    openProjectDetails(Number(detailsButton.dataset.details));
  }
});


/* =================================
   7. PROJECT DETAILS
================================= */

function openProjectDetails(id) {
  const project = projects.find(item => item.id === id);

  if (!project) {
    showToast("Project not found.");
    return;
  }

  selectedProjectId = id;

  const details = document.getElementById("projectDetails");

  details.querySelector(".large-icon").textContent =
    project.icon || "✳";

  details.querySelector(".badge").textContent = project.category;

  details.querySelector(".details-title h2").textContent = project.title;

  details.querySelector(".details-title p").textContent =
    project.description;

  document.getElementById("detailsDescription").textContent =
    project.description;

  document.getElementById("detailsSkills").innerHTML =
    makeTags(project.skills);

  document.getElementById("detailsOwner").textContent = project.owner;

  document.getElementById("detailsTime").textContent = project.time;

  document.getElementById("detailsDeadline").textContent =
    project.deadline || "Flexible";

  document.getElementById("detailsRoles").innerHTML =
    project.roles.map(role => {
      const occupied = applications.some(app =>
        app.projectId === project.id &&
        app.role === role &&
        app.status === "Accepted"
      );

      return `
        <div class="role-row">
          <span>♙ ${escapeHTML(role)}</span>
          <strong class="${occupied ? "" : "success-text"}">
            ${occupied ? "Filled" : "1 open"}
          </strong>
        </div>
      `;
    }).join("");

  document.getElementById("detailsApply").textContent = "Apply Now ↗";
  document.getElementById("detailsApplyBottom").textContent =
    "Apply to join";

  document.getElementById("details").scrollIntoView({
    behavior: "smooth"
  });

  history.replaceState(null, "", "#details");
}

function openApplyModal(id) {
  const project = projects.find(item => item.id === id);

  if (!project) {
    showToast("Project not found.");
    return;
  }

  document.getElementById("applyProjectId").value = id;

  document.getElementById("applicantName").value = profile.name;

  document.getElementById("applicantSkills").value =
    profile.skills.join(", ");

  const roleSelect = document.getElementById("applicantRole");

  const availableRole = project.roles.find(role => {
    return !applications.some(app =>
      app.projectId === project.id &&
      app.role === role &&
      app.status === "Accepted"
    );
  });

  if (availableRole) {
    roleSelect.value = availableRole;
  }

  roleSelect.querySelectorAll("option").forEach(option => {
    option.disabled =
      !project.roles.includes(option.value) ||
      applications.some(app =>
        app.projectId === project.id &&
        app.role === option.value &&
        app.status === "Accepted"
      );
  });

  if (!availableRole) {
    showToast("All project roles are currently filled.");
    return;
  }

  document.getElementById("applyModal").classList.remove("hidden");
}

document.getElementById("projectDetails").addEventListener("click", event => {
  if (event.target.closest("#detailsApply") ||
      event.target.closest("#detailsApplyBottom")) {
    if (selectedProjectId !== null) {
      openApplyModal(selectedProjectId);
    }
  }
});

document.getElementById("shareBtn").addEventListener("click", async () => {
  if (selectedProjectId === null) return;

  const project = projects.find(item => item.id === selectedProjectId);

  if (!project) return;

  const shareUrl = location.href.split("#")[0] +
    "#details";

  try {
    if (navigator.share) {
      await navigator.share({
        title: project.title,
        text: project.description,
        url: shareUrl
      });
    } else if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Project link copied!");
    } else {
      window.prompt("Copy project link:", shareUrl);
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      showToast("Could not share project.");
    }
  }
});


/* =================================
   8. CREATE PROJECT
================================= */

document.getElementById("projectForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const roles = [
      ...document.querySelectorAll('input[name="roles"]:checked')
    ].map(input => input.value);

    if (roles.length === 0) {
      showToast("Select at least one required role.");
      return;
    }

    const skills = document.getElementById("projectSkills")
      .value.split(",")
      .map(skill => skill.trim())
      .filter(Boolean)
      .slice(0, 15);

    if (skills.length === 0) {
      showToast("Please enter project skills.");
      return;
    }

    const project = {
      id: Date.now(),
      title: document.getElementById("projectTitle").value.trim(),
      category: document.getElementById("projectCategory").value,
      owner: document.getElementById("projectOwner").value.trim(),
      description: document.getElementById("projectDescription").value.trim(),
      skills,
      roles,
      time: document.getElementById("projectTime").value,
      deadline: document.getElementById("projectDeadline").value,
      icon: "✳"
    };

    if (!project.title || !project.owner || !project.description) {
      showToast("Please fill in all required fields.");
      return;
    }

    projects.unshift(project);

    persistProjects();

    event.target.reset();

    renderProjects();
    renderMyProjects();

    showToast("Project created successfully!");

    document.getElementById("projects").scrollIntoView({
      behavior: "smooth"
    });

    history.replaceState(null, "", "#projects");
  });


/* =================================
   9. APPLICATION SUBMISSION
================================= */

document.getElementById("applicationForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    const projectId = Number(
      document.getElementById("applyProjectId").value
    );

    const project = projects.find(item => item.id === projectId);

    if (!project) {
      showToast("Project not found.");
      return;
    }

    const name = document.getElementById("applicantName")
      .value.trim();

    const role = document.getElementById("applicantRole").value;

    if (!project.roles.includes(role)) {
      showToast("This role is not required by the project.");
      return;
    }

    const alreadyApplied = applications.some(app =>
      app.projectId === projectId &&
      app.name.toLowerCase() === name.toLowerCase() &&
      app.status !== "Rejected"
    );

    if (alreadyApplied) {
      showToast("You already have an active application.");
      return;
    }

    const roleFilled = applications.some(app =>
      app.projectId === projectId &&
      app.role === role &&
      app.status === "Accepted"
    );

    if (roleFilled) {
      showToast("This role has already been filled.");
      return;
    }

    const application = {
      id: Date.now(),
      projectId,
      projectTitle: project.title,
      owner: project.owner,
      name,
      role,
      skills: document.getElementById("applicantSkills")
        .value.split(",")
        .map(skill => skill.trim())
        .filter(Boolean),
      message: document.getElementById("applicantMessage")
        .value.trim(),
      status: "Pending"
    };

    applications.unshift(application);

    saveData("teamup_applications", applications);

    event.target.reset();

    document.getElementById("applyModal").classList.add("hidden");

    renderApplications();
    renderMyApplications();
    renderProjects();

    showToast("Application submitted successfully!");
  });


/* =================================
   10. CLOSE MODALS
================================= */

document.getElementById("closeApplyModal").addEventListener("click", () => {
  document.getElementById("applyModal").classList.add("hidden");
});

document.getElementById("closeProfileModal")
  .addEventListener("click", () => {
    document.getElementById("profileModal").classList.add("hidden");
  });

["applyModal", "profileModal"].forEach(id => {
  document.getElementById(id).addEventListener("click", event => {
    if (event.target.id === id) {
      event.currentTarget.classList.add("hidden");
    }
  });
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach(modal => {
      modal.classList.add("hidden");
    });
  }
});


/* =================================
   11. PROFILE
================================= */

function renderProfile() {
  document.getElementById("profileName").textContent = profile.name;

  document.getElementById("profileCourse").textContent = profile.course;

  document.getElementById("profileBio").textContent = profile.bio;

  document.getElementById("profileAvatar").textContent =
    initials(profile.name);

  document.getElementById("profileHours").textContent = profile.hours;

  document.getElementById("profileSkills").innerHTML =
    makeTags(profile.skills);

  document.getElementById("applicantName").value = profile.name;
  document.getElementById("applicantSkills").value =
    profile.skills.join(", ");
}

document.getElementById("editProfileBtn").addEventListener("click", () => {
  document.getElementById("editName").value = profile.name;
  document.getElementById("editCourse").value = profile.course;
  document.getElementById("editBio").value = profile.bio;
  document.getElementById("editSkills").value = profile.skills.join(", ");
  document.getElementById("editHours").value = profile.hours;

  document.getElementById("profileModal").classList.remove("hidden");
});

document.getElementById("profileForm")
  .addEventListener("submit", event => {
    event.preventDefault();

    profile = {
      name: document.getElementById("editName").value.trim(),
      course: document.getElementById("editCourse").value.trim(),
      bio: document.getElementById("editBio").value.trim(),
      skills: document.getElementById("editSkills").value
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean)
        .slice(0, 20),
      hours: document.getElementById("editHours").value
    };

    if (!profile.name || !profile.course || !profile.bio) {
      showToast("Please complete your profile.");
      return;
    }

    saveData("teamup_profile", profile);

    renderProfile();

    document.getElementById("profileModal").classList.add("hidden");

    renderStudents();

    showToast("Profile updated successfully!");
  });


/* =================================
   12. MY PROJECTS
================================= */

function renderMyProjects() {
  const container = document.getElementById("myProjects");

  const mine = projects.filter(project =>
    project.owner.toLowerCase() === profile.name.toLowerCase()
  );

  if (mine.length === 0) {
    container.innerHTML = `
      <p class="muted">You haven't created any projects yet.</p>
      <a href="#create" class="btn btn-primary">Create Project</a>
    `;

    return;
  }

  container.innerHTML = mine.map(project => `
    <div class="mini-project">
      <div>
        <strong>${escapeHTML(project.title)}</strong>
        <small>${escapeHTML(project.category)}</small>
      </div>

      <button class="btn btn-outline"
        data-details="${project.id}">View</button>
    </div>
  `).join("");
}

document.getElementById("myProjects").addEventListener("click", event => {
  const button = event.target.closest("[data-details]");

  if (button) {
    openProjectDetails(Number(button.dataset.details));
  }
});


/* =================================
   13. MY APPLICATIONS
================================= */

function renderMyApplications() {
  const container = document.getElementById("myApplications");

  const mine = applications.filter(app =>
    app.name.toLowerCase() === profile.name.toLowerCase()
  );

  if (mine.length === 0) {
    container.innerHTML =
      '<p class="muted">You have not applied to any projects yet.</p>';

    return;
  }

  container.innerHTML = mine.map(app => `
    <div class="mini-project">
      <div>
        <strong>${escapeHTML(app.projectTitle)}</strong>
        <small>${escapeHTML(app.role)}</small>
      </div>

      <span class="status-badge status-${app.status}">
        ${app.status}
      </span>
    </div>
  `).join("");
}


/* =================================
   14. APPLICATION MANAGEMENT
================================= */

function renderApplications() {
  const list = document.getElementById("applicationsList");

  const counts = {
    Pending: 0,
    Accepted: 0,
    Rejected: 0
  };

  applications.forEach(app => {
    counts[app.status] = (counts[app.status] || 0) + 1;
  });

  document.getElementById("pendingCount").textContent = counts.Pending;
  document.getElementById("acceptedCount").textContent = counts.Accepted;
  document.getElementById("rejectedCount").textContent = counts.Rejected;

  const filtered = applications.filter(app => {
    const project = projects.find(item => item.id === app.projectId);

    // Only show applications for projects owned by the current profile.
    return app.status === applicationTab &&
      project &&
      project.owner.toLowerCase() === profile.name.toLowerCase();
  });

  list.innerHTML = filtered.map(app => `
    <article class="application-card">

      <div class="applicant-avatar">
        ${escapeHTML(initials(app.name))}
      </div>

      <div class="applicant-info">
        <h3>${escapeHTML(app.name)}</h3>

        <p>
          ${escapeHTML(app.role)} ·
          ${escapeHTML(app.projectTitle)}
        </p>

        <p>Skills: ${escapeHTML((app.skills || []).join(", ") || "Not specified")}</p>

        ${app.message ? `
          <p class="applicant-message">
            ${escapeHTML(app.message)}
          </p>
        ` : ""}
      </div>

      <div class="application-actions">
        ${app.status === "Pending" ? `
          <button class="btn btn-accept" data-decision="Accepted"
            data-id="${app.id}">✓ Accept</button>

          <button class="btn btn-reject" data-decision="Rejected"
            data-id="${app.id}">✕ Reject</button>
        ` : `
          <span class="status-badge status-${app.status}">
            ${app.status}
          </span>
        `}
      </div>

    </article>
  `).join("");

  document.getElementById("emptyApplications")
    .classList.toggle("hidden", filtered.length > 0);
}

document.querySelectorAll(".tab-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(tab => {
      tab.classList.remove("active");
    });

    button.classList.add("active");
    applicationTab = button.dataset.status;

    renderApplications();
  });
});

document.getElementById("applicationsList")
  .addEventListener("click", event => {
    const button = event.target.closest("[data-decision]");

    if (!button) return;

    const app = applications.find(item =>
      item.id === Number(button.dataset.id)
    );

    if (!app || app.status !== "Pending") return;

    if (button.dataset.decision === "Accepted") {
      const occupied = applications.some(item =>
        item.id !== app.id &&
        item.projectId === app.projectId &&
        item.role === app.role &&
        item.status === "Accepted"
      );

      if (occupied) {
        showToast("This role has already been filled.");
        return;
      }
    }

    app.status = button.dataset.decision;

    saveData("teamup_applications", applications);

    renderApplications();
    renderProjects();
    renderMyApplications();

    showToast(`Application ${app.status.toLowerCase()}!`);
  });


/* =================================
   15. STUDENT DIRECTORY
================================= */

function renderStudents() {
  const grid = document.getElementById("studentGrid");

  const search = document.getElementById("studentSearch")
    .value.trim().toLowerCase();

  const currentStudent = {
    name: profile.name,
    course: profile.course,
    skills: profile.skills,
    bio: profile.bio
  };

  const allStudents = [
    currentStudent,
    ...students.filter(student =>
      student.name.toLowerCase() !== profile.name.toLowerCase()
    )
  ];

  const filtered = allStudents.filter(student => {
    const searchable = [
      student.name,
      student.course,
      student.bio,
      ...student.skills
    ].join(" ").toLowerCase();

    return searchable.includes(search);
  });

  grid.innerHTML = filtered.map(student => `
    <article class="student-card">

      <div class="applicant-avatar">
        ${escapeHTML(initials(student.name))}
      </div>

      <h3>${escapeHTML(student.name)}</h3>

      <p>${escapeHTML(student.course)}</p>

      <p>${escapeHTML(student.bio)}</p>

      <div class="tag-list">
        ${makeTags(student.skills.slice(0, 4))}
      </div>

      <button class="btn btn-outline full-width"
        data-connect="${escapeHTML(student.name)}">
        ${student.name === profile.name ? "Your Profile" : "Connect ↗"}
      </button>

    </article>
  `).join("");

  document.getElementById("emptyStudents")
    .classList.toggle("hidden", filtered.length > 0);
}

document.getElementById("studentSearch")
  .addEventListener("input", renderStudents);

document.getElementById("studentGrid").addEventListener("click", event => {
  const button = event.target.closest("[data-connect]");

  if (!button) return;

  const name = button.dataset.connect;

  if (name === profile.name) {
    document.getElementById("profile").scrollIntoView({
      behavior: "smooth"
    });

    return;
  }

  showToast(`You discovered ${name}!`);
});


/* =================================
   16. INITIAL RENDER
================================= */

renderProjects();
renderProfile();
renderMyProjects();
renderMyApplications();
renderApplications();
renderStudents();
