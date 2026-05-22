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
  },
  {
    id: 3,
    section: 'roblox',
    title: 'Introduction to Roblox Studio',
    intro: 'Get started with Roblox Studio and create your first game world.',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800',
    date: '2024-05-14',
    dateLearned: 'May 14, 2024',
    staffDate: 'May 16, 2024',
    materials: {
      overview: { text: 'Roblox Studio overview...', image: null },
      coding: { text: 'Lua scripting basics...', file: null },
      lessons: { text: 'Tutorial lessons...', file: null },
      support: { text: 'Help and resources...', file: null }
    }
  },
  {
    id: 4,
    section: 'multimedia',
    title: 'Digital Media Design Basics',
    intro: 'Learn the fundamentals of digital design, video editing, and multimedia creation.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
    date: '2024-05-15',
    dateLearned: 'May 15, 2024',
    staffDate: 'May 16, 2024',
    materials: {
      overview: { text: 'Multimedia fundamentals...', image: null },
      coding: { text: 'Code examples...', file: null },
      lessons: { text: 'Design lessons...', file: null },
      support: { text: 'Design resources...', file: null }
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

// New storage functions for approval system
let pendingUploads = [];
let userUploadHistory = [];

function loadPendingUploads() {
  const saved = localStorage.getItem('pendingUploads');
  if (saved) {
    try {
      pendingUploads = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load pending uploads:', e);
    }
  }
}

function savePendingUploads() {
  localStorage.setItem('pendingUploads', JSON.stringify(pendingUploads));
}

function loadUserUploadHistory() {
  const saved = localStorage.getItem('userUploadHistory');
  if (saved) {
    try {
      userUploadHistory = JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load upload history:', e);
    }
  }
}

function saveUserUploadHistory() {
  localStorage.setItem('userUploadHistory', JSON.stringify(userUploadHistory));
}

loadPendingUploads();
loadUserUploadHistory();

let isAdmin = false;
let isUserLoggedIn = false;
let currentUserName = '';
let currentSection = 'home';
let currentPostId = null;
let currentMaterialTab = 'overview';

const adminBtn = document.getElementById('adminBtn');
const logoBtn = document.getElementById('logoBtn');
const userLoginBtn = document.getElementById('userLoginBtn');
const signupBtn = document.getElementById('signupBtn');
const authDropdownBtn = document.getElementById('authDropdownBtn');
const authDropdownMenu = document.getElementById('authDropdownMenu');
const uploadBtn = document.getElementById('uploadBtn');
const uploadMenuContainer = document.getElementById('uploadMenuContainer');
const logoutBtn = document.getElementById('logoutBtn');
const adminUsername = document.getElementById('adminUsername');
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const userLoginModal = document.getElementById('userLoginModal');
const closeUserLogin = document.getElementById('closeUserLogin');
const userLoginForm = document.getElementById('userLoginForm');
const userLoginError = document.getElementById('userLoginError');
const signupModal = document.getElementById('signupModal');
const closeSignup = document.getElementById('closeSignup');
const signupForm = document.getElementById('signupForm');
const signupError = document.getElementById('signupError');

const adminPanel = document.getElementById('adminPanel');
const closeBtn = document.getElementById('closeAdmin');
const postForm = document.getElementById('postForm');
const postsFeed = document.getElementById('postsFeed');
const buttonsFeed = document.getElementById('buttonsFeed');
const detailPage = document.getElementById('detailPage');
const backBtn = document.getElementById('backBtn');
const navButtons = document.querySelectorAll('.nav-btn[data-section]');
const tabButtons = document.querySelectorAll('.tab-btn');

const materialUploadModal = document.getElementById('materialUploadModal');
const closeMaterialUpload = document.getElementById('closeMaterialUpload');
const materialForm = document.getElementById('materialForm');
const materialTabBtns = document.querySelectorAll('.material-tab-btn');

// New elements for approval system
const pendingUploadsBtn = document.getElementById('pendingUploadsBtn');
const pendingBadge = document.getElementById('pendingBadge');
const pendingUploadsModal = document.getElementById('pendingUploadsModal');
const closePendingUploads = document.getElementById('closePendingUploads');
const pendingUploadsList = document.getElementById('pendingUploadsList');
const uploadHistoryBtn = document.getElementById('uploadHistoryBtn');
const uploadHistoryModal = document.getElementById('uploadHistoryModal');
const closeUploadHistory = document.getElementById('closeUploadHistory');
const uploadHistoryList = document.getElementById('uploadHistoryList');
const materialPostSelect = document.getElementById('materialPostSelect');

// Dropdown menu toggle
authDropdownBtn.addEventListener('click', () => {
  authDropdownMenu.classList.toggle('visible');
});

// Close dropdown when clicking on a dropdown item
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    authDropdownMenu.classList.remove('visible');
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!authDropdownBtn.contains(e.target) && !authDropdownMenu.contains(e.target)) {
    authDropdownMenu.classList.remove('visible');
  }
});

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
    updateUI();
    updateAdminPostsList();
    alert('Login successful!');
  } else {
    loginError.textContent = 'Invalid username or password';
  }
});

// User Login
userLoginBtn.addEventListener('click', () => {
  userLoginModal.classList.remove('hidden');
  userLoginError.textContent = '';
});

closeUserLogin.addEventListener('click', () => {
  userLoginModal.classList.add('hidden');
  userLoginError.textContent = '';
});

userLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('userLoginUsername').value;
  const password = document.getElementById('userLoginPassword').value;

  if (username && password) {
    isUserLoggedIn = true;
    currentUserName = username;
    userLoginModal.classList.add('hidden');
    updateUI();
    alert('User login successful!');
  } else {
    userLoginError.textContent = 'Please enter username and password';
  }
});

// Sign Up
signupBtn.addEventListener('click', () => {
  signupModal.classList.remove('hidden');
  signupError.textContent = '';
});

closeSignup.addEventListener('click', () => {
  signupModal.classList.add('hidden');
  signupError.textContent = '';
});

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;

  if (username && password) {
    isUserLoggedIn = true;
    currentUserName = username;
    signupModal.classList.add('hidden');
    updateUI();
    alert('Sign up successful! Welcome to CS Learn Portal!');
  } else {
    signupError.textContent = 'Please enter username and password';
  }
});

// Logout
logoutBtn.addEventListener('click', () => {
  isAdmin = false;
  isUserLoggedIn = false;
  currentUserName = '';
  updateUI();
});

function updateUI() {
  if (isAdmin) {
    authDropdownBtn.classList.add('hidden');
    uploadMenuContainer.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    adminUsername.classList.remove('hidden');
    adminUsername.textContent = 'Admin';
    pendingUploadsBtn.classList.remove('hidden');
    uploadHistoryBtn.classList.add('hidden');
    updatePendingBadge();
  } else if (isUserLoggedIn) {
    authDropdownBtn.classList.add('hidden');
    uploadMenuContainer.classList.remove('hidden');
    logoutBtn.classList.remove('hidden');
    adminUsername.classList.remove('hidden');
    adminUsername.textContent = currentUserName;
    pendingUploadsBtn.classList.add('hidden');
    uploadHistoryBtn.classList.remove('hidden');
  } else {
    authDropdownBtn.classList.remove('hidden');
    uploadMenuContainer.classList.add('hidden');
    logoutBtn.classList.add('hidden');
    adminUsername.classList.add('hidden');
    pendingUploadsBtn.classList.add('hidden');
    uploadHistoryBtn.classList.add('hidden');
  }
}

// File upload for materials - show upload modal
const hiddenFileInput = document.getElementById('hiddenFileInput');
uploadBtn.addEventListener('click', () => {
  if (isAdmin || isUserLoggedIn) {
    populatePostSelect();
    materialUploadModal.classList.remove('hidden');
  }
});

// Handle file selection
if (hiddenFileInput) {
  hiddenFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileUploads(e.target.files);
    }
    // Reset the input
    hiddenFileInput.value = '';
  });
}

function handleFileUploads(files) {
  const uploadedFiles = [];
  let filesProcessed = 0;
  
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedFiles.push({
        name: file.name,
        data: event.target.result,
        type: file.type,
        uploadDate: new Date().toLocaleDateString()
      });
      filesProcessed++;
      
      // When all files are processed
      if (filesProcessed === files.length) {
        saveUploadedFiles(uploadedFiles);
      }
    };
    reader.readAsDataURL(file);
  });
}

function saveUploadedFiles(files) {
  // Create pending upload for file uploads
  const uploadId = generateUploadId();
  const uploadData = {
    id: uploadId,
    uploadedBy: currentUserName,
    uploadType: 'File Upload',
    uploadDate: new Date().toLocaleDateString(),
    status: 'pending',
    description: 'File upload',
    files: files
  };

  // Save to pending uploads
  pendingUploads.push(uploadData);
  savePendingUploads();

  // Add to user history
  userUploadHistory.push({
    uploadId: uploadId,
    uploadedBy: currentUserName,
    uploadType: 'File Upload',
    uploadDate: new Date().toLocaleDateString(),
    status: 'pending',
    reviewDate: null
  });
  saveUserUploadHistory();

  alert(`${files.length} file(s) submitted for admin approval!`);
  updatePendingBadge();
}

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

// Logo button - navigate to home
logoBtn.addEventListener('click', () => {
  navButtons.forEach(b => b.classList.remove('active'));
  const homeBtn = document.querySelector('.nav-btn[data-section="home"]');
  if (homeBtn) {
    homeBtn.classList.add('active');
  }
  currentSection = 'home';
  renderPosts();
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
  closeMaterialModal();
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
  // Get selected post ID from dropdown
  const selectedPostId = parseInt(materialPostSelect.value);

  if (!selectedPostId) {
    alert('Error: Please select a post from the dropdown.');
    return;
  }

  const post = posts.find(p => p.id === selectedPostId);
  if (!post) {
    alert('Error: Post not found. Please try again.');
    return;
  }

  const text = document.querySelector(`#${currentMaterialTab}-form .material-text`).value;
  const fileInput = document.querySelector(`#${currentMaterialTab}-form .material-file`) ||
                    document.querySelector(`#${currentMaterialTab}-form .material-image`);

  // Check if at least some content is provided
  if (!text && (!fileInput || fileInput.files.length === 0)) {
    alert('Please enter text or upload a file');
    return;
  }

  // Create pending upload
  const uploadId = generateUploadId();
  const uploadData = {
    id: uploadId,
    uploadedBy: currentUserName,
    uploadType: 'Learning Material',
    uploadDate: new Date().toLocaleDateString(),
    status: 'pending',
    postId: selectedPostId,
    postTitle: post.title,
    materialTab: currentMaterialTab,
    description: text,
    files: []
  };

  // If there's a file, add it to pending
  if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadData.files.push({
        name: file.name,
        data: e.target.result,
        type: file.type
      });

      // Save to pending uploads
      pendingUploads.push(uploadData);
      savePendingUploads();

      // Add to user history
      userUploadHistory.push({
        uploadId: uploadId,
        uploadedBy: currentUserName,
        uploadType: 'Learning Material',
        uploadDate: new Date().toLocaleDateString(),
        status: 'pending',
        reviewDate: null
      });
      saveUserUploadHistory();

      alert('Materials submitted for admin approval!');
      closeMaterialModal();
      updatePendingBadge();
    };
    reader.readAsDataURL(file);
  } else {
    // No file, just text
    pendingUploads.push(uploadData);
    savePendingUploads();

    userUploadHistory.push({
      uploadId: uploadId,
      uploadedBy: currentUserName,
      uploadType: 'Learning Material',
      uploadDate: new Date().toLocaleDateString(),
      status: 'pending',
      reviewDate: null
    });
    saveUserUploadHistory();

    alert('Materials submitted for admin approval!');
    closeMaterialModal();
    updatePendingBadge();
  }
}

function closeMaterialModal() {
  materialUploadModal.classList.add('hidden');
  materialForm.reset();
  materialPostSelect.value = '';
  // Reset material tabs
  currentMaterialTab = 'overview';
  updateMaterialTabs();
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
  if (currentSection === 'home') {
    postsFeed.classList.remove('hidden');
    buttonsFeed.classList.add('hidden');
    renderHomePage();
  } else {
    const filteredPosts = posts.filter(post => post.section === currentSection).slice(0, 3);
    postsFeed.classList.add('hidden');
    buttonsFeed.classList.remove('hidden');
    
    let customBg = null;
    if (currentSection === 'cyber') {
      customBg = 'CyberSecurity.jpg';
    } else if (currentSection === 'roblox') {
      customBg = 'RobloxStudio.png';
    }
    
    renderButtonPosts(filteredPosts, customBg);
  }
}

function renderHomePage() {
  postsFeed.innerHTML = '';
  
  const sections = ['cyber', 'robotics', 'roblox', 'multimedia'];
  const sectionLabels = {
    cyber: 'Cyber Security',
    robotics: 'Robotics/Hardware',
    roblox: 'Roblox Studio',
    multimedia: 'Multi-Media'
  };
  
  const sectionBgImages = {
    cyber: 'CyberSecurity.jpg',
    roblox: 'RobloxStudio.png'
  };
  
  sections.forEach(section => {
    const sectionPosts = posts.filter(post => post.section === section);
    
    if (sectionPosts.length > 0) {
      const sectionContainer = document.createElement('div');
      sectionContainer.style.cssText = 'margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 2px solid #e2e8f0;';
      
      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = sectionLabels[section];
      sectionTitle.style.cssText = 'margin-bottom: 1.5rem; font-size: 1.8rem; color: #1e293b; font-weight: bold;';
      
      sectionContainer.appendChild(sectionTitle);
      
      const postsContainer = document.createElement('div');
      postsContainer.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;';
      
      sectionPosts.slice(0, 3).forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        const bgImage = sectionBgImages[section] || post.image;
        postCard.innerHTML = `
          <div class="post-image-container">
            <img src="${bgImage}" alt="${post.title}" class="post-image">
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
            </div>
          </div>
        `;
        
        postCard.addEventListener('click', () => {
          currentPostId = post.id;
          showDetailPage(post);
        });
        
        postsContainer.appendChild(postCard);
      });
      
      sectionContainer.appendChild(postsContainer);
      postsFeed.appendChild(sectionContainer);
    }
  });
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

function renderButtonPosts(filteredPosts, customBg = null) {
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
    const bgImage = customBg || post.image;
    button.innerHTML = `
      <div class="content-button-bg" style="background-image: url('${bgImage}');"></div>
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

// Approval system functions
function generateUploadId() {
  return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

function populatePostSelect() {
  // Clear existing options except the default
  materialPostSelect.innerHTML = '<option value="">-- Choose a Post --</option>';

  // Add all posts to the dropdown
  posts.forEach(post => {
    const option = document.createElement('option');
    option.value = post.id;
    option.textContent = `${post.title} (${post.section})`;
    materialPostSelect.appendChild(option);
  });
}

function updatePendingBadge() {
  if (pendingUploads.length > 0) {
    pendingBadge.textContent = pendingUploads.length;
    pendingBadge.style.display = 'inline-block';
  } else {
    pendingBadge.style.display = 'none';
  }
}

function displayPendingUploads() {
  pendingUploadsList.innerHTML = '';

  if (pendingUploads.length === 0) {
    pendingUploadsList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No pending uploads</p>';
    return;
  }

  pendingUploads.forEach(upload => {
    const item = document.createElement('div');
    item.style.cssText = 'padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 1rem; background: #f8fafc;';

    let filesList = '';
    if (upload.files && upload.files.length > 0) {
      filesList = upload.files.map(f => `<li>${f.name}</li>`).join('');
    }

    item.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">Uploaded by: ${upload.uploadedBy}</h4>
        <p style="margin: 0.5rem 0; color: #64748b; font-size: 0.9rem;">Date: ${upload.uploadDate}</p>
        <p style="margin: 0.5rem 0; color: #64748b; font-size: 0.9rem;"><strong>Type:</strong> ${upload.uploadType}</p>
        ${filesList ? `<p style="margin: 0.5rem 0; color: #64748b; font-size: 0.9rem;"><strong>Files:</strong><ul style="margin: 0.5rem 0; padding-left: 1.5rem;">${filesList}</ul></p>` : ''}
        <p style="margin: 0.5rem 0; color: #475569;">${upload.description || 'No description'}</p>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="approve-upload-btn" data-id="${upload.id}" style="flex: 1; padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">Approve</button>
        <button class="reject-upload-btn" data-id="${upload.id}" style="flex: 1; padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">Reject</button>
      </div>
    `;

    pendingUploadsList.appendChild(item);
  });

  // Add event listeners to approve/reject buttons
  document.querySelectorAll('.approve-upload-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      approveUpload(btn.dataset.id);
    });
  });

  document.querySelectorAll('.reject-upload-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      rejectUpload(btn.dataset.id);
    });
  });
}

function approveUpload(uploadId) {
  const upload = pendingUploads.find(u => u.id === uploadId);
  if (!upload) return;

  // Move upload to approved
  const approvedUpload = {
    ...upload,
    status: 'approved',
    approvedBy: 'Admin',
    reviewDate: new Date().toLocaleDateString()
  };

  // Update user history
  const userHistory = userUploadHistory.find(h => h.uploadId === uploadId);
  if (userHistory) {
    userHistory.status = 'approved';
    userHistory.reviewDate = new Date().toLocaleDateString();
  }

  // Remove from pending
  pendingUploads = pendingUploads.filter(u => u.id !== uploadId);
  savePendingUploads();
  saveUserUploadHistory();

  alert('Upload approved successfully!');
  displayPendingUploads();
  updatePendingBadge();
}

function rejectUpload(uploadId) {
  const upload = pendingUploads.find(u => u.id === uploadId);
  if (!upload) return;

  // Update user history
  const userHistory = userUploadHistory.find(h => h.uploadId === uploadId);
  if (userHistory) {
    userHistory.status = 'rejected';
    userHistory.reviewDate = new Date().toLocaleDateString();
  }

  // Remove from pending
  pendingUploads = pendingUploads.filter(u => u.id !== uploadId);
  savePendingUploads();
  saveUserUploadHistory();

  alert('Upload rejected!');
  displayPendingUploads();
  updatePendingBadge();
}

function displayUserUploadHistory() {
  uploadHistoryList.innerHTML = '';

  const userHistory = userUploadHistory.filter(h => h.uploadedBy === currentUserName);

  if (userHistory.length === 0) {
    uploadHistoryList.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">No uploads yet</p>';
    return;
  }

  userHistory.forEach(upload => {
    const item = document.createElement('div');
    item.style.cssText = 'padding: 1.5rem; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 1rem; background: #f8fafc;';

    let statusColor = '#64748b';
    let statusText = upload.status;
    if (upload.status === 'approved') {
      statusColor = '#10b981';
      statusText = '✓ Approved';
    } else if (upload.status === 'rejected') {
      statusColor = '#ef4444';
      statusText = '✗ Rejected';
    } else if (upload.status === 'pending') {
      statusColor = '#f59e0b';
      statusText = '⏳ Pending';
    }

    item.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0; color: #1e293b;">Upload Type: ${upload.uploadType}</h4>
        <p style="margin: 0.5rem 0; color: #64748b; font-size: 0.9rem;">Date Uploaded: ${upload.uploadDate}</p>
        <p style="margin: 0.5rem 0; color: #64748b; font-size: 0.9rem;">Status: <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></p>
        ${upload.reviewDate ? `<p style="margin: 0.5rem 0; color: #64748b; font-size: 0.9rem;">Reviewed: ${upload.reviewDate}</p>` : ''}
      </div>
    `;

    uploadHistoryList.appendChild(item);
  });
}

// Event listeners for new buttons
pendingUploadsBtn.addEventListener('click', () => {
  displayPendingUploads();
  pendingUploadsModal.classList.remove('hidden');
});

closePendingUploads.addEventListener('click', () => {
  pendingUploadsModal.classList.add('hidden');
});

uploadHistoryBtn.addEventListener('click', () => {
  displayUserUploadHistory();
  uploadHistoryModal.classList.remove('hidden');
});

closeUploadHistory.addEventListener('click', () => {
  uploadHistoryModal.classList.add('hidden');
});

renderPosts();

