let posts = [
  {
    id: 1,
    section: 'cyber',
    title: 'Password Security Basics',
    intro: 'Learn how to create strong passwords and protect your accounts from hackers.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800',
    date: '2024-05-10',
    dateLearned: 'May 10, 2024',
    staffDate: 'May 16, 2024',
    materials: {
      overview: { text: 'Password security overview...', image: null },
      coding: { text: 'Code examples...', file: null },
      lessons: { text: 'Lesson content...', file: null },
      support: { text: 'Support resources...', file: null }
    }
  },
  {
    id: 2,
    section: 'robotics',
    title: 'Building Your First Robot',
    intro: 'Step-by-step guide to assembling a robot with sensors and motors.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    date: '2024-05-12',
    dateLearned: 'May 12, 2024',
    staffDate: 'May 16, 2024',
    materials: {
      overview: { text: 'Robot building overview...', image: null },
      coding: { text: 'Code examples...', file: null },
      lessons: { text: 'Lesson content...', file: null },
      support: { text: 'Support resources...', file: null }
    }
  }
];

// Load posts from localStorage if available
function loadPostsFromStorage() {
  const saved = localStorage.getItem('cmsPostsData');
  if (saved) {
    try {
      posts = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved posts:', e);
    }
  }
}

// Save posts to localStorage
function savePostsToStorage() {
  localStorage.setItem('cmsPostsData', JSON.stringify(posts));
}

loadPostsFromStorage();

let isAdmin = false;
let currentSection = 'cyber';
let currentPostId = null;
let currentMaterialTab = 'overview';

const adminBtn = document.getElementById('adminBtn');
const uploadBtn = document.getElementById('uploadBtn');
const uploadMenuContainer = document.getElementById('uploadMenuContainer');
const submenuItems = document.querySelectorAll('.submenu-item');
const logoutBtn = document.getElementById('logoutBtn');
const adminUsername = document.getElementById('adminUsername');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

const adminPanel = document.getElementById('adminPanel');
const closeBtn = document.getElementById('closeAdmin');
const postForm = document.getElementById('postForm');
const postsFeed = document.getElementById('postsFeed');
const buttonsFeed = document.getElementById('buttonsFeed');
const detailPage = document.getElementById('detailPage');
const backBtn = document.getElementById('backBtn');
const navButtons = document.querySelectorAll('.nav-btn:not(.admin-toggle)');
const tabButtons = document.querySelectorAll('.tab-btn');

const materialUploadModal = document.getElementById('materialUploadModal');
const closeMaterialUpload = document.getElementById('closeMaterialUpload');
const materialForm = document.getElementById('materialForm');
const materialTabBtns = document.querySelectorAll('.material-tab-btn');

// Admin Login
adminBtn.addEventListener('click', () => {
  loginModal.classList.remove('hidden');
  loginError.textContent = '';
});

closeLogin.addEventListener('click', () => {
  loginModal.classList.add('hidden');
  loginError.textContent = '';
});

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (username === 'Admin' && password === '121217') {
    isAdmin = true;
    loginModal.classList.add('hidden');
    updateAdminUI();
    updateAdminPostsList();
    alert('Login successful!');
  } else {
    loginError.textContent = 'Invalid username or password';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  isAdmin = false;
  updateAdminUI();
});

function updateAdminUI() {
  if (isAdmin) {
    adminBtn.classList.add('hidden');
    uploadMenuContainer.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    adminUsername.classList.remove('hidden');
    adminUsername.textContent = 'Admin';
  } else {
    adminBtn.classList.remove('hidden');
    uploadMenuContainer.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    adminUsername.classList.add('hidden');
  }
}

// Admin Panel for creating posts
uploadBtn.addEventListener('click', () => {
  if (isAdmin) {
    adminPanel.classList.remove('hidden');
  }
});

// Submenu items for uploading materials
submenuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    if (isAdmin && currentPostId) {
      currentMaterialTab = item.dataset.material;
      materialUploadModal.classList.remove('hidden');
      updateMaterialTabs();
    } else {
      alert('Please select a post first before uploading materials.');
    }
  });
});

closeBtn.addEventListener('click', () => {
  adminPanel.classList.add('hidden');
});

postForm.addEventListener('submit', (e) => {
  e.preventDefault();
  createNewPost();
});

// File upload preview
document.getElementById('postImage').addEventListener('change', (e) => {
  // Handle file upload for posts
});

// Navigation buttons
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentSection = btn.dataset.section;
    renderPosts();
  });
});

// Back button
backBtn.addEventListener('click', () => {
  detailPage.classList.add('hidden');
  detailPage.classList.remove('active');
});

// Tab switching on detail page
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    document.getElementById(tabName + 'Tab').classList.add('active');
  });
});

closeMaterialUpload.addEventListener('click', () => {
  materialUploadModal.classList.add('hidden');
});

materialTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentMaterialTab = btn.dataset.material;
    updateMaterialTabs();
  });
});

function updateMaterialTabs() {
  materialTabBtns.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-material="${currentMaterialTab}"]`).classList.add('active');
  
  document.querySelectorAll('.material-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(`${currentMaterialTab}-form`).classList.add('active');
}

materialForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveMaterials();
});

function saveMaterials() {
  if (!currentPostId) return;
  
  const post = posts.find(p => p.id === currentPostId);
  if (!post) return;

  const text = document.querySelector(`#${currentMaterialTab}-form .material-text`).value;
  const fileInput = document.querySelector(`#${currentMaterialTab}-form .material-file`) || 
                    document.querySelector(`#${currentMaterialTab}-form .material-image`);
  
  post.materials[currentMaterialTab].text = text;
  
  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      post.materials[currentMaterialTab].file = {
        name: file.name,
        data: e.target.result
      };
      // Save to localStorage after file is read
      savePostsToStorage();
      alert('Materials saved successfully!');
      materialUploadModal.classList.add('hidden');
      materialForm.reset();
    };
    reader.readAsDataURL(file);
  } else {
    // No file, just save text
    savePostsToStorage();
    alert('Materials saved successfully!');
    materialUploadModal.classList.add('hidden');
    materialForm.reset();
  }
}

function createNewPost() {
  const section = document.getElementById('adminSection').value;
  const title = document.getElementById('postTitle').value;
  const intro = document.getElementById('postIntro').value;
  const imageInput = document.getElementById('postImage');
  const date = document.getElementById('postDate').value;

  const newPost = {
    id: posts.length + 1,
    section: section,
    title: title,
    intro: intro,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    date: date,
    dateLearned: new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    staffDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    materials: {
      overview: { text: '', file: null },
      coding: { text: '', file: null },
      lessons: { text: '', file: null },
      support: { text: '', file: null }
    }
  };

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newPost.image = e.target.result;
      posts.unshift(newPost);
      savePostsToStorage();
      postForm.reset();
      updateAdminPostsList();
      renderPosts();
      alert('Post created successfully!');
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    posts.unshift(newPost);
    savePostsToStorage();
    postForm.reset();
    updateAdminPostsList();
    renderPosts();
    alert('Post created successfully!');
  }
}

function renderPosts() {
  const filteredPosts = posts.filter(post => post.section === currentSection).slice(0, 3);
  
  if (currentSection === 'cyber') {
    postsFeed.classList.remove('hidden');
    buttonsFeed.classList.add('hidden');
    renderBigPosts(filteredPosts);
  } else {
    postsFeed.classList.add('hidden');
    buttonsFeed.classList.remove('hidden');
    renderButtonPosts(filteredPosts);
  }
}

function renderBigPosts(filteredPosts) {
  postsFeed.innerHTML = '';

  if (filteredPosts.length === 0) {
    postsFeed.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #475569;">No posts yet in this section.</p>';
    return;
  }

  filteredPosts.forEach(post => {
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
    postCard.innerHTML = `
      <div class="post-image-container">
        <img src="${post.image}" alt="${post.title}" class="post-image">
      </div>
      <div class="post-body">
        <h3 class="post-title">${post.title}</h3>
        <p class="post-intro">${post.intro}</p>
      </div>
      <div class="post-extended">
        <div class="post-date-left">
          <strong>Learned:</strong>
          <span>${post.dateLearned}</span>
        </div>
        <div class="post-date-right">
          <strong>Recorded:</strong>
          <span>${post.staffDate}</span>
          <button class="learn-more-btn" style="margin-top: 0.5rem; width: 100%;">Learn More</button>
        </div>
      </div>
    `;

    postCard.addEventListener('click', () => {
      currentPostId = post.id;
      showDetailPage(post);
    });

    postsFeed.appendChild(postCard);
  });
}

function renderButtonPosts(filteredPosts) {
  buttonsFeed.innerHTML = '';

  if (filteredPosts.length === 0) {
    buttonsFeed.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #475569;">No posts yet in this section.</p>';
    return;
  }

  const buttonTypes = [
    { label: 'Code Base', tab: 'coding' },
    { label: 'Lessons', tab: 'lessons' },
    { label: 'Support', tab: 'support' }
  ];

  buttonTypes.forEach((btnType) => {
    const post = filteredPosts[0];
    const button = document.createElement('button');
    button.className = 'content-button';
    button.innerHTML = `
      <div class="content-button-bg" style="background-image: url('${post.image}');"></div>
      <div class="content-button-label">${btnType.label}</div>
    `;

    button.addEventListener('click', () => {
      currentPostId = post.id;
      showDetailPage(post, btnType.tab);
    });

    buttonsFeed.appendChild(button);
  });
}

function showDetailPage(post, activeTab = 'overview') {
  currentPostId = post.id;

  document.getElementById('detailTitle').textContent = post.title;
  document.getElementById('detailDate').textContent = `Learned: ${post.dateLearned} | Recorded: ${post.staffDate}`;
  document.getElementById('detailImage').src = post.image;
  document.getElementById('detailIntro').textContent = post.intro;

  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  
  const tabMap = {
    'overview': 'Overview',
    'coding': 'Code Base',
    'lessons': 'Lessons',
    'support': 'Support'
  };

  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.textContent === tabMap[activeTab]) {
      btn.classList.add('active');
    }
  });
  document.getElementById(activeTab + 'Tab').classList.add('active');

  // Display material content with file downloads if available
  if (post.materials[activeTab]) {
    const material = post.materials[activeTab];
    const contentBox = document.getElementById(activeTab + 'Tab').querySelector('.content-box');
    if (contentBox) {
      let htmlContent = '';
      
      if (material.text) {
        htmlContent += `<p>${material.text}</p>`;
      } else {
        htmlContent += '<p>No content available yet.</p>';
      }
      
      if (material.file && material.file.name) {
        htmlContent += `<div style="margin-top: 1rem; padding: 1rem; background: #e0e7ff; border-radius: 6px;">
          <strong>📎 Uploaded File:</strong>
          <a href="${material.file.data}" download="${material.file.name}" style="display: inline-block; margin-top: 0.5rem; padding: 0.5rem 1rem; background: #2563eb; color: white; text-decoration: none; border-radius: 4px;">
            Download: ${material.file.name}
          </a>
        </div>`;
      }
      
      contentBox.innerHTML = htmlContent;
    }
  }

  detailPage.classList.remove('hidden');
  detailPage.classList.add('active');
}

function updateAdminPostsList() {
  const adminPostsList = document.getElementById('adminPostsList');
  adminPostsList.innerHTML = '';

  posts.slice(0, 5).forEach(post => {
    const item = document.createElement('div');
    item.className = 'admin-post-item';
    item.innerHTML = `
      <h4>${post.title}</h4>
      <p><strong>Section:</strong> ${post.section}</p>
      <p><strong>Date:</strong> ${post.dateLearned}</p>
      <button class="delete-post-btn">Delete</button>
    `;

    item.querySelector('.delete-post-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(p => p.id !== post.id);
        savePostsToStorage();
        updateAdminPostsList();
        renderPosts();
      }
    });

    adminPostsList.appendChild(item);
  });
}

renderPosts();

