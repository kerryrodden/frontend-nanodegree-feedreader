/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This test suite is all about the RSS feeds definitions - the
     * allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* Ensure that the allFeeds variable has been defined and that
         * it is not empty.
         */
        it('are defined and not empty', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Loop through each feed in the allFeeds object and ensure it
         * has a URL defined and that the URL is not empty.
         */
        it('have URLs that are defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        /* Loop through each feed in the allFeeds object and ensure it
         * has a name defined and that the name is not empty.
         */
        it('have names that are defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });


    /* Test suite for menu visibility */
    describe('The menu', function () {

        /* Ensure that the menu element is hidden by default. */
        it('is hidden by default', function () {
            expect(document.querySelector('body').classList.contains('menu-hidden')).toBeTruthy();
        });

        /* Ensure the menu changes visibility when the menu icon is clicked. */
        it('changes visibility when clicked', function () {
            const menuIcon = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBeFalsy();
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite for initial feed entries */
    describe('Initial Entries', function () {

        /* Ensure that when the loadFeed function is called and completes its
         * work, there is at least a single .entry element within the .feed
         * container. Because loadFeed() is asynchronous, this test requires
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('are retrieved and displayed correctly', function (done) {
            expect(document.querySelectorAll('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite for selecting a new feed */
    describe('New Feed Selection', function () {

        /* Ensure that when a new feed is loaded by the loadFeed function,
         * the content actually changes. Because loadFeed() is asynchronous,
         * this test requires the use of Jasmine's beforeEach and asynchronous
         * done() function.
         */
        let initialTextContent = '';

        beforeEach(function (done) {
            /* Wait for the first feed to load, store its content, then load the second */
            loadFeed(0, function () {
                initialTextContent = document.querySelector('.feed').textContent;
                loadFeed(1, done);
            });
        });

        it('new content is retrieved and displayed when a new feed is selected', function (done) {
            expect(initialTextContent).not.toBe(document.querySelector('.feed').textContent);
            done();
        });
    });
}());
