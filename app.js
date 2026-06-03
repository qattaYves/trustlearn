// ==========================================================================
// ⚡ TIMED DATABASE INTERACTION BRIDGE INITIALIZATION
// ==========================================================================
const SUPABASE_URL = "https://waebjmpsvghqgyjpidhh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZWJqbXBzdmdocWd5anBpZGhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0MDczNzgsImV4cCI6MjA5NTk4MzM3OH0.guxZTotc6b6CoJlvk-bfRWzbfITh0pjQSPBz-7w_tRE";

let supabaseClient = null;

// FORCE the script to wait until the entire browser window finishes loading scripts
window.addEventListener('load', () => {
    if (typeof Supabase !== 'undefined') {
        supabaseClient = Supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("🚀 Supabase network connection successfully synchronized!");
    } else {
        console.error("❌ Error: The script executed but could not find the Supabase library global variable.");
    }
});
// FEATURE 1: LIKE BUTTON MECHANICS
// ---------------------------------------------------------
const likeButtons = document.querySelectorAll('.like-btn');
likeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const countElement = this.querySelector('.like-count');
        let currentCount = parseFloat(countElement.innerText);
        let isLiked = this.getAttribute('data-liked') === 'true';

        if (!isLiked) {
            currentCount += 1;
            countElement.innerText = currentCount + "K";
            this.style.color = "#06b6d4"; 
            this.setAttribute('data-liked', 'true');
        } else {
            currentCount -= 1;
            countElement.innerText = currentCount + "K";
            this.style.color = "#fff"; 
            this.setAttribute('data-liked', 'false');
        }
    });
});

// ---------------------------------------------------------
// FEATURE 2: COMMENT DRAWER OPEN/CLOSE & POSTING
// ---------------------------------------------------------
const commentBtns = document.querySelectorAll('.comment-trigger-btn');
commentBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const cardWrapper = this.closest('.video-wrapper');
        const targetCommentPanel = cardWrapper.querySelector('.comment-section');
        if (targetCommentPanel.style.display === "none" || targetCommentPanel.style.display === "") {
            targetCommentPanel.style.display = "block";
        } else {
            targetCommentPanel.style.display = "none";
        }
    });
});

const postCommentBtns = document.querySelectorAll('.post-comment-btn');
postCommentBtns.forEach(button => {
    button.addEventListener('click', function() {
        const parentPanel = this.closest('.comment-section');
        const inputField = parentPanel.querySelector('.comment-input');
        const displayList = parentPanel.querySelector('.comments-list');
        const textValue = inputField.value.trim();
        if (textValue !== "") {
            const newCommentLine = document.createElement('p');
            newCommentLine.style.marginBottom = "6px";
            newCommentLine.innerHTML = `<b>@you:</b> ${textValue}`;
            displayList.appendChild(newCommentLine);
            inputField.value = "";
            displayList.scrollTop = displayList.scrollHeight;
        }
    });
});

// ---------------------------------------------------------
// FEATURE 3 & 4: SAVE AND SHARE LINKS CLIPBOARD UTILS
// ---------------------------------------------------------
const saveButtons = document.querySelectorAll('.save-btn');
saveButtons.forEach(button => {
    button.addEventListener('click', function() {
        alert("🔖 Concept saved to your Trust bookmarks!");
    });
});

const shareButtons = document.querySelectorAll('.share-btn');
shareButtons.forEach(button => {
    button.addEventListener('click', function() {
        const dummyShareLink = "https://trustapp.com/share/concept-microlearning";
        navigator.clipboard.writeText(dummyShareLink).then(() => {
            alert("🔗 Share link copied to clipboard! Ready to send.");
        });
    });
});

// ---------------------------------------------------------
// FEATURE 5: SIDEBAR NAVIGATION PANEL SWITCHER (ACTIVATED)
// ---------------------------------------------------------
const navigationMap = [
    { buttonId: 'menu-foryou', viewId: 'view-foryou' },
    { buttonId: 'menu-explore', viewId: 'view-explore' },
    { buttonId: 'menu-qa', viewId: 'view-qa' },
    { buttonId: 'menu-projects', viewId: 'view-projects' },
    { buttonId: 'menu-articles', viewId: 'view-articles' },
    { buttonId: 'menu-profile', viewId: 'view-profile' }
];

navigationMap.forEach(item => {
    const menuButton = document.getElementById(item.buttonId);
    if (menuButton) {
        menuButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevents layout jump resets

            // 1. Hide ALL view panels completely
            document.querySelectorAll('.app-view').forEach(view => {
                view.style.display = "none";
            });

            // 2. Clear out old button active state highlights
            document.querySelectorAll('.nav-item').forEach(link => {
                link.classList.remove('active');
            });

            // 3. Turn on the exact clicked view with correct structural alignment rules
            const targetView = document.getElementById(item.viewId);
            if (targetView) {
                targetView.style.display = "flex"; 
            }

            // 4. Highlight the active left-sidebar nav option link button
            this.classList.add('active');
            console.log(`Successfully rendered view layout container: ${item.viewId}`);
        });
    }
});
// ---------------------------------------------------------
// FEATURE 6: RIGHT Panel ASK-A-QUESTION SUBMISSION HANDLER
// ---------------------------------------------------------
const qaInput = document.getElementById('qa-input');
const qaPostBtn = document.getElementById('qa-post-btn');
const qaSubmissionsList = document.getElementById('qa-submissions-list');

if (qaPostBtn) {
    qaPostBtn.addEventListener('click', function() {
        const questionText = qaInput.value.trim();
        if (questionText !== "") {
            const questionCard = document.createElement('div');
            questionCard.style.background = "#1e293b";
            questionCard.style.padding = "12px";
            questionCard.style.borderLeft = "3px solid #06b6d4";
            questionCard.style.borderRadius = "6px";
            questionCard.style.fontSize = "14px";
            questionCard.style.marginTop = "10px";
            questionCard.innerHTML = `
                <p style="color: #06b6d4; font-weight: 600; margin-bottom: 4px;">@you asked:</p>
                <p style="color: #cbd5e1;">${questionText}</p>
            `;
            qaSubmissionsList.insertBefore(questionCard, qaSubmissionsList.firstChild);
            qaInput.value = "";
        }
    });
}
// ---------------------------------------------------------
// FEATURE 7: SCROLL DETECTION CONTEXT PANEL SWAPPER
// ---------------------------------------------------------

// 1. Select our scroll track container box and the right panel blocks
const feedScrollContainer = document.querySelector('.feed-scroll-container');
const contextElectronics = document.getElementById('context-electronics');
const contextAI = document.getElementById('context-ai');

if (feedScrollContainer) {
    feedScrollContainer.addEventListener('scroll', function() {
        // Calculate the current vertical scroll position distance height
        const scrollPosition = feedScrollContainer.scrollTop;
        const viewportHeight = feedScrollContainer.clientHeight;

        // If we scrolled past half of the first card layout height, swap panels!
        if (scrollPosition >= viewportHeight / 2) {
            contextElectronics.style.display = "none";
            contextAI.style.display = "block";
        } else {
            contextElectronics.style.display = "block";
            contextAI.style.display = "none";
        }
    });
}
// ---------------------------------------------------------
// FEATURE 9: SMART SCROLL-TO-PLAY VIDEO CONTROLLER
// ---------------------------------------------------------

// 1. Configure the observer parameters to detect when a card is 60% visible
const videoObserverOptions = {
    root: document.querySelector('.feed-scroll-container'), // Targets our scroll track
    rootMargin: '0px',
    threshold: 0.6 // 60% of the card must be visible on screen to trigger
};

// 2. Define the execution logic loop for entering and exiting viewports
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Find the actual video HTML element inside the active card element wrapper
        const activeVideo = entry.target.querySelector('.feed-video');
        
        if (activeVideo) {
            if (entry.isIntersecting) {
                // Video is centered on screen -> Play it smoothly
                activeVideo.play().catch(error => {
                    console.log("Autoplay blocked by browser policy until user interacts.");
                });
            } else {
                // Video scrolled away -> Pause it instantly to save system resources
                activeVideo.pause();
            }
        }
    });
}, videoObserverOptions);

// 3. Attach all our video cards to the observer monitor stream
const allVideoCards = document.querySelectorAll('.video-card');
allVideoCards.forEach(card => {
    videoObserver.observe(card);
});
// ---------------------------------------------------------
// FEATURE 10: SUPABASE INITIALIZATION & AUTH UI MODAL
// ---------------------------------------------------------


// 2. UI Dom Element Selections
const authModal = document.getElementById('auth-modal');
const closeAuthBtn = document.getElementById('close-auth-btn');
const authForm = document.getElementById('auth-form');
const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authToggleLink = document.getElementById('auth-toggle-link');
const authToggleText = document.getElementById('auth-toggle-text');

let isSignUpMode = true; // Tracks state flag toggles between SignUp vs Login forms

// Function to pop open the modal screen interface
function showAuthModal() {
    if (authModal) authModal.style.display = "flex";
}

// Event trigger loops to close user accounts interface panels
if (closeAuthBtn) {
    closeAuthBtn.addEventListener('click', () => {
        authModal.style.display = "none";
    });
}

// Intercept the Profile click navigation item to show Login if unauthenticated
const profileMenuBtn = document.getElementById('menu-profile');
if (profileMenuBtn) {
    profileMenuBtn.addEventListener('click', function(e) {
        // For demonstration testing, we display the auth block form panel automatically
        showAuthModal();
    });
}

// Toggle between Sign Up and Sign In View UI forms
if (authToggleLink) {
    authToggleLink.addEventListener('click', function(e) {
        e.preventDefault();
        isSignUpMode = !isSignUpMode;

        if (isSignUpMode) {
            authTitle.innerText = "Welcome to TrustLearn";
            authSubtitle.innerText = "Sign up to track your mechatronics milestones";
            authSubmitBtn.innerText = "Create Account";
            authToggleText.innerText = "Already have an account?";
            authToggleLink.innerText = "Sign In";
        } else {
            authTitle.innerText = "Welcome Back";
            authSubtitle.innerText = "Sign in to access your platform portal dashboard";
            authSubmitBtn.innerText = "Sign In";
            authToggleText.innerText = "New to TrustLearn?";
            authToggleLink.innerText = "Create Account";
        }
    });
}

// Handle Real-Time form submissions directly to the Supabase client pipeline
if (authForm) {
    authForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const password = document.getElementById('auth-password').value;

        if (!supabase) {
            alert("⚠️ Supabase Client SDK Connection not configured yet! Setup URL variables inside your app.js.");
            return;
        }

        if (isSignUpMode) {
            // Trigger New Registration to Supabase Core DB
            const { data, error } = await supabase.auth.signUp({ email, password });
            if (error) alert(`Registration Error: ${error.message}`);
            else alert("🚀 Check your email inbox inbox folder for verification confirmation link parameters!");
        } else {
            // Trigger Secure Login Authenticate Parameters
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) alert(`Login Failure: ${error.message}`);
            else {
                alert(`✅ Logged in successfully as: ${data.user.email}`);
                authModal.style.display = "none";
            }
        }
    });
}
// Grab our newly added guest browse action button element card
const authGuestBtn = document.getElementById('auth-guest-btn');

// Listen for guest entrance clicks to dismiss the authentication gate barrier
if (authGuestBtn) {
    authGuestBtn.addEventListener('click', function() {
        console.log("User selected guest navigation experience track safely.");
        
        // Hide the modular gate container wrapper immediately 
        authModal.style.display = "none";
        
        // Optional confirmation alert toast notice message 
        alert("🌐 Welcome! You are browsing as a guest. Sign up anytime to bookmark projects or post questions.");
    });
}
// Grab our newly created sidebar auth button element node
const sidebarAuthBtn = document.getElementById('sidebar-auth-btn');

// Listen for clicks on the sidebar button to launch the login/signup modal frame
if (sidebarAuthBtn) {
    sidebarAuthBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Authentication gate opened via sidebar link shortcut panel.");
        showAuthModal();
    });
}
// ---------------------------------------------------------
// FEATURE 11: UPLOAD CONTENT DROPDOWN SELECTION MECHANICS
// ---------------------------------------------------------
const uploadTrigger = document.getElementById('sidebar-upload-trigger');
const uploadDropdown = document.getElementById('upload-options-dropdown');
const uploadOptArticle = document.getElementById('upload-opt-article');
const uploadOptMedia = document.getElementById('upload-opt-media');

if (uploadTrigger && uploadDropdown) {
    uploadTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isHidden = uploadDropdown.style.display === "none" || uploadDropdown.style.display === "";
        uploadDropdown.style.display = isHidden ? "flex" : "none";
    });
}

document.addEventListener('click', function() {
    if (uploadDropdown) {
        uploadDropdown.style.display = "none";
    }
});

if (uploadOptArticle) {
    uploadOptArticle.addEventListener('click', function(e) {
        e.stopPropagation();
        uploadDropdown.style.display = "none";
        alert("📄 Opening Technical Markdown Editor pipeline... Prepare your datasheet documentation layout draft!");
    });
}

if (uploadOptMedia) {
    uploadOptMedia.addEventListener('click', function(e) {
        e.stopPropagation();
        uploadDropdown.style.display = "none";
        alert("🎥 Launching Media Studio uploader corridor... Select a vertical MP4 track or schematic capture image asset!");
    });
}
// ---------------------------------------------------------
// FEATURE 12: MARKDOWN COMPOSER STUDIO ENGINE
// ---------------------------------------------------------

// Dom Element Selections
const articlesLibraryFeed = document.getElementById('articles-library-feed');
const articleComposerView = document.getElementById('article-composer-view');
const closeComposerBtn = document.getElementById('close-composer-btn');
const markdownTextarea = document.getElementById('markdown-textarea');
const previewRenderPane = document.getElementById('preview-render-pane');
const composerTitleInput = document.getElementById('composer-title-input');
const publishArticleBtn = document.getElementById('publish-article-btn');

// Redirect option 1 click from upload dropdown to slide up the composer screen
if (uploadOptArticle) {
    uploadOptArticle.addEventListener('click', function(e) {
        e.stopPropagation();
        uploadDropdown.style.display = "none";
        
        // Force the app view to switch into article tab first
        document.getElementById('menu-articles').click();
        
        // Hide standard view corridor feed, pop up writing engine studio workspace
        if (articlesLibraryFeed && articleComposerView) {
            articlesLibraryFeed.style.display = "none";
            articleComposerView.style.display = "flex";
        }
    });
}

// Handle Cancel Button Actions
if (closeComposerBtn) {
    closeComposerBtn.addEventListener('click', () => {
        articlesLibraryFeed.style.display = "flex";
        articleComposerView.style.display = "none";
    });
}

// Core parsing translation routine using standard string regex replacements
function parseMarkdownToHTML(text) {
    let html = text;
    
    // Convert Headers (###, ##, #) safely
    html = html.replace(/^### (.*$)/gim, '<h3 style="color:#fff; font-size:16px; margin:12px 0 6px 0;">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 style="color:#06b6d4; font-size:18px; margin:16px 0 8px 0;">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 style="color:#fff; font-size:22px; margin-bottom:12px; border-bottom:1px solid #1e293b; padding-bottom:6px;">$1</h1>');
    
    // Convert Bold Text Block syntax tokens (**text**)
    html = html.replace(/\*\*(.*)\*\*/gim, '<b style="color:#22d3ee;">$1</b>');
    
    // Convert Bullet Lists token structures (* text)
    html = html.replace(/^\* (.*$)/gim, '<li style="margin-left:15px; color:#cbd5e1; margin-bottom:4px;">$1</li>');
    
    // Handle generic paragraph newline spacings cleanly
    html = html.replace(/\n$/gim, '<br>');
    
    return html;
}

// Listen for keys typed inside the editing corridor pane row
if (markdownTextarea) {
    markdownTextarea.addEventListener('input', function() {
        const rawText = this.value;
        const currentTitle = composerTitleInput.value.trim() || "Untitled Document Workspace";
        
        if (rawText.trim() === "") {
            previewRenderPane.innerHTML = `<h1 style="color: #fff; font-size: 22px; margin-bottom: 10px;">${currentTitle}</h1><p style="color: #64748b; font-style: italic;">Live translation stream will compile text strings instantly here...</p>`;
            return;
        }
        
        // Render processed token sequences directly onto preview viewport container
        const compiledHTML = parseMarkdownToHTML(rawText);
        previewRenderPane.innerHTML = `
            <h1 style="color: #fff; font-size: 22px; margin-bottom: 12px; border-bottom:1px solid #1e293b; padding-bottom:6px;">${currentTitle}</h1>
            <div>${compiledHTML}</div>
        `;
    });
    
    // Keep preview matching when title text field modifies too
    composerTitleInput.addEventListener('input', () => {
        markdownTextarea.dispatchEvent(new Event('input'));
    });
}

// Handle local Publishing Actions simulation loops
if (publishArticleBtn) {
    // Remove any previous duplicate click listeners for this button
    const clone = publishArticleBtn.cloneNode(true);
    publishArticleBtn.parentNode.replaceChild(clone, publishArticleBtn);
    
    // Grab the fresh element reference to assign the clean database function
    const activePublishBtn = document.getElementById('publish-article-btn');
    
    activePublishBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        
        const titleText = composerTitleInput ? composerTitleInput.value.trim() : "";
        const markdownText = markdownTextarea ? markdownTextarea.value.trim() : "";
        
        if (!titleText || !markdownText) {
            alert("⚠️ Please fill in both the title and markdown workspace fields before publishing!");
            return;
        }

        activePublishBtn.innerText = "⏳ Uploading to Cloud...";
        activePublishBtn.disabled = true;

        // PUSH LIVE ROW STRINGS TO SUPABASE TABLE
       // Line 470 must use the exact same name: supabaseClient
const { data, error } = await supabaseClient
    .from('articles')
    .insert([
        { title: titleText, markdown_content: markdownText, author_handle: '@you' }
    ])
    .select();

        if (error) {
            console.error("Supabase Database Sync Error:", error);
            alert("❌ Database sync failed: " + error.message);
        } else {
            alert(`🚀 Success! "${titleText}" has been permanently saved to your live cloud database table!`);
            
            // Clean out inputs and safely toggle layout grids back to dashboard feed
            if (composerTitleInput) composerTitleInput.value = "";
            if (markdownTextarea) markdownTextarea.value = "";
            
            if (articlesLibraryFeed && articleComposerView) {
                articlesLibraryFeed.style.display = "flex";
                articleComposerView.style.display = "none";
            }
        }

        activePublishBtn.innerText = "Publish Article";
        activePublishBtn.disabled = false;
    });
}
