if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/proxy-crawl/sw.js', { scope: '/proxy-crawl/' })})}