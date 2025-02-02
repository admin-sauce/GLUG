// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Sample blog posts data with full content
    const blogPosts = [
        {
            id: 1,
            title: 'Getting Started with Linux',
            excerpt: 'A beginner\'s guide to installing and using Linux...',
            content: `
                <p>Linux is a powerful and versatile operating system that offers users complete control over their computing environment. This guide will walk you through the basics of getting started with Linux.</p>
                <h2>Choosing a Distribution</h2>
                <p>For beginners, we recommend starting with Ubuntu or Linux Mint. These distributions offer:</p>
                <ul>
                    <li>User-friendly interfaces</li>
                    <li>Large community support</li>
                    <li>Extensive documentation</li>
                    <li>Regular updates</li>
                </ul>
                <h2>Installation Process</h2>
                <p>The installation process is straightforward:</p>
                <ol>
                    <li>Download the ISO file</li>
                    <li>Create a bootable USB drive</li>
                    <li>Boot from the USB drive</li>
                    <li>Follow the installation wizard</li>
                </ol>
            `,
            date: '2024-02-20',
            category: 'Tutorials',
            author: 'John Doe',
            image: 'https://via.placeholder.com/800x400'
        },
        {
            id: 2,
            title: 'Why Open Source Matters',
            excerpt: 'Exploring the importance of open source software...',
            content: `
                <p>Open source software has revolutionized the technology industry and continues to shape our digital future.</p>
                <h2>The Power of Collaboration</h2>
                <p>Open source enables developers worldwide to collaborate, innovate, and build better software together.</p>
            `,
            date: '2024-02-18',
            category: 'Opinion',
            author: 'Jane Smith',
            image: 'https://via.placeholder.com/800x400'
        },
        // Add more blog posts...
    ];

    // Populate blog grid
    const blogGrid = document.getElementById('blog-grid');
    if (blogGrid) {
        blogPosts.forEach(post => {
            const postElement = createBlogPostCard(post);
            blogGrid.appendChild(postElement);
        });
    }

    // Handle blog post page
    const postContent = document.getElementById('post-content');
    if (postContent) {
        const urlParams = new URLSearchParams(window.location.search);
        const postId = parseInt(urlParams.get('id'));
        const post = blogPosts.find(p => p.id === postId);

        if (post) {
            document.title = `${post.title} - GLUG`;
            document.getElementById('post-category').textContent = post.category;
            document.getElementById('post-title').textContent = post.title;
            document.getElementById('post-date').textContent = formatDate(post.date);
            document.getElementById('post-author').textContent = `By ${post.author}`;
            postContent.innerHTML = post.content;
        }
    }

    // Blog filters
    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.textContent;
            if (blogGrid) {
                blogGrid.innerHTML = '';
                const filteredPosts = category === 'All' 
                    ? blogPosts 
                    : blogPosts.filter(post => post.category === category);
                
                filteredPosts.forEach(post => {
                    const postElement = createBlogPostCard(post);
                    blogGrid.appendChild(postElement);
                });
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Create blog post card
function createBlogPostCard(post) {
    const article = document.createElement('article');
    article.className = 'blog-post';
    
    article.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-post-image">
        <div class="blog-post-content">
            <div class="blog-post-category">${post.category}</div>
            <h3 class="blog-post-title">${post.title}</h3>
            <p class="blog-post-excerpt">${post.excerpt}</p>
            <div class="blog-post-meta">
                <time datetime="${post.date}">${formatDate(post.date)}</time>
                <a href="blog-post.html?id=${post.id}" class="read-more">Read More →</a>
            </div>
        </div>
    `;
    
    return article;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .post-card, .feature-item, .blog-post').forEach(element => {
    observer.observe(element);
});